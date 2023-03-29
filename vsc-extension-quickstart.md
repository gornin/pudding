# Welcome to your VS Code Extension 欢迎来到你的VS Code扩展

## What's in the folder 文件夹里有什么

* This folder contains all of the files necessary for your extension.
* 此文件夹包含扩展所需的所有文件。

* `package.json` - this is the manifest file in which you declare your extension and command. 这是声明扩展名和命令的清单文件。
  * The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
  * 示例插件注册了一个命令，并定义了它的标题和命令名。有了这些信息，VS Code可以在命令面板中显示命令。它还不需要加载插件。
* `src/extension.ts` - this is the main file where you will provide the implementation of your command. 这是您将在其中提供命令实现的主文件。
  * The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`.
  * 该文件导出一个函数`activate`，它在您的扩展第一次被激活时被调用(在本例中通过执行该命令)。在`activate`函数中，我们调用`registerCommand`。
  * We pass the function containing the implementation of the command as the second parameter to `registerCommand`.
  * 我们将包含该命令实现的函数作为第二个参数传递给`registerCommand`

## Get up and running straight away 程序跑起来

* Press `F5` to open a new window with your extension loaded.
* 按“F5”打开一个加载了扩展的新窗口。

* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.
* 从命令面板中按下(`Ctrl+Shift+P`或`Cmd+Shift+P`在Mac上)并输入`Hello World`来运行命令。

* Set breakpoints in your code inside `src/extension.ts` to debug your extension.
* 在`src/extension.ts`内的代码中设置断点调试你的扩展。

* Find output from your extension in the debug console.
* 在调试控制台中查找扩展的输出。

## Make changes 更改

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* 在修改`src/extension.ts`中的代码后，可以从调试工具栏重新启动扩展。
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.
* 你也可以用你的扩展重新加载(`Ctrl+R`或`Cmd+R`在Mac上)VS Code窗口来加载你的更改。

## Explore the API 探索API

* You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.
* 当你打开文件`node_modules/@types/vscode/index.d.ts`时，你可以打开我们的API的完整集。

## Run tests 运行测试

* Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
* 打开调试视图(' Ctrl+Shift+D '或' Cmd+Shift+D '在Mac上)，从启动配置下拉菜单中选择'扩展测试'。

* Press `F5` to run the tests in a new window with your extension loaded.
* 按“F5”在加载扩展的新窗口中运行测试。

* See the output of the test result in the debug console.
* 在调试控制台中查看测试结果的输出。

* Make changes to `src/test/suite/extension.test.ts` or create new test files inside the `test/suite` folder.
* 对“src/test/suite/extension.test”进行修改或者在“test/suite”文件夹中创建新的测试文件。
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * 所提供的测试运行程序将只考虑与名称模式`**.test.ts`匹配的文件。
  * You can create folders inside the `test` folder to structure your tests any way you want.
  * 您可以在“test”文件夹中创建文件夹，以任何您想要的方式组织您的测试。

## Go further 进一步

* [Follow UX guidelines](https://code.visualstudio.com/api/ux-guidelines/overview) to create extensions that seamlessly integrate with VS Code's native interface and patterns.
* [Follow UX guidelines](https://code.visualstudio.com/api/ux-guidelines/overview)来创建与VS Code的本地界面和模式无缝集成的扩展。

 * Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
 * 使用[bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)减少扩展大小和提高启动时间

 * [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.
 * 在VS Code扩展市场上发布你的插件

 * Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
 * 设置自动化构建
