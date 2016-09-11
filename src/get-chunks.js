const request = require('request');

module.exports = function (url, ua) {
    const data = [];
    const chunks = [];
    const startTime = Date.now();
    const options = {
        url : url,
        encoding: 'utf-8',
        gzip: true,
        headers: {
            'User-Agent': ua
        }
    };

    return new Promise((resolve, reject) => {
        const onResponse = ({headers = {}}) => {
            if (!headers['transfer-encoding']) {
                reject(new Error('Endpoint does not have chunked response, Transfer Encoding: chunked is not set'));
            }
            data.push([ Date.now() - startTime, 0 ]);
        };

        const onData = (chunk) => {
            var chunkLength = data[data.length - 1].length + chunk.length;
            data.push([ Date.now() - startTime, chunkLength ]);
            chunks.push([chunk.length, chunk]);
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