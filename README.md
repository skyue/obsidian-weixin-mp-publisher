# WeiXin MP Publisher

> **基于 [RanceLee 的 WeChat Publisher](https://github.com/RanceLee233/wechat-publisher) 修改而来。**

**在 Obsidian 里写作，一键发布到微信公众号。**

WeiXin MP Publisher 是一个 Obsidian 插件，让你在熟悉的写作环境里完成公众号排版，无需离开 Obsidian 就能发布。

[Obsidian公众号插件使用方法](https://www.skyue.com/weixin-mp-publisher.html)

## 插件访问说明

- 预览或推送草稿时，插件会读取当前笔记及其引用的本地图片。常规链接解析失败时，插件会按文件名在库内查找附件。
- 点击复制按钮或执行复制命令时，插件会写入系统剪贴板。插件不会主动读取剪贴板。

## 发布新版本

同步更新 `manifest.json`、`package.json` 和锁文件的版本号后，推送同名的纯数字版本 tag（例如 `1.2.10`）。GitHub Actions 会从该 tag 构建插件，为 Release 附件生成来源证明，并创建待检查的草稿 Release。
