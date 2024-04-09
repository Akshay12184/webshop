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

        let originalData = JSON.parse(localStorage.getItem('productData'));
        if (!originalData) {
            originalData = [];
        }

        const index = originalData.findIndex(item => item.name === editedProductName && parseFloat(item.price) === editedProductPrice);
        if (index !== -1) {
            originalData[index].name = editedProductName;
            originalData[index].price = editedProductPrice.toString();
            localStorage.setItem('productData', JSON.stringify(originalData));

            updateTable(originalData);
        }

        window.location.href = '/products.html';
    });
});

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
