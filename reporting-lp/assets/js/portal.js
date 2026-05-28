/* NEIIA LP & GP Reporting — shared interactions */
(function () {
  const ICONS = {
    'home': '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    'menu': '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
    'x': '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
    'file': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    'folder': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'bar-chart': '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    'dollar-sign': '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'mail': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    'check': '<path d="m5 12 5 5L20 7"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    'alert-triangle': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'eye': '<path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'building': '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01"/><path d="M12 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/>',
    'credit-card': '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    'more-vertical': '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
    'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    'sparkles': '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    'handshake': '<path d="M11 17l2 2 4-4"/><path d="M7 13l-3-3 4-4 3 3"/><path d="M14 6l3 3-4 4-3-3"/><path d="M3 21l3-3"/><path d="M18 21l3-3"/>',
    'file-text': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
    'send': '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10A15 15 0 0 1 8 12 15 15 0 0 1 12 2Z"/>',
    'compass': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'printer': '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'
  };

  function icon(name, size) {
    size = size || 18;
    const path = ICONS[name] || '';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }

  const GP_NAV = [
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'home' },
    { id: 'funds', label: 'Funds', href: 'funds.html', icon: 'briefcase' },
    { id: 'lps', label: 'LPs', href: 'lps.html', icon: 'users' },
    { id: 'investor-browser', label: 'Investors', href: 'investor-browser.html', icon: 'globe' },
    { id: 'deal-terms', label: 'Deal terms', href: 'deal-terms.html', icon: 'handshake' },
    { id: 'capital-calls', label: 'Capital Activity', href: 'capital-calls.html', icon: 'dollar-sign' },
    { id: 'documents', label: 'Documents', href: 'documents.html', icon: 'folder' },
    { id: 'communications', label: 'Communications', href: 'communications.html', icon: 'message-square' },
    { id: 'calendar', label: 'Calendar', href: 'calendar.html', icon: 'calendar' },
    { id: 'post-report', label: 'Post report', href: 'post-report.html', icon: 'file-text' },
    { id: 'analytics', label: 'Analytics', href: 'analytics.html', icon: 'bar-chart' },
    { id: 'billing', label: 'Billing', href: 'billing.html', icon: 'credit-card' },
    { id: 'settings', label: 'Settings', href: 'settings.html', icon: 'settings' }
  ];

  const LP_NAV = [
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'home' },
    { id: 'deal-feed', label: 'Deal feed', href: 'deal-feed.html', icon: 'handshake' },
    { id: 'investments', label: 'My Investments', href: 'investments.html', icon: 'briefcase' },
    { id: 'capital-activity', label: 'Capital Activity', href: 'capital-activity.html', icon: 'dollar-sign' },
    { id: 'documents', label: 'Documents', href: 'documents.html', icon: 'folder' },
    { id: 'reports', label: 'Reports', href: 'reports.html', icon: 'bar-chart' },
    { id: 'messages', label: 'Messages', href: 'messages.html', icon: 'mail' },
    { id: 'calendar', label: 'Calendar', href: 'calendar.html', icon: 'calendar' },
    { id: 'billing', label: 'Billing', href: 'billing.html', icon: 'credit-card' },
    { id: 'profile', label: 'Profile', href: 'profile.html', icon: 'settings' }
  ];

  function renderSidebar(role, activeNav) {
    const nav = role === 'gp' ? GP_NAV : LP_NAV;
    const items = nav.map(function (n) {
      const active = n.id === activeNav ? ' active' : '';
      return '<a href="' + n.href + '" class="nav-item' + active + '">' + icon(n.icon, 18) + '<span>' + n.label + '</span></a>';
    }).join('');
    return (
      '<div style="padding:18px 18px 10px;">' +
        '<a href="../index.html" class="wordmark"><span class="wordmark-mark">N</span>NEIIA</a>' +
      '</div>' +
      '<nav style="display:flex;flex-direction:column;padding:6px 0;">' + items + '</nav>' +
      '<div class="sidebar-helper">' +
        '<div style="font-size:12px;color:var(--muted);margin-bottom:6px;">Need help?</div>' +
        '<a href="#" style="font-size:13px;color:var(--brand);font-weight:600;">Contact support</a>' +
      '</div>'
    );
  }

  function ensureUser(role) {
    let u = window.NEIIA_STATE.currentUser;
    if (!u) {
      u = role === 'gp' ? window.NEIIA_DATA.personas.gp[0] : window.NEIIA_DATA.personas.lp[0];
      window.NEIIA_STATE.currentUser = u;
    }
    return u;
  }

  function renderHeader(role) {
    const user = ensureUser(role);
    const notifs = window.NEIIA_DATA.notifications[role] || [];
    const notifList = notifs.map(function (n) {
      const dot = n.kind === 'amber' ? 'background:var(--amber);' : (n.kind === 'positive' ? 'background:var(--brand);' : 'background:#2563EB;');
      return (
        '<div class="dropdown-item" style="align-items:flex-start;flex-direction:column;gap:2px;padding:10px;">' +
          '<div style="display:flex;align-items:center;gap:8px;width:100%;">' +
            '<span style="width:8px;height:8px;border-radius:999px;' + dot + '"></span>' +
            '<span style="font-weight:600;color:var(--ink);font-size:13px;flex:1;">' + n.title + '</span>' +
          '</div>' +
          '<span style="font-size:12px;color:var(--muted);margin-left:16px;">' + n.when + '</span>' +
        '</div>'
      );
    }).join('');

    const userInitials = (user.initials || (user.name || '').split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2)).toUpperCase();
    const userName = user.name || 'Account';
    const userFirm = user.firm || user.type || '';

    let planPill;
    const D = window.NEIIA_DATA;
    if (role === 'gp') {
      const sub = (D && D.subscription) || { tierName: 'Growth', basePrice: 140, cycle: 'monthly' };
      const tierId = (window.NEIIA_STATE && window.NEIIA_STATE.gpTier) || sub.tier || 'growth';
      const tier = (D && D.pricing && D.pricing.tiers && D.pricing.tiers.gp.find(function (t) { return t.id === tierId; })) || { name: sub.tierName || 'Growth', monthly: sub.basePrice || 140 };
      const perMo = (D && D.perMonthForCycle) ? D.perMonthForCycle(tier.monthly, sub.cycle || 'monthly') : tier.monthly;
      planPill = '<a href="billing.html" class="hidden md:inline-flex" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:var(--brand-50);color:var(--brand);font-size:12px;font-weight:600;">' + icon('shield', 14) + tier.name + ' · $' + perMo + '/mo</a>';
    } else {
      const lpSub = (D && D.lpSubscription) || { basePrice: 100, cycle: 'monthly' };
      const perMo = (D && D.perMonthForCycle) ? D.perMonthForCycle(lpSub.basePrice || 100, lpSub.cycle || 'monthly') : (lpSub.basePrice || 100);
      planPill = '<a href="billing.html" class="hidden md:inline-flex" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:var(--brand-50);color:var(--brand);font-size:12px;font-weight:600;">' + icon('shield', 14) + 'Limited Partner · $' + perMo + '/mo</a>';
    }
    const growthPill = planPill;

    return (
      '<button id="hamburger" class="btn btn-ghost btn-sm md:hidden" style="padding:6px;">' + icon('menu', 20) + '</button>' +
      '<div class="search">' + icon('search', 18) + '<input type="text" placeholder="Search LPs, documents, funds…"></div>' +
      growthPill +
      '<div style="display:flex;align-items:center;gap:6px;margin-left:auto;">' +
        '<div class="dropdown" id="notif-dd">' +
          '<button class="btn btn-ghost btn-sm" style="padding:8px;position:relative;" onclick="Portal._toggleDropdown(event, \'notif-dd\')">' + icon('bell', 18) + '<span class="notif-dot"></span></button>' +
          '<div class="dropdown-menu" style="min-width:320px;">' +
            '<div style="padding:8px 10px;font-weight:700;color:var(--ink);font-size:13px;border-bottom:1px solid var(--border);">Notifications</div>' +
            notifList +
          '</div>' +
        '</div>' +
        '<div class="dropdown" id="profile-dd">' +
          '<button class="btn btn-ghost btn-sm" style="padding:4px 8px;gap:8px;" onclick="Portal._toggleDropdown(event, \'profile-dd\')">' +
            '<span class="avatar avatar-sm">' + userInitials + '</span>' +
            '<span class="hidden md:inline" style="font-weight:600;color:var(--ink);">' + userName.split(' ')[0] + '</span>' +
            icon('chevron-down', 14) +
          '</button>' +
          '<div class="dropdown-menu">' +
            '<div style="padding:10px 10px 8px;border-bottom:1px solid var(--border);">' +
              '<div style="font-weight:700;color:var(--ink);font-size:14px;">' + userName + '</div>' +
              '<div style="font-size:12px;color:var(--muted);">' + userFirm + '</div>' +
            '</div>' +
            '<a href="../signin.html" class="dropdown-item">' + icon('users', 16) + 'Switch role</a>' +
            '<div class="dropdown-item" onclick="Portal.signOut()">' + icon('log-out', 16) + 'Sign out</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function init(opts) {
    opts = opts || {};
    const role = opts.role || 'gp';
    const active = opts.activeNav || 'dashboard';
    window.NEIIA_STATE.role = role;
    ensureUser(role);

    const sb = document.getElementById('sb');
    const hdr = document.getElementById('hdr');
    if (sb) sb.innerHTML = renderSidebar(role, active);
    if (hdr) hdr.innerHTML = renderHeader(role);

    // Mobile hamburger
    const hb = document.getElementById('hamburger');
    if (hb && sb) hb.addEventListener('click', function () { sb.classList.toggle('open'); });

    // Click outside to close dropdowns
    document.addEventListener('click', function (e) {
      const dds = document.querySelectorAll('.dropdown.open');
      dds.forEach(function (dd) {
        if (!dd.contains(e.target)) dd.classList.remove('open');
      });
    });

    // Inject Apex AI floating button on every authenticated page
    if (opts.apex !== false) apexButton({ pageContext: opts.pageContext });
  }

  // === Apex AI ===
  function apexButton(opts) {
    opts = opts || {};
    if (document.getElementById('apex-fab')) return;
    const btn = document.createElement('button');
    btn.id = 'apex-fab';
    btn.className = 'apex-fab';
    btn.innerHTML = icon('zap', 22) + '<span class="apex-fab-label">Ask Apex</span>';
    btn.addEventListener('click', function () { openApexModal(opts.pageContext); });
    document.body.appendChild(btn);
  }

  function apexCannedReply(input, ctx) {
    const text = (input || '').toLowerCase();
    if (text.indexOf('irr') > -1) return "Sahel's weighted IRR is 17.5% across active funds. Growth Fund I sits at 19.4%; Tech Ventures at 14.1%. Both beat the 12.8% African PE benchmark.";
    if (text.indexOf('solara') > -1) return 'Solara Energy is your Series A+ exposure in Kenya. Revenue +71% YoY, gross margin 38%. Sahel owns 15.9% at a $22M valuation. Helios Energy Partners (London) leads the current extension.';
    if (text.indexOf('capital call') > -1 || text.indexOf('call #7') > -1) return 'Capital Call #7 is your $25K pro-rata into Solara Energy follow-on, due June 15. Strong unit economics support acknowledging in full.';
    if (text.indexOf('accept') > -1 || text.indexOf('counter') > -1) return 'Three things to check before accepting: anti-dilution scope, info rights cadence, and whether ROFR survives a down-round. I can draft a counter that tightens those.';
    if (text.indexOf('memo') > -1) return 'A deal memo will be auto-generated the moment both parties agree. It pulls GP/LP KYB, terms, and the negotiation history into one signed PDF.';
    if (text.indexOf('akwaaba') > -1) return 'Akwaaba Health is Sahel\'s healthtech bet. Series A at $15M pre-money, three-market footprint, gross margin 41%. Sahel proposes leading with $200K and a board seat.';
    if (ctx && ctx.dealId) {
      const d = (window.NEIIA_DATA.dealTerms || []).find(function (x) { return x.id === ctx.dealId; });
      if (d) return 'On ' + d.title + ': allocation $' + d.allocation.toLocaleString() + ' at $' + (d.valuation / 1e6).toFixed(0) + 'M pre-money via ' + d.instrument + '. Anti-dilution: ' + d.governance.antiDilution + '. My read — terms are within market for this vintage.';
    }
    return 'I can analyze deals, summarize portfolio metrics, draft counter-offers, or walk you through capital calls. Try asking about a specific deal or fund.';
  }

  function openApexModal(pageContext) {
    if (document.getElementById('apex-modal-bd')) return;
    const bd = document.createElement('div');
    bd.id = 'apex-modal-bd';
    bd.className = 'apex-modal-bd';
    const wrap = document.createElement('div');
    wrap.className = 'apex-modal';

    const stub = (window.NEIIA_DATA.apexConversations || []).slice();
    let activeId = stub[0] ? stub[0].id : null;
    function findThread(id) { return stub.find(function (t) { return t.id === id; }); }

    function renderList() {
      return stub.map(function (c) {
        const sel = c.id === activeId ? ' active' : '';
        return '<div class="apex-chat-item' + sel + '" data-id="' + c.id + '"><div class="apex-chat-title">' + c.title + '</div><div class="apex-chat-when">' + c.updated + '</div></div>';
      }).join('') + '<div class="apex-chat-item" id="apex-new"><div class="apex-chat-title" style="color:var(--brand);">+ New conversation</div></div>';
    }

    function renderConv() {
      const t = findThread(activeId);
      if (!t) return '<div style="padding:30px;text-align:center;color:var(--muted);">Start a conversation</div>';
      return t.messages.map(function (m) {
        const cls = m.from === 'apex' ? 'apex-msg apex-msg-apex' : 'apex-msg apex-msg-user';
        return '<div class="' + cls + '"><div class="apex-bubble">' + m.text + '</div></div>';
      }).join('');
    }

    wrap.innerHTML =
      '<div class="apex-header">' +
        '<div style="display:flex;align-items:center;gap:10px;"><span class="apex-mark">' + icon('zap', 16) + '</span><div><div style="font-weight:700;color:var(--ink);">Apex AI</div><div style="font-size:12px;color:var(--muted);">Your investment co-pilot</div></div></div>' +
        '<button class="btn btn-ghost btn-sm" id="apex-close" style="padding:6px;">' + icon('x', 18) + '</button>' +
      '</div>' +
      '<div class="apex-body">' +
        '<div class="apex-sidebar" id="apex-list">' + renderList() + '</div>' +
        '<div class="apex-pane">' +
          '<div class="apex-stream" id="apex-stream">' + renderConv() + '</div>' +
          '<form class="apex-input" id="apex-form">' +
            '<input id="apex-text" placeholder="Ask Apex about a deal, fund, or LP..." autocomplete="off">' +
            '<button class="btn btn-primary" type="submit">' + icon('send', 16) + '</button>' +
          '</form>' +
        '</div>' +
      '</div>';

    bd.appendChild(wrap);
    document.body.appendChild(bd);
    requestAnimationFrame(function () { bd.classList.add('open'); });

    function close() { bd.classList.remove('open'); setTimeout(function () { bd.remove(); }, 200); }
    bd.addEventListener('click', function (e) { if (e.target === bd) close(); });
    wrap.querySelector('#apex-close').addEventListener('click', close);

    function bindList() {
      wrap.querySelectorAll('.apex-chat-item[data-id]').forEach(function (it) {
        it.addEventListener('click', function () {
          activeId = it.dataset.id;
          wrap.querySelector('#apex-list').innerHTML = renderList();
          wrap.querySelector('#apex-stream').innerHTML = renderConv();
          bindList();
        });
      });
      const nb = wrap.querySelector('#apex-new');
      if (nb) nb.addEventListener('click', function () {
        const id = 'ax-' + Date.now();
        stub.unshift({ id: id, title: 'New conversation', updated: 'just now', messages: [{ from: 'apex', text: 'Hi — I am Apex. Ask me about deals, IRR, capital calls, or term sheets.' }] });
        activeId = id;
        wrap.querySelector('#apex-list').innerHTML = renderList();
        wrap.querySelector('#apex-stream').innerHTML = renderConv();
        bindList();
      });
    }
    bindList();

    wrap.querySelector('#apex-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const input = wrap.querySelector('#apex-text');
      const val = (input.value || '').trim();
      if (!val) return;
      const t = findThread(activeId);
      if (!t) return;
      t.messages.push({ from: 'user', text: val });
      input.value = '';
      const stream = wrap.querySelector('#apex-stream');
      stream.innerHTML = renderConv() + '<div class="apex-msg apex-msg-apex"><div class="apex-bubble apex-typing">Apex is thinking<span class="apex-dots">...</span></div></div>';
      stream.scrollTop = stream.scrollHeight;
      setTimeout(function () {
        t.messages.push({ from: 'apex', text: apexCannedReply(val, pageContext) });
        t.updated = 'just now';
        wrap.querySelector('#apex-stream').innerHTML = renderConv();
        wrap.querySelector('#apex-stream').scrollTop = wrap.querySelector('#apex-stream').scrollHeight;
      }, 800);
    });
  }

  // Inline Apex analysis panel (for deal pages, analytics)
  function apexPanel(ctx) {
    ctx = ctx || {};
    const bullets = ctx.bullets || [
      'Terms appear within market for this vintage and stage.',
      'Anti-dilution scope (broad-based) is investor-friendly.',
      'Consider negotiating quarterly info rights and ROFR survival on down-rounds.'
    ];
    return '<div class="apex-inline">' +
      '<div class="apex-inline-head">' +
        '<span class="apex-mark">' + icon('zap', 14) + '</span>' +
        '<span style="font-weight:700;color:var(--ink);">Apex AI says</span>' +
        '<span class="badge badge-green" style="margin-left:auto;">' + (ctx.title || 'Deal analysis') + '</span>' +
      '</div>' +
      '<ul class="apex-inline-list">' +
        bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
      '</ul>' +
      '<button class="btn btn-secondary btn-sm" onclick="Portal.openApex(' + (ctx.dealId ? "{dealId:'" + ctx.dealId + "'}" : '') + ')">Ask Apex a follow-up →</button>' +
    '</div>';
  }

  function signOut() {
    window.NEIIA_STATE.clear();
    window.location.href = '../signin.html';
  }

  function _toggleDropdown(e, id) {
    if (e && e.stopPropagation) e.stopPropagation();
    const all = document.querySelectorAll('.dropdown.open');
    const target = document.getElementById(id);
    all.forEach(function (d) { if (d !== target) d.classList.remove('open'); });
    if (target) target.classList.toggle('open');
  }

  function modal(opts) {
    opts = opts || {};
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    const mod = document.createElement('div');
    mod.className = 'modal';
    const titleHtml = opts.title ? '<div class="modal-title">' + opts.title + '</div>' : '';
    const bodyEl = document.createElement('div');
    bodyEl.className = 'modal-body';
    if (typeof opts.body === 'string') bodyEl.innerHTML = opts.body;
    else if (opts.body) bodyEl.appendChild(opts.body);

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    function close() {
      backdrop.classList.remove('open');
      setTimeout(function () { backdrop.remove(); }, 200);
    }

    if (opts.secondary) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.textContent = opts.secondary.label || 'Cancel';
      btn.onclick = function () {
        if (opts.secondary.onClick) opts.secondary.onClick();
        close();
      };
      actions.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn btn-ghost';
      btn.textContent = 'Cancel';
      btn.onclick = close;
      actions.appendChild(btn);
    }

    if (opts.primary) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.textContent = opts.primary.label || 'Confirm';
      btn.onclick = function () {
        const r = opts.primary.onClick ? opts.primary.onClick(close) : null;
        if (r !== false) close();
      };
      actions.appendChild(btn);
    }

    mod.innerHTML = titleHtml;
    mod.appendChild(bodyEl);
    mod.appendChild(actions);
    backdrop.appendChild(mod);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });
    document.body.appendChild(backdrop);
    requestAnimationFrame(function () { backdrop.classList.add('open'); });
    return { close: close };
  }

  function drawer(opts) {
    opts = opts || {};
    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    const dr = document.createElement('div');
    dr.className = 'drawer';
    if (opts.width) dr.style.width = opts.width;

    function close() {
      dr.classList.remove('open');
      backdrop.classList.remove('open');
      setTimeout(function () { dr.remove(); backdrop.remove(); }, 250);
    }

    const head = document.createElement('div');
    head.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;background:white;z-index:2;';
    head.innerHTML = '<div style="font-weight:700;font-size:16px;color:var(--ink);">' + (opts.title || '') + '</div><button class="btn btn-ghost btn-sm" style="padding:6px;" id="dr-close">' + icon('x', 18) + '</button>';
    dr.appendChild(head);

    const body = document.createElement('div');
    body.style.cssText = 'padding:20px;';
    if (typeof opts.body === 'string') body.innerHTML = opts.body;
    else if (opts.body) body.appendChild(opts.body);
    dr.appendChild(body);

    document.body.appendChild(backdrop);
    document.body.appendChild(dr);
    requestAnimationFrame(function () { backdrop.classList.add('open'); dr.classList.add('open'); });
    backdrop.addEventListener('click', close);
    head.querySelector('#dr-close').addEventListener('click', close);
    return { close: close, body: body };
  }

  // === Paywall (LP on-action add-on prompts) ===
  // Usage: Portal.paywall({ action: 'apex' | 'message' | 'download' | 'verify', onUnlock: function () { ... } })
  // Defensive infrastructure — still available for add-on gates (e.g. Apex, email).
  function paywall(opts) {
    opts = opts || {};
    const ACTION_MAP = {
      'apex':     { addon: 'apex',    title: 'Unlock Apex AI',       verb: 'use Apex AI for deal and portfolio analysis', price: 25, line: 'Apex AI is a context-aware co-pilot that analyzes deals, drafts counter-offers, and answers ad-hoc fund questions.' },
      'message':  { addon: 'email',   title: 'Unlock messaging',     verb: 'start new message threads with GPs', price: 30, line: 'New-message access ships with the Email integration add-on. Existing threads remain open without it.' },
      'download': { addon: 'storage', title: 'Unlock storage upgrade', verb: 'download large PDF reports', price: 20, line: 'Adds 20GB to your document vault. Stackable.' },
      'verify':   { addon: 'verify',  title: 'Unlock message verification', verb: 'verify sender + recipient identity on every message', price: 25, line: 'Identity verification on every inbound and outbound message.' }
    };
    const spec = ACTION_MAP[opts.action] || ACTION_MAP['apex'];

    const body = document.createElement('div');
    body.innerHTML =
      '<div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:14px;">' +
        '<span style="width:48px;height:48px;border-radius:12px;background:var(--brand-50);color:var(--brand);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">' + icon('shield', 24) + '</span>' +
        '<div>' +
          '<div style="font-weight:700;color:var(--ink);font-size:15px;">' + spec.title + '</div>' +
          '<div style="font-size:13px;color:var(--muted);margin-top:2px;">To ' + spec.verb + ', add the unlock to your plan.</div>' +
        '</div>' +
      '</div>' +
      '<div style="background:var(--brand-50);border:1px solid #B7E0C5;border-radius:10px;padding:14px;margin-bottom:8px;">' +
        '<div style="font-weight:700;color:var(--ink);">$' + spec.price + '/month</div>' +
        '<div style="font-size:13px;color:var(--body);margin-top:4px;">' + spec.line + '</div>' +
      '</div>' +
      '<div style="font-size:12px;color:var(--muted);">Cancel anytime. Pro-rated to next invoice.</div>';

    return modal({
      title: spec.title,
      body: body,
      primary: {
        label: 'Add to my plan ($' + spec.price + '/mo)',
        onClick: function (close) {
          window.NEIIA_STATE.activateLpAddon(spec.addon);
          toast(spec.title.replace('Unlock ', '') + ' add-on activated.', 'success');
          close();
          if (opts.onUnlock) opts.onUnlock();
        }
      },
      secondary: { label: 'Maybe later' }
    });
  }

  // === Calendar (book meetings) ===
  // Usage: Portal.calendar({ title, attendees, onBook: function(meeting) { ... } })
  function calendarPicker(opts) {
    opts = opts || {};
    let cur = new Date();
    cur.setDate(1);
    let pickedDate = null;
    let pickedSlot = null;

    const body = document.createElement('div');
    body.style.minWidth = '320px';

    function dim(d) { return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }); }
    function isoFor(d) { return d.toISOString().slice(0, 10); }
    function todayIso() { return new Date().toISOString().slice(0, 10); }
    function renderMonth() {
      const y = cur.getFullYear(), m = cur.getMonth();
      const firstDow = new Date(y, m, 1).getDay();
      const dim2 = new Date(y, m + 1, 0).getDate();
      const cells = [];
      for (let i = 0; i < firstDow; i++) cells.push('<div></div>');
      for (let d = 1; d <= dim2; d++) {
        const dateObj = new Date(y, m, d);
        const iso = isoFor(dateObj);
        const isPast = iso < todayIso();
        const isPick = pickedDate === iso;
        const cls = 'pcal-day' + (isPast ? ' pcal-past' : '') + (isPick ? ' pcal-picked' : '');
        cells.push('<button type="button" class="' + cls + '" data-iso="' + iso + '"' + (isPast ? ' disabled' : '') + '>' + d + '</button>');
      }
      let html =
        '<div class="pcal-head">' +
          '<button type="button" class="btn btn-ghost btn-sm pcal-nav" data-nav="-1">' + icon('chevron-left', 16) + '</button>' +
          '<div class="pcal-title">' + dim(cur) + '</div>' +
          '<button type="button" class="btn btn-ghost btn-sm pcal-nav" data-nav="1">' + icon('chevron-right', 16) + '</button>' +
        '</div>' +
        '<div class="pcal-dow"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div>' +
        '<div class="pcal-grid">' + cells.join('') + '</div>';

      if (pickedDate) {
        const slots = [];
        for (let h = 9; h < 17; h++) {
          ['00', '30'].forEach(function (mm) {
            const s = (h < 10 ? '0' : '') + h + ':' + mm;
            const sel = pickedSlot === s ? ' pcal-slot-sel' : '';
            slots.push('<button type="button" class="pcal-slot' + sel + '" data-slot="' + s + '">' + s + '</button>');
          });
        }
        html += '<div class="pcal-slots-title">Time slots — ' + pickedDate + '</div><div class="pcal-slots">' + slots.join('') + '</div>';
      }

      html +=
        '<div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
          '<div><label class="pcal-lbl">Platform</label><select id="pcal-pf" class="pcal-in"><option value="zoom">Zoom</option><option value="meet" selected>Google Meet</option><option value="teams">Microsoft Teams</option><option value="inperson">In-person</option></select></div>' +
          '<div><label class="pcal-lbl">Purpose</label><input id="pcal-purpose" class="pcal-in" placeholder="Settlement, intro call, …"></div>' +
          '<div style="grid-column:1/-1;"><label class="pcal-lbl">Agenda</label><textarea id="pcal-agenda" class="pcal-in" style="min-height:60px;" placeholder="Anything specific to cover?"></textarea></div>' +
        '</div>';

      body.innerHTML = html;
      body.querySelectorAll('.pcal-nav').forEach(function (b) {
        b.addEventListener('click', function () { cur = new Date(cur.getFullYear(), cur.getMonth() + parseInt(b.dataset.nav, 10), 1); pickedSlot = null; renderMonth(); });
      });
      body.querySelectorAll('.pcal-day').forEach(function (b) {
        b.addEventListener('click', function () { if (b.disabled) return; pickedDate = b.dataset.iso; pickedSlot = null; renderMonth(); });
      });
      body.querySelectorAll('.pcal-slot').forEach(function (b) {
        b.addEventListener('click', function () { pickedSlot = b.dataset.slot; renderMonth(); });
      });
    }
    renderMonth();

    return modal({
      title: opts.title || 'Schedule meeting',
      body: body,
      primary: {
        label: 'Confirm meeting',
        onClick: function (close) {
          if (!pickedDate || !pickedSlot) { toast('Pick a date and time slot', 'error'); return false; }
          const pf = body.querySelector('#pcal-pf') ? body.querySelector('#pcal-pf').value : 'meet';
          const purpose = (body.querySelector('#pcal-purpose') && body.querySelector('#pcal-purpose').value) || (opts.title || 'Meeting');
          const agenda = (body.querySelector('#pcal-agenda') && body.querySelector('#pcal-agenda').value) || '';
          const mid = 'NEIIA-MTG-' + Math.floor(Math.random() * 9000 + 1000);
          const link = pf === 'zoom' ? 'https://zoom.us/j/' + Math.floor(Math.random() * 9e9 + 1e9) :
                       pf === 'teams' ? 'https://teams.microsoft.com/l/' + mid :
                       pf === 'inperson' ? 'In-person · venue TBD' :
                       'https://meet.google.com/' + Math.random().toString(36).slice(2, 5) + '-' + Math.random().toString(36).slice(2, 6) + '-' + Math.random().toString(36).slice(2, 5);
          const mt = { id: mid, title: purpose || opts.title || 'Meeting', attendees: opts.attendees || ['You'], datetime: pickedDate + ' ' + pickedSlot + ' WAT', platform: pf === 'meet' ? 'Google Meet' : pf === 'zoom' ? 'Zoom' : pf === 'teams' ? 'Microsoft Teams' : 'In-person', link: link, agenda: agenda, dealMemoId: opts.dealMemoId || null };
          window.NEIIA_STATE.addMeeting(mt);
          toast('Meeting scheduled. Calendar invite sent to all parties.', 'success');
          if (opts.onBook) opts.onBook(mt);
          close();
        }
      },
      secondary: { label: 'Cancel' }
    });
  }

  // === Contact picker (autocomplete from past contacts) ===
  // Usage: Portal.openContactPicker({ role, userId, onPick: function (contact) { ... } })
  function openContactPicker(opts) {
    opts = opts || {};
    const role = opts.role || (window.NEIIA_STATE.role || 'lp');
    const userId = opts.userId || (window.NEIIA_STATE.currentUser && window.NEIIA_STATE.currentUser.id);
    const contacts = (window.NEIIA_DATA.contactsFor && window.NEIIA_DATA.contactsFor(role, userId)) || [];

    const body = document.createElement('div');
    body.innerHTML =
      '<input id="cp-search" placeholder="Search by name, firm, or role…" autofocus style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;margin-bottom:10px;">' +
      '<div id="cp-list" style="max-height:320px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;"></div>' +
      '<div style="font-size:12px;color:var(--muted);margin-top:10px;">Showing contacts you have messaged, met, or transacted with. Empty if this is your first interaction.</div>';

    function render(query) {
      const q = (query || '').toLowerCase();
      const list = contacts.filter(function (c) {
        if (!q) return true;
        return (c.name + ' ' + c.firm + ' ' + (c.source || '') + ' ' + (c.role || '')).toLowerCase().indexOf(q) > -1;
      });
      body.querySelector('#cp-list').innerHTML = list.length ? list.map(function (c) {
        return '<div class="cp-row" data-id="' + c.id + '" style="padding:10px 12px;border-bottom:1px solid #F1F5F9;display:flex;gap:10px;align-items:center;cursor:pointer;">' +
          '<span class="avatar avatar-sm">' + (c.initials || '?') + '</span>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-weight:600;color:var(--ink);font-size:13px;">' + c.name + '</div>' +
            '<div style="font-size:12px;color:var(--muted);">' + (c.firm || '') + (c.role ? ' · ' + c.role : '') + (c.source ? ' · ' + c.source : '') + '</div>' +
          '</div>' +
        '</div>';
      }).join('') : '<div style="padding:24px;text-align:center;color:var(--muted);">No matching contacts. Type a name to add a new recipient.</div>';
      body.querySelectorAll('.cp-row').forEach(function (r) {
        r.addEventListener('click', function () {
          const c = contacts.find(function (x) { return x.id === r.dataset.id; });
          if (opts.onPick) opts.onPick(c);
          inst.close();
        });
      });
    }

    const inst = modal({
      title: 'Pick recipient',
      body: body,
      primary: null,
      secondary: { label: 'Close' }
    });

    setTimeout(function () { render(''); body.querySelector('#cp-search').addEventListener('input', function (e) { render(e.target.value); }); body.querySelector('#cp-search').focus(); }, 0);
    return inst;
  }

  function toast(msg, kind) {
    const wrap = document.querySelector('.toast-wrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast ' + (kind === 'error' ? 'toast-error' : 'toast-success');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 2700);
    setTimeout(function () { t.remove(); }, 3000);
  }

  window.Portal = {
    init: init,
    signOut: signOut,
    modal: modal,
    drawer: drawer,
    toast: toast,
    icon: icon,
    apexButton: apexButton,
    openApex: openApexModal,
    apexPanel: apexPanel,
    paywall: paywall,
    calendar: calendarPicker,
    openContactPicker: openContactPicker,
    _toggleDropdown: _toggleDropdown
  };
})();
