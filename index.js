var commander = require( 'commander' );
const path = require('path');
const fs = require('fs');

commander
    .version(require('./package').version)
    .usage('<command> [options]')

commander
    .command('create <app-name>')
    .description('create a new project')
    .action((name) => {
        require('./src/lib/create.js')(name);
    })


commander.parse( process.argv ); //开始解析用户输入的命令

// 主入口文件利用commander监测终端输入命令时，触发相应的模块运行
// commandFileName = './src/command/' + process.argv[2] + '.js';
// if (fs.existsSync(path.resolve(commandFileName))) {
//     require(commandFileName); // 根据不同的命令转到不同的命令处理文件
// }
