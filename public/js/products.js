export const initApp = () => {

}
export let originalData = [];

document.addEventListener('DOMContentLoaded', () => {

    let originalData = [];

    const resetTable = (data) => {
        const table = document.querySelector('#productTable');
        console.log('Table:', table);
        if (!table) {
            console.error("Table element not found.");
            return;
        }
        table.innerHTML = "";
        populateTable(data);
    }

    // Populates table with data 
    const populateTable = (data) => { 
        const table = document.getElementById('productTable');
    
        if (!data || data.length === 0) {
            console.error("Data is empty or undefined.");
            return;
        }

        const headerKeys = Object.keys(data[0]);
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
                const queryParams = new URLSearchParams();
                Object.entries(item).forEach(([key, value]) => {
                    queryParams.append(key, value);
                });
                window.location.href = `edit.html?${queryParams.toString()}`;
            });
            editCell.appendChild(editButton);
    
            const removeCell = row.insertCell();
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.style.backgroundColor = 'red';
            removeButton.style.color = 'white';
            removeButton.addEventListener('click', () => {
                const index = originalData.indexOf(item);
                originalData.splice(index, 1);
                localStorage.setItem('productData', JSON.stringify(originalData));
                table.deleteRow(row.rowIndex);
            });
            removeCell.appendChild(removeButton);
        });
    }

    const fetchOriginalData = () => {
        const savedData = localStorage.getItem('productData');
        if (savedData) {
            originalData = JSON.parse(savedData);
            resetTable(originalData);
        } else {
            originalData = [];
            resetTable(originalData);
        }
    }

    const initApp = () => {
        const savedData = localStorage.getItem('productData');
        if (savedData) {
            originalData = JSON.parse(savedData); 
            resetTable(originalData);
        } else {
            fetchOriginalData();
        }
        console.log('updated data:', originalData);
    }
    

    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        if (!productName || !productPrice || !productImage) {
            alert('Please fill in all fields and select an image.');
            return;
        }

        const maxId = originalData.reduce((max, item) => Math.max(max, item.id), 0);
        const newId = maxId + 1;

        const newProduct = {
            id: newId,
            name: productName,
            price: productPrice,
            image: URL.createObjectURL(productImage)
        };
        originalData.push(newProduct);
        localStorage.setItem('productData', JSON.stringify(originalData));
        resetTable(originalData);
        addProductForm.reset();
    });

    const resetButton = document.getElementById('fetchButton');
    resetButton.addEventListener('click', () => {
        fetch('/info.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                originalData = data;
                localStorage.setItem('productData', JSON.stringify(originalData));
                resetTable(originalData);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    });
    initApp();
});
