document.addEventListener('DOMContentLoaded', function() {
    const getUrlParameter = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const productName = getUrlParameter('name');
    const productPrice = getUrlParameter('price');
    const isEdit = getUrlParameter('edit');

    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = productPrice;

    const editProductForm = document.getElementById('editProductForm');
    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        if (!productName || !productPrice) {
            alert('Please fill in product name and price.');
            return;
        }

        console.log('Edited Product Name:', productName);
        console.log('Edited Product Price:', productPrice);
        console.log('Edited Product Image:', productImage);

        if (isEdit) {
            window.location.href = '/products.html?edit=true';
        } else {
            window.location.href = '/products.html';
        }
    });
});

