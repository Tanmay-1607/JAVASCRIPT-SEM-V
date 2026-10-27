/**
 * BANDHAN ONLINE RAKHI STORE - CLIENT LOGIC
 * Includes: Product rendering, filtering, cart management, quick-view modal, and toast alerts.
 */

// 1. PRODUCT CATALOG DATA
const products = [
  {
    id: 1,
    name: "Royal Zardozi Rudraksha Rakhi",
    category: "designer",
    price: 499,
    originalPrice: 899,
    discount: "45% OFF",
    rating: 4.9,
    reviews: 142,
    badge: "Bestseller",
    badgeType: "gold",
    image: "images/rakhi1.jpg",
    description: "Handcrafted pure gold bullion thread embroidery centered with a sacred Nepal Rudraksha bead and cultured pearls. Symbolizes strength and long life."
  },
  {
    id: 2,
    name: "925 Pure Sterling Silver Evil Eye Rakhi",
    category: "silver",
    price: 999,
    originalPrice: 1599,
    discount: "38% OFF",
    rating: 5.0,
    reviews: 98,
    badge: "925 Silver",
    badgeType: "crimson",
    image: "images/rakhi2.jpg",
    description: "Certified 925 sterling silver filigree bracelet Rakhi with an auspicious protection Evil Eye stone. Can be worn as a timeless bracelet all year."
  },
  {
    id: 3,
    name: "Meenakari Kundan Floral Rakhi",
    category: "kundan",
    price: 599,
    originalPrice: 950,
    discount: "37% OFF",
    rating: 4.8,
    reviews: 84,
    badge: "Artisan Special",
    badgeType: "gold",
    image: "images/rakhi3.jpg",
    description: "Intricate Rajasthani floral Meenakari work studded with emerald green and ruby red faceted Kundan stones, strung on soft red silk resham cord."
  },
  {
    id: 4,
    name: "Shahi Celebration Rakhi & Sweet Hamper",
    category: "hamper",
    price: 1299,
    originalPrice: 1999,
    discount: "35% OFF",
    rating: 4.9,
    reviews: 215,
    badge: "Gift Box",
    badgeType: "gold",
    image: "images/rakhi4.jpg",
    description: "A luxury velvet gift trunk featuring an antique designer rakhi, 200g silver-foil Kaju Katli, 200g roasted dry fruits, brass pooja katoris & roli-chawal."
  },
  {
    id: 5,
    name: "Handcrafted Zari Brocade Bhaiya-Bhabhi Pair",
    category: "designer",
    price: 749,
    originalPrice: 1199,
    discount: "38% OFF",
    rating: 4.9,
    reviews: 67,
    badge: "Couple Set",
    badgeType: "crimson",
    image: "images/rakhi1.jpg",
    description: "Matching Bhaiya rakhi and hanging Lumba rakhi adorned with fine golden gota work, red crystal droplets and delicate latkan bells."
  },
  {
    id: 6,
    name: "Minimalist Silver Om Link Bracelet Rakhi",
    category: "silver",
    price: 1149,
    originalPrice: 1799,
    discount: "36% OFF",
    rating: 4.9,
    reviews: 52,
    badge: "Hallmarked",
    badgeType: "crimson",
    image: "images/rakhi2.jpg",
    description: "Sleek hallmarked sterling silver curb chain featuring a sacred engraved Om motif. Built for everyday wear and everlasting sibling memories."
  },
  {
    id: 7,
    name: "Navratna Peacock Kundan Rakhi",
    category: "kundan",
    price: 649,
    originalPrice: 999,
    discount: "35% OFF",
    rating: 4.8,
    reviews: 110,
    badge: "Traditional",
    badgeType: "gold",
    image: "images/rakhi3.jpg",
    description: "Royal peacock shaped pendant studded with uncut Polki stones and enamel feathers, tied with sacred mauli thread."
  },
  {
    id: 8,
    name: "Gourmet Dry Fruits & Silver Rakhi Gift Casket",
    category: "hamper",
    price: 1699,
    originalPrice: 2499,
    discount: "32% OFF",
    rating: 5.0,
    reviews: 89,
    badge: "Premium Box",
    badgeType: "gold",
    image: "images/rakhi4.jpg",
    description: "Complete festival box packed with organic California almonds, Afghani pistachios, Turkish cashews, pure silver rakhi and handwritten greeting."
  }
];

// 2. STATE MANAGEMENT
let cart = [];
let wishlist = new Set();
const FREE_SHIPPING_THRESHOLD = 999;

// DOM Elements
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCountBadge = document.getElementById('cartCount');
const cartItemCount = document.getElementById('cartItemCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const deliveryMsg = document.getElementById('deliveryMsg');
const progressFill = document.getElementById('progressFill');
const wishlistCountBadge = document.getElementById('wishlistCount');
const quickViewModal = document.getElementById('quickViewModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');
const toastNotification = document.getElementById('toastNotification');
const toastMsg = document.getElementById('toastMsg');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  initEventListeners();
});

// 4. RENDER PRODUCTS TO GRID
function renderProducts(items) {
  if (!productGrid) return;
  
  productGrid.innerHTML = items.map(product => {
    const isWished = wishlist.has(product.id);
    return `
      <div class="product-card" data-id="${product.id}">
        <span class="product-badge ${product.badgeType}">${product.badge}</span>
        <button class="wishlist-icon-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)" title="Save to wishlist">
          <i class="${isWished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
        </button>
        
        <div class="product-thumb">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="thumb-overlay">
            <button class="quick-view-btn" onclick="openQuickView(${product.id})">
              <i class="fa-regular fa-eye"></i> Quick View
            </button>
          </div>
        </div>

        <div class="product-body">
          <span class="product-category">${product.category.toUpperCase()}</span>
          <h3 class="product-name" title="${product.name}">${product.name}</h3>
          
          <div class="product-rating">
            <span>★ ${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>

          <div class="product-pricing">
            <span class="price">₹${product.price}</span>
            <span class="strike-price">₹${product.originalPrice}</span>
            <span class="off-percent">${product.discount}</span>
          </div>

          <div class="product-actions">
            <button class="add-cart-btn" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 5. FILTERING LOGIC
function initEventListeners() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      if (category === 'all') {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
      }
    });
  });

  // Cart Drawer open/close
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', () => toggleCart(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

  // Modal close
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeQuickView);
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

// 6. CART MANAGEMENT
function toggleCart(open) {
  if (open) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`Added "${item.name}" to cart! 🪔`);
  toggleCart(true);
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== productId);
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartUI();
  showToast("Item removed from cart");
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCountBadge.textContent = totalItems;
  cartItemCount.textContent = totalItems;
  cartSubtotal.textContent = `₹${subtotal}`;
  cartTotal.textContent = `₹${subtotal}`;

  // Free shipping progress calculation
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    deliveryMsg.innerHTML = "🎉 <strong>Congratulations!</strong> You unlocked FREE Express Delivery!";
    progressFill.style.width = '100%';
  } else {
    const diff = FREE_SHIPPING_THRESHOLD - subtotal;
    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    deliveryMsg.innerHTML = `Add <strong>₹${diff}</strong> more for <strong>FREE Express Shipping</strong>!`;
    progressFill.style.width = `${pct}%`;
  }

  // Render items list in drawer
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Your cart is empty!</p>
        <button class="btn btn-secondary" onclick="toggleCart(false)">Start Shopping</button>
      </div>
    `;
  } else {
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">₹${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }
}

// 7. WISHLIST TOGGLE
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast("Removed from wishlist");
  } else {
    wishlist.add(productId);
    showToast("Saved to your festive wishlist! ❤️");
  }

  wishlistCountBadge.textContent = wishlist.size;
  renderProducts(products);
}

// 8. QUICK VIEW MODAL
function openQuickView(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  modalContent.innerHTML = `
    <div class="modal-img-wrapper">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="modal-info-wrapper">
      <span class="product-category">${p.category.toUpperCase()} COLLECTION</span>
      <h2 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--primary-dark); margin: 6px 0 10px;">${p.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 12px;">
        <span>★ ${p.rating.toFixed(1)}</span>
        <span class="rating-count">(${p.reviews} verified sister reviews)</span>
      </div>

      <div class="product-pricing" style="margin-bottom: 16px;">
        <span class="price" style="font-size: 1.6rem;">₹${p.price}</span>
        <span class="strike-price">₹${p.originalPrice}</span>
        <span class="off-percent">${p.discount}</span>
      </div>

      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
        ${p.description}
      </p>

      <div style="background: #fff8eb; padding: 12px; border-radius: 8px; border: 1px dashed var(--festive-gold); margin-bottom: 20px; font-size: 0.85rem;">
        🎁 <strong>Festive Kit Included:</strong> Premium Roli Tika, Akshat Rice, and Gold Embossed Rakhi Card with every order.
      </div>

      <button class="btn btn-primary" onclick="addToCart(${p.id}); closeQuickView();" style="width: 100%;">
        <i class="fa-solid fa-cart-shopping"></i> Add To Cart • ₹${p.price}
      </button>
    </div>
  `;

  quickViewModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  quickViewModal.classList.remove('active');
  document.body.style.overflow = '';
}

// 9. TOAST NOTIFICATION
let toastTimer = null;
function showToast(message) {
  if (!toastNotification || !toastMsg) return;
  toastMsg.textContent = message;
  toastNotification.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastNotification.classList.remove('show');
  }, 3200);
}

// 10. CHECKOUT HANDLER
function handleCheckout() {
  if (cart.length === 0) {
    showToast("Please add at least one Rakhi before checking out!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  alert(`🎊 Thank you for celebrating Raksha Bandhan with Bandhan Store!\n\nOrder Total: ₹${total}\nIncluded: Free Roli-Chawal & Personal Message Card.\n\nProceeding to secure payment gateway...`);
  cart = [];
  updateCartUI();
  toggleCart(false);
}
