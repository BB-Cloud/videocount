#!/usr/bin/env node

const printFunc = require('..').print

// 包的入口函数，里面对参数做剪裁处理，拿到入参并给予
// 不同入参的处理逻辑
function main(argv) {
  if (!argv || !argv.length) {
    printFunc.printHelp(1)
  }

  const getArg = function() {
    let args = argv.shift()

    args = args.split('=')
    if (args.length > 1) {
      argv.unshift(args.slice(1).join('='))
    }
    return args[0]
  }

  let arg

  while (argv.length) {
    arg = getArg()
    switch(arg) {
      case '-v':
      case '-V':
      case '--version':
        printFunc.printVersion();
        break
      case '-h':
      case '-H':
      case '--help':
        printFunc.printHelp();
        break
      default:
        // demo是示例
        if (arg.trim() === 'demo') {
          arg = './videos'
        }
        printFunc.printResult(arg);
        break
    }
  }

}

main(process.argv.slice(2))
module.exports = main