# 布丁助手

问题联系：[gornin](https://github.com/gornin)

初衷：最近在做公司的一个国际化项目，简繁外语等字体的locale配置太繁琐了，希望借助一个插件，能减少我拼写拼音的过程，帮我处理好简体字、繁体字的locale文件。vscode extension 真是挺赞👍

名称由来：`布丁`是儿子的小名～

感谢：vscode、juejin、market里的vscode插件

## 功能点

- 选中汉字转大写拼音，拼接 `_` ，单向操作
- 选中汉字转小写拼音，拼接 `_` ，单向操作
- 选中汉字 <strong>简繁互转</strong>，支持双向操作
- 选中文字可 <u>自动存入</u> 剪切板，可随即CV到别处

## 支持快捷键 keybindings

- `u`—— `uppercase` 大写
- `l`—— `lowercase` 小写
- `f`—— `traditional` 繁体
- `j`—— `simplified` 简体

```json
[
    {
        "command": "汉字转大写拼音",
        "win": "ctrl+shift+alt+u",
        "mac": "ctrl+alt+cmd+u",
    },
    {
        "command": "汉字转小写拼音",
        "win": "ctrl+shift+alt+l",
        "mac": "ctrl+alt+cmd+l",
    },
    {
        "command": "简体转繁体",
        "win": "ctrl+shift+alt+f",
        "mac": "ctrl+alt+cmd+f",
    },
    {
        "command": "繁体转简体",
        "win": "ctrl+shift+alt+j",
        "mac": "ctrl+alt+cmd+j",
    }
]
```

## 支持右键菜单 contextmenu

```json
{
    "editor/context": [
        "汉字->拼音 大",
        "汉字->拼音 小",
        "简->繁",
        "繁->简",
    ]
}
```