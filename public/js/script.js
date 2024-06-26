import { initApp, originalData } from './products.js';

initApp();

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

console.log(localStorage.getItem('productData'));
const productData = JSON.parse(localStorage.getItem('productData'));

const addDataToHTML = () => {
    const products = productData;

    if (products && products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
            newProduct.querySelector('.addCart').addEventListener('click', (event) => {
                event.stopPropagation();
                addToCart(product.id);
            });
        });
    }
}

addDataToHTML();




// everything that has to do with the cart and its logic
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
    const addToCart = (product_id) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        let positionProduct = productData.findIndex((value) => value.id == product_id);
    
        if (positionProduct >= 0) {
            let product = productData[positionProduct];
            if (product.amount <= 0) {
                console.log('Maximum amount reached for this product.');
                return;
            }
            if (cart.length <= 0) {
                cart = [{
                    product_id: product_id,
                    quantity: 1
                }];
            } else if (positionThisProductInCart < 0) {
                cart.push({
                    product_id: product_id,
                    quantity: 1
                });
            } else {
                cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
            }
            if (product.amount > 0) {
                productData[positionProduct].amount -= 1;
            }
            addCartToHTML();
            addCartToMemory();
        } else {
            console.log('Product not found.');
        }
    }

    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        let totalPrice = 0;
        if (cart.length > 0) {
            cart.forEach(item => {
                totalQuantity += item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;
    
                let positionProduct = productData.findIndex((value) => value.id == item.product_id);
                let info = productData[positionProduct];
                listCartHTML.appendChild(newItem);
    
                let price = parseFloat(info.price);
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">$${(price * item.quantity).toFixed(2)}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>  
                `;
                totalPrice += price * item.quantity;
            });
        }
    
        iconCartSpan.innerText = totalQuantity;
    
        let totalElement = document.createElement('div');
        totalElement.classList.add('total');
        totalElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
        listCartHTML.appendChild(totalElement);
    }
    
    const addCartToMemory = () => {
        localStorage.setItem('cartData', JSON.stringify(cart));
    }
    

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}


function showPopup() {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "block";
}


function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
}

function confirmPurchase() {
    cart = [];
    addCartToHTML();
    addCartToMemory();
    closePopup();
}

document.getElementById("confirmPurchaseButton").addEventListener("click", confirmPurchase);
document.getElementById("checkoutButton").addEventListener("click", showPopup);

initApp();
