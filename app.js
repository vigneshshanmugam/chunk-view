(function(doc) {
    const processChunk = '/process';
    const context = doc.getElementById('result').getContext('2d');
    const enterBtn = doc.getElementById('enter');
    const error = doc.querySelector('.error');

    enterBtn.addEventListener('click', () => {
        const endpoint = doc.querySelectorAll('.endpoint')[0].value;
        if (!endpoint) {
            return error.innerHTML = 'Please provide endpoint';
        }

        fetch(processChunk, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                endpoint: endpoint
            })
        }).then((response) => {
            if (!response.ok) {
                return response.text().then(message => {
                    throw Error(message);
                });
            }
            return response.json();
        })
        .then(({ result, chunks }) => {
            console.log(chunks[0]);
            var chart = new Chart(context, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Chunked Response',
                            data: result,
                            spanGaps: false,
                        }
                    ]
                },
                options: {
                    
                }
            });
        })
        .catch((message) => {
            error.innerHTML = message;
        });
        
    }, false);
})(window.document);