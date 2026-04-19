(function () {
    'use strict';

    var LOADER_ID = 'evillage-loader';
    var LOGO_SRC = '../assets/images/neiih_logo_white.png';
    var api = window.EvillageAPI;
    var required = window.EVILLAGE_REQUIRED_ROLES;

    function signinUrlForRequired() {
        // If the page requires exactly one role, send bounced visitors to that portal's sign-in page.
        if (api && typeof api.signinPageForRole === 'function' && Array.isArray(required) && required.length === 1) {
            return api.signinPageForRole(required[0]);
        }
        return 'evillage-signin.html';
    }
    var SIGNIN_URL = signinUrlForRequired();

    function redirect(url) {
        try { window.location.replace(url); }
        catch (e) { window.location.href = url; }
    }

    // ─── Loading Overlay ────────────────────────────────
    function injectLoaderStyles() {
        if (document.getElementById(LOADER_ID + '-style')) return;
        var style = document.createElement('style');
        style.id = LOADER_ID + '-style';
        style.textContent =
            '#' + LOADER_ID + '{position:fixed;inset:0;background:linear-gradient(135deg,#0d3d44 0%,#0a2e33 100%);' +
            'display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2147483647;' +
            'transition:opacity .3s ease;}' +
            '#' + LOADER_ID + ' .ev-loader-logo{max-width:160px;width:60%;margin-bottom:32px;opacity:.95;' +
            'filter:drop-shadow(0 4px 20px rgba(0,0,0,.25));}' +
            '#' + LOADER_ID + ' .ev-spinner{width:38px;height:38px;border:3px solid rgba(255,255,255,.15);' +
            'border-top-color:#10b981;border-radius:50%;animation:evSpin 1s linear infinite;}' +
            '#' + LOADER_ID + ' .ev-loader-text{color:rgba(255,255,255,.7);font-size:13px;letter-spacing:.08em;' +
            'text-transform:uppercase;margin-top:20px;font-weight:500;}' +
            '@keyframes evSpin{to{transform:rotate(360deg);}}' +
            '#' + LOADER_ID + '.is-hidden{opacity:0;pointer-events:none;}' +
            'html.ev-loading,html.ev-loading body{overflow:hidden!important;}';
        (document.head || document.documentElement).appendChild(style);
    }

    function showLoader() {
        injectLoaderStyles();
        (document.documentElement || document.body).classList.add('ev-loading');

        function attach() {
            if (document.getElementById(LOADER_ID)) return;
            var overlay = document.createElement('div');
            overlay.id = LOADER_ID;
            overlay.setAttribute('role', 'status');
            overlay.setAttribute('aria-live', 'polite');
            overlay.innerHTML =
                '<img class="ev-loader-logo" src="' + LOGO_SRC + '" alt="NEIIA" ' +
                'onerror="this.style.display=\'none\';">' +
                '<div class="ev-spinner" aria-hidden="true"></div>' +
                '<div class="ev-loader-text">Loading your account…</div>';
            (document.body || document.documentElement).appendChild(overlay);
        }

        if (document.body) attach();
        else document.addEventListener('DOMContentLoaded', attach);
    }

    function hideLoader() {
        (document.documentElement || document.body).classList.remove('ev-loading');
        var el = document.getElementById(LOADER_ID);
        if (!el) return;
        el.classList.add('is-hidden');
        setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }

    // ─── Auth gates (run before showing the loader to avoid flash for unauth) ──
    if (!api || typeof api.isAuthenticated !== 'function') { redirect(SIGNIN_URL); return; }
    if (!api.isAuthenticated()) { api.clearAuth(); redirect(SIGNIN_URL); return; }

    if (Array.isArray(required) && required.length > 0) {
        var role = (api.getRole() || '').toLowerCase();
        var allowed = required.map(function (r) { return String(r).toLowerCase(); });
        if (allowed.indexOf(role) === -1) {
            api.clearAuth();
            redirect(SIGNIN_URL);
            return;
        }
    }

    showLoader();

    // ─── User display helpers ───────────────────────────
    function firstChar(s) { return s ? String(s).trim().charAt(0).toUpperCase() : ''; }

    function deriveInitials(user) {
        if (!user) return '';
        var p = user.profile || {};
        if (p.first_name || p.last_name) {
            return (firstChar(p.first_name) + firstChar(p.last_name));
        }
        if (p.business_name) {
            var words = String(p.business_name).trim().split(/\s+/);
            return (firstChar(words[0]) + firstChar(words[1] || '')).slice(0, 2);
        }
        return firstChar(user.email);
    }

    function deriveFullName(user) {
        if (!user) return '';
        var p = user.profile || {};
        if (p.first_name || p.last_name) {
            return ((p.first_name || '') + ' ' + (p.last_name || '')).trim();
        }
        if (p.business_name) return p.business_name;
        return user.email || '';
    }

    function prettyRole(role) {
        if (!role) return '';
        return role.charAt(0).toUpperCase() + role.slice(1).replace(/_/g, ' ');
    }

    function resolveField(user, path) {
        if (!user || !path) return undefined;
        var keys = path.split('.');
        var cur = user;
        for (var i = 0; i < keys.length; i++) {
            if (cur == null) return undefined;
            cur = cur[keys[i]];
        }
        return cur;
    }

    function populateUser(user) {
        // Auto-populate common sidebar controls across all pages.
        document.querySelectorAll('.user-name').forEach(function (el) {
            var n = deriveFullName(user);
            if (n) el.textContent = n;
        });
        document.querySelectorAll('.user-avatar').forEach(function (el) {
            // Only overwrite if the existing content looks like initials/placeholder.
            var current = (el.textContent || '').trim();
            if (current.length <= 4) {
                var init = deriveInitials(user);
                if (init) el.textContent = init;
            }
        });

        // Attribute-based substitution for custom placements.
        document.querySelectorAll('[data-user]').forEach(function (el) {
            var key = el.getAttribute('data-user');
            var val;
            switch (key) {
                case 'fullName': val = deriveFullName(user); break;
                case 'initials': val = deriveInitials(user); break;
                case 'role': val = prettyRole(user && user.role); break;
                case 'greetingFirstName':
                    val = (user && user.profile && user.profile.first_name) || '';
                    break;
                default:
                    val = resolveField(user, key);
            }
            if (val != null && val !== '') el.textContent = val;
        });
    }

    function applyWhenReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    // ─── Fetch /me and populate ─────────────────────────
    api.getMe()
        .then(function (user) {
            window.EVILLAGE_USER = user;
            try { sessionStorage.setItem('evillage_user', JSON.stringify(user)); } catch (e) {}
            applyWhenReady(function () {
                try { populateUser(user); } catch (e) { console.error(e); }
                hideLoader();
            });
        })
        .catch(function (err) {
            console.error('Failed to fetch /api/v1/me:', err);
            if (err && (err.status === 401 || err.status === 403)) {
                api.clearAuth();
                redirect(SIGNIN_URL);
                return;
            }
            // Non-auth failure: reveal page so user isn't stuck on a loading screen.
            applyWhenReady(hideLoader);
        });
})();
