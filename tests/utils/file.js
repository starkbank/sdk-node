exports.readFile = function (path) {
    const fs = require('fs');
    return fs.readFileSync(path);
}
