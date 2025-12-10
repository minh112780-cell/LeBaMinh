// Mock Data
const products = [
    {
        id: 1,
        name: "Pin Lithium-ion VinFast VF8 (Module)",
        type: "ev",
        category: "Phụ tùng Xe Điện",
        priceRetail: 15000000,
        priceWholesale: 12500000,
        image: "https://images.unsplash.com/photo-1620310237070-65dfa3641b9c?auto=format&fit=crop&w=500&q=60",
        isBestSeller: true
    },
    {
        id: 2,
        name: "Bộ Sạc Wallbox Tesla Home",
        type: "ev",
        category: "Phụ tải / Sạc",
        priceRetail: 12000000,
        priceWholesale: 9800000,
        image: "https://plus.unsplash.com/premium_photo-1682126104327-b755ce870d8e?auto=format&fit=crop&w=500&q=60",
        isBestSeller: false
    },
    {
        id: 3,
        name: "Dầu Nhớt Castrol GTX 20W-50",
        type: "traditional",
        category: "Dầu nhớt & Hóa chất",
        priceRetail: 450000,
        priceWholesale: 320000,
        image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3ad?auto=format&fit=crop&w=500&q=60",
        isBestSeller: true
    },
    {
        id: 4,
        name: "Bộ Lọc Gió K&N High Performance",
        type: "traditional",
        category: "Động cơ",
        priceRetail: 1800000,
        priceWholesale: 1450000,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=500&q=60",
        isBestSeller: false
    },
    {
        id: 5,
        name: "Đèn Bi-Laser Titan Platinum",
        type: "traditional",
        category: "Đèn / Ánh sáng",
        priceRetail: 8500000,
        priceWholesale: 6800000,
        image: "https://images.unsplash.com/photo-1550990867-b58cb5b3236e?auto=format&fit=crop&w=500&q=60",
        isBestSeller: true
    },
    {
        id: 6,
        name: "Vô Lăng Thể Thao Carbon Fiber",
        type: "traditional",
        category: "Nội thất",
        priceRetail: 5500000,
        priceWholesale: 4200000,
        image: "https://images.unsplash.com/photo-1594953921868-80988e401777?auto=format&fit=crop&w=500&q=60",
        isBestSeller: false
    },
    {
        id: 7,
        name: "Cảm Biến Áp Suất Lốp TPMS",
        type: "ev",
        category: "An toàn",
        priceRetail: 2200000,
        priceWholesale: 1600000,
        image: "https://images.unsplash.com/photo-1589134371694-5cb3cc5187e1?auto=format&fit=crop&w=500&q=60",
        isBestSeller: true
    },
    {
        id: 8,
        name: "Mâm Xe Hợp Kim AMG 19 inch",
        type: "traditional",
        category: "Ngoại thất",
        priceRetail: 25000000,
        priceWholesale: 21000000,
        image: "https://images.unsplash.com/photo-1611082329737-18451f28b261?auto=format&fit=crop&w=500&q=60",
        isBestSeller: false
    }
];

// State
let isLoggedIn = false;
let currentFilter = 'all';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const serviceSelect = document.getElementById('serviceType');
const timeEstimateDiv = document.getElementById('timeEstimate');
const estimatedTimeSpan = document.getElementById('estimatedTime');
const bookingForm = document.getElementById('bookingForm');

// Format Currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// Render Products
const renderProducts = () => {
    productGrid.innerHTML = '';

    // Filter logic
    const filteredProducts = products.filter(product => {
        const matchesFilter =
            currentFilter === 'all' ||
            (currentFilter === 'best-seller' && product.isBestSeller) ||
            product.type === currentFilter;

        const searchTerm = searchInput.value.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; color: #888; grid-column: 1/-1;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="tag ${product.type === 'ev' ? 'tag-ev' : 'tag-traditional'}">
                ${product.type === 'ev' ? 'EV' : 'Xăng/Dầu'}
            </span>
            <img src="${product.image}" alt="${product.name}" class="card-img">
            <div class="card-body">
                <div style="font-size: 0.9rem; color: #888; margin-bottom: 5px;">${product.category}</div>
                <h3 class="card-title">${product.name}</h3>
                <div class="price-box">
                    <p class="retail-price">Lẻ: <span style="color: white;">${formatPrice(product.priceRetail)}</span></p>
                    ${isLoggedIn ?
                `<p class="wholesale-price"><i class="fas fa-tag"></i> Sỉ: ${formatPrice(product.priceWholesale)}</p>` :
                `<p class="login-hint" onclick="toggleLogin()">Đăng nhập xem giá sỉ</p>`
            }
                </div>
                <button class="btn btn-primary" style="width: 100%; font-size: 0.9rem;">Thêm vào giỏ</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
};

// Toggle Login
window.toggleLogin = () => {
    isLoggedIn = !isLoggedIn;
    if (isLoggedIn) {
        loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> <span>Đăng xuất</span>';
        loginBtn.style.background = 'var(--secondary)';
    } else {
        loginBtn.innerHTML = '<i class="fas fa-user"></i> <span>Đăng nhập B2B</span>';
        loginBtn.style.background = 'var(--primary)';
    }
    renderProducts();
};

// Event Listeners
loginBtn.addEventListener('click', toggleLogin);

searchInput.addEventListener('input', renderProducts);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class
        filterBtns.forEach(b => {
            b.style.background = 'var(--bg-card)';
            b.style.color = 'white';
        });

        // Add active style (simple inline for logic)
        e.target.style.background = 'var(--primary)';
        e.target.style.color = 'black';

        currentFilter = e.target.dataset.filter;
        renderProducts();
    });
});

// Service Booking Logic
serviceSelect.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const time = selectedOption.dataset.time;

    if (time) {
        timeEstimateDiv.style.display = 'block';
        estimatedTimeSpan.textContent = time;
    } else {
        timeEstimateDiv.style.display = 'none';
    }
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Đã nhận yêu cầu đặt lịch! Nhân viên sẽ liên hệ xác nhận trong 5 phút.');
    bookingForm.reset();
    timeEstimateDiv.style.display = 'none';
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 5000);

// Init
renderProducts();
