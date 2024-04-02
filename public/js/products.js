let originalData = [];

const resetTable = (data) => {
    const table = document.getElementById('productTable');
    table.innerHTML = '';
    populateTable(data);
}

const populateTable = (data) => {
    const table = document.getElementById('productTable');
    
    const headerRow = table.insertRow();
    const headerKeys = Object.keys(data[0]);
    headerKeys.forEach(key => {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
        headerCell.style.backgroundColor = "lightgrey";
    });
    const editHeaderCell = headerRow.insertCell();
    editHeaderCell.textContent = 'Edit';
    editHeaderCell.style.backgroundColor = 'lightgrey';

    const removeHeaderCell = headerRow.insertCell();
    removeHeaderCell.textContent = 'Remove';
    removeHeaderCell.style.backgroundColor = 'lightgrey';

    data.forEach(item => {
        const row = table.insertRow();
        headerKeys.forEach(key => {
            const cell = row.insertCell();
            if (key === 'image') {
                const img = document.createElement('img');
                img.src = item[key];
                img.width = 50;
                img.height = 50;
                cell.appendChild(img);
            } else {
                cell.textContent = item[key];
            }
        });

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
            resetTable(originalData);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    initapp();

    const addProductForm = document.getElementById('addProductForm');
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];
    
        if (!productName || !productPrice || !productImage) {
            alert('Please fill in all fields and select an image.');
            return;
        }
    
        const newProduct = {
            name: productName,
            price: productPrice,
            image: URL.createObjectURL(productImage)
        };
        const newData = [...originalData];
        newData.push(newProduct);
    
        resetTable(newData);
    
        addProductForm.reset();
    });

    const resetButton = document.getElementById('fetchButton');
    resetButton.addEventListener('click', () => resetTable(originalData));
});
