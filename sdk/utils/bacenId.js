let randomSource = 'abcdefghijklmnopqrstuvwxyz'.split('');
randomSource.forEach((c) => { randomSource.push(c.toUpperCase())});
'0123456789'.split('').forEach((c) => { randomSource.push(c.toUpperCase())});

exports.create = function (bankCode) {
    let now = new Date();
    let randomString = ''
    for (let i = 0; i < 11; i++) {
        randomString += randomSource[Math.floor(Math.random() * randomSource.length)]
    }
    return '{bankCode}{date}{randomString}'
        .replace('{bankCode}', bankCode)
        .replace('{date}',
            String(now.getFullYear()) +
            String(now.getMonth()).padStart(2, '0') +
            String(now.getDay()).padStart(2, '0') +
            String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0'))
        .replace('{randomString}', randomString)
}
