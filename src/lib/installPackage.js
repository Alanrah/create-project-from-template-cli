const chalk = require('chalk');
const shell = require('shelljs');
const { hasYarn} = require('./packageManager.js');
const path = require('path');
const fs = require('fs');

function updatePackageJson(folderName) {
    packageFilePath = path.resolve(__dirname, `../../${folderName}/package.json`);
    fs.readFile(packageFilePath, function(err,data){
        if (err) {
            return console.error(err);
        }
        let packageJson = JSON.parse(data.toString());
        packageJson.name = folderName;

        let writeData = JSON.stringify(packageJson, null, '\t');
        fs.writeFileSync(packageFilePath, writeData);
    });

}

async function installPackage(folderName) {
    try {
        await new Promise((resolve, reject) => {
            const packageWhich = hasYarn() ? 'yarn install' : 'npm install';
            shell.cd(folderName);
            if (shell.error()) {
                reject(`CD INTO FAIL`);
            }
            const cp = shell.exec(packageWhich, {
                async: true,
                silent: false,
            });
            cp.on('exit', code => {
                if (code === 0) {
                    // 更改模板的package.json的name
                    updatePackageJson(folderName);
                    resolve();
                } else {
                    reject(new Error(`SCRIPT EXECUTION FAIL`));
                }
            });
        });
    } catch (err) {
        throw err;
    }
}

module.exports = installPackage;
