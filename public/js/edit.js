document.addEventListener('DOMContentLoaded', function() {
    const getUrlParameter = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const productName = getUrlParameter('name');
    const productPrice = getUrlParameter('price');

    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = productPrice;

    const editProductForm = document.getElementById('editProductForm');
    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const editedProductName = document.getElementById('productName').value;
        const editedProductPrice = document.getElementById('productPrice').value;

        if (!editedProductName || !editedProductPrice) {
            alert('Please fill in product name and price.');
            return;
        }

        let originalData = JSON.parse(localStorage.getItem('productData'));
        if (!originalData) {
            originalData = [];
        }

        // Find the index of the product being edited
        const index = originalData.findIndex(item => item.name === productName && item.price === productPrice);
        if (index !== -1) {
            originalData[index].name = editedProductName;
            originalData[index].price = editedProductPrice;
            localStorage.setItem('productData', JSON.stringify(originalData));
        }

        window.location.href = '/products.html';
    });
});
