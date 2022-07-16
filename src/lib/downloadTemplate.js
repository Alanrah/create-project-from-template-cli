const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const download = require('download-git-repo');
const spinner = ora("下载中...");

async function downloadTemplate(folderName) {
    spinner.start();
    // 因为是快手的gitlab 所以第一次需要输入gitlab的用户名和密码
    await new Promise((resolve, reject) => {
        download (
            'https://github.com/antfu/vitesse.git',
            folderName,
            {clone: true},
            err => {
                if (err) {
                    spinner.fail();
                    console.log(chalk.red(`模板下载失败. ${err}`));
                    return reject(err);
                }
                // 结束加载图标
                spinner.succeed();
                console.log(symbols.success, chalk.green('模板下载完成'));
                resolve();
            }
          )
      })
}

module.exports = downloadTemplate;
