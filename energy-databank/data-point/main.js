// Data Point — Downstream Intelligence Logic Engine

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load persisted state
    loadState();
    
    // 2. Initialize Core Components
    try {
        initTimestamp();
        initChart();
        initSearch();
        initReporters();
        initSidebar();
        initPillTabs();
        fetchCbnRate();
        startLogTicker();

        // 3. Render Initial Page (based on persisted state or default)
        renderPage(currentPage);
        
        // 4. Highlight correct sidebar link
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const pageId = link.id.replace('side', '').toLowerCase();
            // Handle NodeMap case specifically
            const normalizedId = pageId === 'nodemap' ? 'nodemap' : pageId;
            if (normalizedId === currentPage) {
                link.classList.add('active');
            }
        });

        // 5. Restore company context if persisted
        if (currentKey !== 'national') {
            initMetrics(currentKey);
            const data = companyData[currentKey];
            if (data) {
                currentCompany = data.name;
                const dashLogo = document.getElementById('dashLogo');
                const chipLabel = document.getElementById('chipLabel');
                if (chipLabel) chipLabel.textContent = data.name;
                if (dashLogo) dashLogo.src = data.logo;
            }
        } else {
            initMetrics('national');
        }
    } catch (err) {
        console.error("Dashboard Persistence Init Error:", err);
        // Fallback to basic load if state fails
        renderPage('overview');
    }
});

let mixChart;
let globalFx = 1485.20;
let currentCompany = 'National Aggregate';

/* =============================================
   DATA STORE
   ============================================= */
const companyData = {
    national: {
        name: 'National Aggregate',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Coat_of_arms_of_Nigeria.svg',
        pms: 62000000,
        ago: 89400,
        revenue: 98.6,
        nodes: 12402,
        mix: {
            daily: { pms: [420, 540, 680, 590, 610, 550, 480], ago: [150, 210, 280, 240, 250, 230, 210], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [3100, 3800, 4200, 3900, 4100, 3700, 3500], ago: [1200, 1500, 1700, 1600, 1650, 1550, 1400], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [15000, 17200, 18800, 16900, 19200, 18400, 20100], ago: [5800, 6400, 7100, 6600, 7400, 7000, 7800], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    },
    oando: {
        name: 'OANDO PLC',
        logo: '../assets/oando-hd-logo.png',
        pms: 8420000,
        ago: 12500,
        revenue: 12.4,
        nodes: 1402,
        mix: {
            daily: { pms: [450, 520, 610, 580, 590, 540, 480], ago: [210, 240, 280, 260, 270, 240, 220], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [2800, 3100, 3600, 3400, 3500, 3200, 2900], ago: [1100, 1300, 1500, 1400, 1450, 1300, 1200], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [11000, 12500, 14000, 13200, 14500, 13800, 15200], ago: [4400, 5100, 5600, 5200, 5700, 5500, 6100], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    },
    nnpc: {
        name: 'NNPC Retail Ltd',
        logo: '../assets/nnpc-logo.77c29e8.png',
        pms: 22500000,
        ago: 34200,
        revenue: 35.8,
        nodes: 4210,
        mix: {
            daily: { pms: [1200, 1400, 1680, 1590, 1610, 1550, 1480], ago: [610, 640, 780, 760, 770, 740, 720], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [8200, 9500, 10800, 10200, 10600, 9900, 9400], ago: [3900, 4400, 5100, 4800, 5000, 4700, 4500], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [40000, 45000, 50000, 47000, 52000, 49000, 55000], ago: [18000, 20000, 22500, 21000, 23500, 22000, 25000], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    },
    total: {
        name: 'TotalEnergies Nigeria',
        logo: '../assets/total energies.jpeg',
        pms: 10800000,
        ago: 18400,
        revenue: 16.2,
        nodes: 1840,
        mix: {
            daily: { pms: [580, 640, 880, 790, 810, 750, 680], ago: [310, 340, 480, 460, 470, 440, 420], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [3800, 4300, 5200, 4800, 5000, 4600, 4300], ago: [1900, 2200, 2600, 2400, 2500, 2300, 2150], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [16000, 18500, 21000, 19500, 22000, 20800, 23500], ago: [7000, 8000, 9200, 8600, 9700, 9100, 10300], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    },
    ardova: {
        name: 'ARDOVA PLC',
        logo: '../assets/ardova.png',
        pms: 6200000,
        ago: 9200,
        revenue: 8.9,
        nodes: 950,
        mix: {
            daily: { pms: [320, 410, 480, 405, 430, 450, 390], ago: [110, 140, 280, 205, 230, 250, 190], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [2100, 2600, 2900, 2700, 2850, 2700, 2500], ago: [800, 1000, 1150, 1050, 1100, 1050, 980], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [9000, 10500, 11800, 11000, 12200, 11500, 13000], ago: [3500, 4100, 4600, 4300, 4800, 4500, 5100], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    },
    conoil: {
        name: 'Conoil PLC',
        logo: '../assets/conoil.png',
        pms: 4800000,
        ago: 6400,
        revenue: 6.2,
        nodes: 720,
        mix: {
            daily: { pms: [280, 310, 350, 320, 340, 310, 290], ago: [90, 110, 140, 120, 130, 110, 100], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [1800, 1950, 2200, 2050, 2150, 2000, 1900], ago: [650, 720, 850, 780, 810, 760, 720], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [7800, 8400, 9600, 8900, 9800, 9200, 10500], ago: [2800, 3100, 3600, 3300, 3700, 3500, 4100], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    },
    mrs: {
        name: 'MRS Oil Nigeria',
        logo: '../assets/mrs.png',
        pms: 3900000,
        ago: 5100,
        revenue: 5.4,
        nodes: 612,
        mix: {
            daily: { pms: [210, 240, 280, 250, 260, 240, 220], ago: [70, 90, 110, 100, 105, 95, 85], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            weekly: { pms: [1400, 1550, 1750, 1650, 1700, 1600, 1500], ago: [480, 540, 620, 580, 600, 560, 520], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'] },
            monthly: { pms: [6200, 6800, 7800, 7200, 8100, 7600, 8800], ago: [2100, 2400, 2800, 2600, 2900, 2750, 3200], labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] }
        }
    }
};

/* =============================================
   IOT NODE DATA
   ============================================= */
const iotNodes = [
    { id: 'NG-LAG-01', lat: 6.5244, lng: 3.3792, company: 'nnpc', type: 'Static', label: 'Atlas Cove Depot', status: 'Optimal' },
    { id: 'NG-LAG-02', lat: 6.4253, lng: 3.4095, company: 'oando', type: 'Mobile', label: 'Truck #841 - Lagos Metro', status: 'Moving' },
    { id: 'NG-ABJ-01', lat: 9.0765, lng: 7.3986, company: 'nnpc', type: 'Static', label: 'Abuja Hub B', status: 'Optimal' },
    { id: 'NG-PHC-01', lat: 4.8156, lng: 7.0498, company: 'total', type: 'Static', label: 'Onne Terminal Depot', status: 'Optimal' },
    { id: 'NG-PHC-02', lat: 4.7500, lng: 7.1200, company: 'total', type: 'Mobile', label: 'Vessel - Calabar Run', status: 'Moving' },
    { id: 'NG-KAN-01', lat: 12.0022, lng: 8.5920, company: 'conoil', type: 'Static', label: 'Kano Industrial Depot', status: 'Low' },
    { id: 'NG-WAR-01', lat: 12.0100, lng: 8.6100, company: 'oando', type: 'Mobile', label: 'Truck #212 - Kano Loop', status: 'Moving' },
    { id: 'NG-WAR-02', lat: 5.5160, lng: 5.7505, company: 'mrs', type: 'Static', label: 'Warri Refinery Point', status: 'Optimal' },
    { id: 'NG-KAD-01', lat: 10.5105, lng: 7.4165, company: 'ardova', type: 'Static', label: 'Kaduna North Terminal', status: 'Critical' },
    { id: 'NG-LG-09', lat: 6.4500, lng: 3.6000, company: 'ardova', type: 'Mobile', label: 'Truck #901 - Ikorodu Hwy', status: 'Moving' },
    { id: 'NG-IB-03', lat: 7.3775, lng: 3.9470, company: 'conoil', type: 'Mobile', label: 'Truck #118 - Ibadan Route', status: 'Moving' },
    { id: 'NG-EN-01', lat: 6.4253, lng: 7.5083, company: 'mrs', type: 'Mobile', label: 'Vessel #002 - Enugu Depot', status: 'Moving' },
];

let iotLeafletMap = null;
let mapMarkers = [];

let currentRange = 'daily';
let currentKey = 'national';
let currentPage = 'overview';

/* =============================================
   STATE PERSISTENCE
   ============================================= */
function saveState() {
    const state = { currentPage, currentKey, currentRange };
    localStorage.setItem('datapoint_state', JSON.stringify(state));
}

function loadState() {
    try {
        const saved = localStorage.getItem('datapoint_state');
        if (saved) {
            const state = JSON.parse(saved);
            currentPage = state.currentPage || 'overview';
            currentKey = state.currentKey || 'national';
            currentRange = state.currentRange || 'daily';
            return true;
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
    return false;
}

/* =============================================
   TIMESTAMP
   ============================================= */
function initTimestamp() {
    const el = document.getElementById('lastUpdated');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setInterval(() => {
        const n = new Date();
        el.textContent = n.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
}

/* =============================================
   METRICS
   ============================================= */
function initMetrics(key) {
    const data = companyData[key];
    if (!data) return;
    countUp('pmsMetric', data.pms, v => formatVolume(v));
    countUp('agoMetric', data.ago, v => formatBrl(v));
    countUp('revMetric', data.revenue * 1e9, v => `₦${(v / 1e9).toFixed(1)}b`);
    countUp('iotMetric', data.nodes, v => Math.round(v).toLocaleString());
}

function countUp(id, target, formatter) {
    const el = document.getElementById(id);
    if (!el) return;
    const duration = 800;
    const start = performance.now();
    const from = 0;
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatter(from + (target - from) * eased);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function formatVolume(v) {
    if (v >= 1e9) return `${(v / 1e9).toFixed(1)}b`;
    if (v >= 1e6) return `${(v / 1e6).toFixed(1)}m`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(0)}k`;
    return Math.round(v).toString();
}

function formatBrl(v) {
    if (v >= 1e6) return `${(v / 1e6).toFixed(1)}m`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(1)}k`;
    return Math.round(v).toString();
}

/* =============================================
   SEARCH
   ============================================= */
function initSearch() {
    const input = document.getElementById('companySearch');
    if (!input) return;
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const q = input.value.toLowerCase().trim();
            const match = Object.keys(companyData).find(k => k.includes(q) || companyData[k].name.toLowerCase().includes(q));
            if (match) {
                switchEntity(match);
                input.value = '';
                input.blur();
            } else {
                renderNotFound(document.querySelector('.content'), q);
                input.value = '';
                input.blur();
            }
        }
    });
}

function switchEntity(key) {
    if (!companyData[key]) return;
    currentKey = key;
    const data = companyData[key];
    currentCompany = data.name;

    const dashLogo = document.getElementById('dashLogo');
    const dashTitle = document.getElementById('dashTitle');
    const dashSubtitle = document.getElementById('dashSubtitle');
    const entityChip = document.getElementById('entityChip');
    const chipLabel = document.getElementById('chipLabel');

    if (dashLogo) {
        dashLogo.src = data.logo;
    }
    if (dashTitle) {
        dashTitle.innerHTML = key === 'national'
            ? `National Downstream<br><span>Intelligence.</span>`
            : `${data.name.split(' ')[0]}<br><span>Intelligence.</span>`;
    }
    if (dashSubtitle) {
        dashSubtitle.textContent = key === 'national'
            ? 'Aggregated industry data for verified petroleum product sales.'
            : `Full IoT telemetry and revenue projections for ${data.name}.`;
    }
    if (entityChip && chipLabel && key !== 'national') {
        chipLabel.innerHTML = `<img src="${data.logo}" style="width:16px;height:16px;border-radius:4px;margin-right:8px;vertical-align:middle;"> ${data.name}`;
        entityChip.classList.add('visible');
    } else if (entityChip) {
        entityChip.classList.remove('visible');
    }

    initMetrics(key);
    renderPage('overview');
    saveState();
    pushLog(`[SYSTEM] Switched to dedicated feed for ${data.name}. Nodes online: ${data.nodes.toLocaleString()}.`);
}

/* =============================================
   CHART
   ============================================= */
function initChart() {
    const ctx = document.getElementById('mixChart')?.getContext('2d');
    if (!ctx) return;
    const d = companyData['national']?.mix?.['daily'];
    if (!d) return;

    mixChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: d.labels,
            datasets: [
                {
                    label: 'PMS (Premium Motor Spirit)',
                    data: d.pms,
                    borderColor: '#00d068',
                    borderWidth: 2,
                    tension: 0.35,
                    fill: true,
                    backgroundColor: (ctx) => {
                        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
                        gradient.addColorStop(0, 'rgba(0,208,104,0.12)');
                        gradient.addColorStop(1, 'rgba(0,208,104,0)');
                        return gradient;
                    },
                    pointRadius: 4,
                    pointBackgroundColor: '#00d068',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                },
                {
                    label: 'AGO (Automotive Gas Oil)',
                    data: d.ago,
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    tension: 0.35,
                    fill: true,
                    backgroundColor: (ctx) => {
                        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
                        gradient.addColorStop(0, 'rgba(59,130,246,0.08)');
                        gradient.addColorStop(1, 'rgba(59,130,246,0)');
                        return gradient;
                    },
                    pointRadius: 4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 7,
                        font: { size: 11, family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", weight: '500' },
                        color: '#4a607a',
                        padding: 16
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10,15,30,0.92)',
                    titleColor: '#f0f4ff',
                    bodyColor: '#8899b4',
                    padding: 12,
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    titleFont: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", weight: '600', size: 12 },
                    bodyFont: { family: "'SF Mono', ui-monospace, monospace", size: 11 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
                    border: { dash: [4, 4] },
                    ticks: {
                        font: { size: 10, family: "'SF Mono', ui-monospace, monospace" },
                        color: '#8899b4',
                        padding: 8
                    }
                },
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                        font: { size: 10, family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" },
                        color: '#8899b4',
                        padding: 8
                    }
                }
            }
        }
    });
}

function updateChart() {
    if (!mixChart) return;
    const d = companyData[currentKey]?.mix?.[currentRange];
    if (!d) return;
    mixChart.data.labels = d.labels;
    mixChart.data.datasets[0].data = d.pms;
    mixChart.data.datasets[1].data = d.ago;
    mixChart.update('active');
}

function initPillTabs() {
    document.querySelectorAll('.pill-tab[data-range]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.pill-tab[data-range]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentRange = tab.dataset.range;
            updateChart();
        });
    });
}

/* =============================================
   PAGE RENDERER
   ============================================= */
function renderPage(page) {
    currentPage = page;
    const content = document.querySelector('.content');
    if (!content) return;

    // Destroy existing chart instance before replacing DOM
    if (mixChart) {
        mixChart.destroy();
        mixChart = null;
    }

    const pages = {
        overview: renderOverview,
        petroleum: renderPetroleum,
        insights: renderInsights,
        settlements: renderSettlements,
        iot: renderIoT,
        nodemap: renderNodeMap,
        not_found: renderNotFound
    };

    if (pages[page]) {
        content.innerHTML = '';
        pages[page](content);
        currentPage = page;
        saveState();
    }
}

/* ---- NOT FOUND / SEARCH ERROR ---- */
function renderNotFound(content, query = '') {
    if (!content) return;
    
    // Reset any state
    if (mixChart) {
        mixChart.destroy();
        mixChart = null;
    }

    content.innerHTML = `
        <div style="height: calc(100vh - 200px); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; animation: fadeIn 0.5s ease;">
            <div style="width: 80px; height: 80px; background: rgba(239, 68, 68, 0.08); color: var(--red); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1.5rem; border: 1px solid rgba(239, 68, 68, 0.1);">
                <i class="fas fa-building-circle-exclamation"></i>
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; letter-spacing: -0.02em;">Entity Not Listed.</h2>
            <p style="color: var(--text-dark-secondary); max-width: 400px; line-height: 1.6; margin-bottom: 2rem;">
                The company "<span style="color: var(--text-dark); font-weight: 600;">${query || 'Unknown'}</span>" was not found in the Data Point intelligence grid. Access may be restricted or the node is offline.
            </p>
            <div style="padding: 1.25rem 2rem; background: var(--surface); border: 1px solid var(--border-light); border-radius: 16px; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-dark-secondary); text-transform: uppercase; letter-spacing: 0.05em;">How to proceed</span>
                <span style="font-size: 0.95rem; color: var(--text-dark);">Please contact <a href="mailto:admin@datapoint.gov" style="color: var(--blue); text-decoration: none; font-weight: 500;">Administrations</a></span>
            </div>
            <button onclick="renderPage('overview')" style="margin-top: 2.5rem; background: none; border: none; color: var(--text-dark-secondary); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: color 0.2s;">
                <i class="fas fa-arrow-left"></i> Return to National Overview
            </button>
        </div>
    `;
    
    // Update topbar chip if it exists
    const entityChip = document.getElementById('entityChip');
    if (entityChip) entityChip.classList.remove('visible');
    
    pushLog(`[SEARCH] Query failed for "${query}". Redirected to administrative contact.`);
}

/* ---- OVERVIEW (original dashboard) ---- */
function renderOverview(content) {
    content.innerHTML = `
        <div class="page-header">
            <div style="display:flex;align-items:center;gap:1rem;">
                <img id="dashLogo" src="${companyData[currentKey].logo}" style="width:52px;height:52px;border-radius:12px;object-fit:contain;background:white;padding:4px;border:1px solid var(--border-light);">
                <div>
                    <h2 class="page-title" id="dashTitle">${companyData[currentKey] === companyData.national ? 'National Downstream' : companyData[currentKey].name}<br><span>Intelligence.</span></h2>
                    <p class="page-subtitle" id="dashSubtitle">Aggregated industry data for verified petroleum product sales.</p>
                </div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:0.7rem;font-weight:600;color:var(--text-dark-secondary);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.3rem;">Last Updated</div>
                <div style="font-family:var(--mono);font-size:0.85rem;color:var(--text-dark);" id="lastUpdated">—</div>
            </div>
        </div>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">PMS Volume (Liters)</div>
                <div class="metric-value" id="pmsMetric">—</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 2.1% vs last week</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">AGO (BRL Equivalent)</div>
                <div class="metric-value" id="agoMetric">—</div>
                <div class="metric-trend down"><i class="fas fa-arrow-down"></i> 0.8% vs last week</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Market Revenue (₦)</div>
                <div class="metric-value" id="revMetric">—</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 5.4% vs last week</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">IoT Nodes Verified</div>
                <div class="metric-value" id="iotMetric">—</div>
                <div class="metric-trend neutral"><i class="fas fa-circle-check"></i> All nodes active</div>
            </div>
        </div>
        <div class="chart-block">
            <div class="chart-header">
                <div>
                    <h3>Product Delivery Projections</h3>
                    <div class="chart-desc">PMS vs AGO — daily throughput in barrels equivalent</div>
                </div>
                <div style="display:flex;gap:0.75rem;align-items:center;flex-wrap:wrap;">
                    <div class="pill-tabs">
                        <button class="pill-tab active" data-range="daily">Daily</button>
                        <button class="pill-tab" data-range="weekly">Weekly</button>
                        <button class="pill-tab" data-range="monthly">Monthly</button>
                    </div>
                    <button class="topbar-action" id="filterBtn" style="font-size:0.78rem;">
                        <i class="fas fa-sliders"></i><span>Filter</span>
                    </button>
                </div>
            </div>
            <div class="chart-canvas-wrap"><canvas id="mixChart"></canvas></div>
        </div>
        <div class="log-block">
            <div class="log-header">
                <h3>Live IoT Downstream Telemetry</h3>
                <div class="live-indicator"><span class="live-dot"></span>Real-time feed</div>
            </div>
            <div class="log-body" id="logStage">
                <div class="log-item">
                    <span class="log-ts">INIT</span>
                    <span class="log-msg">Connecting to national IoT nexus via CBN-Secure Bridge…</span>
                </div>
            </div>
        </div>`;

    initTimestamp();
    initChart();
    initMetrics(currentKey);
    initPillTabs();

    document.getElementById('filterBtn')?.addEventListener('click', () => {
        pushLog(`[FILTER] Displaying high-velocity IoT nodes for ${currentCompany}. Nodes above 95th percentile shown.`);
    });

    // Restore entity chip state
    const entityChip = document.getElementById('entityChip');
    const chipLabel = document.getElementById('chipLabel');
    if (entityChip && chipLabel && currentKey !== 'national') {
        const data = companyData[currentKey];
        chipLabel.innerHTML = `<img src="${data.logo}" style="width:16px;height:16px;border-radius:4px;margin-right:8px;vertical-align:middle;"> ${data.name}`;
        entityChip.classList.add('visible');
        const dt = document.getElementById('dashTitle');
        const ds = document.getElementById('dashSubtitle');
        if (dt) dt.innerHTML = `${data.name.split(' ')[0]}<br><span>Intelligence.</span>`;
        if (ds) ds.textContent = `Full IoT telemetry and revenue projections for ${data.name}.`;
    }
}

/* ---- DOWNSTREAM OIL ---- */
function renderPetroleum(content) {
    const depots = [
        { name: 'Atlas Cove — Lagos', capacity: 480, current: 312, product: 'PMS', status: 'Optimal' },
        { name: 'Mosimi — Ogun', capacity: 360, current: 298, product: 'AGO', status: 'Optimal' },
        { name: 'Warri — Delta', capacity: 420, current: 187, product: 'PMS', status: 'Low' },
        { name: 'Port Harcourt — Rivers', capacity: 510, current: 430, product: 'DPK', status: 'Optimal' },
        { name: 'Kaduna — NW', capacity: 290, current: 94, product: 'AGO', status: 'Critical' },
        { name: 'Apapa — Lagos', capacity: 600, current: 521, product: 'PMS', status: 'Optimal' },
        { name: 'Onne — Rivers', capacity: 340, current: 210, product: 'DPK', status: 'Moderate' },
        { name: 'Calabar — Cross River', capacity: 260, current: 88, product: 'AGO', status: 'Low' },
    ];

    const statusColor = { Optimal: 'var(--green)', Low: 'var(--amber)', Critical: 'var(--red)', Moderate: '#3b82f6' };
    const statusBg = { Optimal: 'rgba(0,208,104,0.08)', Low: 'rgba(245,158,11,0.1)', Critical: 'rgba(239,68,68,0.1)', Moderate: 'rgba(59,130,246,0.1)' };

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h2 class="page-title">Downstream Oil<br><span>Operations.</span></h2>
                <p class="page-subtitle">Depot inventory, pipeline flow, and product allocation across all terminals.</p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:0.7rem;font-weight:600;color:var(--text-dark-secondary);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.3rem;">Last Updated</div>
                <div style="font-family:var(--mono);font-size:0.85rem;color:var(--text-dark);" id="lastUpdated">—</div>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Total Depot Capacity (ML)</div>
                <div class="metric-value" style="font-family:var(--mono);">3,260</div>
                <div class="metric-trend neutral"><i class="fas fa-warehouse"></i> 8 active terminals</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Current Stock Level</div>
                <div class="metric-value" style="font-family:var(--mono);">2,140</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 65.6% utilisation</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Pipeline Pressure (avg)</div>
                <div class="metric-value" style="font-family:var(--mono);">142 PSI</div>
                <div class="metric-trend neutral"><i class="fas fa-circle-check"></i> Within tolerance</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Critical Alerts</div>
                <div class="metric-value" style="font-family:var(--mono);color:var(--red);">2</div>
                <div class="metric-trend down"><i class="fas fa-triangle-exclamation"></i> Requires attention</div>
            </div>
        </div>

        <div class="chart-block">
            <div class="chart-header">
                <div>
                    <h3>Depot Inventory Status</h3>
                    <div class="chart-desc">Current stock vs capacity — all terminals (megalitres)</div>
                </div>
            </div>
            <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
                    <thead>
                        <tr style="border-bottom:2px solid var(--border-light);">
                            <th style="text-align:left;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Terminal</th>
                            <th style="text-align:left;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Product</th>
                            <th style="text-align:right;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Stock (ML)</th>
                            <th style="text-align:right;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Capacity</th>
                            <th style="padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Fill Level</th>
                            <th style="text-align:center;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${depots.map((d, i) => {
        const pct = Math.round((d.current / d.capacity) * 100);
        const barColor = d.status === 'Critical' ? 'var(--red)' : d.status === 'Low' ? 'var(--amber)' : d.status === 'Moderate' ? '#3b82f6' : 'var(--green)';
        return `<tr style="border-bottom:1px solid var(--border-light);transition:background 0.15s;" onmouseover="this.style.background='rgba(0,0,0,0.018)'" onmouseout="this.style.background=''">
                                <td style="padding:0.85rem 1rem;font-weight:500;color:var(--text-dark);">${d.name}</td>
                                <td style="padding:0.85rem 1rem;"><span style="font-size:0.72rem;font-weight:600;padding:0.2rem 0.55rem;border-radius:999px;background:rgba(0,0,0,0.05);color:var(--text-dark-secondary);">${d.product}</span></td>
                                <td style="padding:0.85rem 1rem;text-align:right;font-family:var(--mono);font-size:0.88rem;">${d.current}</td>
                                <td style="padding:0.85rem 1rem;text-align:right;font-family:var(--mono);font-size:0.88rem;color:var(--text-dark-secondary);">${d.capacity}</td>
                                <td style="padding:0.85rem 1rem;">
                                    <div style="display:flex;align-items:center;gap:0.6rem;min-width:120px;">
                                        <div style="flex:1;height:6px;background:var(--border-light);border-radius:999px;overflow:hidden;">
                                            <div style="width:${pct}%;height:100%;background:${barColor};border-radius:999px;transition:width 0.6s ease;"></div>
                                        </div>
                                        <span style="font-family:var(--mono);font-size:0.75rem;color:var(--text-dark-secondary);flex-shrink:0;">${pct}%</span>
                                    </div>
                                </td>
                                <td style="padding:0.85rem 1rem;text-align:center;">
                                    <span style="font-size:0.72rem;font-weight:600;padding:0.25rem 0.65rem;border-radius:999px;background:${statusBg[d.status]};color:${statusColor[d.status]};">${d.status}</span>
                                </td>
                            </tr>`;
    }).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="log-block">
            <div class="log-header">
                <h3>Pipeline & Terminal Feed</h3>
                <div class="live-indicator"><span class="live-dot"></span>Real-time feed</div>
            </div>
            <div class="log-body" id="logStage">
                <div class="log-item"><span class="log-ts">INIT</span><span class="log-msg">Connecting to terminal monitoring network…</span></div>
            </div>
        </div>`;

    initTimestamp();
    setTimeout(() => {
        pushLog('[ATLAS-COVE] Flow meter reading: 1,240 L/min. Tanker discharge in progress.');
        pushLog('[KADUNA] Stock level below 35% threshold. Replenishment request submitted.');
        pushLog('[WARRI] Pipeline pressure normalised after maintenance window.');
        pushLog('[SYSTEM] All 8 terminal feeds confirmed active.');
    }, 400);
}

/* ---- RETAIL INSIGHTS ---- */
function renderInsights(content) {
    const retailers = [
        { name: 'NNPC Retail', share: 36.2, stations: 612, avgDaily: 18400, growth: '+3.2%', trend: 'up', logo: '../assets/nnpc-logo.77c29e8.png' },
        { name: 'TotalEnergies', share: 16.4, stations: 284, avgDaily: 8200, growth: '+1.8%', trend: 'up', logo: '../assets/total energies.jpeg' },
        { name: 'OANDO PLC', share: 12.8, stations: 198, avgDaily: 6400, growth: '-0.4%', trend: 'down', logo: '../assets/oando-hd-logo.png' },
        { name: 'ARDOVA PLC', share: 9.0, stations: 142, avgDaily: 4500, growth: '+0.9%', trend: 'up', logo: '../assets/ardova.png' },
        { name: 'Conoil', share: 7.6, stations: 118, avgDaily: 3800, growth: '+2.1%', trend: 'up', logo: '../assets/conoil.png' },
        { name: 'MRS Oil', share: 6.2, stations: 96, avgDaily: 3100, growth: '-1.2%', trend: 'down', logo: '../assets/mrs.png' },
        { name: 'Others', share: 11.8, stations: 320, avgDaily: 5900, growth: '+0.3%', trend: 'up' },
    ];

    const colors = ['#00d068', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#94a3b8'];

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h2 class="page-title">Retail Insights<br><span>& Market Share.</span></h2>
                <p class="page-subtitle">Station-level performance, market share analysis, and regional sales breakdown.</p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:0.7rem;font-weight:600;color:var(--text-dark-secondary);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.3rem;">Last Updated</div>
                <div style="font-family:var(--mono);font-size:0.85rem;color:var(--text-dark);" id="lastUpdated">—</div>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Active Retail Stations</div>
                <div class="metric-value" style="font-family:var(--mono);">1,770</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 14 new this month</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Avg Daily Throughput</div>
                <div class="metric-value" style="font-family:var(--mono);">50.3k L</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> per station</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">PMS Retail Price (avg)</div>
                <div class="metric-value" style="font-family:var(--mono);">₦897</div>
                <div class="metric-trend neutral"><i class="fas fa-minus"></i> Stable this week</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Non-compliance Flags</div>
                <div class="metric-value" style="font-family:var(--mono);color:var(--amber);">38</div>
                <div class="metric-trend down"><i class="fas fa-triangle-exclamation"></i> Under review</div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.75rem;">
            <div class="chart-block" style="margin-bottom:0;">
                <div class="chart-header" style="margin-bottom:1rem;">
                    <div>
                        <h3>Market Share</h3>
                        <div class="chart-desc">By retailer — % of national PMS volume</div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:0.6rem;">
                    ${retailers.map((r, i) => `
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <img src="${r.logo}" style="width:20px;height:20px;border-radius:4px;object-fit:contain;background:white;">
                        <div style="width:90px;font-size:0.78rem;color:var(--text-dark-secondary);flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.name}</div>
                        <div style="flex:1;height:8px;background:var(--surface);border-radius:999px;overflow:hidden;border:1px solid var(--border-light);">
                            <div style="width:${r.share / 40 * 100}%;height:100%;background:${colors[i]};border-radius:999px;"></div>
                        </div>
                        <div style="font-family:var(--mono);font-size:0.78rem;font-weight:500;width:36px;text-align:right;">${r.share}%</div>
                    </div>`).join('')}
                </div>
            </div>

            <div class="chart-block" style="margin-bottom:0;">
                <div class="chart-header" style="margin-bottom:1rem;">
                    <div>
                        <h3>Regional Breakdown</h3>
                        <div class="chart-desc">Sales volume by geopolitical zone</div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:0.85rem;">
                    ${[
            { zone: 'South West', pct: 31, vol: '19.2m L' },
            { zone: 'North Central', pct: 18, vol: '11.2m L' },
            { zone: 'South South', pct: 16, vol: '9.9m L' },
            { zone: 'North West', pct: 14, vol: '8.7m L' },
            { zone: 'South East', pct: 11, vol: '6.8m L' },
            { zone: 'North East', pct: 10, vol: '6.2m L' },
        ].map(z => `
                    <div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.3rem;">
                            <span style="font-size:0.82rem;font-weight:500;color:var(--text-dark);">${z.zone}</span>
                            <span style="font-family:var(--mono);font-size:0.78rem;color:var(--text-dark-secondary);">${z.vol}</span>
                        </div>
                        <div style="height:6px;background:var(--surface);border-radius:999px;overflow:hidden;border:1px solid var(--border-light);">
                            <div style="width:${z.pct}%;height:100%;background:var(--green);border-radius:999px;opacity:${0.4 + z.pct / 60};"></div>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
        </div>

        <div class="log-block">
            <div class="log-header">
                <h3>Retail Intelligence Feed</h3>
                <div class="live-indicator"><span class="live-dot"></span>Real-time feed</div>
            </div>
            <div class="log-body" id="logStage">
                <div class="log-item"><span class="log-ts">INIT</span><span class="log-msg">Loading retail telemetry streams…</span></div>
            </div>
        </div>`;

    initTimestamp();
    setTimeout(() => {
        pushLog('[NNPC] 14 new stations activated in Abuja metro corridor this week.');
        pushLog('[COMPLIANCE] 38 stations flagged for price-cap violations. DPR notified.');
        pushLog('[ARDOVA] Average queue time down 18% following nozzle-count upgrade.');
        pushLog('[SYSTEM] Retail telemetry feed live. 1,770 stations reporting.');
    }, 400);
}

/* ---- CBN SETTLEMENTS ---- */
function renderSettlements(content) {
    const transactions = [
        { ref: 'CBN-TXN-240417-0091', entity: 'NNPC Retail', logo: '../assets/nnpc-logo.77c29e8.png', amount: '₦4.82b', type: 'Subsidy Disbursement', status: 'Settled', date: 'Today 09:14' },
        { ref: 'CBN-TXN-240417-0088', entity: 'TotalEnergies', logo: '../assets/total energies.jpeg', amount: '₦2.11b', type: 'Import Levy', status: 'Settled', date: 'Today 08:52' },
        { ref: 'CBN-TXN-240417-0084', entity: 'ARDOVA PLC', logo: '../assets/ardova.png', amount: '₦890m', type: 'Subsidy Disbursement', status: 'Pending', date: 'Today 08:31' },
        { ref: 'CBN-TXN-240416-0074', entity: 'OANDO PLC', logo: '../assets/oando-hd-logo.png', amount: '₦1.44b', type: 'Pipeline Tariff', status: 'Settled', date: 'Yesterday 16:40' },
        { ref: 'CBN-TXN-240416-0070', entity: 'Conoil', logo: '../assets/conoil.png', amount: '₦620m', type: 'Import Levy', status: 'Settled', date: 'Yesterday 14:18' },
        { ref: 'CBN-TXN-240416-0068', entity: 'MRS Oil', logo: '../assets/mrs.png', amount: '₦510m', type: 'Subsidy Disbursement', status: 'Failed', date: 'Yesterday 11:05' },
        { ref: 'CBN-TXN-240415-0055', entity: 'NNPC Retail', logo: '../assets/nnpc-logo.77c29e8.png', amount: '₦3.96b', type: 'Bridging Fund', status: 'Settled', date: 'Apr 15, 2026' },
        { ref: 'CBN-TXN-240415-0051', entity: 'TotalEnergies', logo: '../assets/total energies.jpeg', amount: '₦1.78b', type: 'Subsidy Disbursement', status: 'Settled', date: 'Apr 15, 2026' },
    ];

    const statusColor = { Settled: 'var(--green)', Pending: 'var(--amber)', Failed: 'var(--red)' };
    const statusBg = { Settled: 'rgba(0,208,104,0.08)', Pending: 'rgba(245,158,11,0.1)', Failed: 'rgba(239,68,68,0.1)' };

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h2 class="page-title">CBN Settlements<br><span>& Reconciliation.</span></h2>
                <p class="page-subtitle">Automated petroleum subsidy flows and financial reconciliation via CBN-Nexus Bridge.</p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:0.7rem;font-weight:600;color:var(--text-dark-secondary);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.3rem;">Last Updated</div>
                <div style="font-family:var(--mono);font-size:0.85rem;color:var(--text-dark);" id="lastUpdated">—</div>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Total Disbursed (MTD)</div>
                <div class="metric-value" style="font-family:var(--mono);">₦16.1b</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 8.3% vs last month</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Transactions Today</div>
                <div class="metric-value" style="font-family:var(--mono);">24</div>
                <div class="metric-trend neutral"><i class="fas fa-circle-check"></i> 22 settled</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Pending Value</div>
                <div class="metric-value" style="font-family:var(--mono);color:var(--amber);">₦890m</div>
                <div class="metric-trend neutral"><i class="fas fa-clock"></i> Awaiting CBN confirm</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Failed Transactions</div>
                <div class="metric-value" style="font-family:var(--mono);color:var(--red);">1</div>
                <div class="metric-trend down"><i class="fas fa-triangle-exclamation"></i> MRS Oil — retry pending</div>
            </div>
        </div>

        <div class="chart-block">
            <div class="chart-header">
                <div>
                    <h3>Transaction Ledger</h3>
                    <div class="chart-desc">Recent CBN-Nexus Bridge activity — secured financial settlements</div>
                </div>
                <span style="font-size:0.72rem;font-weight:600;padding:0.25rem 0.65rem;border-radius:999px;background:rgba(0,208,104,0.08);color:var(--green);">
                    <i class="fas fa-shield-halved" style="margin-right:4px;"></i>CBN-Secured
                </span>
            </div>
            <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
                    <thead>
                        <tr style="border-bottom:2px solid var(--border-light);">
                            <th style="text-align:left;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Reference</th>
                            <th style="text-align:left;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Entity</th>
                            <th style="text-align:left;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Type</th>
                            <th style="text-align:right;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Amount</th>
                            <th style="text-align:center;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Status</th>
                            <th style="text-align:right;padding:0.6rem 1rem;font-size:0.7rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--text-dark-secondary);">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.map(t => `
                        <tr style="border-bottom:1px solid var(--border-light);transition:background 0.15s;" onmouseover="this.style.background='rgba(0,0,0,0.018)'" onmouseout="this.style.background=''">
                            <td style="padding:0.85rem 1rem;font-family:var(--mono);font-size:0.78rem;color:var(--text-dark-secondary);">${t.ref}</td>
                            <td style="padding:0.85rem 1rem;font-weight:500;color:var(--text-dark);display:flex;align-items:center;border:none;">
                                <img src="${t.logo}" style="width:20px;height:20px;border-radius:4px;margin-right:10px;object-fit:contain;background:white;">
                                ${t.entity}
                            </td>
                            <td style="padding:0.85rem 1rem;font-size:0.83rem;color:var(--text-dark-secondary);">${t.type}</td>
                            <td style="padding:0.85rem 1rem;text-align:right;font-family:var(--mono);font-weight:600;font-size:0.88rem;">${t.amount}</td>
                            <td style="padding:0.85rem 1rem;text-align:center;">
                                <span style="font-size:0.72rem;font-weight:600;padding:0.25rem 0.65rem;border-radius:999px;background:${statusBg[t.status]};color:${statusColor[t.status]};">${t.status}</span>
                            </td>
                            <td style="padding:0.85rem 1rem;text-align:right;font-size:0.8rem;color:var(--text-dark-secondary);">${t.date}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="log-block">
            <div class="log-header">
                <h3>CBN-Nexus Bridge Events</h3>
                <div class="live-indicator"><span class="live-dot"></span>Real-time feed</div>
            </div>
            <div class="log-body" id="logStage">
                <div class="log-item"><span class="log-ts">INIT</span><span class="log-msg">Establishing secure CBN-Nexus connection…</span></div>
            </div>
        </div>`;

    initTimestamp();
    setTimeout(() => {
        pushLog('[CBN-NEXUS] TLS-1.3 handshake complete. Settlement channel secured.');
        pushLog('[CBN-TXN-240417-0084] ARDOVA PLC ₦890m — awaiting CBN confirmation signature.');
        pushLog('[CBN-TXN-240416-0068] MRS Oil ₦510m — retry scheduled 14:00 today.');
        pushLog('[SYSTEM] 22 transactions settled successfully today. Bridge latency: 48ms.');
    }, 400);
}

/* ---- IoT NODES ---- */
function renderIoT(content) {
    const nodeZones = [
        { zone: 'Lagos Metro', nodes: 2840, online: 2838, alerts: 2, uptime: '99.93%' },
        { zone: 'Abuja FCT', nodes: 1420, online: 1420, alerts: 0, uptime: '100%' },
        { zone: 'Port Harcourt', nodes: 1680, online: 1674, alerts: 6, uptime: '99.64%' },
        { zone: 'Kano', nodes: 980, online: 978, alerts: 2, uptime: '99.80%' },
        { zone: 'Ibadan', nodes: 840, online: 840, alerts: 0, uptime: '100%' },
        { zone: 'Kaduna', nodes: 720, online: 712, alerts: 8, uptime: '98.89%' },
        { zone: 'Warri', nodes: 640, online: 636, alerts: 4, uptime: '99.38%' },
        { zone: 'Enugu', nodes: 580, online: 580, alerts: 0, uptime: '100%' },
        { zone: 'Benin City', nodes: 480, online: 479, alerts: 1, uptime: '99.79%' },
        { zone: 'Others', nodes: 1222, online: 1205, alerts: 17, uptime: '98.61%' },
    ];

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h2 class="page-title">IoT Node<br><span>Network.</span></h2>
                <p class="page-subtitle">12,402 hardware nodes streaming tamper-proof consumption data across all regions.</p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:0.7rem;font-weight:600;color:var(--text-dark-secondary);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.3rem;">Last Updated</div>
                <div style="font-family:var(--mono);font-size:0.85rem;color:var(--text-dark);" id="lastUpdated">—</div>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">Total Nodes Deployed</div>
                <div class="metric-value" style="font-family:var(--mono);">12,402</div>
                <div class="metric-trend up"><i class="fas fa-arrow-up"></i> 64 added this week</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Currently Online</div>
                <div class="metric-value" style="font-family:var(--mono);color:var(--green);">12,362</div>
                <div class="metric-trend up"><i class="fas fa-circle-check"></i> 99.68% uptime</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Active Alerts</div>
                <div class="metric-value" style="font-family:var(--mono);color:var(--amber);">40</div>
                <div class="metric-trend down"><i class="fas fa-triangle-exclamation"></i> Across 7 zones</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Avg Data Latency</div>
                <div class="metric-value" style="font-family:var(--mono);">1.2s</div>
                <div class="metric-trend neutral"><i class="fas fa-signal"></i> Within SLA</div>
            </div>
        </div>

        <div class="chart-block">
            <div class="chart-header">
                <div>
                    <h3>Node Health by Region</h3>
                    <div class="chart-desc">Online status, alert count, and uptime for all deployment zones</div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;">
                ${nodeZones.map(z => {
        const onlinePct = Math.round((z.online / z.nodes) * 100);
        const barColor = z.alerts === 0 ? 'var(--green)' : z.alerts <= 3 ? 'var(--amber)' : 'var(--red)';
        const alertBg = z.alerts === 0 ? 'rgba(0,208,104,0.08)' : z.alerts <= 3 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)';
        const alertColor = z.alerts === 0 ? 'var(--green)' : z.alerts <= 3 ? 'var(--amber)' : 'var(--red)';
        return `
                    <div style="background:var(--surface-raised);border:1px solid var(--border-light);border-radius:var(--r-md);padding:1.1rem;">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;">
                            <div style="font-weight:600;font-size:0.88rem;color:var(--text-dark);">${z.zone}</div>
                            <span style="font-size:0.68rem;font-weight:600;padding:0.2rem 0.5rem;border-radius:999px;background:${alertBg};color:${alertColor};">
                                ${z.alerts === 0 ? '✓ Healthy' : `${z.alerts} alerts`}
                            </span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                            <span style="font-family:var(--mono);font-size:1.1rem;font-weight:500;color:var(--text-dark);">${z.online.toLocaleString()}<span style="font-size:0.72rem;color:var(--text-dark-secondary);font-weight:400;margin-left:2px;">/ ${z.nodes.toLocaleString()}</span></span>
                            <span style="font-size:0.78rem;color:var(--text-dark-secondary);font-family:var(--mono);">${z.uptime}</span>
                        </div>
                        <div style="height:5px;background:var(--surface);border-radius:999px;overflow:hidden;border:1px solid var(--border-light);">
                            <div style="width:${onlinePct}%;height:100%;background:${barColor};border-radius:999px;"></div>
                        </div>
                    </div>`;
    }).join('')}
            </div>
        </div>

        <div class="log-block">
            <div class="log-header">
                <h3>Node Telemetry Stream</h3>
                <div class="live-indicator"><span class="live-dot"></span>Real-time feed</div>
            </div>
            <div class="log-body" id="logStage">
                <div class="log-item"><span class="log-ts">INIT</span><span class="log-msg">Connecting to IoT nexus — polling all zones…</span></div>
            </div>
        </div>`;

    initTimestamp();
    setTimeout(() => {
        pushLog('[IOT] Handshake complete with NNPC Nexus Hub.');
        pushLog('[CRYPTO] Secured link established via local gateway.');
        pushLog('[SYSTEM] IoT Analytics stream live.');
    }, 400);
}

/* ---- LIVE NODE MAP (Dedicated) ---- */
function renderNodeMap(content) {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h2 class="page-title">Live Node Map<br><span>& Dynamic Telemetry.</span></h2>
                <p class="page-subtitle">Interactive visualization of all active downstream nodes across Nigeria.</p>
            </div>
            <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:0.7rem;font-weight:600;color:var(--text-dark-secondary);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.3rem;">Nodes Active</div>
                <div style="font-family:var(--mono);font-size:0.85rem;color:var(--green);" id="activeNodeCount">0</div>
            </div>
        </div>

        <div class="chart-block" style="padding:0; overflow:hidden; border-radius:var(--r-lg);">
            <div id="iotMap" style="height:620px; border-radius:0; border:none; margin:0;"></div>
        </div>

        <div style="display:flex; gap:1.5rem; margin-top:1.5rem;">
            <div class="metric-card" style="flex:1;">
                <div class="metric-label">National Coverage</div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
                    <span style="width:10px;height:10px;background:var(--green);border-radius:50%;"></span>
                    <span style="font-family:var(--mono);font-size:1.1rem;font-weight:600;">Optimal</span>
                </div>
            </div>
            <div class="metric-card" style="flex:1;">
                <div class="metric-label">Telemetry Status</div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
                    <span style="width:10px;height:10px;background:var(--blue);border-radius:50%;"></span>
                    <span style="font-family:var(--mono);font-size:1.1rem;font-weight:600;">Synchronized</span>
                </div>
            </div>
        </div>
    `;

    initTimestamp();
    // We need to initialize the map after the DOM is rendered
    setTimeout(() => initIoTMap(), 250);
}

function initIoTMap() {
    try {
        if (iotLeafletMap) {
            iotLeafletMap.remove();
            iotLeafletMap = null;
        }

        const mapContainer = document.getElementById('iotMap');
        if (!mapContainer) return;

        mapMarkers = [];

        // Nigeria bounds
        iotLeafletMap = L.map('iotMap', {
            center: [9.082, 8.675],
            zoom: 6,
            zoomControl: false,
            attributionControl: false
        });

        // Minimalist Map Tiles (Apple-style Positron)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(iotLeafletMap);

        // Filter nodes based on current company
        const filteredNodes = currentKey === 'national' 
            ? iotNodes 
            : iotNodes.filter(n => n.company === currentKey);

        const nodeCountEl = document.getElementById('activeNodeCount');
        if (nodeCountEl) nodeCountEl.textContent = filteredNodes.length.toLocaleString();

        filteredNodes.forEach(node => {
            const icon = L.divIcon({
                className: 'custom-ping-marker',
                html: `<div class="ping-wrapper ${node.type.toLowerCase()}">
                        <div class="ping-ring"></div>
                        <div class="ping-dot"></div>
                      </div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            const popupContent = `
                <div class="iot-popup">
                    <h4>${node.label}</h4>
                    <div class="p-meta">
                        <div class="p-row"><span>ID:</span> <b>${node.id}</b></div>
                        <div class="p-row"><span>Type:</span> <b>${node.type}</b></div>
                        <div class="p-row"><span>Entity:</span> <b>${node.company.toUpperCase()}</b></div>
                    </div>
                    <div class="p-status ${node.status === 'Moving' ? 'moving' : ''}">${node.status}</div>
                </div>
            `;

            const marker = L.marker([node.lat, node.lng], { icon })
                .bindPopup(popupContent, { className: 'apple-map-popup' })
                .addTo(iotLeafletMap);
            
            mapMarkers.push(marker);
        });

        if (filteredNodes.length > 0 && currentKey !== 'national') {
            const group = new L.featureGroup(mapMarkers);
            iotLeafletMap.fitBounds(group.getBounds().pad(0.3));
        }

        pushLog(`[MAP] Switched to dedicated node cluster for ${currentCompany}.`);
    } catch (err) {
        console.error('Leaflet initialization failed:', err);
    }
}

/* =============================================
   REPORTS
   ============================================= */
function initReporters() {
    document.getElementById('printBtn')?.addEventListener('click', () => window.print());

    document.getElementById('exportBtn')?.addEventListener('click', () => {
        const data = companyData[currentKey];
        const rows = [
            ['Metric', 'Value', 'Entity'],
            ['PMS Volume (L)', formatVolume(data.pms), currentCompany],
            ['AGO Volume (BRL)', formatBrl(data.ago), currentCompany],
            ['Total Revenue (₦)', `₦${data.revenue}b`, currentCompany],
            ['IoT Nodes', data.nodes, currentCompany],
            ['FX Rate', `₦${globalFx.toFixed(2)}`, 'CBN Source']
        ];
        const csv = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
        const link = Object.assign(document.createElement('a'), {
            href: encodeURI(csv),
            download: `DataPoint_${currentCompany.replace(/\s+/g, '_')}_Report.csv`
        });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        pushLog(`[REPORT] CSV export generated for ${currentCompany}.`);
    });
}

/* =============================================
   SIDEBAR
   ============================================= */
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('sidebarClose');

    function openSidebar() {
        sidebar?.classList.add('open');
        overlay?.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('visible');
        document.body.style.overflow = '';
    }

    menuToggle?.addEventListener('click', openSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    const pageMap = {
        sideOverview: 'overview',
        sidePetroleum: 'petroleum',
        sideInsights: 'insights',
        sideSettlements: 'settlements',
        sideIoT: 'iot',
        sideNodeMap: 'nodemap'
    };

    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        link.addEventListener('click', function () {
            if (this.classList.contains('danger')) return;
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const page = pageMap[this.id];
            if (page) renderPage(page);

            closeSidebar();
        });
    });
}

/* =============================================
   CBN FX RATE
   ============================================= */
function fetchCbnRate() {
    const el = document.getElementById('fxRate');
    if (!el) return;
    el.textContent = `₦${globalFx.toFixed(2)}`;
    setInterval(() => {
        const drift = (Math.random() * 2 - 0.8).toFixed(2);
        globalFx = parseFloat((globalFx + parseFloat(drift)).toFixed(2));
        el.textContent = `₦${globalFx.toFixed(2)}`;
    }, 8000);
}

/* =============================================
   LIVE LOG TICKER
   ============================================= */
function startLogTicker() {
    const messages = [
        'Verified consumption of 450 BRL via Terminal-LAG.',
        'IoT Node sync: 100% data integrity confirmed.',
        'Revenue reconciliation via CBN-Nexus successful.',
        'Flow-meter check: ±0.01% deviation within tolerance.',
        'Inventory alert: Low storage at Depot-PH. Replenishment scheduled.',
        'Report generated for Federal Revenue Service (FRS).',
        'Product allocation request approved for southern corridor.',
        'Satellite telemetry updated for Abuja region nodes.',
        'Meter calibration complete at Terminal-KAN depot.',
        'Compliance check passed for Q1 2026 audit cycle.'
    ];

    setTimeout(() => {
        pushLog(`[SYSTEM] National IoT Nexus connected. ${companyData.national.nodes.toLocaleString()} nodes online.`);
        initMetrics('national');
    }, 600);

    setInterval(() => {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const entity = currentCompany.split(' ')[0];
        pushLog(`[${entity}] ${msg}`);
    }, 5500);
}

function pushLog(message, ts = null) {
    const stage = document.getElementById('logStage');
    if (!stage) return;

    const now = new Date();
    const time = ts || now.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const item = document.createElement('div');
    item.className = 'log-item';
    const formatted = message.replace(/\[([^\]]+)\]/g, (match, tag) => {
        return `<span class="entity">[${tag}]</span>`;
    });
    item.innerHTML = `<span class="log-ts">${time}</span><span class="log-msg">${formatted}</span>`;
    stage.prepend(item);

    while (stage.children.length > 20) stage.lastElementChild.remove();
}