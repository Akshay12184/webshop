const initApp = () => {
    fetch('/info.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        const table = document.getElementById('productTable');
        table.innerHTML = '';

        const headerRow = table.insertRow();
        for (const key in data[0]) {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = key;
        }

        data.forEach(item => {
            const row = table.insertRow();
            for (const key in item) {
                const cell = row.insertCell();
                cell.textContent = item[key];
            }
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

initApp();
