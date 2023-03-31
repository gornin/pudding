import * as vscode from "vscode";

const config = vscode.workspace.getConfiguration('pudding');

/**
 * 这是一个 JavaScript 函数，名为 awaiter。它接受四个参数：thisArg、_arguments、P 和 generator。
 * 该函数的目的是为异步生成器函数提供一个包装器，以允许使用 await 关键字以类似同步的方式使用它。
 * generator 函数是一个异步生成器函数，意味着它使用 yield 关键字异步暂停执行并返回值。
 * 当执行 generator 函数时，会调用它的 next() 方法。
 */
// export const awaiter = (this && this.awaiter) || function (thisArg, _arguments, P, generator) {
//   // 该函数返回一个 Promise 对象，其中包含一个回调函数，该回调函数具有 resolve 和 reject 参数。
//   return new (P || (P = Promise))(function (resolve, reject) {
//     // 在 Promise 回调函数中，有三个内部函数：fulfilled、rejected 和 step。
//     function fulfilled(value) {
//       try {
//         step(generator.next(value));
//       } catch (e) {
//         reject(e);
//       }
//     }
//     function rejected(value) {
//       try {
//         step(generator["throw"](value));
//       } catch (e) {
//         reject(e);
//       }
//     }
//     function step(result) {
//       result.done
//         ? resolve(result.value)
//         : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected);
//     }

//     // generator 函数作为参数传递给 step 函数，并使用 thisArg 和 _arguments 参数调用。
//     // step 函数通过调用 resolve 和 value 参数来处理 next() 调用的结果，或者通过调用 new P() 来创建一个新的 Promise，然后将其传递给原始 Promise 的 then 方法。
//     step((generator = generator.apply(thisArg, _arguments || [])).next());
//   });
// };

/**
 * 判断是否键盘或鼠标事件的操作以及相应配置是否开启
 * @param event 
 * @returns 
 */
export function shouldCopy(event: vscode.TextEditorSelectionChangeEvent) {
  if (typeof event.kind === 'undefined' || event.kind === null) {
    return false;
  }
  if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
    return false;
  }
  const currentSelection = event.selections && event.selections.length && event.selections[0];
  if (!currentSelection) {
    return false;
  }
  // 排除单击情况
  const currentSelectionIsJustAClick = currentSelection.anchor.line === currentSelection.active.line && currentSelection.anchor.character === currentSelection.active.character;
  if (currentSelectionIsJustAClick) {
    return false;
  }
  // 查询配置是否开启复制选择项
  const copyOnKeyboard = config.get('copyOnKeyboardSelection', false);
  // 键盘选中的内容
  if (copyOnKeyboard && event.kind === vscode.TextEditorSelectionChangeKind.Keyboard) {
    return true;
  }
  // 查询配置情况
  const copyOnMouse = config.get('copyOnMouseSelection', true);
  // 鼠标选中的内容
  if (copyOnMouse && event.kind === vscode.TextEditorSelectionChangeKind.Mouse) {
    return true;
  }
  return false;
}

/**
 * 处理得到干净的text
 * @param event 
 * @returns 
 */
export function generateTextToCopy(event: vscode.TextEditorSelectionChangeEvent) {
  const eol = event.textEditor.document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
  let text = event.selections.map(selection => event.textEditor.document.getText(selection)).join(eol);
  if (config.get('trimStart', false)) {
    text = text.replace(/^\s+/, '');
  }
  if (config.get('trimEnd', true)) {
    text = text.replace(/\s+$/, '');
  }
  return text;
}

/**
 * 存入clipboard
 * @param text 
 * @returns 
 */
export function copyToClipboard(this: any, text: string) {
  if (text.trim() === '') {
    return;
  }
  try {
    vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage("save into clipboard ～");
  }
  catch (error) {
    vscode.window.showErrorMessage(`selection copy fail. Error: ${JSON.stringify(error)}`);
  }

  // return awaiter(this, void 0, void 0, function* () {
  //   if (text.trim() === '') {
  //     return;
  //   }
  //   try {
  //     yield vscode.env.clipboard.writeText(text);
  //     vscode.window.showInformationMessage("save into clipboard ～");
  //   }
  //   catch (error) {
  //     vscode.window.showErrorMessage(`selection copy fail. Error: ${JSON.stringify(error)}`);
  //   }
  // });
}