function ucFirst(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function lcFirst(string) {
    return string[0].toLowerCase() + string.slice(1);
}


module.exports = {
    ucFirst,
    lcFirst,
};