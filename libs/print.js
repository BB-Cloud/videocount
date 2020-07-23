const pkg = require('../package')
const count = require('./caculate');

const print = {
    printHelp: (code) => {
        const lines = [
        '',
        '  Usage:',
        '    videocount [demo]',
        '',
        '  Options:',
        '    -v, --version             print the version of videocount',
        '    -h, --help                display this message',
        '    demo                      show the demo videos',
        '',
        '  Examples:',
        '    $ videocount demo',
        ''
        ]
    
        console.log(lines.join('\n'))
        process.exit(code || 0)
    },
    printVersion: () => {
        console.log('videocount ' + pkg.version)
        process.exit()
    },
    printResult: (v) => {
        count(v).then((results) => {
            console.log(results)
        }).catch((error) => {
            console.log('error', error)
        }).finally(() => {
            process.exit()
        });
    }
}

module.exports = print;