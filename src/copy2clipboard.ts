import * as vscode from "vscode";

const config = vscode.workspace.getConfiguration('pudding');

/**
 * 判断是否键盘或鼠标事件的操作以及相应配置是否开启
 * @param event 
 * @returns 
 */
export function shouldCopy(event: vscode.TextEditorSelectionChangeEvent): boolean {
  if (typeof event.kind === 'undefined' || event.kind === null) {
    return false;
  }
  if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
    return false;
  }
  // 忽略点击
  if (!(event.selections && event.selections.length > 0)) {
    return false;
  }
  const [currentSelection] = event.selections;
  const currentSelectionIsJustAClick =
    currentSelection.anchor.line === currentSelection.active.line &&
    currentSelection.anchor.character === currentSelection.active.character;
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
export function generateTextToCopy(event: vscode.TextEditorSelectionChangeEvent): string {
  const eol = event.textEditor.document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
  let text = event.selections.map(selection => event.textEditor.document.getText(selection)).join(eol);
  if (config.get('trimStartBlank', false)) {
    text = text.replace(/^\s+/, '');
  }
  if (config.get('trimEndBlank', true)) {
    text = text.replace(/\s+$/, '');
  }
  return text;
}

/**
 * 存入clipboard
 * @param text 
 * @returns 
 */
export async function copyToClipboard(text: string) {
  if (text.trim() === '') {
    return;
  }
  try {
    await vscode.env.clipboard.writeText(text);
    await vscode.window.showInformationMessage(`${text.length > 10 ? `${text.substring(0, 10)}...` : text} saved to clipboard`);
  } catch (error) {
    vscode.window.showErrorMessage(`selection copy fail. Error: ${JSON.stringify(error)}`);
  }
}