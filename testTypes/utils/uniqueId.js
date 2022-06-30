exports.uniqueId = function (k) {
  var count = 16;
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for (var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}