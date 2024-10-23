import { addToCart } from "../../functions/functions.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".addCartBtn").forEach(button => {
        button.addEventListener("click", (e) => {
            const cartId = '671898b6ffad40be7c8c92ea';
            const productId = e.target.getAttribute('productId');
            const quantity = 1;

            addToCart(cartId, productId, quantity)
                .then(response => {
                    console.log('Item added:', response);
                })
                .catch(error => {
                    console.error('Error :', error);
                });
        });
    });
});