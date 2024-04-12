function ucFirst(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function lcFirst(string) {
    return string[0].toLowerCase() + string.slice(1);
}

function getReturnedDataName(funcName) {
    const nameArr = Array.from(funcName);
    const startIdx = nameArr.findIndex(c => c === c.toUpperCase())
    let dataName = funcName.slice(startIdx);
    const endIdx = Array.from(dataName).findIndex((c, i) => c === c.toUpperCase() && i !== 0)
    if(endIdx !== -1) dataName = dataName.slice(0, endIdx);
    return dataName;
}


module.exports = {
    ucFirst,
    lcFirst,
    getReturnedDataName
};