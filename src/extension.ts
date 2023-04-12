// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
// import pinyin from "pinyin";
import { pinyin } from "pinyin-pro";
const debounce = require("debounce");
// import { IPinyinMode, IPinyinOptions, IPinyinStyle } from "pinyin/lib/declare";
import transverter, { OPTIONS } from "./transverter";
import {
  shouldCopy,
  copyToClipboard,
  generateTextToCopy,
} from "./copy2clipboard";

/**
 * 处理简繁转换
 *
 * @param textEditor
 * @param options
 */
function tsProcess(textEditor: vscode.TextEditor, options: OPTIONS) {
  const doc = textEditor.document;
  let selection: vscode.Selection | vscode.Range = textEditor.selection;
  if (selection.isEmpty) {
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(
      doc.lineCount - 1,
      doc.lineAt(doc.lineCount - 1).text.length
    );
    selection = new vscode.Range(start, end);
  }
  let text = doc.getText(selection);
  vscode.env.clipboard.writeText(text);
  textEditor.edit((builder) => {
    builder.replace(selection, transverter(text, options));
  });
}

/**
 * 汉字转成拼音形式
 *
 * @param options pinyin库的配置项
 * @param connector 连接符
 * @param type upper | lower
 * @returns
 */
function transform2Py(
  // options: IPinyinOptions,
  connector: string,
  type: string
) {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }
  const { selection } = activeEditor;
  const selected = activeEditor.document.getText(selection);
  vscode.env.clipboard.writeText(selected);
  // const pinyinArr = pinyin(selected, options);
  const pinyinArr = pinyin(selected, { toneType: "none", type: "array" });
  let str = pinyinArr.toString().replaceAll(",", connector);
  if (type === "upper") {
    str = str.toUpperCase();
  } else {
    str = str.toLowerCase();
  }
  activeEditor.edit((editBuilder) => {
    editBuilder.replace(activeEditor.selection, str);
  });
}

const PY_COMMANDS = [
  {
    command: "pudding.chars-2-pinyin-upper",
    // options: {
    //   style: "normal" as IPinyinStyle, // 普通风格，即不带声调。
    //   mode: "normal" as IPinyinMode,
    //   segment: false, // 启用分词 "nodejieba" | "segmentit" | "@node-rs/jieba"
    //   group: false, // 启用词组
    //   heteronym: false, // 返回多音字
    //   compact: false, // 如果设置为 true，则将多音字可能的各种组合排列后返回
    // },
    connector: "_",
    type: "upper",
    func: transform2Py,
  },
  {
    command: "pudding.chars-2-pinyin-lower",
    // options: {
    //   style: "normal" as IPinyinStyle, // 普通风格，即不带声调。
    //   mode: "normal" as IPinyinMode,
    //   segment: false, // 启用分词 "nodejieba" | "segmentit" | "@node-rs/jieba"
    //   group: false, // 启用词组
    //   heteronym: false, // 返回多音字
    //   compact: false, // 如果设置为 true，则将多音字可能的各种组合排列后返回
    // },
    connector: "_",
    type: "lower",
    func: transform2Py,
  },
];

const TS_COMMANDS = [
  {
    command: "pudding.s-2-t",
    options: { type: "traditional", language: "" },
  },
  {
    command: "pudding.t-2-s",
    options: { type: "simplified", language: "" },
  },
  {
    command: "pudding.s-2-t-tw",
    options: { type: "traditional", language: "zh_TW" },
  },
  {
    command: "pudding.t-2-s-tw",
    options: { type: "simplified", language: "zh_TW" },
  },
];

const debfunc = debounce(
  async (event: vscode.TextEditorSelectionChangeEvent) => {
    if (shouldCopy(event)) {
      const text = generateTextToCopy(event);
      await copyToClipboard(text);
    }
  },
  300
); // 這個debounce的時間很重要，400及以上的話，雙擊動作也會複製，這是我們不想要的

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("activate");
  // vscode.window.onDidChangeTextEditorSelection(debfunc);

  PY_COMMANDS.forEach((item) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        item.command,
        () => item.func(item.connector, item.type)
        // item.func(item.options, item.connector, item.type)
      )
    );
  });

  TS_COMMANDS.forEach((item) => {
    context.subscriptions.push(
      vscode.commands.registerTextEditorCommand(
        item.command,
        (textEditor: vscode.TextEditor) => {
          tsProcess(textEditor, item.options);
        }
      )
    );
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
