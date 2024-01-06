let cartItems = [];

// Define food items with IDs, names, prices, imgge, dec
const foodItems = [
  {
    id: 1,
    name: "Pizza",
    price: 10.99,
    image: "imgs/pizza.jpeg",
    dec: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.",
  },
  {
    id: 2,
    name: "Burger",
    price: 5.99,
    image: "imgs/burger.jpeg",
    dec: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.",
  },
  {
    id: 3,
    name: "Fries",
    price: 8.99,
    image: "imgs/fries.jpeg",
    dec: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.",
  },
];

// Function to update cart count in the header
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cartItems.length;
}

// Function to display food items in the menu section
function displayMenu() {
  const menuSection = document.getElementById("menu");
  menuSection.innerHTML = "";
  foodItems.forEach((item) => {
    const itemBox = document.createElement("div");
    itemBox.classList.add("item");
    const alreadyInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    const addButton = document.createElement("button");
    addButton.textContent = alreadyInCart ? "Added to Cart" : "Add to Cart";
    addButton.disabled = alreadyInCart;
    addButton.onclick = () => {
      if (!alreadyInCart) {
        addToCart(item.id);
        addButton.textContent = "Added to Cart";
        addButton.disabled = true;
        addButton.style.backgroundColor = "#555";
      }
    };

    itemBox.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
        <h1>${item.name}</h1>
        <p>$${item.price.toFixed(2)}</p>
        <h3>${item.dec}</h3>
      `;
    itemBox.appendChild(addButton);
    menuSection.appendChild(itemBox);
  });
}

// Function to handle adding items to the cart
function addToCart(itemId) {
  const selectedItem = foodItems.find((item) => item.id === itemId);
  if (selectedItem) {
    const existingItem = cartItems.find((item) => item.id === itemId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ ...selectedItem, quantity: 1 });
    }
    displayCart();
    updateCartCount(); // Update cart count when an item is added
  }
}

// Function to update cart count in the header
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const cartItemCount = document.getElementById("cart-item-count");

  cartCount.textContent = cartItems.length;
  cartItemCount.textContent = cartItems.length;
}

// Function to toggle cart visibility
function toggleCart() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("cart-open");
}

// Function to display cart with sliding animation
function displayCart() {
  const cart = document.getElementById("cart");
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let totalPrice = 0;

  if (cartItems.length > 0) {
    cart.classList.add("cart-open");
    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
        <div class="cnt-p">
          <span class="name">${item.name}</span>
          <div class="quantity">
          <h1 onclick="adjustQuantity(${item.id}, ${item.quantity - 1})">-</h1>
            <p>${item.quantity}</p>
            <h1 onclick="adjustQuantity(${item.id}, ${
        item.quantity + 1
      })">+</h1>
            </div>
            </div>
            <span class="price">$${(item.price * item.quantity).toFixed(
              2
            )}</span>
          <button onclick="removeItem(${item.id})">X</button>
          
        `;
      cartList.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });
  } else {
    cart.classList.remove("cart-open");
  }

  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
  updateCartCount();
}

// Function to handle quantity adjustments
function adjustQuantity(itemId, newQuantity) {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = parseInt(newQuantity);
    displayCart();
  }
}

// Function to handle item removal from the cart
function removeItem(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId);
  displayCart();
  updateCartCount();
  displayMenu(); // Update cart count when an item is removed
}

// Event listener to load menu and set up initial page state
document.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  updateCartCount();
});

// Function to toggle cart visibility
function toggleCart() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("cart-open");
}

// Add event listener to the cart icon for toggling cart visibility
document.getElementById("cart-icon").addEventListener("click", toggleCart);
