(function(doc) {
    const processChunk = '/process';
    const submitBtn = doc.getElementById('submit');
    const error = doc.querySelector('.error');

    function triggerGoogleChart(chartData) {
        error.innerHTML = '';
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            const data = new google.visualization.DataTable();
            data.addColumn('number', 'Time in ms');
            data.addColumn('number', 'Chunk length');
            data.addRows(chartData);

            const options = {
                chart: {
                    title: 'Chunked response lengths',
                },
                width: '100%',
                height: '100%'
            };
            const chart = new google.charts.Line(doc.getElementById('chart'));
            chart.draw(data, options);
        }
    }

    function drawChunks(chunks) {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Chunk Length');
        data.addColumn('string', 'Chunk Data');
        data.addRows(chunks);
        var table = new google.visualization.Table(document.getElementById('chunk'));
        const options = {
            showRowNumber: false, 
            allowHtml: true, 
            width: '100%', 
            height: '100%',
            sort: 'disable'
        };
        table.draw(data, options);
    }

    submitBtn.addEventListener('click', () => {
        const endpoint = doc.querySelectorAll('.endpoint')[0].value;
        if (!endpoint) {
            return error.innerHTML = 'Please enter the endpoint';
        }

        fetch(processChunk, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ endpoint: endpoint })
        }).then((response) => {
            if (!response.ok) {
                return response.text().then(message => {
                    throw Error(message);
                });
            }
            return response.json();
        })
        .then(({ data, chunks }) => {
            triggerGoogleChart(data);
            drawChunks(chunks);
        })
        .catch((message) => {
            error.innerHTML = message;
        });
        
    }, { passive: true });
})(window.document);