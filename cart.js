
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(name, price) {
    cart.push({ name: name, price: price });

   
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

   
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between lh-sm";
        li.innerHTML = `
            <div>
                <h6 class="my-0">${item.name}</h6>
                <small class="text-body-secondary">1 pc</small>
            </div>
            <span class="text-body-secondary">$${item.price}</span>
        `;
        cartItems.appendChild(li);

        total += item.price;
    });

    cartTotal.textContent = `$${total}`;
}

function clearCart() {
    cart = [];                           
    localStorage.removeItem("cart");     
    updateCart();                       
}

window.onload = updateCart;

