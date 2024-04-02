let originalData = [];

const resetTable = () => {
    const table = document.getElementById('productTable');
    table.innerHTML = '';
    populateTable(originalData);
}

// Function to populate the table with data
// and 2 buttons 1 you can edit with and the other to remove 
const populateTable = (data) => {
    const table = document.getElementById('productTable');
    
    const headerRow = table.insertRow();
    for (const key in data[0]) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
        headerCell.style.backgroundColor = "lightgrey"
    }
    const editHeaderCell = headerRow.insertCell();
    editHeaderCell.textContent = 'Edit';
    editHeaderCell.style.backgroundColor = 'lightgrey';

    const removeHeaderCell = headerRow.insertCell();
    removeHeaderCell.textContent = 'Remove';
    removeHeaderCell.style.backgroundColor = 'lightgrey';

    data.forEach(item => {
        const row = table.insertRow();
        for (const key in item) {
            const cell = row.insertCell();
            cell.textContent = item[key];
        }

        const editCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.backgroundColor = 'blue';
        editButton.style.color = 'white';
        editButton.addEventListener('click', () => {
            window.location.href = "edit.html";
        }); 
        editCell.appendChild(editButton);

        const removeCell = row.insertCell();
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.backgroundColor = 'red';
        removeButton.style.color = 'white';
        removeButton.addEventListener('click', () => {
            const row = removeButton.parentNode.parentNode;
            row.remove();
        });
        removeCell.appendChild(removeButton);
    });
}

const initapp = () => {
    fetch('/info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            originalData = data;
            resetTable()
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    initapp();
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('fetchButton');
    button.addEventListener('click', resetTable);
});
