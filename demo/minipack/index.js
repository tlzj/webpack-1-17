// 这里是打包器相关代码
// 1.读取入口文件
const config = require('./minipack.config.js'); // 配置文件
// 入口
const entry = config.entry;
const fs = require('fs');
const content = fs.readFileSync(entry, 'utf-8');

// 2.使用@babel/parser解析代码，生成ast
const babelParser = require('@babel/parser');
const ast = babelParser.parse(content, {
  sourceType: 'module' // 代码应解析的模式 "script" "module" "unambiguous"
})

// 获取入口文件内容
const {transformFromAst} = require('@babel/core');
const { code } = transformFromAst(ast, null, {
  presets: ['@babel/preset-env'],
})

// 获取它所有的依赖模块 
// 1.定义一个依赖数组，用来存放 ast 中解析出的所有依赖
const dependencies = []
// 2.使用 @babel/traverse ，它和 babel 解析器配合使用，可以用来遍历及更新每一个子节点
const traverse = require('@babel/traverse').default;
traverse(ast, {
  // 遍历所有的 import 模块，并将相对路径放入 dependencies
  ImportDeclaration: ({node}) => {
    dependencies.push(node.source.value)
  }
})
console.log({
  dependencies,
  code,
})

// 3. 有效返回
return {
  dependencies,
  code,
}