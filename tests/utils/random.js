exports.randomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.futureDate = function (number) {
    let date = new Date();
    return date.setDate(date.getDate() + number);
};
