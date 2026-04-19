// Data Point — Downstream Intelligence Logic Engine (Modular & High Density)

// --- GLOBAL STATE ---
let currentPage = 'overview';
let currentKey = 'national';
let currentCompany = 'National Aggregate';
let globalFx = 1485.20;
let mixChart = null;
let iotMap = null;
let mapInstance;
let mapMarkers = [];

// --- DATA STORES ---
const companyData = {
    national: {
        name: 'National Aggregate',
        logo: '../assets/fgn_logo_small.png',
        pms: 62000000, ago: 89400, revenue: 148.6, nodes: 12402,
        mix: {
            daily: { pms: [420, 540, 680, 590, 610, 550, 480], ago: [150, 210, 280, 240, 250, 230, 210], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [3100, 3800, 4200, 3900, 4100, 3700, 3500], ago: [1200, 1500, 1700, 1600, 1650, 1550, 1400], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [15000, 17200, 18800, 16900, 19200, 18400, 20100], ago: [5800, 6400, 7100, 6600, 7400, 7000, 7800], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        },
        remissions: [
            { date: '2026-03-12', txid: 'CBN-NAT-892', type: 'VAT/Edu', amount: 12.4, status: 'Verified' },
            { date: '2026-02-10', txid: 'CBN-NAT-771', type: 'VAT/Edu', amount: 11.8, status: 'Verified' },
            { date: '2026-01-15', txid: 'CBN-NAT-665', type: 'VAT/Edu', amount: 14.1, status: 'Verified' }
        ]
    },
    oando: {
        name: 'OANDO PLC',
        logo: '../assets/oando-hd-logo.png',
        pms: 12420000, ago: 18500, revenue: 24.4, nodes: 1402,
        mix: { 
            daily: { pms: [450, 520, 610, 580, 590, 540, 480], ago: [210, 240, 280, 260, 270, 240, 220], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [650, 720, 810, 780, 790, 740, 680], ago: [310, 340, 380, 360, 370, 340, 320], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] }
        },
        remissions: [
            { date: '2026-03-05', txid: 'CBN-OAN-102', type: 'VAT/Edu', amount: 1.8, status: 'Verified' },
            { date: '2026-02-04', txid: 'CBN-OAN-098', type: 'VAT/Edu', amount: 1.6, status: 'Verified' }
        ]
    },
    nnpc: {
        name: 'NNPC Retail Ltd',
        logo: '../assets/nnpc-logo.77c29e8.png',
        pms: 22500000, ago: 34200, revenue: 55.8, nodes: 4210,
        mix: { 
            daily: { pms: [1200, 1400, 1680, 1590, 1610, 1550, 1480], ago: [610, 640, 780, 760, 770, 740, 720], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [8200, 8400, 9680, 9590, 9610, 8550, 8480], ago: [4610, 4640, 4780, 4760, 4770, 4740, 4720], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] }
        },
        remissions: [
            { date: '2026-03-01', txid: 'CBN-NNP-772', type: 'VAT/Edu', amount: 4.2, status: 'Verified' },
            { date: '2026-02-01', txid: 'CBN-NNP-661', type: 'VAT/Edu', amount: 4.0, status: 'Verified' }
        ]
    },
    total: {
        name: 'TotalEnergies',
        logo: '../assets/total energies.jpeg',
        pms: 10800000, ago: 18400, revenue: 36.2, nodes: 1840,
        mix: { 
            daily: { pms: [580, 640, 880, 790, 810, 750, 680], ago: [310, 340, 480, 460, 470, 440, 420], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [4100, 4300, 4900, 4800, 4500, 4400, 4200], ago: [2100, 2200, 2400, 2300, 2200, 2100, 2000], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] }
        },
        remissions: [
            { date: '2026-03-08', txid: 'CBN-TOT-441', type: 'VAT/Edu', amount: 2.7, status: 'Verified' }
        ]
    },
    mrs: {
        name: 'MRS Oil',
        logo: '../assets/mrs.png',
        pms: 3900000, ago: 5100, revenue: 15.4, nodes: 612,
        mix: { 
            daily: { pms: [210, 240, 280, 250, 260, 240, 220], ago: [70, 90, 110, 100, 105, 95, 85], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [1400, 1500, 1800, 1700, 1600, 1500, 1400], ago: [510, 540, 580, 560, 570, 540, 520], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] }
        },
        remissions: [
            { date: '2026-03-10', txid: 'CBN-MRS-551', type: 'VAT/Edu', amount: 1.1, status: 'Verified' }
        ]
    }
};

const iotNodes = [
    { id: "NG-LAG-01", lat: 6.4589, lng: 3.4265, company: "oando", type: "pump", label: "Victoria Island Station 4", status: "Optimal" },
    { id: "NG-LAG-02", lat: 6.5244, lng: 3.3792, company: "total", type: "truck", label: "Fleet Mobile Unit TX-92", status: "Moving" },
    { id: "NG-ABU-01", lat: 9.0765, lng: 7.3986, company: "nnpc", type: "pump", label: "Maitama Central Station", status: "Optimal" },
    { id: "NG-PHC-01", lat: 4.8156, lng: 7.0498, company: "total", type: "refinery", label: "PH Midstream Terminal", status: "Optimal" },
    { id: "NG-DEL-01", lat: 5.5442, lng: 5.7601, company: "oando", type: "well", label: "OML-42 Extraction Site", status: "Active" },
    { id: "NG-KAD-01", lat: 10.5105, lng: 7.4165, company: "nnpc", type: "refinery", label: "Kaduna Refining Complex", status: "Alert" },
    { id: "NG-KAN-01", lat: 12.0022, lng: 8.5920, company: "mrs", type: "truck", label: "Kano Supply Convoy B", status: "Moving" },
    { id: "NG-IBD-01", lat: 7.3775, lng: 3.9470, company: "mrs", type: "pump", label: "Ibadan Distribution Node", status: "Optimal" }
];

const regionHealth = [
    { name: "Lagos Hub", nodes: 4201, uptime: 99.8, status: "Optimal", color: "var(--green)" },
    { name: "Abuja Nexus", nodes: 2140, uptime: 99.4, status: "Optimal", color: "var(--green)" },
    { name: "PH Refining Zone", nodes: 1840, uptime: 97.2, status: "Alert", color: "var(--amber)" },
    { name: "Kano Cluster", nodes: 1210, uptime: 99.1, status: "Optimal", color: "var(--green)" },
    { name: "Ibadan Mesh", nodes: 840, uptime: 99.6, status: "Optimal", color: "var(--green)" },
    { name: "Kaduna Substrate", nodes: 640, uptime: 88.5, status: "Critical", color: "var(--red)" },
    { name: "Warri Extraction", nodes: 520, uptime: 98.2, status: "Optimal", color: "var(--green)" },
    { name: "Enugu Regional", nodes: 480, uptime: 99.2, status: "Optimal", color: "var(--green)" },
    { name: "Benin Grid", nodes: 320, uptime: 99.9, status: "Optimal", color: "var(--green)" }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    loadState();
    initShell();
    initDropdowns();
    initGlobalSearch();
    fetchCbnRate();
    renderPage(currentPage);
});

async function renderPage(pageId) {
    // Handle Coming Soon Routing
    const soonSectors = ['upstream', 'midstream', 'power', 'renewable', 'bioenergy'];
    let actualViewId = pageId;
    let sectorName = '';

    if (soonSectors.includes(pageId)) {
        actualViewId = 'comingsoon';
        sectorName = pageId.charAt(0).toUpperCase() + pageId.slice(1);
        if (pageId === 'upstream' || pageId === 'midstream') sectorName = `Oil & Gas / ${sectorName}`;
    }

    // Map 'downstream' to the primary overview/dashboard for this phase
    if (pageId === 'downstream') {
        actualViewId = 'overview';
    }

    currentPage = pageId;
    saveState();
    
    const container = document.getElementById('viewContainer');
    
    if (!VIEWS[actualViewId]) {
        console.error("View not found:", actualViewId);
        container.innerHTML = `<div class="error-wrap"><h3>Intelligence Link Severed</h3><p>View [${actualViewId}] is not available in the nexus.</p></div>`;
        return;
    }

    container.innerHTML = VIEWS[actualViewId];

    // Inject Sector Name for Coming Soon
    if (actualViewId === 'comingsoon') {
        const label = document.getElementById('sectorLabel');
        if (label) label.textContent = sectorName;
        const icon = document.getElementById('sectorIcon');
        if (icon) {
            if (pageId === 'power') icon.className = 'fas fa-bolt';
            if (pageId === 'renewable') icon.className = 'fas fa-sun';
            if (pageId === 'bioenergy') icon.className = 'fas fa-leaf';
        }
    }
    
    // Modules Logic
    if (actualViewId === 'overview') {
        initChart('daily');
        initPillTabs();
        initChartFilters();
    } else if (actualViewId === 'nodemap') {
        initMap();
    } else if (actualViewId === 'revenue') {
        initRevenuePortal();
    } else if (actualViewId === 'settlements') {
        initSettlementLedger();
    } else if (actualViewId === 'iot') {
        initIoTAnalytics();
    }
    
    syncUI(currentKey);
    updateSidebarActive(pageId);
    
    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 10);
}

function initShell() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');

    if (!menuToggle || !sidebar || !overlay) return;

    const openMenu = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    const closeMenu = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    if (sidebarClose) {
        sidebarClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    overlay.addEventListener('click', closeMenu);

    // Document-level escape and click-outside safety
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Link Routing
    document.querySelectorAll('.sidebar-link[id^="side"], .sub-link[id^="side"]').forEach(l => {
        l.addEventListener('click', (e) => {
            const id = l.id.replace('side','').toLowerCase();
            renderPage(id);
            if (window.innerWidth <= 1024) closeMenu();
        });
    });
}

function initDropdowns() {
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.onclick = (e) => {
            e.stopPropagation();
            trigger.classList.toggle('open');
        };
    });
}

function syncUI(key) {
    initTimestamp();
    initMetrics(key);
    const data = companyData[key];
    const chip = document.getElementById('chipLabel');
    if (chip) chip.textContent = data.name;
    const targets = document.querySelectorAll('.entity-logo');
    targets.forEach(t => t.src = data.logo);
}

function initMetrics(key) {
    const d = companyData[key];
    if (!d) return;
    const targets = { pmsMetric: d.pms.toLocaleString(), agoMetric: d.ago.toLocaleString(), revMetric: `₦${d.revenue}B`, iotMetric: d.nodes.toLocaleString() };
    Object.keys(targets).forEach(tid => { const el = document.getElementById(tid); if (el) el.textContent = targets[tid]; });
}

function initChart(range = 'daily') {
    const ctx = document.getElementById('mixChart');
    if (!ctx) return;
    if (mixChart) mixChart.destroy();
    
    const companyMix = companyData[currentKey].mix;
    const data = companyMix[range] || companyMix['daily'];
    
    mixChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'PMS',
                    data: data.pms,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    borderWidth: 2
                },
                {
                    label: 'AGO',
                    data: data.ago,
                    borderColor: '#2563eb',
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 10 } } }
            },
            scales: {
                y: { display: false },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

function initIoTAnalytics() {
    const grid = document.getElementById('regionHealthGrid');
    if (!grid) return;

    grid.innerHTML = regionHealth.map(r => `
        <div class="metric-card reveal active" style="padding: 1.25rem; position: relative; border-left: 4px solid ${r.color};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-dark);">${r.name}</div>
                <div class="badge" style="font-size: 0.6rem; padding: 2px 8px; border-radius: 4px; background: #f8fafc; border: 1px solid #eee; color: ${r.color}; font-weight: 800;">${r.status.toUpperCase()}</div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 1rem;">
                <span style="font-weight: 700; color: var(--text-dark);">${r.nodes.toLocaleString()}</span> Nodes online
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-family: var(--mono); font-weight: 700; font-size: 0.85rem; color: var(--text-dark);">${r.uptime}% <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 400;">Uptime</span></div>
                <div style="width: 60px; height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden;">
                    <div style="width: ${r.uptime}%; height: 100%; background: ${r.color};"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function initSettlementLedger() {
    const tbody = document.getElementById('ledgerTableBody');
    if (!tbody) return;

    // Generate Ledger from all companies
    let rows = [];
    Object.keys(companyData).forEach(key => {
        if (key === 'national') return;
        const d = companyData[key];
        d.remissions.forEach(rem => {
            rows.push({
                ref: rem.txid,
                entity: d.name,
                logo: d.logo,
                type: rem.type,
                amount: rem.amount,
                date: rem.date,
                status: rem.status
            });
        });
    });

    tbody.innerHTML = rows.map(r => `
        <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.2s;" onmouseenter="this.style.background='#fcfdfe'" onmouseleave="this.style.background='transparent'">
            <td style="padding: 1.25rem 1.5rem; font-family: var(--mono); color: var(--blue); font-weight: 600; font-size: 0.8rem;">${r.ref}</td>
            <td style="padding: 1rem 0;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${r.logo}" style="width: 24px; height: 24px; border-radius: 4px; object-fit: contain;">
                    <span style="font-weight: 700; color: var(--text-dark);">${r.entity}</span>
                </div>
            </td>
            <td><span soft-tag style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary);">${r.type}</span></td>
            <td style="font-family: var(--mono); font-weight: 800; color: var(--text-dark); font-size: 0.95rem;">₦${r.amount}${r.amount > 100 ? 'M' : 'B'}</td>
            <td><span class="badge badge-green" style="font-size: 0.65rem; padding: 4px 10px; font-weight: 700;"><i class="fas fa-check-circle"></i> ${r.status.toUpperCase()}</span></td>
            <td style="padding-right: 1.5rem; color: var(--text-muted); font-size: 0.8rem; text-align: right; font-weight: 500;">${r.date}</td>
        </tr>
    `).join('');
}

function initTimestamp() { const el = document.getElementById('lastUpdated'); if (el) el.textContent = new Date().toLocaleTimeString(); }
function fetchCbnRate() { const el = document.getElementById('fxRate'); if (el) el.textContent = `₦${globalFx.toLocaleString()}`; }
function saveState() { localStorage.setItem('dp_page', currentPage); localStorage.setItem('dp_key', currentKey); }
function loadState() { currentPage = localStorage.getItem('dp_page') || 'overview'; currentKey = localStorage.getItem('dp_key') || 'national'; }

function updateSidebarActive(id) { 
    document.querySelectorAll('.sidebar-link, .sub-link').forEach(l => l.classList.remove('active'));
    const link = document.getElementById('side' + id.charAt(0).toUpperCase() + id.slice(1));
    if (link) link.classList.add('active');
}

function initPillTabs() {
    document.querySelectorAll('.pill-tab').forEach(t => {
        t.onclick = () => {
            document.querySelectorAll('.pill-tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            const range = t.getAttribute('data-range') || 'daily';
            initChart(range);
        };
    });
}

function initRevenuePortal() {
    const list = document.getElementById('revenueList');
    const search = document.getElementById('revenueSearch');
    if (!list) return;

    function renderList(filter = '') {
        list.innerHTML = '';
        Object.keys(companyData).forEach(key => {
            if (key === 'national') return;
            const d = companyData[key];
            if (d.name.toLowerCase().includes(filter.toLowerCase())) {
                const item = document.createElement('div');
                item.className = 'rev-item reveal active';
                item.innerHTML = `
                    <div class="rev-info">
                        <img src="${d.logo}" class="rev-logo">
                        <div><div style="font-weight:700;">${d.name}</div><span class="rev-tag">${key}</span></div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-family:var(--mono); font-weight:700;">₦${d.revenue}B</div>
                        <div style="font-size:0.7rem; color:var(--text-secondary);">Verified Revenue</div>
                    </div>`;
                item.onclick = () => showRevDetail(key);
                list.appendChild(item);
            }
        });
    }

    if (search) search.oninput = (e) => renderList(e.target.value);
    renderList();
}

function showRevDetail(key, monthFilter = 'All', yearFilter = 'All') {
    const d = companyData[key];
    const panel = document.getElementById('revDetailPanel');
    const overlay = document.getElementById('revDetailOverlay');
    const content = document.getElementById('revDetailContent');
    if (!panel) return;

    const vat = (d.revenue * 0.075).toFixed(2);
    const edu = (d.revenue * 0.02).toFixed(2);

    // Composite Filtering logic
    const filteredRemissions = d.remissions.filter(r => {
        const date = new Date(r.date);
        const m = date.toLocaleString('default', { month: 'long' });
        const y = date.getFullYear().toString();
        
        const mMatch = (monthFilter === 'All' || m === monthFilter);
        const yMatch = (yearFilter === 'All' || y === yearFilter);
        return mMatch && yMatch;
    });

    const years = ['All', ...new Set(d.remissions.map(r => new Date(r.date).getFullYear().toString()))];
    const months = ['All', ...new Set(d.remissions.map(r => new Date(r.date).toLocaleString('default', { month: 'long' })))];

    let remissionsHtml = '';
    if (d.remissions && d.remissions.length > 0) {
        remissionsHtml = `
            <div style="margin-top:2.5rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;" class="no-print">
                    <h4 style="font-size:0.85rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-secondary); display:flex; align-items:center; gap:8px; margin:0;">
                        <i class="fas fa-history"></i> Registry of Remittances (NEDB Ledger)
                    </h4>
                    <div style="display:flex; gap:8px;">
                        <select class="ledger-filter-select" onchange="showRevDetail('${key}', '${monthFilter}', this.value)">
                            ${years.map(y => `<option value="${y}" ${yearFilter === y ? 'selected' : ''}>Year: ${y}</option>`).join('')}
                        </select>
                        <select class="ledger-filter-select" onchange="showRevDetail('${key}', this.value, '${yearFilter}')">
                            ${months.map(m => `<option value="${m}" ${monthFilter === m ? 'selected' : ''}>Month: ${m}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="table-responsive" style="background:rgba(0,0,0,0.02); border-radius:12px; border:1px solid #eee;">
                    <table style="width:100%; min-width: 400px; border-collapse:collapse; font-size:0.8rem;">
                        <thead>
                            <tr style="text-align:left; background:rgba(0,0,0,0.02); color:var(--text-secondary); border-bottom:1px solid #eee;">
                                <th style="padding:12px;">Date</th>
                                <th>Transaction ID</th>
                                <th>Category</th>
                                <th style="text-align:right; padding-right:12px;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredRemissions.map(r => `
                                <tr style="border-bottom:1px solid rgba(0,0,0,0.03);">
                                    <td style="padding:12px;">${r.date}</td>
                                    <td style="font-family:var(--mono);">${r.txid}</td>
                                    <td><span style="font-size:0.65rem; padding:2px 6px; background:#f1f5f9; border-radius:4px;">${r.type}</span></td>
                                    <td style="text-align:right; padding-right:12px; font-weight:700;">₦${r.amount}${r.amount > 100 ? 'M' : 'B'}</td>
                                </tr>
                            `).join('')}
                            ${filteredRemissions.length === 0 ? '<tr><td colspan="4" style="padding:20px; text-align:center; color:var(--text-secondary);">No records found for the selected period.</td></tr>' : ''}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    content.innerHTML = `
        <div class="audit-certificate-wrap" style="padding: 1rem; position: relative; background:#fff;">
            <!-- Official Header -->
            <!-- Official Header - Grid Based for Mathematical Centering -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); align-items:center; gap:20px; margin-bottom:2.5rem; padding-bottom:1.5rem; border-bottom:3px solid var(--text-dark);">
                <div style="display:flex; justify-content:center;">
                    <img src="${d.logo}" style="height:55px; width:auto; object-fit:contain;">
                </div>
                <div style="text-align:center;">
                    <img src="../assets/fgn_logo_small.png" style="height:45px; margin-bottom:8px; display:inline-block;">
                    <h1 style="font-size:0.85rem; margin:0; text-transform:uppercase; letter-spacing:0.12em; color:var(--text-dark); font-weight:800;">Energy Commission of Nigeria</h1>
                    <p style="font-size:0.6rem; margin:0; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; font-weight:600;">National Energy Data Bank (NEDB) Registry</p>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:0.55rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px; font-weight:600;">Certificate No.</div>
                    <div style="font-family:var(--mono); font-weight:800; font-size:0.75rem; color:var(--text-dark);">CERT-${Math.floor(Math.random()*900000)+100000}</div>
                </div>
            </div>

            <div style="text-align:center; margin-bottom:2rem;">
                <h2 style="font-size:1.5rem; margin:0; letter-spacing:-0.02em; color:var(--text-dark);">${d.name}</h2>
                <p style="color:#64748b; margin:0; font-weight:500; text-transform:uppercase; font-size:0.75rem; letter-spacing:0.1em;">Fiscal Performance Verification Certificate — FY 2026</p>
            </div>
            
            <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important; gap:1.5rem; margin-bottom:2rem;">
                <div class="metric-card" style="background:#f8fafc; border:1px solid #e2e8f0; padding:1.1rem;">
                    <div class="metric-label" style="font-size:0.65rem;">Total Validated Revenue</div>
                    <div class="metric-value" style="color:var(--text-dark); font-size:1.4rem;">₦${d.revenue}B</div>
                </div>
                <div class="metric-card" style="background:#f8fafc; border:1px solid #e2e8f0; padding:1.1rem;">
                    <div class="metric-label" style="font-size:0.65rem;">Total Tax Remissions</div>
                    <div class="metric-value" style="color:var(--green); font-size:1.4rem;">₦${(parseFloat(vat)+parseFloat(edu)).toFixed(2)}B</div>
                </div>
            </div>

            <table style="width:100%; border-collapse:collapse; margin-top:1rem; font-size:0.9rem;">
                <thead>
                    <tr style="text-align:left; border-bottom:2px solid var(--text-dark); color:var(--text-dark); text-transform:uppercase; font-size:0.7rem; letter-spacing:0.1em;">
                        <th style="padding:12px 10px;">Audit Component</th>
                        <th>Value (₦B)</th>
                        <th style="text-align:right; padding-right:10px;">Verification</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom:1px solid #eee;">
                        <td style="padding:15px 10px; font-weight:600;">Value Added Tax (7.5%)</td>
                        <td style="font-family:var(--mono); font-weight:700;">₦${vat}B</td>
                        <td style="text-align:right; color:#059669; font-weight:700; padding-right:10px;"><i class="fas fa-check-circle"></i> REMITTED</td>
                    </tr>
                    <tr style="border-bottom:1px solid #eee;">
                        <td style="padding:15px 10px; font-weight:600;">Education Tax (2%)</td>
                        <td style="font-family:var(--mono); font-weight:700;">₦${edu}B</td>
                        <td style="text-align:right; color:#059669; font-weight:700; padding-right:10px;"><i class="fas fa-check-circle"></i> REMITTED</td>
                    </tr>
                </tbody>
            </table>

            ${remissionsHtml}

            <div style="margin-top:4rem; padding-top:2rem; border-top:1px solid #eee; display:flex; justify-content:space-between; align-items:flex-end;">
                <div style="text-align:center;">
                   <div style="height:40px; border-bottom:1px solid var(--text-dark); width:180px; margin:0 auto 5px;"></div>
                   <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Director of Finance (NEDB)</div>
                </div>
                <div style="text-align:center; opacity:0.15; position:absolute; left:50%; transform:translateX(-50%); bottom:100px;">
                    <i class="fas fa-certificate" style="font-size:12rem; color:var(--green);"></i>
                </div>
                <div style="text-align:center;">
                   <div style="height:40px; border-bottom:1px solid var(--text-dark); width:180px; margin:0 auto 5px;"></div>
                   <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Audit Commissioner</div>
                </div>
            </div>
            
            <div style="margin-top:3rem; text-align:center; font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.1em; line-height:1.6;">
                This document serves as an official proof of fiscal audit within the National Energy Data Bank framework.<br>
                Verification Code: ${btoa(key + Date.now()).substring(0, 12)}
            </div>
        </div>
        <div style="margin-top:2rem; text-align:right;" class="no-print">
                     <button class="topbar-action" onclick="downloadAudit('${d.name.replace(/'/g, "\\'")}')"><i class="fas fa-file-pdf"></i> Download Audit Certificate</button>
        </div>`;

    panel.classList.add('active');
    overlay.classList.add('active');

    document.getElementById('closeRevDetail').onclick = () => {
        panel.classList.remove('active');
        overlay.classList.remove('active');
    };
}

function initMap() {
    const mapContainer = document.getElementById('iotMap');
    if (!mapContainer) return;

    // Initialize MapLibre in Top-Down 2D Mode (Light Theme)
    mapInstance = new maplibregl.Map({
        container: 'iotMap',
        style: 'https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [8.6753, 9.0820],
        zoom: 6.0,
        pitch: 0,
        bearing: 0,
        antialias: true
    });

    mapInstance.on('load', () => {
        renderMapNodes();
        setTimeout(() => mapInstance.resize(), 500);
    });
}

function updateFilteredMap() {
    renderMapNodes();
}

function renderMapNodes() {
    if (!mapInstance) return;

    // Clear existing markers
    mapMarkers.forEach(m => m.remove());
    mapMarkers = [];

    // Get active filters
    const activeFilters = Array.from(document.querySelectorAll('.map-filter:checked')).map(cb => cb.value);
    
    let activeTotal = 0;
    let alertTotal = 0;

    const filtered = iotNodes.filter(node => activeFilters.includes(node.type));

    filtered.forEach(node => {
        const el = document.createElement('div');
        el.className = `marker ${node.type}`;
        const icon = { truck: 'fa-truck', pump: 'fa-gas-pump', refinery: 'fa-industry', well: 'fa-oil-well' }[node.type] || 'fa-microchip';
        
        const isAlert = node.status === 'Alert';
        if (isAlert) alertTotal++; else activeTotal++;

        el.innerHTML = `
            <div class="marker-pin-classic" style="color:${isAlert ? 'var(--red)' : 'var(--blue)'};">
                <i class="fas fa-map-marker-alt" style="font-size: 1.8rem;"></i>
                <div class="marker-icon-overlay" style="color: #fff;">
                    <i class="fas ${icon}" style="font-size: 0.6rem;"></i>
                </div>
            </div>
        `;

        const marker = new maplibregl.Marker(el)
            .setLngLat([node.lng, node.lat])
            .setPopup(new maplibregl.Popup({ offset: 25 })
                .setHTML(`
                    <div class="map-popup" style="color:#0f172a; padding:12px; min-width: 180px;">
                        <div style="font-size:0.6rem; font-weight:800; color:${isAlert ? 'var(--red)' : 'var(--green)'}; text-transform:uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${node.type} // STATUS: ${node.status.toUpperCase()}</div>
                        <h3 style="font-size:1rem; margin:0 0 8px; font-weight: 700;">${node.label}</h3>
                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 12px;">ID: ${node.id}</div>
                        <button class="popup-btn" style="background:var(--ink-secondary); color:#fff; border:none; width:100%; padding:10px; border-radius:6px; font-size: 0.75rem; font-weight:700; cursor:pointer;" onclick="mapInstance.flyTo({center: [${node.lng}, ${node.lat}], zoom: 14})">Center View</button>
                    </div>
                `))
            .addTo(mapInstance);
            
        mapMarkers.push(marker);
    });

    // Update Counter UI
    const activeEl = document.getElementById('activeNodesCount');
    const alertEl = document.getElementById('alertNodesCount');
    if (activeEl) activeEl.textContent = activeTotal;
    if (alertEl) alertEl.textContent = alertTotal;
}

function downloadAudit(companyName) {
    const element = document.querySelector('.audit-certificate-wrap');
    if (!element) {
        alert("Certificate container not found.");
        return;
    }

    // Snapshot the current HTML so images aren't re-fetched
    const certHTML = element.outerHTML;
    const cleanName = companyName.replace(/[^a-z0-9]/gi, '_').toUpperCase();

    // Collect all existing <style> and <link rel="stylesheet"> from the host page
    const styles = Array.from(document.styleSheets).map(sheet => {
        try {
            const rules = Array.from(sheet.cssRules).map(r => r.cssText).join('\n');
            return `<style>${rules}</style>`;
        } catch {
            // Cross-origin sheets can't be read — link them by href instead
            return sheet.href ? `<link rel="stylesheet" href="${sheet.href}">` : '';
        }
    }).join('\n');

    const printWin = window.open('', '_blank', 'width=900,height=700');
    printWin.document.write(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${cleanName}_NEDB_Audit_2026</title>
    ${styles}
    <style>
        @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
        }
        body { background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; }
    </style>
</head>
<body>
    ${certHTML}
    <script>
        // Wait for images to load before printing
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.print();
                window.close();
            }, 400);
        });
    <\/script>
</body>
</html>`);
    printWin.document.close();
}

function showPageInfo(view) {
    const info = {
        overview: "Executive summary of national petroleum throughput, showing fiscal settlement velocity and distribution health across all 36 states.",
        settlements: "Central Bank of Nigeria (CBN) verification portal. Tracks the immediate transmission of product revenues into the Single Treasury Account.",
        iot: "Tactical engineering substrate monitoring real-time pressure, signal integrity, and location telemetry for 12,000+ national mesh nodes."
    };
    alert(`[NEDB INTELLIGENCE OVERVIEW]\n\n${info[view] || "Sector documentation is currently restricted to cleared operators."}`);
}

function initGlobalSearch() {
    const searchInput = document.getElementById('companySearch');
    const resultsContainer = document.getElementById('searchResults');
    if (!searchInput || !resultsContainer) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
            return;
        }

        // Filter matches
        const matches = Object.keys(companyData).filter(key => {
            const data = companyData[key];
            return key.toLowerCase().includes(query) || data.name.toLowerCase().includes(query);
        });

        resultsContainer.classList.add('active');
        if (matches.length > 0) {
            resultsContainer.innerHTML = matches.map(key => {
                const data = companyData[key];
                return `
                    <div class="search-result-item" onclick="selectCompanySearch('${key}')">
                        <img src="${data.logo}">
                        <span style="font-weight: 700;">${data.name}</span>
                    </div>
                `;
            }).join('');
        } else {
            resultsContainer.innerHTML = `
                <div class="search-no-match">
                    <i class="fas fa-circle-exclamation"></i> 
                    Entry not found in National Ledger.<br>
                    <b>Please contact System Administrator.</b>
                </div>
            `;
        }
    });

    // Close results on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('active');
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchInput.blur();
    });
}

function selectCompanySearch(key) {
    const data = companyData[key];
    if (!data) return;

    currentKey = key;
    currentCompany = data.name;
    saveState();
    syncUI(currentKey);

    // Take user to the Revenue page
    renderPage('revenue');

    // Clean up
    const searchInput = document.getElementById('companySearch');
    const resultsContainer = document.getElementById('searchResults');
    if (searchInput) searchInput.value = '';
    if (resultsContainer) resultsContainer.classList.remove('active');
}

function initChartFilters() {
    const filterBtn = document.getElementById('filterBtn');
    if (!filterBtn) return;
    
    filterBtn.onclick = () => {
        if (!mixChart) return;
        const datasets = mixChart.data.datasets;
        const pmsHidden = datasets[0].hidden;
        const agoHidden = datasets[1].hidden;
        
        if (!pmsHidden && !agoHidden) {
            datasets[1].hidden = true;
        } else if (!pmsHidden && agoHidden) {
            datasets[0].hidden = true;
            datasets[1].hidden = false;
        } else {
            datasets[0].hidden = false;
            datasets[1].hidden = false;
        }
        mixChart.update();
    };
}