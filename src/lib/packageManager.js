// TODO：用来检测本机安装yarn或者npm
// from vue-cli/packages/@vue/cli-shared-utils/lib/env.js

const { execSync } = require('child_process');

let _hasYarn;
let _hasNpm;

exports.hasYarn = () => {
    if (_hasYarn != null) {
        return _hasYarn;
    }
    try {
        execSync('yarn --version', { stdio: 'ignore' });
        return (_hasYarn = true);
    } catch (e) {
        return (_hasYarn = false);
    }
}

exports.hasNpm = () => {
    if (_hasNpm != null) {
        return _hasNpm
    }
    try {
        execSync('npm --version', { stdio: 'ignore' });
        return (_hasNpm = true)
    } catch (e) {
        return (_hasNpm = false)
    }
}