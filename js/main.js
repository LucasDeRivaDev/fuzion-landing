// =====================
// Nav mobile
// =====================
function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('hidden');
  }
  
  // =====================
  // Horarios (tabla)
  // =====================
  const schedule = {
    '08:00': { lun: 'FUNCIONAL', mar: 'BOXEO', mie: 'FUNCIONAL', jue: 'BOXEO', vie: 'FUNCIONAL' },
    '09:00': { lun: 'ZUMBA', mar: 'FUNCIONAL', mie: 'ZUMBA', jue: 'FUNCIONAL', vie: 'ZUMBA' },
    '10:00': { lun: 'STRETCHING', mar: 'ZUMBA KIDS', mie: 'STRETCHING', jue: 'ZUMBA KIDS', vie: 'STRETCHING' },
    '11:00': { lun: '', mar: 'GAP', mie: '', jue: 'GAP', vie: '' },
    '15:00': { lun: 'ZUMBA KIDS', mar: 'ACROTELAS', mie: 'ZUMBA KIDS', jue: 'ACROTELAS', vie: 'ZUMBA KIDS' },
    '16:00': { lun: 'GAP', mar: 'STRONG NATION', mie: 'GAP', jue: 'STRONG NATION', vie: 'GAP' },
    '17:00': { lun: 'STRETCHING', mar: 'STRETCHING', mie: 'STRETCHING', jue: 'STRETCHING', vie: 'STRETCHING' },
    '18:00': { lun: 'ZUMBA', mar: 'FUNCIONAL', mie: 'ZUMBA', jue: 'FUNCIONAL', vie: 'ZUMBA' },
    '19:00': { lun: 'BOXEO', mar: 'ZUMBA', mie: 'BOXEO', jue: 'ZUMBA', vie: 'BOXEO' },
    '20:00': { lun: 'FUNCIONAL', mar: 'GAP', mie: 'STRONG NATION', jue: 'GAP', vie: 'FUNCIONAL' },
    '21:00': { lun: 'STRONG NATION', mar: 'ACROTELAS', mie: 'ZUMBA', jue: 'STRETCHING', vie: 'STRONG NATION' },
  };
  
  const colorMap = {
    'ZUMBA': 'bg-magenta/20 text-magenta border-magenta/30',
    'ZUMBA KIDS': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'FUNCIONAL': 'bg-verde/20 text-verde border-verde/30',
    'STRETCHING': 'bg-violeta/20 text-violeta border-violeta/30',
    'BOXEO': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'STRONG NATION': 'bg-red-500/20 text-red-400 border-red-500/30',
    'ACROTELAS': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'GAP': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };
  
  function buildSchedule() {
    const tbody = document.getElementById('scheduleBody');
    if (!tbody) return;
  
    const days = ['lun', 'mar', 'mie', 'jue', 'vie'];
  
    Object.entries(schedule).forEach(function([hour, classes]) {
      const tr = document.createElement('tr');
      tr.className = 'border-t border-white/5';
  
      const tdHour = document.createElement('td');
      tdHour.className = 'p-2 text-white/40 text-xs font-medium whitespace-nowrap';
      tdHour.textContent = hour;
      tr.appendChild(tdHour);
  
      days.forEach(function(day) {
        const td = document.createElement('td');
        td.className = 'p-1.5 text-center';
        const cls = classes[day] || '';
  
        if (cls) {
          const colors = colorMap[cls] || 'bg-white/10 text-white/60 border-white/20';
          td.innerHTML = `<div class="schedule-cell ${colors} border rounded-lg px-2 py-2 text-xs font-medium cursor-default">${cls}</div>`;
        } else {
          td.innerHTML = `<div class="h-10"></div>`;
        }
        tr.appendChild(td);
      });
  
      tbody.appendChild(tr);
    });
  }
  
  buildSchedule();
  
  // =====================
  // Tienda tabs
  // =====================
  function filterTienda(cat) {
    const allItems = document.querySelectorAll('.producto-item');
    const tabs = document.querySelectorAll('.tienda-tab');
  
    allItems.forEach(function(item) {
      if (item.dataset.cat === cat) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  
    tabs.forEach(function(tab) {
      tab.classList.remove('bg-verde', 'text-oscuro');
      tab.classList.add('border', 'border-white/20', 'text-white/60');
    });
  
    const activeTab = document.getElementById('tab-' + cat);
    if (activeTab) {
      activeTab.classList.add('bg-verde', 'text-oscuro');
      activeTab.classList.remove('border', 'border-white/20', 'text-white/60');
    }
  }
  
  // Talles en tienda
  document.querySelectorAll('.producto-item').forEach(function(card) {
    card.dataset.selectedSize = '';
    const talleBtns = card.querySelectorAll('.talle-btn');
    talleBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        talleBtns.forEach(function(b) {
          b.classList.remove('border-verde', 'text-verde', 'bg-verde/10');
          b.classList.add('border-white/20', 'text-white/60');
        });
        btn.classList.add('border-verde', 'text-verde', 'bg-verde/10');
        btn.classList.remove('border-white/20', 'text-white/60');
        card.dataset.selectedSize = btn.textContent;
      });
    });
  });
  
  // Wishlist
  document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const active = btn.textContent === '♥';
      btn.textContent = active ? '♡' : '♥';
      btn.classList.toggle('text-magenta', !active);
      btn.classList.toggle('text-white', active);
    });
  });
  
  // =====================
  // Carrito
  // =====================
  let cart = [];
  let nextId = 1;
  
  function formatARS(v) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(v);
  }
  
  function addToCart(btn) {
    const card = btn.closest('.producto-item');
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);
    const size = card.dataset.selectedSize;
    const hasSizes = card.querySelectorAll('.talle-btn').length > 0;
  
    if (hasSizes && !size) {
      btn.textContent = 'Elegí un talle';
      btn.classList.add('border-magenta/40', 'text-magenta');
      setTimeout(function() {
        btn.textContent = 'Agregar al carrito';
        btn.classList.remove('border-magenta/40', 'text-magenta');
      }, 2000);
      return;
    }
  
    const key = name + (size ? '-' + size : '');
    const existing = cart.find(function(i) { return i.key === key; });
  
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: nextId++, key, name, price, size, qty: 1 });
    }
  
    renderCart();
    openCart();
  }
  
  function renderCart() {
    const el = document.getElementById('cartItems');
    const emptyEl = document.getElementById('cartEmpty');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('cartCheckout');
    const countEl = document.getElementById('cartCount');
  
    const totalQty = cart.reduce(function(a, i) { return a + i.qty; }, 0);
    const total = cart.reduce(function(a, i) { return a + i.price * i.qty; }, 0);
  
    countEl.textContent = totalQty;
    countEl.classList.toggle('hidden', totalQty === 0);
    totalEl.textContent = formatARS(total);
    checkoutBtn.disabled = totalQty === 0;
  
    const existing = el.querySelectorAll('.cart-row');
    existing.forEach(function(n) { n.remove(); });
  
    if (totalQty === 0) {
      emptyEl.classList.remove('hidden');
      return;
    }
  
    emptyEl.classList.add('hidden');
  
    cart.forEach(function(item) {
      const div = document.createElement('div');
      div.className = 'cart-row flex items-start justify-between gap-3 py-3 border-b border-white/5';
      div.innerHTML = `
        <div class="flex-1">
          <div class="text-sm font-medium text-white">${item.name}</div>
          ${item.size ? `<div class="text-xs text-white/40">Talle ${item.size}</div>` : ''}
          <div class="text-xs text-verde mt-1">${formatARS(item.price * item.qty)}</div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 rounded-full border border-white/20 text-white/60 hover:border-verde hover:text-verde text-xs transition-colors">−</button>
          <span class="text-sm text-white w-4 text-center">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 rounded-full border border-white/20 text-white/60 hover:border-verde hover:text-verde text-xs transition-colors">+</button>
        </div>
      `;
      el.appendChild(div);
    });
  }
  
  function changeQty(id, delta) {
    const item = cart.find(function(i) { return i.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(function(i) { return i.id !== id; });
    renderCart();
  }
  
  function openCart() {
    document.getElementById('cartDrawer').classList.remove('translate-x-full');
    document.getElementById('cartOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  function closeCart() {
    document.getElementById('cartDrawer').classList.add('translate-x-full');
    document.getElementById('cartOverlay').classList.add('hidden');
    document.body.style.overflow = '';
  }
  
  function checkout() {
    alert('¡Compra finalizada! (Demo — integrar MercadoPago en Semana 3)');
    cart = [];
    renderCart();
    closeCart();
  }
  
  renderCart();
  
  // =====================
  // Modals
  // =====================
  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = '';
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCart();
      closeModal('loginModal');
    }
  });
  
  // =====================
  // Animaciones scroll
  // =====================
  const fadeEls = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeEls.forEach(function(el) { observer.observe(el); });
  