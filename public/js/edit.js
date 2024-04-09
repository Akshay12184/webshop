document.addEventListener('DOMContentLoaded', function() {
    const getUrlParameter = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const productName = getUrlParameter('name');
    const productPrice = parseFloat(getUrlParameter('price'));

    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = productPrice;

    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const editedProductName = document.getElementById('productName').value;
        const editedProductPrice = parseFloat(document.getElementById('productPrice').value);
        const editedProductImage = document.getElementById('productImage').value;
    
        if (!editedProductName || isNaN(editedProductPrice)) {
            alert('Please fill in product name and a valid price.');
            return;
        }
    
        updateProductInTable(editedProductName, editedProductPrice, editedProductImage);
    
        window.location.href = '/products.html';
    });
    
});

function updateProductInTable(productName, productPrice) {
    let originalData = JSON.parse(localStorage.getItem('productData')) || [];

    console.log('Original Data:', originalData);
    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);

    const index = originalData.findIndex(item => item.name === productName);

    console.log('Index:', index);

    if (index !== -1) {
        originalData[index].price = productPrice;

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
