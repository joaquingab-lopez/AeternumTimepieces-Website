
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, details, price) {
    cart.push({ name, details, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();      
    updateNavbarCart(); 
}

function updateNavbarCart() {
    const cartNumNav = document.getElementById("cart-count");
    if (!cartNumNav) return;

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cartNumNav.textContent = storedCart.length;
}


function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartNum = document.getElementById("cart-number");
    const cartNav = document.getElementById("cart-count");

   
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
    cartNav.textContent =  `${items}` ;
}

function clearCart() {
    cart = [];                           
    localStorage.removeItem("cart");     
    updateCart();                       
}

function addedToCart() {
  alert("Item Added to Cart!");
}

/*window.onload = updateCart;*/

window.addEventListener("DOMContentLoaded", () => {
    // Always read latest cart from localStorage
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();       // update checkout page if present
    updateNavbarCart(); // update navbar badge
});


