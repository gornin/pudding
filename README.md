# 汉字处理助手

author: [gornin](https://github.com/gornin)

初衷：最近在做公司的一个国际化项目，简繁外语等字体的locale配置太恶心繁琐了。能提高一点效率，也算幸甚。

感谢：vscode、juejin社区、market里的vscode插件

## 支持快捷键

- `u`—— `uppercase` 大写
- `l`—— `lowercase` 小写
- `f`—— `traditional` 繁体
- `j`—— `simplified` 简体

```json
"keybindings": [
    {
    "command": "汉字转大写拼音",
    "key": "ctrl+shift+alt+u",
    "mac": "ctrl+alt+cmd+u",
    },
    {
    "command": "汉字转小写拼音",
    "key": "ctrl+shift+alt+l",
    "mac": "ctrl+alt+cmd+l",
    },
    {
    "command": "简体转繁体",
    "key": "ctrl+shift+alt+f",
    "mac": "ctrl+alt+cmd+f",
    },
    {
    "command": "繁体转简体",
    "key": "ctrl+shift+alt+j",
    "mac": "ctrl+alt+cmd+j",
    }
],
```

### 支持右键菜单
```json
"menus": {
    "editor/context": [
        "汉字->拼音大",
        "汉字->拼音小",
        "简->繁",
        "繁->简",
    ]
}
```