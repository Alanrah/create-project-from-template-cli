const fs = require('fs-extra');
const inquirer = require('inquirer');

function createFolder(name) {
    let projectName = name;
    console.log('创建项目文件夹……');
    if (!fs.existsSync(projectName)) {
        fs.mkdirSync(projectName);
    } else {
        let question = [
            {
                name: "name",
                type: 'input',
                message: "文件夹已存在，请重新输入项目名称",
            }
        ];
        inquirer
            .prompt(question).then(answers => {
                let { name } = answers;
                fs.mkdirSync(name);
                projectName = name;
            });
        }
    console.log('文件夹创建成功，开始加载项目模板……');
    return projectName;
}

module.exports = createFolder;
