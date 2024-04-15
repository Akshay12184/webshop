document.addEventListener('DOMContentLoaded', function() {
    const getUrlParameter = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const productName = getUrlParameter('name');
    const productPrice = parseFloat(getUrlParameter('price'));

    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = productPrice;

    const editProductForm = document.getElementById('editProductForm');

    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const editedProductName = document.getElementById('productName').value;
        const editedProductPrice = parseFloat(document.getElementById('productPrice').value);

        if (!editedProductName || isNaN(editedProductPrice)) {
            alert('Please fill in product name and a valid price.');
            return;
        }

        updateProductInTable(productName, editedProductName, editedProductPrice);

        window.location.href = 'products.html';
    });
});

function updateProductInTable(oldProductName, newProductName, newProductPrice) {
    let originalData = JSON.parse(localStorage.getItem('productData')) || [];

    console.log('Original Data:', originalData);
    console.log('Old Product Name:', oldProductName);
    console.log('New Product Name:', newProductName);
    console.log('New Product Price:', newProductPrice);

    const index = originalData.findIndex(item => item.name === oldProductName);

    console.log('Index:', index);

    if (index !== -1) {
        originalData[index].name = newProductName;
        originalData[index].price = newProductPrice;

        localStorage.setItem('productData', JSON.stringify(originalData));

        console.log('Updated Original Data:', originalData);

        updateTable(originalData);
    }
}

function updateTable(data) {
    const table = document.getElementById('productTable');
    table.innerHTML = '';

    data.forEach(product => {
        const row = table.insertRow();
        const nameCell = row.insertCell();
        const priceCell = row.insertCell();

        nameCell.textContent = product.name;
        priceCell.textContent = `$${product.price}`;
    });
}
