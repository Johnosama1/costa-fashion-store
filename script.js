// ===== DATA =====
const products = [
  {
    id: 1,
    name: "معطف ترينش فاخر",
    price: "1,850 ر.س",
    category: "The Signature Collection",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=80",
    heroBg: "#EDE9E2",
    description: "معطف ترينش مصمم بدقة وعناية ليعكس الأناقة الخالدة. يتميز بقصة مريحة تمنحك حرية الحركة، مع نسيج عالي الجودة مقاوم للماء. تفاصيل مبسطة تجعله القطعة الأساسية في خزانتك لكل المواسم.",
    colors: [
      { id: "beige",   label: "بيج كلاسيكي", hex: "#D6D0C4" },
      { id: "black",   label: "أسود",         hex: "#222222" },
      { id: "charcoal",label: "رمادي داكن",   hex: "#4A4A4A" },
    ],
  },
  {
    id: 2,
    name: "جاكيت أوفرسايز",
    price: "1,200 ر.س",
    category: "The Casual Edit",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80",
    heroBg: "#E8E4DC",
    description: "جاكيت بقصة واسعة مريحة مصنوع من أقمشة ناعمة عالية الجودة. تصميم عصري يناسب الإطلالات اليومية بأسلوب راقٍ وبسيط في آنٍ واحد.",
    colors: [
      { id: "offwhite", label: "أوف وايت", hex: "#F0EDE6" },
      { id: "black",    label: "أسود",     hex: "#222222" },
    ],
  },
  {
    id: 3,
    name: "معطف صوفي كلاسيكي",
    price: "2,400 ر.س",
    category: "The Winter Edit",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=80",
    heroBg: "#D9D5CE",
    description: "معطف صوفي فاخر بخامة دافئة وقصة أنيقة تناسب أجواء الشتاء. يمنحك الدفء مع الحفاظ على الأناقة في أي مكان تذهب إليه.",
    colors: [
      { id: "camel", label: "كاميل",    hex: "#C4A882" },
      { id: "black", label: "أسود",     hex: "#222222" },
      { id: "grey",  label: "رمادي",   hex: "#9E9E9E" },
    ],
  },
  {
    id: 4,
    name: "بليزر مقلم أنيق",
    price: "980 ر.س",
    category: "The Office Collection",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80",
    heroBg: "#ECEAE6",
    description: "بليزر بتصميم مقلم يعكس الأناقة الكلاسيكية للمرأة العصرية. مثالي لإطلالات العمل أو الخروج المسائي مع ملمس قماش ممتاز.",
    colors: [
      { id: "stripe", label: "رمادي فاتح", hex: "#B0ABA3" },
      { id: "black",  label: "أسود",       hex: "#222222" },
    ],
  },
];

// ===== STATE =====
let cartCount = 0;
let currentPage = "home"; // "home" | "product"
let currentProductId = null;
let selectedSize = "M";
let selectedColor = null;

// ===== ROUTER =====
function getRoute() {
  const hash = window.location.hash || "#/";
  if (hash.startsWith("#/product/")) {
    return { page: "product", id: parseInt(hash.replace("#/product/", "")) };
  }
  return { page: "home" };
}

function navigate(path) {
  window.location.hash = path;
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);

// ===== MAIN RENDER =====
function render() {
  const route = getRoute();
  const app = document.getElementById("app");

  if (route.page === "product") {
    const product = products.find((p) => p.id === route.id) || products[0];
    currentProductId = product.id;
    selectedColor = product.colors[0].id;
    selectedSize = "M";
    app.innerHTML = renderProductPage(product);
    attachProductEvents(product);
  } else {
    app.innerHTML = renderHomePage();
    attachHomeEvents();
  }
}

// ===== ICONS (inline SVG) =====
const cartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

const arrowLeftIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`;

// ===== NAVBAR HTML =====
function navbarHTML(showLinks = true) {
  return `
    <nav class="navbar">
      <span class="navbar-logo" id="nav-logo">C O S T A</span>
      ${showLinks ? `
        <ul class="navbar-links" style="display:none;" id="desktop-links">
          <li><a href="#/">الكل</a></li>
          <li><a href="#/">الجديد</a></li>
          <li><a href="#/">العروض</a></li>
        </ul>
      ` : ""}
      <button class="cart-btn" id="cart-btn" title="السلة">
        ${cartIcon}
        ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ""}
      </button>
    </nav>
  `;
}

// ===== HOME PAGE =====
function renderHomePage() {
  const hero = products[0];
  return `
    ${navbarHTML(true)}

    <main class="page-enter">
      <!-- Hero -->
      <section class="hero">
        <img class="img-reveal" src="${hero.image}" alt="hero" />
        <div class="hero-overlay">
          <p class="hero-sub">كوليكشن 2025</p>
          <h1 class="hero-title">أناقة خالدة</h1>
          <button class="hero-cta" id="hero-shop-btn">
            <span>تسوق الآن</span>
            ${arrowIcon}
          </button>
        </div>
      </section>

      <!-- Products -->
      <section class="products-section">
        <div class="section-header">
          <h2 class="section-title">المنتجات المميزة</h2>
          <span class="section-count">${products.length} قطعة</span>
        </div>
        <div class="products-grid">
          ${products.map((p) => `
            <div class="product-card" data-product-id="${p.id}" style="cursor:pointer;">
              <div class="product-card-img" style="background:${p.heroBg};">
                <img src="${p.image}" alt="${p.name}" loading="lazy" />
                <div class="product-card-hover">عرض المنتج</div>
              </div>
              <p class="product-cat">${p.category}</p>
              <h3 class="product-name">${p.name}</h3>
              <p class="product-price">${p.price}</p>
            </div>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function attachHomeEvents() {
  document.getElementById("nav-logo")?.addEventListener("click", () => navigate("#/"));
  document.getElementById("hero-shop-btn")?.addEventListener("click", () => navigate("#/product/1"));

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-product-id");
      navigate(`#/product/${id}`);
    });
  });

  // Show desktop links on md+
  const links = document.getElementById("desktop-links");
  if (links && window.innerWidth >= 768) links.style.display = "flex";
}

// ===== PRODUCT PAGE =====
function renderProductPage(product) {
  selectedColor = product.colors[0].id;

  return `
    <div class="product-detail">
      <!-- Image -->
      <div class="product-image-area" style="background:${product.heroBg};">
        <img class="img-reveal" src="${product.image}" alt="${product.name}" />
      </div>

      <!-- Info -->
      <div class="product-info-area page-enter">
        ${navbarHTML(false)}

        <div style="height: 5rem;"></div>

        <button class="back-btn" id="back-btn">
          ${arrowLeftIcon}
          <span>العودة للمتجر</span>
        </button>

        <p class="product-collection">${product.category}</p>
        <h1 class="product-title">${product.name}</h1>
        <p class="product-detail-price">${product.price}</p>

        <!-- Colors -->
        <div>
          <div class="selector-label-row">
            <span class="selector-label">اللون</span>
            <span class="selector-value" id="color-label">${product.colors[0].label}</span>
          </div>
          <div class="color-swatches">
            ${product.colors.map((c, i) => `
              <button
                class="color-btn ${i === 0 ? "active" : ""}"
                data-color-id="${c.id}"
                data-color-label="${c.label}"
                title="${c.label}"
              >
                <span class="color-inner" style="background:${c.hex};"></span>
                <span class="color-ring"></span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Sizes -->
        <div>
          <div class="selector-label-row">
            <span class="selector-label">المقاس</span>
            <button style="font-family:Tajawal,sans-serif;font-size:0.75rem;color:#71717a;background:none;border:none;text-decoration:underline;cursor:pointer;text-underline-offset:4px;">دليل المقاسات</button>
          </div>
          <div class="sizes-grid">
            ${["XS","S","M","L","XL"].map((s) => `
              <button class="size-btn ${s === "M" ? "active" : ""}" data-size="${s}">${s}</button>
            `).join("")}
          </div>
        </div>

        <!-- Description -->
        <p class="product-description">${product.description}</p>

        <!-- CTA -->
        <button class="buy-btn" id="buy-btn">اشترِ الآن</button>

        <!-- Footer note -->
        <div class="footer-note">
          <span>توصيل مجاني</span>
          <span>إرجاع مجاني خلال 14 يوم</span>
        </div>
      </div>
    </div>
  `;
}

function attachProductEvents(product) {
  // Navbar logo
  document.getElementById("nav-logo")?.addEventListener("click", () => navigate("#/"));
  document.getElementById("back-btn")?.addEventListener("click", () => navigate("#/"));

  // Color buttons
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedColor = btn.getAttribute("data-color-id");
      const label = btn.getAttribute("data-color-label");
      const colorLabel = document.getElementById("color-label");
      if (colorLabel) colorLabel.textContent = label;
    });
  });

  // Size buttons
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.getAttribute("data-size");
    });
  });

  // Buy button
  const buyBtn = document.getElementById("buy-btn");
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      if (buyBtn.classList.contains("added")) return;
      cartCount++;
      buyBtn.textContent = "تمت الإضافة للسلة ✓";
      buyBtn.classList.add("added");

      // Update cart badge
      const cartBtn = document.getElementById("cart-btn");
      if (cartBtn) {
        let badge = cartBtn.querySelector(".cart-badge");
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "cart-badge";
          cartBtn.appendChild(badge);
        }
        badge.textContent = cartCount;
      }

      setTimeout(() => {
        buyBtn.textContent = "اشترِ الآن";
        buyBtn.classList.remove("added");
      }, 2200);
    });
  }
}
