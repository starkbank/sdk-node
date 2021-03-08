exports.encode = function (params) {
  if (!params) {
    return '';
  }
  let queryString = '';
  let separator = '?';
  for (let key in params) {
    if (params[key]) {
      queryString += separator + key + '=' + encodeURIComponent(params[key]);
      separator = '&';
    }
  }
  return queryString;
};
