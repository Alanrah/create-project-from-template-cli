const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const shell = require('shelljs');
const createProjectFolder = require('./createProjectFolder.js');
const downloadTemplate = require('./downloadTemplate.js');
const installPackage = require('./installPackage.js');
const { hasYarn, hasNpm} = require('./packageManager.js');

const spinner = ora("下载中...");

async function createAPP(projectName) {
    // 创建文件夹
    let folderName = createProjectFolder(projectName);
    // 下载模板
    await downloadTemplate(folderName);
    // yarn / npm install
    await installPackage(folderName);

    console.log(chalk.green('\nTo get started'));
    console.log(chalk.green(`cd ${folderName}`));
    console.log(chalk.green(`${hasYarn ? 'yarn' : 'npm'} serve \n`));
}

function shellDeleteFolder(path) {
    console.log('删除新建文件夹');
    const cp = shell.exec(`rm -rf ${path}`, {
        async: true,
        silent: false,
    });
    cp.on('exit', code => {
        if (code === 0) {
            console.log('文件夹删除成功');
        } else {
            console.log(new Error('文件夹删除失败'));
        }
    });
}

module.exports = (...args) => {
    return createAPP(...args).catch(err => {
        spinner.fail();
        console.log(symbols.error, chalk.red(`项目创建失败. ${err}`));
        // 如果创建失败 就把现在这个文件夹删了
        if (fs.existsSync(path.resolve())) {
            shellDeleteFolder(path.resolve());
        }
    })
}

