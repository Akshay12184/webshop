let originalData = [];

const resetTable = (data) => {
    const table = document.getElementById('productTable');
    table.innerHTML = '';
    populateTable(data);
}

// Populates table with data 
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
            localStorage.setItem('productData', JSON.stringify(originalData)); // Change 'products' to 'productData'
            resetTable(originalData);
        });
        removeCell.appendChild(removeButton);
    });
}

// Gets the original data from the JSON file
const fetchOriginalData = () => {
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

const initapp = () => {
    const savedData = localStorage.getItem('productData');
    if (savedData) {
        originalData = JSON.parse(savedData);
        resetTable(originalData);
    } else {
        fetchOriginalData();
    }
}

// Resets local storage and displays original data 
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
        originalData.push(newProduct);
        localStorage.setItem('productData', JSON.stringify(originalData));
        resetTable(originalData);
        addProductForm.reset();
    });

    const resetButton = document.getElementById('fetchButton');
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('productData');
        fetchOriginalData();
    });
});


function updateProductInTable(productName, productPrice, productImage) {
    let originalData = JSON.parse(localStorage.getItem('productData')) || [];

    const productIndex = originalData.findIndex(product => product.name === productName);
    if (productIndex !== -1) {
        originalData[productIndex].price = productPrice;
        originalData[productIndex].image = productImage;

        localStorage.setItem('productData', JSON.stringify(originalData));
        resetTable(originalData);
    }
}

function triggerDataRefresh() {
    // Call the function to refresh product data
    refreshProductData(); // Assuming refreshProductData is defined somewhere in your script
}
