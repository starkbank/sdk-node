exports.randomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.futureDate = function (number) {
    let date = new Date();
    date.setDate(date.getDate() + number);
    return date.toISOString().substring(0, 10);
};

exports.futureDateTime = function (number) {
    let date = new Date();
    date.setDate(date.getDate() + number);
    return date.toISOString().replace("Z", "+00:00");
}

exports.randomDatetimeBetween = function (after, before) {
    after = new Date(after);
    before = new Date(before);
    if (after > before) {
        let tmp = after;
        after = before;
        before = tmp;
    }
    let delta = Math.abs(before - after);
    let date = new Date(after.getTime() + this.randomInt(0, delta));
    return date.toISOString().replace("Z", "+00:00");
}

exports.randomDateBetweenTwoDates =  function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
