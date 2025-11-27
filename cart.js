
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(name, details, price) {
    cart.push({ name: name, details: details, price: price });

   
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartNum = document.getElementById("cart-number");

   
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;
    let items = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between lh-sm";
        li.innerHTML = `
            <div>
                <h6 class="my-0">${item.name}</h6>
                <small class="text-body-secondary">${item.details}</small>
            </div>
            <span class="text-body-secondary">$${item.price}</span>
        `;
        cartItems.appendChild(li);

        total += item.price;
        items += 1;
    });

    cartTotal.textContent = `$${total}`;
    cartNum.textContent = `${items}` ;
}

function clearCart() {
    cart = [];                           
    localStorage.removeItem("cart");     
    updateCart();                       
}

window.onload = updateCart;

