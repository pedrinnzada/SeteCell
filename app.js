/* ==============================================
   SETECELL — app.js
   Carrinho, filtros, animações, contagem, form
=============================================== */

// ===== CURSOR PERSONALIZADO =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();


// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startCounters();
  }, 2000);
});


// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});


// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});


// ===== PRODUTOS DATA =====
const phones = [
  {
    id: 1, category: 'apple', emoji: '📱',
    name: 'iPhone 15 Pro', desc: '256GB · Titânio Natural · A17 Pro',
    price: 7499, oldPrice: 8299, badge: 'HOT', rating: 5
  },
  {
    id: 2, category: 'apple', emoji: '📱',
    name: 'iPhone 14', desc: '128GB · Azul · Câmera 12MP',
    price: 4299, oldPrice: 4799, badge: '-10%', rating: 5
  },
  {
    id: 3, category: 'samsung', emoji: '📱',
    name: 'Samsung Galaxy S24', desc: '256GB · 12GB RAM · Galaxy AI',
    price: 4199, oldPrice: 4999, badge: 'HOT', rating: 5
  },
  {
    id: 4, category: 'samsung', emoji: '📱',
    name: 'Samsung Galaxy A55', desc: '128GB · 8GB RAM · Câmera 50MP',
    price: 1399, oldPrice: 1999, badge: '-30%', rating: 4
  },
  {
    id: 5, category: 'xiaomi', emoji: '📱',
    name: 'Xiaomi 14T Pro', desc: '512GB · 12GB RAM · Leica Camera',
    price: 3899, oldPrice: 4299, badge: null, rating: 5
  },
  {
    id: 6, category: 'xiaomi', emoji: '📱',
    name: 'Redmi Note 13 Pro', desc: '256GB · 8GB RAM · 200MP Camera',
    price: 1649, oldPrice: 1899, badge: '-13%', rating: 4
  },
];

const accessories = [
  {
    id: 101, emoji: '🛡️',
    name: 'Capinha Premium Magsafe', desc: 'Compatível com iPhone 14/15 — silicone líquido',
    price: 89, oldPrice: 129, badge: null, rating: 5
  },
  {
    id: 102, emoji: '💎',
    name: 'Película 9H Anti-Reflexo', desc: 'Vidro temperado full cover para Samsung',
    price: 29, oldPrice: 49, badge: '-40%', rating: 4
  },
  {
    id: 103, emoji: '⚡',
    name: 'Carregador 65W GaN USB-C', desc: 'Carregamento rápido universal',
    price: 149, oldPrice: 199, badge: 'HOT', rating: 5
  },
  {
    id: 104, emoji: '🎧',
    name: 'Fone Bluetooth ANC Pro', desc: 'Cancelamento de ruído ativo · 40h bateria',
    price: 299, oldPrice: 449, badge: '-33%', rating: 5
  },
  {
    id: 105, emoji: '🔌',
    name: 'Cabo USB-C 240W 2m', desc: 'Carregamento ultra-rápido certificado',
    price: 39, oldPrice: 59, badge: null, rating: 4
  },
  {
    id: 106, emoji: '🔋',
    name: 'Power Bank 20.000mAh', desc: 'Carregamento wireless 15W + USB-C PD',
    price: 189, oldPrice: 249, badge: null, rating: 5
  },
];

function renderStars(n) {
  return Array.from({length:5}, (_,i) => `<span style="color:${i < n ? '#fbbf24':'rgba(255,255,255,0.15)'}"">★</span>`).join('');
}

function createProductCard(p) {
  const card = document.createElement('div');
  card.className = `product-card reveal ${p.category || ''}`;
  card.dataset.category = p.category || '';
  card.innerHTML = `
    <div class="product-img">
      ${p.badge ? `<div class="product-badge ${p.badge==='HOT'?'hot':''}">${p.badge}</div>` : ''}
      <span>${p.emoji}</span>
    </div>
    <div class="product-info">
      <div class="stars">${renderStars(p.rating)}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-price-row">
        <div>
          ${p.oldPrice ? `<div class="product-price-old">R$ ${p.oldPrice.toLocaleString('pt-BR')}</div>` : ''}
          <div class="product-price">R$ ${p.price.toLocaleString('pt-BR')}</div>
        </div>
      </div>
      <button class="btn-add" onclick="addToCart(${p.id}, '${p.name}', ${p.price}, '${p.emoji}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        Adicionar ao Carrinho
      </button>
    </div>
  `;
  return card;
}

// Render products
const productsGrid = document.getElementById('productsGrid');
phones.forEach(p => productsGrid.appendChild(createProductCard(p)));

const accessoriesGrid = document.getElementById('accessoriesGrid');
accessories.forEach(p => accessoriesGrid.appendChild(createProductCard(p)));


// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#productsGrid .product-card').forEach(card => {
      const matches = filter === 'todos' || card.dataset.category === filter;
      card.style.display = matches ? '' : 'none';
      if (matches) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      }
    });
  });
});


// ===== CARRINHO =====
let cart = {};

function addToCart(id, name, price, emoji) {
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { id, name, price, emoji, qty: 1 };
  }
  updateCart();
  showToast(`${name} adicionado!`);
}

function removeFromCart(id) {
  if (cart[id].qty > 1) {
    cart[id].qty--;
  } else {
    delete cart[id];
  }
  updateCart();
}

function updateCart() {
  const items = Object.values(cart);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  // Badge
  const countEl = document.getElementById('cartCount');
  countEl.textContent = count;
  countEl.classList.toggle('visible', count > 0);

  // Items list
  const cartItemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');

  if (items.length === 0) {
    cartItemsEl.innerHTML = '';
    cartItemsEl.appendChild(emptyEl);
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
  } else {
    emptyEl.style.display = 'none';
    footerEl.style.display = 'block';
    const existing = cartItemsEl.querySelectorAll('.cart-item');
    existing.forEach(e => e.remove());
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>R$ ${(item.price * item.qty).toLocaleString('pt-BR', {minimumFractionDigits:2})}</span>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="removeFromCart(${item.id})">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.emoji}')">+</button>
        </div>
      `;
      cartItemsEl.appendChild(el);
    });
  }

  document.getElementById('cartTotal').textContent =
    'R$ ' + total.toLocaleString('pt-BR', {minimumFractionDigits:2});
}

// Cart open/close
document.getElementById('cartBtn').addEventListener('click', () => {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
});
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// Checkout — enviar para WhatsApp
document.getElementById('checkoutBtn').addEventListener('click', () => {
  const items = Object.values(cart);
  if (!items.length) return;
  const total = items.reduce((s,i) => s + i.price * i.qty, 0);

  let msg = '🛍️ *Olá! Gostaria de finalizar meu pedido:*\n\n';
  items.forEach(item => {
    msg += `📱 *${item.name}*\n`;
    msg += `   Quantidade: ${item.qty}x\n`;
    msg += `   Valor: R$ ${(item.price * item.qty).toLocaleString('pt-BR', {minimumFractionDigits:2})}\n\n`;
  });
  msg += `💰 *Total: R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits:2})}*\n\n`;
  msg += 'Aguardo confirmação! 😊';

  const url = `https://wa.me/5531988077126?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});


// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}


// ===== CONTAGEM ANIMADA =====
function startCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('pt-BR');
    }
    requestAnimationFrame(update);
  });
}


// ===== COUNTDOWN =====
function updateCountdown() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);


// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // stagger children
      const children = e.target.querySelectorAll('.reveal');
      children.forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), i * 80);
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .section, .manutencao-section, .oferta-section').forEach(el => {
  revealObserver.observe(el);
});

// Delay-stagger for grid cards
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const cards = e.target.querySelectorAll('.product-card, .service-item, .info-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      cardObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.products-grid, .accessories-grid, .services-list, .contato-info').forEach(el => {
  el.querySelectorAll('.product-card, .service-item, .info-card').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  cardObserver.observe(el);
});


// ===== FORMULÁRIO CONTATO =====
document.getElementById('contatoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('formNome').value;
  const tel = document.getElementById('formTel').value;
  const assunto = document.getElementById('formAssunto').value;
  const msg = document.getElementById('formMsg').value;

  const assuntoTexts = {
    produto: 'comprar um produto',
    manutencao: 'manutenção',
    orcamento: 'solicitar orçamento',
    outro: 'outro assunto'
  };

  let wppMsg = `👋 *Olá! Meu nome é ${nome}.*\n\n`;
  wppMsg += `📌 Assunto: *${assuntoTexts[assunto] || assunto}*\n\n`;
  if (tel) wppMsg += `📞 Meu WhatsApp: ${tel}\n\n`;
  if (msg) wppMsg += `💬 Mensagem: ${msg}\n\n`;
  wppMsg += 'Aguardo retorno! 😊';

  const url = `https://wa.me/5531988077126?text=${encodeURIComponent(wppMsg)}`;
  window.open(url, '_blank');
  this.reset();
  showToast('Redirecionando para WhatsApp!');
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.style.color = '';
        if (l.getAttribute('href') === '#' + e.target.id) {
          l.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ===== EFEITO PARALLAX ORBS =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = 0.05 + i * 0.02;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
