const commander = require('commander');

commander
  .command('create <app-name>')
  .description('create a new project')
  .action((name) => {
      require('../lib/create')(name);
  })

commander.parse( process.argv ); //开始解析用户输入的命令


