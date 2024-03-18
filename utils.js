const fs = require('fs');

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', function(err){
        if (err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    console.log('inside getPostData');
    return new Promise((resolve, reject) => {
        try {
            console.log('in try')
            let body = '';


            req.on('data', (chunk)=>{
                console.log('in dat');
                body += chunk.toString();
            })

            req.on('end', ()=> {
                console.log('in end');
                resolve(body);
            })
        } catch (error) {
            reject(error);
        }
    })
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function splitByLineBreaks(str) {
    if(str.indexOf('\n\n') !== -1) {
        str = str.split('\n\n');
    }  else if(str.indexOf('\r\n') !== -1) {
        str = str.split('\r\n\r\n');
    }
    return str
}

function formDataToObj(srcStr) {
    const parsedLikeEntries = srcStr.split('Content-Disposition: form-data; name=')
        .map( string => {
            const sliceINDEX = string.indexOf('------WebKitFormBoundary');
            let res = string.slice(0, sliceINDEX);

            if(res.length <= 1) return [];

            res = splitByLineBreaks(res);

            if(res[0]) res[0] = replaceAll(res[0],'"','')
            if(res[1]) res[1] = res[1].trim();

            console.log("res1:" + res[1])
            return res
        })
        .filter( pair => pair.length > 1 && pair[1].length > 0)

    const object = Object.fromEntries(parsedLikeEntries)

    return object;
}

function parseIntObj(parsedObj) {
    const resObj = {};

    for (const key in parsedObj) {
        if(parsedObj.hasOwnProperty(key) && typeof parsedObj[key] === 'string') {
            resObj[key] = parseInt(parsedObj[key]);
        }
    }

    return resObj;
}

module.exports = {
    writeDataToFile,
    replaceAll,
    getPostData,
    formDataToObj,
    parseIntObj
}