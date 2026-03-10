function orderFood(food) {
    console.log(`Order initiated for: ${food}`);
    
    // A more professional alert style
    alert(`🍽️ Excellent Choice!\n\nYour order for "${food}" has been sent to our kitchen in Delta Bazzar.`);
}

function eventOrder() {
    const phoneNumber = "917848961900"; // Country code + number
    const message = "Hi Street Food Hub! I'm interested in booking a bulk order for an event. Can you please share the details?";
    
    // This creates a professional WhatsApp link
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in a new tab
    window.open(whatsappURL, '_blank');
}

let currentReview = 0;
const reviews = document.getElementsByClassName('review-card');
const dots = document.getElementsByClassName('dot');

function showReview(n) {
    // Hide all reviews
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].classList.remove('active');
        dots[i].classList.remove('active');
    }
    // Show the selected one
    reviews[n].classList.add('active');
    dots[n].classList.add('active');
    currentReview = n;
}

function currentSlide(n) {
    showReview(n);
}

// Auto-slide every 5 seconds
setInterval(() => {
    currentReview++;
    if (currentReview >= reviews.length) currentReview = 0;
    showReview(currentReview);
}, 5000);

// REPLACE 'YOUR_API_KEY_HERE' with the actual key you got from OpenWeather
const API_KEY = 'b7066e5c7acb90795d6f1904c7b4d90e'; 
const CITY = 'Bhubaneswar'; // Your shop location

async function getSmartWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main.toLowerCase();
        
        updateWeatherUI(temp, condition);
    } catch (error) {
        console.log("Weather error:", error);
        document.getElementById('condition-display').innerText = "Weather unavailable";
    }
}

function updateWeatherUI(temp, condition) {
    const tempDisp = document.getElementById('temp-display');
    const condDisp = document.getElementById('condition-display');
    const foodRec = document.getElementById('food-recommendation');
    const reason = document.getElementById('weather-reason');
    const weatherBox = document.getElementById('weather-suggestion');

    tempDisp.innerText = `${temp}°C`;
    condDisp.innerText = condition;

    // THE SMART LOGIC
    if (condition.includes("rain")) {
        weatherBox.style.background = "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)"; // Rainy Gray
        foodRec.innerText = "Mood for Crispy Veg Rolls?";
        reason.innerText = "Nothing beats a hot, crunchy roll on a rainy day!";
    } else if (temp > 30) {
        weatherBox.style.background = "linear-gradient(135deg, #f12711 0%, #f5af19 100%)"; // Hot Orange
        foodRec.innerText = "Stay Cool with Cold Drinks!";
        reason.innerText = "It's a bit hot today! Beat the heat with our chilled beverages.";
    } else {
        weatherBox.style.background = "linear-gradient(135deg, #ff4d05 0%, #ff9d05 100%)"; // Signature Orange
        foodRec.innerText = "Perfect for Steamed Momos!";
        reason.innerText = "The weather is lovely for some fresh, hot dumplings.";
    }
}

// Start the check when the page loads
window.addEventListener('load', getSmartWeather);

function filterMenu() {
    // 1. Get the search input value
    const input = document.getElementById('menuSearch');
    const filter = input.value.toLowerCase();
    
    // 2. Get all menu cards
    const cards = document.getElementsByClassName('menu-card');

    // 3. Loop through cards and hide those that don't match
    for (let i = 0; i < cards.length; i++) {
        const title = cards[i].getElementsByTagName('h3')[0];
        const txtValue = title.textContent || title.innerText;
        
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            cards[i].style.display = ""; // Show
        } else {
            cards[i].style.display = "none"; // Hide
        }
    }
}

function filterCategory(category) {
    const cards = document.getElementsByClassName('menu-card');
    const buttons = document.getElementsByClassName('filter-btn');

    // 1. Update active button UI
    for (let btn of buttons) {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'All Items')) {
            btn.classList.add('active');
        }
    }

    // 2. Filter the cards
    for (let i = 0; i < cards.length; i++) {
        const itemCategory = cards[i].getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            cards[i].style.display = ""; // Show
        } else {
            cards[i].style.display = "none"; // Hide
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    
    // Toggle the .light-mode class
    body.classList.toggle('light-mode');
    
    // Save preference to LocalStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeBtn.innerText = '☀️'; // Change icon to Sun
    } else {
        localStorage.setItem('theme', 'dark');
        themeBtn.innerText = '🌙'; // Change icon to Moon
    }
}

// Check for saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('theme-toggle');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeBtn.innerText = '☀️';
    }
});

function validateForm(event) {
    event.preventDefault(); // Prevents page refresh
    
    let isValid = true;
    const name = document.getElementById('userName');
    const email = document.getElementById('userEmail');
    const message = document.getElementById('userMessage');
    
    // Simple Email Regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset Errors
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

    // Name Validation
    if (name.value.trim().length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        isValid = false;
    }

    // Email Validation
    if (!emailPattern.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Message Validation
    if (message.value.trim().length < 10) {
        showError('messageError', 'Message should be at least 10 characters');
        isValid = false;
    }

    if (isValid) {
        alert(`Success! Thank you, ${name.value}. We'll get back to you soon.`);
        document.getElementById('contactForm').reset();
    }
    
    return false;
}

function showError(id, msg) {
    const errorEl = document.getElementById(id);
    errorEl.innerText = msg;
    errorEl.style.display = 'block';
}

// 1. Data Object for all items (Zomato Style)
const fullMenuData = [
    { id: 1, name: "Steamed Momos", price: 80, category: "momos" },
    { id: 2, name: "Classic Veg Roll", price: 60, category: "rolls" },
    { id: 3, name: "Paneer Stick", price: 80, category: "chinese" },
    { id: 4, name: "Special Chowmein", price: 70, category: "chinese" },
    { id: 5, name: "Fried Momos", price: 90, category: "momos" },
    { id: 6, name: "Kurkure Momos", price: 120, category: "momos" }
];

let cart = [];

// 2. Cart Logic
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    // Show a small toast notification
    console.log(`${name} added to cart`);
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    cartList.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #333; padding:5px;">
                <span>${item.name}</span>
                <span>₹${item.price} <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">🗑️</button></span>
            </div>
        `;
    });
    cartTotal.innerText = `₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// 3. Modal Menu Logic
function openFullMenu() {
    const grid = document.getElementById('full-menu-grid');
    grid.innerHTML = ''; // Clear existing
    
    fullMenuData.forEach(item => {
        grid.innerHTML += `
            <div class="menu-card">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                    <button class="order-btn" onclick="addToCart('${item.name}', ${item.price})">Add to Cart +</button>
                </div>
            </div>
        `;
    });
    document.getElementById('menu-modal').style.display = "block";
}

function closeFullMenu() {
    document.getElementById('menu-modal').style.display = "none";
}

// 4. Payment Integration (Simulated)
function processPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = document.getElementById('cart-total').innerText;
    const confirmPay = confirm(`Total Amount: ${total}\n\nProceed to pay via UPI / Cash on Delivery?`);
    
    if (confirmPay) {
        // Here we link to WhatsApp with the full order details
        let orderSummary = "New Order Recieved:%0A";
        cart.forEach(item => orderSummary += `- ${item.name} (₹${item.price})%0A`);
        orderSummary += `%0ATotal: ${total}`;
        
        const phoneNumber = "917848961900";
        window.open(`https://wa.me/${phoneNumber}?text=${orderSummary}`, '_blank');
        
        cart = []; // Clear cart
        updateCartUI();
        toggleCart();
        alert("Order Confirmed! Receipt sent to WhatsApp.");
    }
}

// This uses a built-in browser beep to signal success
const context = new AudioContext();
const oscillator = context.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = 880; 
oscillator.connect(context.destination);
oscillator.start();
oscillator.stop(context.currentTime + 0.5);