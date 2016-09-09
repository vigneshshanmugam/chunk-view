const request = require('request');

module.exports = function (url) {
    const data = [];
    const chunks = [];
    const startTime = Date.now();
    const options = {
        url : url,
        encoding: 'utf-8'
    };

    return new Promise((resolve, reject) => {
        const onResponse = ({headers = {}}) => {
            if (!headers['transfer-encoding']) {
                reject(new Error('Endpoint does not have chunked response'));
            }
            data.push({ time: Date.now() - startTime, length: 0 });
        };

        const onData = (chunk) => {
            var chunkLength = data[data.length - 1].length + chunk.length;
            data.push({ time: Date.now() - startTime, length: chunkLength});
            chunks.push(chunk);
        };

        const onEnd = () => {
            resolve({
                data: data,
                chunks: chunks
            });
        };

        const onError = (err) => reject(err);

        request.get(options)
            .on('response', onResponse)
            .on('data', onData)
            .on('end', onEnd)
            .on('error', onError);
    });
};