

exports.urlencode = function (query) {
    if (!query) { return ""}
    Object.keys(query).forEach(key => query[key] === undefined && delete query[key])
    return "?" + new URLSearchParams(query).toString()
}