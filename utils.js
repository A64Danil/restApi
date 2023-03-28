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

module.exports = {
    writeDataToFile,
    getPostData
}