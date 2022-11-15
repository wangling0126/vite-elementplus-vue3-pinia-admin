# 安装husky


1. 安装依赖：

   ```
   pnpm add husky -D
   ```

2. 启动 `hooks` ， 生成 `.husky` 文件夹

   ![image-20221115103636271](.\images\image-20221115103636271.png)

3. 在 `package.json` 中生成 `prepare` 指令（ **需要 npm > 7.0 版本** ）

   ```
   npm set-script prepare "husky install"
   ```

![image-20221115103746160](.\images\image-20221115103746160.png)

4. 执行 `prepare` 指令

```
pnpm prepare
```



# 通过 pre-commit 检测提交时代码规范

1. 执行 `npx husky add .husky/pre-commit "npx eslint --ext .vue,.js,.ts,.jsx,.tsx src"` 添加 `commit` 时的 `hook` （npx eslint --ext .vue,.js,.ts,.jsx,.tsx src会在执行到该 hook 时运行）

2. 关闭 `VSCode` 的自动保存操作

   ![image-20221115104610485](.\images\image-20221115104610485.png)

3. 修改一处代码，使其不符合 `ESLint` 校验规则

   ![image-20221115104457587](.\images\image-20221115104457587.png)

4. 执行 git cz**提交操作** 会发现，抛出一系列的错误，代码无法提交

![image-20221115104907010](.\images\image-20221115104907010.png)

那么到这里位置，我们已经通过 `pre-commit` 检测到了代码的提交规范问题。

那么到这里就万事大吉了吗？

在这个世界上从来不缺的就是懒人，错误的代码格式可能会抛出很多的 `ESLint` 错误，让人看得头皮发麻。严重影响程序猿的幸福指数。

那么有没有办法，让程序猿在 0 配置的前提下，哪怕代码格式再乱，也可以 **”自动“** 帮助他修复对应的问题，并且完成提交呢？



# lint-staged 自动修复格式错误

我们通过 `pre-commit` 处理了 **检测代码的提交规范问题，当我们进行代码提交时，会检测所有的代码格式规范** 。

但是这样会存在两个问题：

1. 我们只修改了个别的文件，没有必要检测所有的文件代码格式
2. 它只能给我们提示出对应的错误，我们还需要手动的进行代码修改

那么想要处理这两个问题，就需要使用另外一个插件 [lint-staged](https://github.com/okonet/lint-staged) ！

在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快。