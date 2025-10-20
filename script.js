// Smooth scroll and button animation setup
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log("Lumina Nabi website loaded successfully.");


// ----- SIGN UP -----
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      alert("This email is already registered!");
      return;
    }

    users[email] = { firstName, lastName, email, password, phone };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "signin.html";
  });
}

// ----- SIGN IN -----
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
      alert("No account found with this email!");
      return;
    }

    if (users[email].password !== password) {
      alert("Incorrect password!");
      return;
    }

    localStorage.setItem("loggedInUser", email);
    alert("Welcome, " + users[email].firstName + "!");
    window.location.href = "index.html";
  });
}

// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Product modal functionality
const products = document.querySelectorAll('.product-card');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close');
let selectedProduct = {};

if (products.length > 0) {
  products.forEach(product => {
    product.addEventListener('click', () => {
      selectedProduct = {
        name: product.dataset.name,
        price: parseFloat(product.dataset.price),
        image: product.dataset.image
      };
      
      document.getElementById('modalImage').src = selectedProduct.image;
      document.getElementById('modalName').textContent = selectedProduct.name;
      document.getElementById('modalPrice').textContent = `₱${selectedProduct.price}`;
      modal.style.display = 'flex';
    });
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};

// Add to cart
const addToCartBtn = document.getElementById('addToCart');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.name === selectedProduct.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...selectedProduct, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${selectedProduct.name} added to cart!`);
    modal.style.display = 'none';
  });
}

// Initialize cart count on page load
updateCartCount();

