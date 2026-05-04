/* ========== Petshop static — shared app logic ========== */
(function() {
  const STORAGE_KEY = 'petshop_cart_v1';

  // ---------- Cart store ----------
  const Cart = {
    items: [],
    listeners: [],
    load() {
      try {
        this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) { this.items = []; }
    },
    save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items)); this.emit(); },
    emit() { this.listeners.forEach(fn => fn(this.items)); },
    on(fn) { this.listeners.push(fn); fn(this.items); },
    add(productId, qty = 1) {
      const p = window.PETSHOP.getById(productId);
      if (!p) return;
      const ex = this.items.find(it => it.id === productId);
      if (ex) ex.qty += qty;
      else this.items.push({ id: productId, qty });
      this.save();
    },
    setQty(productId, qty) {
      const ex = this.items.find(it => it.id === productId);
      if (!ex) return;
      ex.qty = Math.max(0, qty);
      if (ex.qty === 0) this.items = this.items.filter(it => it.id !== productId);
      this.save();
    },
    remove(productId) {
      this.items = this.items.filter(it => it.id !== productId);
      this.save();
    },
    count() { return this.items.reduce((n, it) => n + it.qty, 0); },
    subtotal() {
      return this.items.reduce((s, it) => {
        const p = window.PETSHOP.getById(it.id);
        return s + (p ? p.price * it.qty : 0);
      }, 0);
    }
  };
  Cart.load();
  window.PETSHOP_CART = Cart;

  // ---------- Toast ----------
  let toastWrap = null;
  function toast(msg) {
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.className = 'toast-wrap';
      document.body.appendChild(toastWrap);
    }
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    toastWrap.appendChild(el);
    setTimeout(() => el.remove(), 2700);
  }
  window.PETSHOP_TOAST = toast;

  // ---------- Icons ----------
  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg>',
    search: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
    truck: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>',
    shield: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>',
    head: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 18 0v5a3 3 0 0 1-3 3h-1v-7h4"></path></svg>',
    rotate: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>',
    msg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 9.6l-5.4 4.9L18.2 22 12 18.2 5.8 22l1.6-7.5L2 9.6l7.1-.7L12 2z"/></svg>',
    starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l2.9 6.9L22 9.6l-5.4 4.9L18.2 22 12 18.2 5.8 22l1.6-7.5L2 9.6l7.1-.7L12 2z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    quote: '<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M3 21c3 0 6-2 6-6V9H3v6h3c0 1.5-1 3-3 3v3zm12 0c3 0 6-2 6-6V9h-6v6h3c0 1.5-1 3-3 3v3z"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
    flame: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    mountain: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
    package: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>',
    badgeCheck: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/><path d="m9 12 2 2 4-4"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'
  };
  window.PETSHOP_ICONS = ICONS;

  // ---------- Stars ----------
  function starsHTML(rating) {
    const full = Math.round(rating);
    let html = '<span class="stars">';
    for (let i = 0; i < 5; i++) html += i < full ? ICONS.star : ICONS.starOutline;
    html += '</span>';
    return html;
  }
  window.PETSHOP_STARS = starsHTML;

  // ---------- Promo bar ----------
  function renderPromoBar() {
    return `
      <div class="promo-bar">
        <div class="container">
          <div class="promo-bar__inner">
            <span class="promo-bar__item">${ICONS.truck} משלוח חינם בהזמנה מעל <span class="num">₪199</span></span>
            <span class="promo-bar__item promo-bar__item--sm">${ICONS.shield} אחריות מלאה <span class="num">30</span> יום</span>
            <span class="promo-bar__item promo-bar__item--md">${ICONS.head} תמיכה בעברית · ימים א׳–ה׳</span>
          </div>
        </div>
      </div>`;
  }

  // ---------- Logo ----------
  const LOGO_SVG = `
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="20" r="9" fill="#F97316" stroke="#0F3B2E" stroke-width="2"/>
      <ellipse cx="9" cy="9" rx="3" ry="4" fill="#0F3B2E"/>
      <ellipse cx="16" cy="6" rx="3" ry="4" fill="#0F3B2E"/>
      <ellipse cx="23" cy="9" rx="3" ry="4" fill="#0F3B2E"/>
      <ellipse cx="27" cy="16" rx="2.5" ry="3.5" fill="#0F3B2E"/>
    </svg>`;

  // ---------- Navbar ----------
  function renderNavbar(activePath) {
    const links = [
      { href: 'index.html', label: 'בית' },
      { href: 'products.html', label: 'כל המוצרים' },
      { href: 'bundles.html', label: 'ערכות' },
      { href: 'products.html?sort=discount', label: 'מבצעים' },
      { href: 'products.html?sort=rating', label: 'הכי מדורג' }
    ];
    const isActive = (href) => {
      const path = href.split('?')[0];
      return activePath === path;
    };
    return `
      <header class="nav">
        <div class="container">
          <div class="nav__inner">
            <a href="index.html" class="nav__logo">
              ${LOGO_SVG}
              <span class="nav__logo-text">פטשופ</span>
            </a>
            <nav class="nav__links">
              ${links.map(l => `<a href="${l.href}" class="nav__link ${isActive(l.href) ? 'is-active' : ''}">${l.label}</a>`).join('')}
            </nav>
            <form class="nav__search" action="products.html">
              <span class="nav__search-icon">${ICONS.search}</span>
              <input name="q" placeholder="חיפוש רתמות, צעצועים, ציוד…" />
            </form>
            <button class="nav__cart-btn" data-cart-open aria-label="עגלת קניות">
              ${ICONS.cart}
              <span class="nav__cart-count" data-cart-count hidden>0</span>
            </button>
          </div>
        </div>
      </header>`;
  }

  // ---------- Footer ----------
  function renderFooter() {
    const pay = ['Visa', 'Mastercard', 'Amex', 'Bit', 'PayPal', 'Apple Pay', 'Google Pay'];
    return `
      <footer class="footer">
        <div class="footer__signoff">
          <div class="container">
            <div class="footer__signoff-inner">
              <p><span class="italic">made for</span> dogs<span style="color:var(--orange)">.</span></p>
              <p><span class="italic">made by</span> us<span style="color:var(--orange)">.</span></p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="footer__cols">
            <section>
              <div class="nav__logo">${LOGO_SVG}<span class="nav__logo-text">פטשופ</span></div>
              <p style="margin-top:16px;font-size:14px;line-height:1.6;color:rgba(15,59,46,.75);">
                חנות ישראלית לציוד פרימיום לחיות מחמד. ציוד עמיד שעובר בדיקה אישית, מחירים הוגנים ושירות בעברית.
              </p>
              <div class="footer__socials">
                <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
                <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
              </div>
            </section>
            <section>
              <h4 class="footer__col-title">חנות</h4>
              <ul class="footer__list">
                <li><a href="products.html">כל המוצרים</a></li>
                <li><a href="products.html?sort=discount">מבצעים</a></li>
                <li><a href="products.html?sort=rating">הכי מדורג</a></li>
                <li><a href="products.html?category=harnesses-leashes">רתמות ורצועות</a></li>
                <li><a href="products.html?category=outdoor-gear">ציוד חוץ</a></li>
              </ul>
            </section>
            <section>
              <h4 class="footer__col-title">עזרה</h4>
              <ul class="footer__list">
                <li><a href="#">משלוחים והחזרות</a></li>
                <li><a href="#">מדריך מידות</a></li>
                <li><a href="#">שאלות נפוצות</a></li>
                <li><a href="#">אודות פטשופ</a></li>
                <li><a href="#">צרו קשר</a></li>
              </ul>
            </section>
            <section>
              <h4 class="footer__col-title">דברו איתנו</h4>
              <ul class="footer__list">
                <li><a href="mailto:hello@petshop.co.il">hello@petshop.co.il</a></li>
                <li>וואטסאפ: <span class="num">055-881-0183</span></li>
                <li>א׳–ה׳ <span class="num">9:00–18:00</span></li>
              </ul>
            </section>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="container">
            <div class="footer__bottom-inner">
              <ul class="footer__pay">${pay.map(m => `<li>${m}</li>`).join('')}</ul>
              <p class="footer__copy">© <span class="num">${new Date().getFullYear()}</span> פטשופ · כל הזכויות שמורות</p>
            </div>
          </div>
        </div>
      </footer>`;
  }

  // ---------- Cart drawer ----------
  function renderCartDrawer() {
    return `
      <div class="cart-drawer" id="cart-drawer" role="dialog" aria-label="עגלת קניות">
        <div class="cart-drawer__backdrop" data-cart-close></div>
        <div class="cart-drawer__panel">
          <div class="cart-drawer__header">
            <h2 class="cart-drawer__title">העגלה שלי</h2>
            <button class="cart-drawer__close" data-cart-close aria-label="סגירה">${ICONS.close}</button>
          </div>
          <div class="cart-drawer__body" id="cart-drawer-body"></div>
          <div class="cart-drawer__footer" id="cart-drawer-footer"></div>
        </div>
      </div>`;
  }

  function paintCart() {
    const fmt = window.PETSHOP.fmtPrice;
    const body = document.getElementById('cart-drawer-body');
    const foot = document.getElementById('cart-drawer-footer');
    if (!body || !foot) return;
    if (Cart.items.length === 0) {
      body.innerHTML = `<div class="cart-drawer__empty">העגלה ריקה.<br>אפשר לעיין ב<a href="products.html" style="color:var(--orange);font-weight:700;text-decoration:underline">קטלוג</a>.</div>`;
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = Cart.items.map(it => {
      const p = window.PETSHOP.getById(it.id);
      if (!p) return '';
      return `
        <div class="cart-line">
          <div class="cart-line__image"><img src="${p.img}" alt=""></div>
          <div class="cart-line__body">
            <div class="cart-line__title">${p.title}</div>
            <div class="cart-line__price">₪<span class="num">${fmt(p.price)}</span></div>
            <div class="cart-line__controls">
              <div class="qty-step">
                <button data-cart-dec="${p.id}" aria-label="הפחת">${ICONS.minus}</button>
                <span class="num">${it.qty}</span>
                <button data-cart-inc="${p.id}" aria-label="הוסף">${ICONS.plus}</button>
              </div>
              <button class="cart-line__remove" data-cart-remove="${p.id}">הסר</button>
            </div>
          </div>
        </div>`;
    }).join('');
    foot.innerHTML = `
      <div class="cart-drawer__total">
        <span>סך הכל</span>
        <strong>₪<span class="num">${fmt(Cart.subtotal())}</span></strong>
      </div>
      <a href="checkout.html" class="btn btn--primary btn--block btn--lg">לתשלום ${ICONS.arrow}</a>`;
  }

  function paintCartCount() {
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      const n = Cart.count();
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  function bindGlobal() {
    document.addEventListener('click', (e) => {
      const open = e.target.closest('[data-cart-open]');
      const close = e.target.closest('[data-cart-close]');
      const inc = e.target.closest('[data-cart-inc]');
      const dec = e.target.closest('[data-cart-dec]');
      const rem = e.target.closest('[data-cart-remove]');
      const add = e.target.closest('[data-add-to-cart]');
      if (open) { document.getElementById('cart-drawer').classList.add('is-open'); paintCart(); }
      if (close) document.getElementById('cart-drawer').classList.remove('is-open');
      if (inc) { Cart.setQty(inc.dataset.cartInc, (Cart.items.find(x => x.id === inc.dataset.cartInc)?.qty || 0) + 1); paintCart(); }
      if (dec) { Cart.setQty(dec.dataset.cartDec, Math.max(0, (Cart.items.find(x => x.id === dec.dataset.cartDec)?.qty || 0) - 1)); paintCart(); }
      if (rem) { Cart.remove(rem.dataset.cartRemove); paintCart(); }
      if (add) {
        e.preventDefault();
        const id = add.dataset.addToCart;
        const qty = parseInt(add.dataset.qty || '1', 10);
        Cart.add(id, qty);
        const p = window.PETSHOP.getById(id);
        toast(`✓ נוסף לעגלה: ${p?.title || ''}`);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const drawer = document.getElementById('cart-drawer');
        if (drawer) drawer.classList.remove('is-open');
      }
    });
    Cart.on(() => { paintCartCount(); });
  }

  // ---------- Mount layout ----------
  function mountLayout(opts = {}) {
    const activePath = opts.activePath || (location.pathname.split('/').pop() || 'index.html');
    document.body.insertAdjacentHTML('afterbegin',
      renderPromoBar() + renderNavbar(activePath));
    document.body.insertAdjacentHTML('beforeend',
      renderFooter() + renderCartDrawer());
    bindGlobal();
    paintCartCount();
  }

  window.PETSHOP_LAYOUT = { mountLayout, paintCart, paintCartCount, toast };
})();
