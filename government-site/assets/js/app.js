/* NEIIA Stakeholder Map — shared shell, filter state, panel, helpers */
(function () {
  'use strict';

  // ============ Filter state ============
  var defaultFilters = function () {
    return { subSectors: [], roles: [], state: '', priorities: [], hideDissolved: true, search: '' };
  };
  window.NEIIA_FILTERS = defaultFilters();
  window.NEIIA_VIEW_MODE = localStorage.getItem('neiia_view_mode') || 'internal';

  function emitFiltersChanged() {
    document.dispatchEvent(new CustomEvent('filters:changed'));
  }
  window.emitFiltersChanged = emitFiltersChanged;

  window.filterEntities = function (arr) {
    var f = window.NEIIA_FILTERS;
    var src = arr || window.NEIIA_ENTITIES;
    var q = (f.search || '').toLowerCase().trim();
    return src.filter(function (x) {
      if (f.hideDissolved && (x.status === 'dissolved' || x.status === 'merged' || x.status === 'dormant')) return false;
      if (f.subSectors.length && f.subSectors.indexOf(x.subSector) < 0) return false;
      if (f.roles.length && f.roles.indexOf(x.role) < 0) return false;
      if (f.state && x.state !== f.state) return false;
      if (f.priorities.length && f.priorities.indexOf(x.neiiaPriority) < 0) return false;
      if (q) {
        var hay = (x.name + ' ' + x.acronym + ' ' + (x.city || '') + ' ' + (x.state || '')).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
  };

  window.allStates = function () {
    var s = {};
    window.NEIIA_ENTITIES.forEach(function (e) { if (e.state) s[e.state] = 1; });
    return Object.keys(s).sort();
  };

  // ============ Icons ============
  window.icon = function (name, size) {
    size = size || 18;
    var attrs = 'width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
    var paths = {
      search:   '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      x:        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      menu:     '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
      filter:   '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
      download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
      print:    '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
      ext:      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
      chev:     '<polyline points="6 9 12 15 18 9"/>',
      mail:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
      phone:    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
      map:      '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
      grid:     '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
      tree:     '<line x1="12" y1="3" x2="12" y2="9"/><line x1="6" y1="15" x2="6" y2="21"/><line x1="18" y1="15" x2="18" y2="21"/><line x1="6" y1="15" x2="18" y2="15"/><line x1="12" y1="9" x2="12" y2="15"/><circle cx="12" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/>',
      pin:      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
      building: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="15" y1="14" x2="15" y2="14"/>',
      copy:     '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
      check:    '<polyline points="20 6 9 17 4 12"/>',
      eye:      '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
    };
    return '<svg ' + attrs + '>' + (paths[name] || '') + '</svg>';
  };

  // ============ Header ============
  window.injectHeader = function (activeTab) {
    var hdr = document.querySelector('.shell-header');
    if (!hdr) return;
    var modeIsInternal = window.NEIIA_VIEW_MODE === 'internal';
    hdr.innerHTML =
      '<div class="shell-wide">' +
        '<a class="wordmark" href="../index.html"><span class="wordmark-mark">N</span>Energy Stakeholder Map</a>' +
        '<nav class="shell-tabs">' +
          '<a href="map.html" class="tab' + (activeTab === 'map' ? ' active' : '') + '">' + icon('map', 14) + ' Map</a>' +
          '<a href="directory.html" class="tab' + (activeTab === 'directory' ? ' active' : '') + '">' + icon('grid', 14) + ' Directory</a>' +
          '<a href="org-chart.html" class="tab' + (activeTab === 'org-chart' ? ' active' : '') + '">' + icon('tree', 14) + ' Org chart</a>' +
        '</nav>' +
        '<div class="shell-right">' +
          '<div class="header-search-wrap mobile-hide">' + icon('search', 14) +
            '<input class="header-search" placeholder="Search entities..." id="globalSearch" />' +
          '</div>' +
          '<button class="view-toggle ' + (modeIsInternal ? '' : 'public') + '" id="viewToggle">' +
            '<span class="dot"></span>' + (modeIsInternal ? 'Internal view' : 'Public view') +
          '</button>' +
          '<button class="menu-btn" id="mobileMenuBtn">' + icon('menu', 18) + '</button>' +
        '</div>' +
      '</div>';

    var s = document.getElementById('globalSearch');
    if (s) {
      s.value = window.NEIIA_FILTERS.search || '';
      s.addEventListener('input', function () {
        window.NEIIA_FILTERS.search = this.value;
        emitFiltersChanged();
      });
    }
    var vt = document.getElementById('viewToggle');
    if (vt) {
      vt.addEventListener('click', function () {
        window.NEIIA_VIEW_MODE = window.NEIIA_VIEW_MODE === 'internal' ? 'public' : 'internal';
        localStorage.setItem('neiia_view_mode', window.NEIIA_VIEW_MODE);
        injectHeader(activeTab);
        emitFiltersChanged();
      });
    }
    var mb = document.getElementById('mobileMenuBtn');
    if (mb) {
      mb.addEventListener('click', function () {
        var fs = document.querySelector('.filter-side');
        if (fs) fs.classList.toggle('open');
      });
    }
  };

  // ============ Entity panel ============
  window.openEntityPanel = function (entity) {
    var panel = document.getElementById('entityPanel');
    var backdrop = document.getElementById('entityBackdrop');
    if (!panel || !entity) return;
    var color = NEIIA_META.subSectorColor(entity.subSector);
    var isInternal = window.NEIIA_VIEW_MODE === 'internal';

    var leadership = (entity.leadership || []).map(function (l) {
      return '<li><strong>' + l.title + ':</strong> ' + l.name + '</li>';
    }).join('') || '<li class="muted">Not on file.</li>';

    var phones = (entity.phones || []).filter(Boolean).join(', ') || '—';
    var emails = (entity.emails || []).filter(Boolean).map(function (e) {
      return '<a class="link" href="mailto:' + e + '">' + e + '</a>';
    }).join(', ') || '—';
    var web = entity.website ? '<a class="link" href="' + entity.website + '" target="_blank" rel="noopener">' + entity.website.replace(/^https?:\/\//, '') + '</a>' : '—';

    var programs = (entity.programs || []).map(function (p) { return '<li>' + p + '</li>'; }).join('') || '<li class="muted">None on file.</li>';
    var jurisdiction = (entity.jurisdiction || []).map(function (j) { return '<span class="sub-chip outline">' + j + '</span>'; }).join(' ') || '—';

    var soc = entity.social || {};
    var socials = [];
    if (soc.linkedin) socials.push('<a class="link" href="https://linkedin.com/' + soc.linkedin + '" target="_blank">LinkedIn</a>');
    if (soc.twitter)  socials.push('<a class="link" href="https://x.com/' + soc.twitter + '" target="_blank">X / Twitter</a>');
    if (soc.facebook) socials.push('<a class="link" href="https://facebook.com/' + soc.facebook + '" target="_blank">Facebook</a>');
    var socialsHtml = socials.length ? socials.join(' · ') : '—';

    var contactsHtml = '';
    if (isInternal && entity.contacts && entity.contacts.length) {
      contactsHtml =
        '<div class="entity-section"><h4>Key contacts</h4>' +
        '<ul>' + entity.contacts.map(function (c) {
          return '<li><strong>' + c.name + '</strong> — ' + (c.title || '') + (c.email ? ' · <a class="link" href="mailto:' + c.email + '">' + c.email + '</a>' : '') + '</li>';
        }).join('') + '</ul></div>';
    }

    var neiiaHtml = '';
    if (isInternal) {
      neiiaHtml =
        '<div class="entity-section"><h4>NEIIA relevance</h4>' +
        '<dl class="kv">' +
          '<dt>Relevance</dt><dd>' + entity.neiiaRelevance + '</dd>' +
          '<dt>Priority</dt><dd><span class="priority-chip priority-' + entity.neiiaPriority + '">' + entity.neiiaPriority + '</span></dd>' +
        '</dl></div>';
    }

    var notesHtml = (isInternal && entity.notes)
      ? '<div class="entity-section"><h4>Internal notes</h4><p>' + entity.notes + '</p></div>'
      : '';

    var statusBadge = entity.status === 'active'
      ? '<span class="status-chip status-active">Active</span>'
      : '<span class="status-chip status-' + entity.status + '">' + entity.status.charAt(0).toUpperCase() + entity.status.slice(1) + '</span>';
    var statusNoteHtml = entity.statusNote
      ? '<div class="entity-section"><h4>Status note</h4><p>' + entity.statusNote + '</p></div>'
      : '';

    panel.innerHTML =
      '<div class="entity-panel-header">' +
        '<div class="color-bar" style="background:' + color + ';"></div>' +
        '<button class="entity-panel-close" id="panelClose" aria-label="Close">' + icon('x', 16) + '</button>' +
        '<div class="acronym-circle" style="background:' + color + ';">' + (entity.acronym || '?') + '</div>' +
        '<h2>' + entity.name + '</h2>' +
        '<div class="meta-row">' +
          '<span class="sub-chip" style="background:' + color + '15;color:' + color + ';"><span class="color-dot" style="background:' + color + ';"></span>' + NEIIA_META.subSectorLabel(entity.subSector) + '</span>' +
          '<span class="sub-chip outline">' + entity.role + '</span>' +
          statusBadge +
        '</div>' +
      '</div>' +
      '<div class="entity-panel-body">' +
        '<div class="entity-section"><h4>Mandate</h4><p>' + (entity.mandate || '—') + '</p></div>' +

        '<div class="entity-section"><h4>Leadership</h4><ul>' + leadership + '</ul></div>' +

        '<div class="entity-section"><h4>Headquarters</h4>' +
          '<p>' + (entity.address || '—') + '</p>' +
          '<p class="muted" style="color:var(--muted);font-size:12px;">' + (entity.city || '') + (entity.state ? ', ' + entity.state : '') + ' · ' + (entity.lat || '?').toFixed(3) + ', ' + (entity.lng || '?').toFixed(3) + '</p>' +
        '</div>' +

        '<div class="entity-section"><h4>Contact</h4>' +
          '<dl class="kv">' +
            '<dt>Website</dt><dd>' + web + '</dd>' +
            '<dt>Phone</dt><dd>' + phones + '</dd>' +
            '<dt>Email</dt><dd>' + emails + '</dd>' +
            '<dt>Social</dt><dd>' + socialsHtml + '</dd>' +
          '</dl>' +
        '</div>' +

        '<div class="entity-section"><h4>Governance</h4>' +
          '<dl class="kv">' +
            '<dt>Established</dt><dd>' + (entity.established || '—') + '</dd>' +
            '<dt>Enabling law</dt><dd>' + (entity.enablingLaw || '—') + '</dd>' +
            '<dt>Reports to</dt><dd>' + (entity.reportsTo || '—') + '</dd>' +
            '<dt>Jurisdiction</dt><dd>' + jurisdiction + '</dd>' +
          '</dl>' +
        '</div>' +

        '<div class="entity-section"><h4>Active programs</h4><ul>' + programs + '</ul></div>' +

        neiiaHtml + contactsHtml + notesHtml + statusNoteHtml +

        '<div class="entity-section"><h4>Verification</h4><p style="color:var(--muted);font-size:12px;">Last verified ' + entity.lastVerified + '</p></div>' +

      '</div>' +
      '<div class="entity-panel-footer">' +
        '<a class="btn btn-primary" href="entity.html?id=' + entity.id + '">' + icon('ext', 14) + ' Open full profile</a>' +
        '<button class="btn btn-secondary" id="panelCloseFoot">Close</button>' +
      '</div>';

    panel.classList.add('open');
    if (backdrop) backdrop.classList.add('open');

    var close = function () { closeEntityPanel(); };
    var c1 = document.getElementById('panelClose');
    var c2 = document.getElementById('panelCloseFoot');
    if (c1) c1.addEventListener('click', close);
    if (c2) c2.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close, { once: true });
  };

  window.closeEntityPanel = function () {
    var panel = document.getElementById('entityPanel');
    var backdrop = document.getElementById('entityBackdrop');
    if (panel) panel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  // ============ Toast ============
  window.toast = function (msg, kind) {
    var wrap = document.querySelector('.toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
    var t = document.createElement('div');
    t.className = 'toast' + (kind === 'success' ? ' success' : '');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .25s'; }, 2400);
    setTimeout(function () { t.remove(); }, 2800);
  };

  // ============ CSV export ============
  window.csvExport = function (rows, columns, filename) {
    var lines = [];
    lines.push(columns.map(function (c) { return '"' + c.label.replace(/"/g, '""') + '"'; }).join(','));
    rows.forEach(function (r) {
      lines.push(columns.map(function (c) {
        var v = c.get ? c.get(r) : r[c.key];
        if (v == null) v = '';
        v = String(v).replace(/"/g, '""');
        return '"' + v + '"';
      }).join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'stakeholders-export.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 400);
  };

  // ============ Filter sidebar (reusable) ============
  window.renderFilterSidebar = function (container) {
    var meta = window.NEIIA_META;
    var f = window.NEIIA_FILTERS;
    var states = window.allStates();

    var subHtml = Object.keys(meta.subSectors).map(function (k) {
      var s = meta.subSectors[k];
      var on = f.subSectors.indexOf(k) >= 0;
      return '<button class="filter-chip' + (on ? ' active' : '') + '" data-sub="' + k + '"><span class="color-dot" style="background:' + s.color + ';"></span>' + s.label + '</button>';
    }).join('');

    var prioHtml = meta.priorities.map(function (p) {
      var on = f.priorities.indexOf(p) >= 0;
      return '<button class="filter-chip' + (on ? ' active' : '') + '" data-prio="' + p + '">' + p.charAt(0).toUpperCase() + p.slice(1) + '</button>';
    }).join('');

    var stateOpts = '<option value="">All states</option>' + states.map(function (s) {
      return '<option value="' + s + '"' + (f.state === s ? ' selected' : '') + '>' + s + '</option>';
    }).join('');

    var roleOpts = '<option value="">All roles</option>' + meta.roles.map(function (r) {
      var on = f.roles.indexOf(r) >= 0;
      return '<option value="' + r + '"' + (on ? ' selected' : '') + '>' + r + '</option>';
    }).join('');

    container.innerHTML =
      '<h4>Sub-sector</h4><div class="filter-chips">' + subHtml + '</div>' +
      '<h4>State</h4><select class="filter-select" id="fState">' + stateOpts + '</select>' +
      '<h4>Role</h4><select class="filter-select" id="fRole">' + roleOpts + '</select>' +
      '<h4>NEIIA priority</h4><div class="filter-chips">' + prioHtml + '</div>' +
      '<h4>Status</h4><label class="filter-toggle"><input type="checkbox" id="fHide"' + (f.hideDissolved ? ' checked' : '') + '> Hide dissolved / merged</label>' +
      '<button class="filter-reset" id="fReset">Reset filters</button>' +
      '<div class="filter-counter" id="fCount"></div>';

    container.querySelectorAll('[data-sub]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.sub;
        var idx = f.subSectors.indexOf(k);
        if (idx >= 0) f.subSectors.splice(idx, 1); else f.subSectors.push(k);
        b.classList.toggle('active');
        emitFiltersChanged();
      });
    });
    container.querySelectorAll('[data-prio]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.prio;
        var idx = f.priorities.indexOf(k);
        if (idx >= 0) f.priorities.splice(idx, 1); else f.priorities.push(k);
        b.classList.toggle('active');
        emitFiltersChanged();
      });
    });
    var fState = container.querySelector('#fState');
    fState.addEventListener('change', function () { f.state = this.value; emitFiltersChanged(); });
    var fRole = container.querySelector('#fRole');
    fRole.addEventListener('change', function () {
      f.roles = this.value ? [this.value] : [];
      emitFiltersChanged();
    });
    container.querySelector('#fHide').addEventListener('change', function () {
      f.hideDissolved = this.checked; emitFiltersChanged();
    });
    container.querySelector('#fReset').addEventListener('click', function () {
      window.NEIIA_FILTERS = defaultFilters();
      var s = document.getElementById('globalSearch');
      if (s) s.value = '';
      window.renderFilterSidebar(container);
      emitFiltersChanged();
    });
  };

  window.updateFilterCount = function (n, total) {
    var c = document.getElementById('fCount');
    if (c) c.textContent = 'Showing ' + n + ' of ' + total + ' entities';
  };

})();
