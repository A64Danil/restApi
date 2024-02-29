function map(array, callback) {
    const result = [];
    for(let i = 0; i < array.length; i += 1) {
        result.push(callback(array[i]));
    }
    return result;
}

module.exports = {map};