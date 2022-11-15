# 安装

> [prettier安装链接]: https://www.prettier.cn/docs/install.html

```bash
# 执行安装命令
pnpm add prettier -D
```

在根目录下新建`.prettierrc.cjs`

```js
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 80,
  // 一个tab代表几个空格数，默认为80
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: false,
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: 'none',
  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true
}
```

# vscode相关配置

**1、安装 vscode 的 Prettier - Code formatter 插件**

![image-20221115083013142](.\images\image-20221115083013142.png)

安装该插件的目的是，让该插件在我们保存的时候自动完成格式化

**2、在`.vscode/settings.json`中添加一下规则**

```js
// 为了避免和 eslint 冲突，讲编辑器默认的代码检查规则关闭（如果开启了）
  "editor.formatOnSave": false,
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode"
```

**3、设置vscode默认格式化工具为prettier**

![image-20221115083525654](.\images\image-20221115083525654.png)

# 格式化所有文件

运行该命令，会将我们项目中的文件都格式化一遍，**后续如果添加其他格式的文件，可在该命令中添加，例如：`.scss`后缀的文件**

```js
scripts: {
  "format": "prettier --write \"./**/*.{html,vue,ts,js,cjs,json,md}\""
}

// 使用pnpm format格式化所有文件
```

# 解决`eslint`与`prettier`的冲突

[搞懂 ESLint 和 Prettier的冲突]: https://zhuanlan.zhihu.com/p/80574300

在理想的状态下，`eslint`与`prettier`应该各司其职。`eslint`负责我们的代码质量，`prettier`负责我们的代码格式。但是在使用的过程中会发现，由于我们开启了自动化的`eslint`修复与自动化的根据`prettier`来格式化代码。所以我们已保存代码，会出现屏幕闪一起后又恢复到了报错的状态。

这其中的根本原因就是`eslint`有部分规则与`prettier`冲突了，所以保存的时候显示运行了`eslint`的修复命令，然后再运行`prettier`格式化，所以就会出现屏幕闪一下然后又恢复到报错的现象。这时候你可以检查一下是否存在冲突的规则。

查阅资料会发现，社区已经为我们提供了一个非常成熟的方案，即`eslint-config-prettier` + `eslint-plugin-prettier`。

- eslint-plugin-prettier： 基于 prettier 代码风格的 eslint 规则，即 eslint 使用 pretter 规则来格式化代码。
- eslint-config-prettier： 禁用所有与格式相关的 eslint 规则，解决 prettier 与 eslint 规则冲突，**确保将其放在 extends 队列最后，这样它将覆盖其他配置**

```
pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

在 .eslintrc.json 中 extends 的最后添加一个配置

```js
{
    extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // 新增，必须放在最后面
    'plugin:prettier/recommended'
  ],
}
```

最后**重启 vscode**，你会发现冲突消失了，`eslint`与`prettier`也按照我们预想的各司其职了。

# 参考链接

[prettier官网]: https://www.prettier.cn/

[搞懂 ESLint 和 Prettier的冲突]: https://zhuanlan.zhihu.com/p/80574300