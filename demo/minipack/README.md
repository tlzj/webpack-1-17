# 使用babel实现一个简单的打包配置
 `https://segmentfault.com/a/1190000021606601`
 1. @babel/parser解析入口文件，获取AST
 2. 获取入口文件内容 通过 @babel/core 的 transformFromAst 方法，来解析入口文件内容
 3. 获取它所有的依赖模块 