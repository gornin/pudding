// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import pinyin from "pinyin";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "helloworld" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed
  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from HelloWorld!');
  // });
  // context.subscriptions.push(disposable);

  let disposable = vscode.commands.registerCommand(
    "cc2py.executeDefinitionProvider",
    function () {
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        return;
      }
      const { selection } = activeEditor;
      const selected = activeEditor.document.getText(selection);
      const pinyinArr = pinyin(selected, {
        style: "normal", // 普通风格，即不带声调。
        mode: "normal",
        segment: false, // 启用分词 "nodejieba" | "segmentit" | "@node-rs/jieba"
        group: false, // 启用词组
        heteronym: false, // 返回多音字
        compact: false, // 如果设置为 true，则将多音字可能的各种组合排列后返回
      });
      //   console.log(pinyinArr);
      const str = pinyinArr.toString().replaceAll(",", "_").toUpperCase();
      activeEditor.edit((editBuilder) => {
        editBuilder.replace(activeEditor.selection, str);
      });
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
