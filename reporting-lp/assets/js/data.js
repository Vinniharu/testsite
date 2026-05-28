/* NEIIA LP & GP Reporting — dummy data layer */
(function () {
  const gp = [
    { id: 'u-gp-1', name: 'Adaobi Okonkwo', role: 'Managing Partner', initials: 'AO', firm: 'Sahel Capital Partners', email: 'adaobi@sahelcapital.ng' },
    { id: 'u-gp-2', name: 'Chinedu Bello', role: 'Investor Relations Lead', initials: 'CB', firm: 'Sahel Capital Partners', email: 'chinedu@sahelcapital.ng' },
    { id: 'u-gp-3', name: 'Fatima Yusuf', role: 'Fund Operations Analyst', initials: 'FY', firm: 'Sahel Capital Partners', email: 'fatima@sahelcapital.ng' }
  ];

  const namedLps = [
    { id: 'lp-1', name: 'Tunde Adeyemi', initials: 'TA', type: 'Angel', commitment: 250000, called: 175000, distributed: 45000, nav: 210000, engagement: 86, lastLogin: '2h ago', email: 'tunde@founderhq.ng', country: 'Nigeria', city: 'Lagos', kyc: 'Verified' },
    { id: 'lp-2', name: 'Sarah Mensah', initials: 'SM', type: 'Family Office', commitment: 1500000, called: 1050000, distributed: 280000, nav: 1280000, engagement: 92, lastLogin: '5h ago', email: 'sarah@mensahfo.com', country: 'Ghana', city: 'Accra', kyc: 'Verified' },
    { id: 'lp-3', name: 'Kwame Asante', initials: 'KA', type: 'Institutional', commitment: 5000000, called: 3500000, distributed: 800000, nav: 4200000, engagement: 78, lastLogin: '1d ago', email: 'k.asante@aksinst.com', country: 'Kenya', city: 'Nairobi', kyc: 'Verified' },
    { id: 'lp-4', name: 'Aisha Bello', initials: 'AB', type: 'HNI', commitment: 500000, called: 350000, distributed: 80000, nav: 430000, engagement: 64, lastLogin: '3d ago', email: 'aisha.b@privatemail.com', country: 'Nigeria', city: 'Abuja', kyc: 'Verified' }
  ];

  // generate 24 more for a total of 28
  const firstNames = ['Emeka','Ngozi','Yetunde','Olu','Chiamaka','Tobi','Bisi','Femi','Ifeanyi','Ada','Kojo','Ama','Yaw','Abena','Kofi','Esi','Wanjiru','Otieno','Akinyi','Mwangi','Naledi','Sipho','Thandi','Lerato'];
  const lastNames = ['Eze','Okafor','Adesina','Balogun','Nwosu','Ojo','Lawal','Ibrahim','Mensah','Owusu','Asare','Boateng','Kamau','Njoroge','Mwende','Otieno','Dlamini','Khumalo','Maseko','Naidoo','Pillay','Cele','Mthembu','Zulu'];
  const types = ['HNI','Family Office','Institutional','Angel'];
  const cities = [['Lagos','Nigeria'],['Abuja','Nigeria'],['Accra','Ghana'],['Nairobi','Kenya'],['Johannesburg','South Africa'],['Cape Town','South Africa'],['Kigali','Rwanda'],['Dakar','Senegal']];

  const extras = [];
  for (let i = 0; i < 24; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const type = types[i % types.length];
    const baseCommit = type === 'Institutional' ? 4000000 + (i * 120000) : type === 'Family Office' ? 1200000 + (i * 60000) : type === 'HNI' ? 400000 + (i * 30000) : 200000 + (i * 15000);
    const called = Math.round(baseCommit * (0.55 + (i % 5) * 0.05));
    const dist = Math.round(called * (0.1 + (i % 4) * 0.04));
    const nav = Math.round(called * (1.05 + (i % 6) * 0.03));
    const cc = cities[i % cities.length];
    extras.push({
      id: 'lp-' + (i + 5),
      name: fn + ' ' + ln,
      initials: fn[0] + ln[0],
      type, commitment: baseCommit, called, distributed: dist, nav,
      engagement: 40 + ((i * 7) % 55),
      lastLogin: ['4h ago','1d ago','2d ago','3d ago','1w ago','2w ago'][i % 6],
      email: (fn[0] + ln).toLowerCase() + '@example.com',
      country: cc[1], city: cc[0],
      kyc: i % 11 === 0 ? 'Pending' : 'Verified'
    });
  }

  const lp = namedLps.concat(extras);

  const funds = [
    { id: 'f-1', name: 'NEIIA Growth Fund I', vintage: 2023, target: 30000000, raised: 30000000, called: 22000000, distributed: 4500000, nav: 28500000, irr: 19.4, moic: 1.32, tvpi: 1.41, dpi: 0.21, status: 'Active', strategy: 'Growth equity, Series B+', companies: ['p-1','p-2','p-3','p-4'] },
    { id: 'f-2', name: 'NEIIA Tech Ventures', vintage: 2024, target: 10000000, raised: 10000000, called: 6500000, distributed: 600000, nav: 8200000, irr: 14.1, moic: 1.18, tvpi: 1.26, dpi: 0.09, status: 'Active', strategy: 'Early-stage tech, seed–Series A', companies: ['p-3','p-5'] },
    { id: 'f-3', name: 'NEIIA Impact Fund', vintage: 2026, target: 15000000, raised: 5000000, called: 1500000, distributed: 0, nav: 1500000, irr: null, moic: 1.00, tvpi: 1.00, dpi: 0.00, status: 'Raising', strategy: 'Impact-first, climate + healthcare', companies: ['p-2','p-6'] }
  ];

  const portfolio = [
    { id: 'p-1', name: 'Lagos AgriTech', sector: 'Agriculture', initials: 'LA', stage: 'Series B', hq: 'Lagos, Nigeria', invested: 4000000, valuation: 28000000, ownership: 14.2, blurb: 'AI-driven yield optimization for smallholder farms across West Africa.', update: '2 weeks ago' },
    { id: 'p-2', name: 'Solara Energy', sector: 'Clean Energy', initials: 'SE', stage: 'Series A', hq: 'Nairobi, Kenya', invested: 3500000, valuation: 22000000, ownership: 15.9, blurb: 'Distributed solar mini-grids serving rural commercial customers.', update: '5 days ago' },
    { id: 'p-3', name: 'Akwaaba Health', sector: 'Healthtech', initials: 'AH', stage: 'Series A', hq: 'Accra, Ghana', invested: 2500000, valuation: 15000000, ownership: 16.6, blurb: 'Telemedicine and pharmacy logistics platform across three West African markets.', update: '1 week ago' },
    { id: 'p-4', name: 'Naija Logistics', sector: 'Supply Chain', initials: 'NL', stage: 'Series B', hq: 'Lagos, Nigeria', invested: 5000000, valuation: 35000000, ownership: 14.3, blurb: 'B2B middle-mile logistics network for FMCG distributors.', update: '3 weeks ago' },
    { id: 'p-5', name: 'Greenfield Microfinance', sector: 'Fintech', initials: 'GM', stage: 'Series A', hq: 'Kigali, Rwanda', invested: 3000000, valuation: 18000000, ownership: 16.7, blurb: 'Digital microfinance for SMEs in East Africa, with embedded credit scoring.', update: '4 days ago' },
    { id: 'p-6', name: 'Tema Foods', sector: 'Consumer', initials: 'TF', stage: 'Seed', hq: 'Tema, Ghana', invested: 1500000, valuation: 8000000, ownership: 18.75, blurb: 'Ready-to-eat Ghanaian heritage foods for diaspora and domestic retail.', update: '6 weeks ago' }
  ];

  const capitalCalls = [
    { id: 'cc-1', number: 1, fundId: 'f-1', amount: 3000000, issued: '2024-02-15', due: '2024-03-01', purpose: 'Initial deployment into Lagos AgriTech follow-on round.', status: 'Closed', lpsSent: 28, acknowledged: 28 },
    { id: 'cc-2', number: 2, fundId: 'f-1', amount: 4000000, issued: '2024-06-10', due: '2024-06-30', purpose: 'Naija Logistics Series B participation.', status: 'Closed', lpsSent: 28, acknowledged: 28 },
    { id: 'cc-3', number: 3, fundId: 'f-2', amount: 2000000, issued: '2024-09-20', due: '2024-10-05', purpose: 'Akwaaba Health Series A lead position.', status: 'Closed', lpsSent: 18, acknowledged: 18 },
    { id: 'cc-4', number: 4, fundId: 'f-1', amount: 5000000, issued: '2025-01-12', due: '2025-01-31', purpose: 'Solara Energy follow-on and reserves.', status: 'Closed', lpsSent: 28, acknowledged: 28 },
    { id: 'cc-5', number: 5, fundId: 'f-2', amount: 3000000, issued: '2025-05-08', due: '2025-05-25', purpose: 'Greenfield Microfinance Series A and management fees.', status: 'Closed', lpsSent: 18, acknowledged: 18 },
    { id: 'cc-6', number: 6, fundId: 'f-1', amount: 4500000, issued: '2025-11-04', due: '2025-11-22', purpose: 'Q4 reserves and follow-on into Naija Logistics.', status: 'Closed', lpsSent: 28, acknowledged: 28 },
    { id: 'cc-7', number: 7, fundId: 'f-1', amount: 2500000, issued: '2026-05-15', due: '2026-06-15', purpose: 'Follow-on into Solara Energy Series A+ extension.', status: 'Open', lpsSent: 28, acknowledged: 12, tundeShare: 25000, bank: { name: 'Stanbic IBTC', account: 'NEIIA Growth Fund I – Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', reference: 'CC-7-LP-{LPID}' } }
  ];

  const distributions = [
    { id: 'd-1', fundId: 'f-1', amount: 1500000, paid: '2024-12-15', source: 'Partial exit — Akwaaba Health secondary', type: 'Return of capital' },
    { id: 'd-2', fundId: 'f-1', amount: 1200000, paid: '2025-04-20', source: 'Lagos AgriTech dividend recap', type: 'Income' },
    { id: 'd-3', fundId: 'f-2', amount: 600000, paid: '2025-08-12', source: 'Strategic secondary — Akwaaba Health', type: 'Realized gain' },
    { id: 'd-4', fundId: 'f-1', amount: 1800000, paid: '2026-02-10', source: 'Naija Logistics secondary sale', type: 'Realized gain' }
  ];

  const messages = {
    threadId: 't-1',
    subject: 'Solara Energy — follow-on participation',
    tags: ['Fund: Growth Fund I', 'Portfolio: Solara Energy'],
    participants: ['lp-1', 'u-gp-2'],
    messages: [
      { id: 'm-1', from: 'lp-1', name: 'Tunde Adeyemi', initials: 'TA', when: '2026-05-12 09:42', body: 'Hi Chinedu — I saw the deck for the Solara Energy follow-on round. Could you share the latest financials and the lead investor on this extension? Trying to size up before the call.' },
      { id: 'm-2', from: 'u-gp-2', name: 'Chinedu Bello', initials: 'CB', when: '2026-05-12 14:18', body: 'Hey Tunde — happy to. Lead on the extension is Helios Energy Partners out of London, at a $22M pre-money. I have just uploaded the Q1 financials to your Documents > Portfolio > Solara folder. Headline: revenue up 71% YoY, gross margin holding at 38%.' },
      { id: 'm-3', from: 'lp-1', name: 'Tunde Adeyemi', initials: 'TA', when: '2026-05-13 08:05', body: 'Got it, thank you. One follow-up — are we maintaining pro-rata or topping up? My pro-rata share looks like ~$25K on the capital call notice.' },
      { id: 'm-4', from: 'u-gp-2', name: 'Chinedu Bello', initials: 'CB', when: '2026-05-13 10:30', body: 'We are maintaining pro-rata for this round, with a top-up window of up to 25% for LPs who want more allocation. Let me know by June 5 if you would like the top-up. Capital call #7 went out yesterday — please acknowledge when you can.' }
    ]
  };

  const notifications = {
    gp: [
      { id: 'n-g-1', title: 'Capital Call #7 awaiting your signature', when: '1h ago', kind: 'amber' },
      { id: 'n-g-2', title: '3 LPs pending KYC onboarding', when: '4h ago', kind: 'amber' },
      { id: 'n-g-3', title: 'Q2 report draft ready for review', when: '1d ago', kind: 'info' }
    ],
    lp: [
      { id: 'n-l-1', title: 'Capital Call #7 due June 15 — $25,000', when: '1d ago', kind: 'amber' },
      { id: 'n-l-2', title: 'Q1 2026 Growth Fund I report available', when: '3d ago', kind: 'info' },
      { id: 'n-l-3', title: 'New message from Chinedu Bello', when: '5d ago', kind: 'info' }
    ]
  };

  // Pricing model: GP size-based tiers + LP flat subscription + power-up add-ons
  const pricing = {
    tiers: {
      gp: [
        { id: 'starter',    name: 'Starter',    range: '5–20 LPs',  lpMin: 5,  lpMax: 20,        monthly: 70,  blurb: 'For emerging managers raising their first fund.' },
        { id: 'growth',     name: 'Growth',     range: '21–60 LPs', lpMin: 21, lpMax: 60,        monthly: 140, blurb: 'For active managers with a growing LP roster.', popular: true },
        { id: 'enterprise', name: 'Enterprise', range: '61+ LPs',   lpMin: 61, lpMax: Infinity,  monthly: 200, blurb: 'For institutional GPs running multi-fund books.' }
      ]
    },
    lp: {
      monthly: 100
    },
    addons: [
      { id: 'apex',    name: 'Apex AI assistant',     price: 25, desc: 'Context-aware AI for deals, reports, and ad-hoc Q&A.' },
      { id: 'email',   name: 'Email integration',     price: 30, desc: 'Two-way email sync against deal threads.' },
      { id: 'storage', name: '+20GB storage upgrade', price: 20, desc: 'Adds 20GB to the document vault. Stackable.' },
      { id: 'verify',  name: 'Message verification',  price: 25, desc: 'Identity verification on sender + recipient.' }
    ],
    cycles: {
      monthly:   { id: 'monthly',   label: 'Monthly',   discount: 0,    months: 1  },
      quarterly: { id: 'quarterly', label: 'Quarterly', discount: 0.05, months: 3  },
      yearly:    { id: 'yearly',    label: 'Yearly',    discount: 0.17, months: 12 }
    }
  };

  // Fund wrappers — NEIIA's standard nomenclature
  const fundWrappers = [
    { id: 'SPV',       name: 'SPV',       longName: 'Special Purpose Vehicle', description: 'Single-deal vehicle. One investment, one entity, one cap table.', useCases: 'Single deal, follow-on, syndicate participation', typicalSize: '$250K–$5M', typicalDuration: '5–7 years', regulatory: 'SEC Nigeria notifiable, narrow purpose' },
    { id: 'Sub-Fund',  name: 'Sub-Fund',  longName: 'Sub-Fund',                description: 'Segregated sub-portfolio inside a master fund umbrella.', useCases: 'Strategy carve-out, themed sleeve, sector basket', typicalSize: '$5M–$50M', typicalDuration: '7–10 years', regulatory: 'Inherits master-fund registration' },
    { id: 'Rolling',   name: 'Rolling',   longName: 'Rolling Fund',            description: 'Open-ended fund with continuous fundraising and rolling closes.', useCases: 'Quarterly closes, evergreen capital', typicalSize: 'Quarterly $1M–$10M', typicalDuration: 'Open-ended', regulatory: 'Quarterly SEC reports' },
    { id: 'Venture',   name: 'Venture',   longName: 'Venture Fund',            description: 'Early-stage growth fund with multiple closes and pro-rata reserves.', useCases: 'Seed → Series B, multi-deal portfolio', typicalSize: '$10M–$100M', typicalDuration: '8–10 years', regulatory: 'Full SEC Nigeria registration' },
    { id: 'Co-Invest', name: 'Co-Invest', longName: 'Co-Investment Sidecar',   description: 'Sidecar vehicle for follow-on or syndicate participation alongside a lead fund.', useCases: 'Follow-on rounds, large-cheque LPs', typicalSize: '$500K–$10M', typicalDuration: 'Aligned with parent', regulatory: 'Sidecar disclosure required' },
    { id: 'Roll-Up',   name: 'Roll-Up',   longName: 'Roll-Up Vehicle',         description: 'Vehicle that consolidates multiple existing companies into one platform.', useCases: 'Buy-and-build, sector consolidation', typicalSize: '$20M–$200M', typicalDuration: '5–7 years', regulatory: 'Antitrust review on each acquisition' }
  ];

  // Report templates by cadence
  const reportTemplates = [
    { id: 'daily',     cadence: 'Daily',     label: 'Daily flash',         sections: ['Daily KPIs', 'Cash position', 'Material events'] },
    { id: 'weekly',    cadence: 'Weekly',    label: 'Weekly update',       sections: ['Week-over-week KPIs', 'Pipeline movement', 'Open issues'] },
    { id: 'monthly',   cadence: 'Monthly',   label: 'Monthly report',      sections: ['Executive summary', 'KPI snapshot', 'Burn & runway', 'Outlook'] },
    { id: 'quarterly', cadence: 'Quarterly', label: 'Quarterly report',    sections: ['Executive summary', 'Financials', 'Portfolio updates', 'Capital activity', 'Outlook'] },
    { id: 'yearly',    cadence: 'Yearly',    label: 'Annual report',       sections: ['Year in review', 'Audited financials', 'Portfolio detail', 'Strategic outlook', 'LP letter'] }
  ];

  // GP subscription: 28 LPs → Growth tier ($140/mo)
  const subscription = {
    role: 'gp',
    plan: 'General Partner',
    tier: 'growth',
    tierName: 'Growth',
    basePrice: 140,
    lpLimit: 60,
    cycle: 'monthly',
    billingCycle: 'monthly',
    nextBilling: '2026-06-15',
    paymentMethod: { type: 'Visa', last4: '4242', expiry: '08/27' },
    bankAccounts: [
      { id: 'b1', primary: true, bankName: 'Stanbic IBTC', accountName: 'Sahel Capital Partners — Operations', accountNumber: '0123456789', swift: 'SBICNGLX', currency: 'NGN' }
    ],
    usage: { funds: { used: 2, limit: 3 }, lps: { used: 28, limit: 60 }, storage: { used: 12, limit: 50 } },
    addons: [
      { id: 'apex',    name: 'Apex AI assistant',     price: 25, active: true },
      { id: 'email',   name: 'Email integration',     price: 30, active: false },
      { id: 'storage', name: '+20GB storage upgrade', price: 20, active: false },
      { id: 'verify',  name: 'Message verification',  price: 25, active: false }
    ],
    activeAddons: ['apex'],
    invoices: [
      { id: 'in-2026-05', date: '2026-05-15', amount: 165, status: 'Paid' },
      { id: 'in-2026-04', date: '2026-04-15', amount: 165, status: 'Paid' },
      { id: 'in-2026-03', date: '2026-03-15', amount: 165, status: 'Paid' },
      { id: 'in-2026-02', date: '2026-02-15', amount: 165, status: 'Paid' },
      { id: 'in-2026-01', date: '2026-01-15', amount: 165, status: 'Paid' },
      { id: 'in-2025-12', date: '2025-12-15', amount: 165, status: 'Paid' }
    ]
  };

  // LP subscription state — flat $100/mo + opt-in add-ons
  const lpSubscription = {
    role: 'lp',
    plan: 'Limited Partner',
    basePrice: 100,
    cycle: 'monthly',
    nextBilling: '2026-06-12',
    paymentMethod: { type: 'Visa', last4: '0117', expiry: '04/28' },
    activeAddons: ['apex'],
    addons: [
      { id: 'apex',    name: 'Apex AI assistant',     price: 25, active: true },
      { id: 'email',   name: 'Email integration',     price: 30, active: false },
      { id: 'storage', name: '+20GB storage upgrade', price: 20, active: false },
      { id: 'verify',  name: 'Message verification',  price: 25, active: false }
    ],
    invoices: [
      { id: 'in-lp-2026-05', date: '2026-05-12', amount: 125, status: 'Paid' },
      { id: 'in-lp-2026-04', date: '2026-04-12', amount: 125, status: 'Paid' },
      { id: 'in-lp-2026-03', date: '2026-03-12', amount: 125, status: 'Paid' },
      { id: 'in-lp-2026-02', date: '2026-02-12', amount: 125, status: 'Paid' },
      { id: 'in-lp-2026-01', date: '2026-01-12', amount: 100, status: 'Paid' },
      { id: 'in-lp-2025-12', date: '2025-12-12', amount: 100, status: 'Paid' }
    ]
  };

  // GP activity feed
  const gpActivity = [
    { who: 'Tunde Adeyemi', initials: 'TA', what: 'viewed Q1 2026 report — Growth Fund I', when: '2h ago' },
    { who: 'Sarah Mensah', initials: 'SM', what: 'acknowledged Capital Call #6', when: '4h ago' },
    { who: 'Kwame Asante', initials: 'KA', what: 'downloaded 2025 tax pack', when: '6h ago' },
    { who: 'Aisha Bello', initials: 'AB', what: 'messaged Chinedu Bello about distributions', when: '1d ago' },
    { who: 'Tunde Adeyemi', initials: 'TA', what: 'opened Solara Energy follow-on memo', when: '1d ago' },
    { who: 'Sarah Mensah', initials: 'SM', what: 'updated bank account for distributions', when: '2d ago' },
    { who: 'Kwame Asante', initials: 'KA', what: 'acknowledged Capital Call #6', when: '2d ago' }
  ];

  // LP-specific Tunde's holdings across funds
  const lpHoldings = {
    'lp-1': [
      { fundId: 'f-1', commitment: 200000, called: 140000, distributed: 38000, nav: 168000 },
      { fundId: 'f-2', commitment: 50000, called: 35000, distributed: 7000, nav: 42000 }
    ]
  };

  // Tunde-specific activity feed
  const lpActivity = [
    { what: 'Capital Call #7 issued — Growth Fund I', detail: '$25,000 pro-rata share, due June 15', when: '1d ago', kind: 'amber' },
    { what: 'Q1 2026 quarterly report published', detail: 'NEIIA Growth Fund I — IRR 19.4%', when: '3d ago', kind: 'info' },
    { what: 'New message from Chinedu Bello', detail: 'Solara Energy — follow-on participation', when: '5d ago', kind: 'info' },
    { what: 'Distribution received', detail: '$8,000 from Naija Logistics secondary', when: '2w ago', kind: 'positive' },
    { what: '2025 Tax pack available', detail: 'K-1 equivalent for Growth Fund I', when: '3w ago', kind: 'info' }
  ];

  // Documents
  const documents = [
    { id: 'doc-1', name: 'Q1-2026-Growth-Fund-I-Report.pdf', folder: 'Quarterly Reports', size: '2.3MB', modified: '2026-04-30', sharedWith: 28, pages: 14 },
    { id: 'doc-2', name: 'Capital-Call-7-Notice.pdf', folder: 'Capital Calls', size: '480KB', modified: '2026-05-15', sharedWith: 28, pages: 4 },
    { id: 'doc-3', name: 'NEIIA-Growth-Fund-I-LPA.pdf', folder: 'Legal Agreements', size: '5.1MB', modified: '2023-08-12', sharedWith: 28, pages: 92 },
    { id: 'doc-4', name: '2025-K1-Equivalent-Tunde-Adeyemi.pdf', folder: 'Tax Documents', size: '320KB', modified: '2026-03-01', sharedWith: 1, pages: 6 },
    { id: 'doc-5', name: 'Solara-Energy-Series-A-Memo.pdf', folder: 'Fund Documents', size: '1.1MB', modified: '2025-01-08', sharedWith: 28, pages: 18 },
    { id: 'doc-6', name: 'Distribution-Notice-Naija-Logistics.pdf', folder: 'Distributions', size: '210KB', modified: '2026-02-10', sharedWith: 28, pages: 3 },
    { id: 'doc-7', name: 'Q4-2025-Growth-Fund-I-Report.pdf', folder: 'Quarterly Reports', size: '2.1MB', modified: '2026-01-30', sharedWith: 28, pages: 12 },
    { id: 'doc-8', name: 'Subscription-Agreement-Tunde-Adeyemi.pdf', folder: 'Legal Agreements', size: '720KB', modified: '2023-09-01', sharedWith: 1, pages: 22 },
    { id: 'doc-9', name: 'Tech-Ventures-Q1-2026-Report.pdf', folder: 'Quarterly Reports', size: '1.7MB', modified: '2026-04-30', sharedWith: 18, pages: 10 },
    { id: 'doc-10', name: 'KYC-Refresh-Form-2026.pdf', folder: 'Fund Documents', size: '180KB', modified: '2026-01-15', sharedWith: 28, pages: 4 }
  ];

  // Quarterly reports (for LP reports page)
  const reports = [];
  const quarters = ['Q2 2024','Q3 2024','Q4 2024','Q1 2025','Q2 2025','Q3 2025','Q4 2025','Q1 2026'];
  const irrSeq = [11.2, 13.5, 15.1, 16.4, 17.2, 18.0, 18.8, 19.4];
  const irrSeq2 = [null, null, 9.8, 11.5, 12.4, 13.2, 13.7, 14.1];
  quarters.forEach((q, i) => {
    reports.push({ id: 'r-1-' + i, fundId: 'f-1', fundName: 'NEIIA Growth Fund I', quarter: q, irr: irrSeq[i], called: 8000000 + i * 1750000, distributed: i < 3 ? 0 : 1500000 + (i - 3) * 700000, nav: 9000000 + i * 2400000 });
    reports.push({ id: 'r-2-' + i, fundId: 'f-2', fundName: 'NEIIA Tech Ventures', quarter: q, irr: irrSeq2[i], called: 1000000 + i * 700000, distributed: i < 5 ? 0 : 600000, nav: 1200000 + i * 900000 });
  });

  // Tax documents
  const taxDocs = [
    { year: 2025, fundId: 'f-1', fundName: 'NEIIA Growth Fund I', type: 'K-1 equivalent', status: 'Available', when: '2026-03-01' },
    { year: 2025, fundId: 'f-2', fundName: 'NEIIA Tech Ventures', type: 'K-1 equivalent', status: 'Available', when: '2026-03-01' },
    { year: 2024, fundId: 'f-1', fundName: 'NEIIA Growth Fund I', type: 'K-1 equivalent', status: 'Available', when: '2025-03-05' },
    { year: 2024, fundId: 'f-2', fundName: 'NEIIA Tech Ventures', type: 'K-1 equivalent', status: 'Available', when: '2025-03-05' },
    { year: 2023, fundId: 'f-1', fundName: 'NEIIA Growth Fund I', type: 'K-1 equivalent', status: 'Available', when: '2024-03-10' },
    { year: 2026, fundId: 'f-1', fundName: 'NEIIA Growth Fund I', type: 'K-1 equivalent', status: 'Pending', when: 'Expected Mar 2027' }
  ];

  // === Reporting product extensions ===

  // LP type enum with definitions
  const lpTypes = [
    { id: 'Angel', label: 'Angel', desc: 'Individual investor writing personal cheques into early-stage companies.' },
    { id: 'HNI', label: 'HNI', desc: 'High-net-worth individual, typically $1M+ liquid assets.' },
    { id: 'Family Office', label: 'Family Office', desc: 'Investment vehicle for one or more high-net-worth families.' },
    { id: 'Single-Family Office', label: 'Single-Family Office', desc: 'Dedicated investment office for one family.' },
    { id: 'Multi-Family Office', label: 'Multi-Family Office', desc: 'Pooled investment office serving multiple families.' },
    { id: 'Institutional', label: 'Institutional', desc: 'Insurance, banks, asset managers investing at scale.' },
    { id: 'DFI', label: 'DFI', desc: 'Development Finance Institution — government-backed cross-border capital.' },
    { id: 'SWF', label: 'SWF', desc: 'Sovereign Wealth Fund — state-owned investment fund.' },
    { id: 'Endowment / Foundation', label: 'Endowment / Foundation', desc: 'University endowment or philanthropic foundation.' },
    { id: 'Corporate Venture', label: 'Corporate Venture', desc: 'Strategic venture arm of a large corporation.' },
    { id: 'Pension Fund', label: 'Pension Fund', desc: 'Retirement scheme deploying long-duration capital.' }
  ];

  // Enrich each LP with corporate financials, sector, mandate
  const sectorsAll = ['Fintech', 'Energy', 'Healthcare', 'Agri', 'Consumer', 'ICT', 'Manufacturing', 'Real Estate'];
  const stagesAll = ['Seed', 'Series A', 'Series B', 'Growth', 'Pre-IPO'];
  const geosAll = ['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Pan-African'];
  function seedSeries(base, growth, n) {
    const arr = [];
    let v = base;
    for (let i = 0; i < n; i++) { arr.push(Math.round(v)); v = v * (1 + growth + ((i % 3) - 1) * 0.01); }
    return arr;
  }
  function seedStaff(base, n) {
    const arr = [];
    let v = base;
    for (let i = 0; i < n; i++) { arr.push(Math.round(v)); v = v + Math.max(1, Math.round(base * 0.04)); }
    return arr;
  }
  lp.forEach(function (l, idx) {
    l.lpType = l.type;
    l.sector = sectorsAll[idx % sectorsAll.length];
    const staffBuckets = ['1-10', '11-50', '51-200', '201-1000', '1000+'];
    const revBuckets = ['Under ₦1M', '₦1M–₦10M', '₦10M–₦100M', '₦100M–₦1B', '₦1B–₦10B', '₦10B+'];
    const typeBoost = l.type === 'Institutional' ? 5 : l.type === 'Family Office' ? 4 : l.type === 'HNI' ? 3 : 2;
    l.staffCount = staffBuckets[Math.min(typeBoost, staffBuckets.length - 1)];
    l.monthlyRevenueNGN = revBuckets[Math.min(typeBoost + (idx % 2), revBuckets.length - 1)];
    l.annualRevenueNGN = revBuckets[Math.min(typeBoost + 1 + (idx % 2), revBuckets.length - 1)];
    l.yearFounded = 2024 - ((idx % 18) + 2);
    const baseRev = (typeBoost === 5 ? 800 : typeBoost === 4 ? 250 : typeBoost === 3 ? 80 : 25) * 1000000;
    const baseStaff = typeBoost === 5 ? 480 : typeBoost === 4 ? 120 : typeBoost === 3 ? 45 : 12;
    l.corporateFinancials = {
      monthlyRevenueNGN: seedSeries(baseRev, 0.04 + (idx % 5) * 0.005, 12),
      staff: seedStaff(baseStaff, 12),
      sectorMix: sectorsAll.slice(0, 4).map(function (s, i) { return { sector: s, pct: [40, 25, 20, 15][i] }; })
    };
    const wrapperIds = ['SPV', 'Sub-Fund', 'Rolling', 'Venture', 'Co-Invest', 'Roll-Up'];
    const holdHorizons = ['1-3', '3-5', '5-7', '7+'];
    l.mandate = {
      sectors: [sectorsAll[idx % sectorsAll.length], sectorsAll[(idx + 2) % sectorsAll.length], sectorsAll[(idx + 4) % sectorsAll.length]],
      wrappers: [wrapperIds[idx % wrapperIds.length], wrapperIds[(idx + 2) % wrapperIds.length]],
      ticketSizeMin: l.type === 'Institutional' ? 500000 : l.type === 'Family Office' ? 150000 : l.type === 'HNI' ? 50000 : 10000,
      ticketSizeMax: l.type === 'Institutional' ? 5000000 : l.type === 'Family Office' ? 1500000 : l.type === 'HNI' ? 500000 : 100000,
      geos: [geosAll[idx % geosAll.length], geosAll[(idx + 1) % geosAll.length]],
      stages: [stagesAll[idx % stagesAll.length], stagesAll[(idx + 1) % stagesAll.length]],
      vintage: 2024 + (idx % 3),
      holdHorizon: holdHorizons[idx % holdHorizons.length] + ' years'
    };
  });

  // Seeded deal terms (GP-issued to specific LPs)
  const dealTerms = [
    {
      id: 'dt-1', gpId: 'u-gp-1', gpFirm: 'Sahel Capital Partners', lpId: 'lp-1',
      title: 'Solara Energy — Series A+ extension',
      portfolioCompany: 'Solara Energy',
      wrapper: 'Co-Invest', reportCadence: 'Quarterly',
      issued: '2026-05-10', status: 'Pending LP review',
      targetAmount: 25000, valuation: 22000000, instrument: 'Equity',
      allocation: 25000,
      milestones: ['Reach 80 MW deployed by Q4 2026', 'Achieve 38% gross margin', 'Onboard 3 new C&I customers'],
      governance: { boardSeat: false, infoRights: true, antiDilution: 'Broad-based weighted average', dragAlong: true, rofr: true, proRata: true },
      memo: 'Follow-on into Solara Energy Series A+ at $22M pre-money. Pro-rata defended with optional 25% top-up.'
    },
    {
      id: 'dt-2', gpId: 'u-gp-1', gpFirm: 'Sahel Capital Partners', lpId: 'lp-1',
      title: 'Lagos AgriTech — Series B participation',
      portfolioCompany: 'Lagos AgriTech',
      wrapper: 'SPV', reportCadence: 'Monthly',
      issued: '2026-05-18', status: 'Pending LP review',
      targetAmount: 50000, valuation: 28000000, instrument: 'CSAFE',
      allocation: 50000,
      milestones: ['Cross 30,000 active farmers', 'Launch in 2 new states', 'Reach NGN 4B annualized revenue'],
      governance: { boardSeat: false, infoRights: true, antiDilution: 'Broad-based weighted average', dragAlong: true, rofr: true, proRata: true },
      memo: 'Convertible SAFE into Lagos AgriTech with cap at $28M and 15% discount.'
    },
    {
      id: 'dt-3', gpId: 'u-gp-1', gpFirm: 'Sahel Capital Partners', lpId: 'lp-2',
      title: 'Akwaaba Health — Series A lead',
      portfolioCompany: 'Akwaaba Health',
      wrapper: 'Venture', reportCadence: 'Quarterly',
      issued: '2026-05-20', status: 'Pending LP review',
      targetAmount: 200000, valuation: 15000000, instrument: 'Equity',
      allocation: 200000,
      milestones: ['Expand to Côte d\'Ivoire', 'Reach 100k MAUs', 'B2B contract with 2 HMOs'],
      governance: { boardSeat: true, infoRights: true, antiDilution: 'Broad-based weighted average', dragAlong: true, rofr: true, proRata: true },
      memo: 'Sahel leading Akwaaba Health Series A at $15M pre-money with board seat.'
    }
  ];

  const dealNegotiations = [
    {
      dealId: 'dt-1',
      turns: [
        { from: 'gp', who: 'Adaobi Okonkwo', when: '2026-05-10 09:12', action: 'Offer', text: 'Initial offer: $25K allocation at $22M pre-money, broad-based anti-dilution, info rights, ROFR.' }
      ]
    },
    {
      dealId: 'dt-2',
      turns: [
        { from: 'gp', who: 'Adaobi Okonkwo', when: '2026-05-18 11:04', action: 'Offer', text: 'CSAFE into Lagos AgriTech: $50K, $28M cap, 15% discount.' }
      ]
    },
    {
      dealId: 'dt-3',
      turns: [
        { from: 'gp', who: 'Adaobi Okonkwo', when: '2026-05-20 14:30', action: 'Offer', text: 'Akwaaba Health Series A: $200K equity at $15M pre-money. Board seat to Sahel.' }
      ]
    }
  ];

  // Pre-approved memos — represent deals Tunde (lp-1) has executed.
  // currentValuation reflects today's mark-to-market for net worth calculation.
  const dealMemos = [
    {
      id: 'dm-1', dealId: 'dt-0-historic', generatedAt: '2026-04-04 16:22', status: 'Approved',
      gp: { firm: 'Sahel Capital Partners', cac: 'RC-1230945', tin: 'NG-2210045-0001', address: '14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', vehicle: 'NEIIA Growth Fund I', signatory: 'Adaobi Okonkwo · Managing Partner', bank: { name: 'Stanbic IBTC', currency: 'NGN', accountName: 'NEIIA Growth Fund I — Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', sortCode: 'SBIC0001' } },
      lp: { id: 'lp-1', name: 'Tunde Adeyemi', firm: 'FounderHQ Holdings', lpType: 'Angel', sector: 'Fintech', mandate: 'African early-stage tech', cac: 'RC-987212', tin: 'NG-9871002-0001', address: '34 Cooper Road, Ikoyi, Lagos, Nigeria' },
      deal: { title: 'Naija Logistics — Series B follow-on', portfolioCompany: 'Naija Logistics', allocation: 18000, instrument: 'Equity', valuation: 35000000, currentValuation: 42000000, milestones: ['$4M GMV/month', 'Launch Abuja hub'], wrapper: 'Co-Invest', reportCadence: 'Quarterly' },
      currentValue: 21600, dealStatus: 'Active', sector: 'Supply Chain', agreedAt: '2026-04-04',
      meeting: { date: '2026-04-09 11:00 WAT', link: 'https://meet.google.com/abc-defg-hij', id: 'NEIIA-MTG-7720' }
    },
    {
      id: 'dm-2', dealId: 'dt-historic-2', generatedAt: '2025-11-12 10:14', status: 'Approved',
      gp: { firm: 'Sahel Capital Partners', cac: 'RC-1230945', tin: 'NG-2210045-0001', address: '14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', vehicle: 'NEIIA Growth Fund I', signatory: 'Adaobi Okonkwo · Managing Partner', bank: { name: 'Stanbic IBTC', currency: 'NGN', accountName: 'NEIIA Growth Fund I — Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', sortCode: 'SBIC0001' } },
      lp: { id: 'lp-1', name: 'Tunde Adeyemi', firm: 'FounderHQ Holdings', lpType: 'Angel', sector: 'Fintech', mandate: 'African early-stage tech', cac: 'RC-987212', tin: 'NG-9871002-0001', address: '34 Cooper Road, Ikoyi, Lagos, Nigeria' },
      deal: { title: 'Solara Energy — Series A lead', portfolioCompany: 'Solara Energy', allocation: 45000, instrument: 'Equity', valuation: 18000000, currentValuation: 22000000, milestones: ['Deploy 50 MW', 'Reach 35% gross margin'], wrapper: 'Venture', reportCadence: 'Quarterly' },
      currentValue: 55000, dealStatus: 'Active', sector: 'Clean Energy', agreedAt: '2025-11-12',
      meeting: { date: '2025-11-18 14:00 WAT', link: 'https://meet.google.com/xyz-mnop-qrs', id: 'NEIIA-MTG-7501' }
    },
    {
      id: 'dm-3', dealId: 'dt-historic-3', generatedAt: '2025-09-22 09:30', status: 'Approved',
      gp: { firm: 'Sahel Capital Partners', cac: 'RC-1230945', tin: 'NG-2210045-0001', address: '14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', vehicle: 'NEIIA Tech Ventures', signatory: 'Adaobi Okonkwo · Managing Partner', bank: { name: 'Stanbic IBTC', currency: 'NGN', accountName: 'NEIIA Tech Ventures — Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', sortCode: 'SBIC0001' } },
      lp: { id: 'lp-1', name: 'Tunde Adeyemi', firm: 'FounderHQ Holdings', lpType: 'Angel', sector: 'Fintech', mandate: 'African early-stage tech', cac: 'RC-987212', tin: 'NG-9871002-0001', address: '34 Cooper Road, Ikoyi, Lagos, Nigeria' },
      deal: { title: 'Akwaaba Health — Series A', portfolioCompany: 'Akwaaba Health', allocation: 32000, instrument: 'Equity', valuation: 12000000, currentValuation: 15000000, milestones: ['Reach 100k MAUs', 'Expand 1 country'], wrapper: 'Venture', reportCadence: 'Monthly' },
      currentValue: 40000, dealStatus: 'Active', sector: 'Healthtech', agreedAt: '2025-09-22',
      meeting: { date: '2025-09-28 11:00 WAT', link: 'https://meet.google.com/abc-defg-hij', id: 'NEIIA-MTG-7401' }
    },
    {
      id: 'dm-4', dealId: 'dt-historic-4', generatedAt: '2025-06-15 14:08', status: 'Approved',
      gp: { firm: 'Sahel Capital Partners', cac: 'RC-1230945', tin: 'NG-2210045-0001', address: '14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', vehicle: 'NEIIA Growth Fund I', signatory: 'Adaobi Okonkwo · Managing Partner', bank: { name: 'Stanbic IBTC', currency: 'NGN', accountName: 'NEIIA Growth Fund I — Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', sortCode: 'SBIC0001' } },
      lp: { id: 'lp-1', name: 'Tunde Adeyemi', firm: 'FounderHQ Holdings', lpType: 'Angel', sector: 'Fintech', mandate: 'African early-stage tech', cac: 'RC-987212', tin: 'NG-9871002-0001', address: '34 Cooper Road, Ikoyi, Lagos, Nigeria' },
      deal: { title: 'Greenfield Microfinance — Series A', portfolioCompany: 'Greenfield Microfinance', allocation: 28000, instrument: 'Equity', valuation: 16000000, currentValuation: 18000000, milestones: ['Cross 50k SME loans', '90% repayment rate'], wrapper: 'Co-Invest', reportCadence: 'Quarterly' },
      currentValue: 31500, dealStatus: 'Active', sector: 'Fintech', agreedAt: '2025-06-15',
      meeting: { date: '2025-06-20 10:30 WAT', link: 'https://meet.google.com/aaa-bbbb-ccc', id: 'NEIIA-MTG-7220' }
    },
    {
      id: 'dm-5', dealId: 'dt-historic-5', generatedAt: '2024-12-10 12:00', status: 'Approved',
      gp: { firm: 'Sahel Capital Partners', cac: 'RC-1230945', tin: 'NG-2210045-0001', address: '14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', vehicle: 'NEIIA Tech Ventures', signatory: 'Adaobi Okonkwo · Managing Partner', bank: { name: 'Stanbic IBTC', currency: 'NGN', accountName: 'NEIIA Tech Ventures — Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', sortCode: 'SBIC0001' } },
      lp: { id: 'lp-1', name: 'Tunde Adeyemi', firm: 'FounderHQ Holdings', lpType: 'Angel', sector: 'Fintech', mandate: 'African early-stage tech', cac: 'RC-987212', tin: 'NG-9871002-0001', address: '34 Cooper Road, Ikoyi, Lagos, Nigeria' },
      deal: { title: 'Lagos AgriTech — Seed', portfolioCompany: 'Lagos AgriTech', allocation: 15000, instrument: 'CSAFE', valuation: 8000000, currentValuation: 28000000, milestones: ['Reach 5,000 farmers', 'Series A by 2026'], wrapper: 'SPV', reportCadence: 'Quarterly' },
      currentValue: 52500, dealStatus: 'Active', sector: 'Agriculture', agreedAt: '2024-12-10',
      meeting: { date: '2024-12-16 10:00 WAT', link: 'https://meet.google.com/old-aaaa-bbb', id: 'NEIIA-MTG-7001' }
    }
  ];

  // Per-deal published reports (keyed by dealMemo.id)
  const dealReports = [
    { id: 'dr-1', dealMemoId: 'dm-1', dealTitle: 'Naija Logistics — Series B follow-on', cadence: 'Quarterly', period: 'Q1 2026', publishedAt: '2026-04-15', title: 'Naija Logistics Q1 2026 update', summary: 'Q1 GMV crossed $4.2M/mo. Abuja hub launched on schedule. Margins expanded 180bps as logistics density increased.', kpis: { revenue: '$4.2M/mo', burn: '$680K/mo', runway: '14 mo', customers: '2,100 SMB shippers' }, file: 'NL-Q1-2026-Report.pdf', pages: 14 },
    { id: 'dr-2', dealMemoId: 'dm-1', dealTitle: 'Naija Logistics — Series B follow-on', cadence: 'Quarterly', period: 'Q4 2025', publishedAt: '2026-01-15', title: 'Naija Logistics Q4 2025 update', summary: 'Strong holiday season. Net dollar retention at 124%. Pilot with major FMCG distributor in progress.', kpis: { revenue: '$3.6M/mo', burn: '$640K/mo', runway: '12 mo', customers: '1,840 SMB shippers' }, file: 'NL-Q4-2025-Report.pdf', pages: 12 },
    { id: 'dr-3', dealMemoId: 'dm-2', dealTitle: 'Solara Energy — Series A lead', cadence: 'Quarterly', period: 'Q1 2026', publishedAt: '2026-04-20', title: 'Solara Energy Q1 2026 update', summary: 'Revenue +71% YoY. 62 MW deployed (target: 80 MW by Q4). Three new C&I customers signed in Q1.', kpis: { revenue: '$2.1M/mo', burn: '$310K/mo', runway: '22 mo', customers: '14 C&I sites' }, file: 'SE-Q1-2026-Report.pdf', pages: 16 },
    { id: 'dr-4', dealMemoId: 'dm-3', dealTitle: 'Akwaaba Health — Series A', cadence: 'Monthly', period: 'Apr 2026', publishedAt: '2026-05-05', title: 'Akwaaba Health April 2026 update', summary: 'MAUs crossed 88k (target 100k by Q3). Côte d\'Ivoire launch slipped 30 days. HMO pipeline strong.', kpis: { revenue: '$320K/mo', burn: '$190K/mo', runway: '18 mo', customers: '88k MAUs' }, file: 'AH-Apr-2026.pdf', pages: 8 },
    { id: 'dr-5', dealMemoId: 'dm-3', dealTitle: 'Akwaaba Health — Series A', cadence: 'Monthly', period: 'Mar 2026', publishedAt: '2026-04-05', title: 'Akwaaba Health March 2026 update', summary: 'MAUs at 81k. First HMO contract signed (Hollard Ghana).', kpis: { revenue: '$295K/mo', burn: '$190K/mo', runway: '19 mo', customers: '81k MAUs' }, file: 'AH-Mar-2026.pdf', pages: 8 },
    { id: 'dr-6', dealMemoId: 'dm-4', dealTitle: 'Greenfield Microfinance — Series A', cadence: 'Quarterly', period: 'Q1 2026', publishedAt: '2026-04-18', title: 'Greenfield Q1 2026 update', summary: '38,400 SME loans booked. Repayment rate 92.4%. Default rate 3.1%.', kpis: { revenue: '$1.4M/mo', burn: '$220K/mo', runway: '20 mo', customers: '38.4k SMEs' }, file: 'GF-Q1-2026-Report.pdf', pages: 12 },
    { id: 'dr-7', dealMemoId: 'dm-5', dealTitle: 'Lagos AgriTech — Seed', cadence: 'Quarterly', period: 'Q1 2026', publishedAt: '2026-04-22', title: 'Lagos AgriTech Q1 2026 update', summary: '28k active farmers. Revenue 3.5x YoY. Series A pricing conversations underway.', kpis: { revenue: '$580K/mo', burn: '$240K/mo', runway: '16 mo', customers: '28k farmers' }, file: 'LA-Q1-2026-Report.pdf', pages: 14 }
  ];

  // Apex AI stub conversations
  const apexConversations = [
    {
      id: 'ax-1', title: "What's Sahel's average IRR?",
      updated: '1h ago',
      messages: [
        { from: 'user', text: "What's Sahel's average IRR across all funds?" },
        { from: 'apex', text: "Sahel Capital's weighted IRR across Growth Fund I and Tech Ventures is 17.5%. Growth Fund I leads at 19.4% (Q1 2026); Tech Ventures sits at 14.1%. Both outperform the 2023–2024 African PE benchmark of 12.8%." }
      ]
    },
    {
      id: 'ax-2', title: 'Summarize the Solara Energy deal',
      updated: '4h ago',
      messages: [
        { from: 'user', text: 'Summarize the Solara Energy deal.' },
        { from: 'apex', text: "Solara Energy is a distributed-solar mini-grid operator out of Nairobi, currently Series A+. Sahel holds 15.9% from a $3.5M check at a $22M valuation. The current extension round adds $25K pro-rata for Tunde, with optional 25% top-up. Helios Energy Partners (London) is lead. Headline: revenue +71% YoY, gross margin 38%." }
      ]
    },
    {
      id: 'ax-3', title: 'What should I do about Capital Call #7?',
      updated: '1d ago',
      messages: [
        { from: 'user', text: 'What should I do about Capital Call #7?' },
        { from: 'apex', text: 'Capital Call #7 is your pro-rata $25K share for Solara Energy follow-on, due June 15. Based on your cash projections and the strong unit economics on Solara, I would recommend acknowledging in full. If liquidity is constrained, the top-up window is optional — you can decline that without penalty.' }
      ]
    }
  ];

  // Stock meetings list seed (one per approved deal)
  const meetings = [
    { id: 'NEIIA-MTG-7720', title: 'Naija Logistics settlement call', attendees: ['Tunde Adeyemi', 'Adaobi Okonkwo'], datetime: '2026-04-09 11:00 WAT', platform: 'Google Meet', link: 'https://meet.google.com/abc-defg-hij', dealMemoId: 'dm-1' },
    { id: 'NEIIA-MTG-7501', title: 'Solara Series A wire & paperwork', attendees: ['Tunde Adeyemi', 'Adaobi Okonkwo', 'Chinedu Bello'], datetime: '2025-11-18 14:00 WAT', platform: 'Google Meet', link: 'https://meet.google.com/xyz-mnop-qrs', dealMemoId: 'dm-2' }
  ];

  function contactsFor(role, userId) {
    // Aggregate contact history from messages, deal memos, meetings
    const seen = {};
    function add(contact) {
      if (!contact || !contact.id || seen[contact.id]) return;
      seen[contact.id] = contact;
    }

    // From deal memos
    dealMemos.forEach(function (m) {
      if (role === 'lp' && m.lp && m.lp.id === userId) {
        add({ id: 'gp-' + m.gp.firm, name: m.gp.signatory.split('·')[0].trim(), firm: m.gp.firm, role: 'GP', source: 'Deal: ' + m.deal.title, initials: m.gp.signatory.split('·')[0].trim().split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase(), email: 'adaobi@sahelcapital.ng' });
      }
      if (role === 'gp' && m.lp) {
        const lpRow = lp.find(function (l) { return l.id === m.lp.id; });
        if (lpRow) add({ id: lpRow.id, name: lpRow.name, firm: lpRow.name + ' Holdings', role: 'LP', source: 'Deal: ' + m.deal.title, initials: lpRow.initials, email: lpRow.email });
      }
    });

    // From seeded message threads
    if (messages && messages.participants) {
      messages.participants.forEach(function (pid) {
        if (pid === userId) return;
        if (pid.indexOf('lp-') === 0) {
          const lpRow = lp.find(function (l) { return l.id === pid; });
          if (lpRow && role === 'gp') add({ id: lpRow.id, name: lpRow.name, firm: lpRow.name + ' Holdings', role: 'LP', source: 'Message thread', initials: lpRow.initials, email: lpRow.email });
        } else if (pid.indexOf('u-gp-') === 0) {
          const gpRow = gp.find(function (g) { return g.id === pid; });
          if (gpRow && role === 'lp') add({ id: gpRow.id, name: gpRow.name, firm: gpRow.firm, role: 'GP', source: 'Message thread', initials: gpRow.initials, email: gpRow.email });
        }
      });
    }

    // From meetings
    meetings.forEach(function (mt) {
      (mt.attendees || []).forEach(function (a) {
        const lpRow = lp.find(function (l) { return l.name === a; });
        const gpRow = gp.find(function (g) { return g.name === a; });
        if (role === 'gp' && lpRow) add({ id: lpRow.id, name: lpRow.name, firm: lpRow.name + ' Holdings', role: 'LP', source: 'Meeting: ' + mt.title, initials: lpRow.initials, email: lpRow.email });
        if (role === 'lp' && gpRow) add({ id: gpRow.id, name: gpRow.name, firm: gpRow.firm, role: 'GP', source: 'Meeting: ' + mt.title, initials: gpRow.initials, email: gpRow.email });
      });
    });

    return Object.keys(seen).map(function (k) { return seen[k]; });
  }

  // Pricing helpers
  function computeCyclePrice(baseMonthly, cycleId) {
    var c = pricing.cycles[cycleId] || pricing.cycles.monthly;
    return Math.round(baseMonthly * c.months * (1 - c.discount));
  }
  function perMonthForCycle(baseMonthly, cycleId) {
    var c = pricing.cycles[cycleId] || pricing.cycles.monthly;
    return Math.round(baseMonthly * (1 - c.discount));
  }
  function tierForLpCount(n) {
    var tiers = pricing.tiers.gp;
    var count = Number(n) || 0;
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i];
      if (count >= t.lpMin && count <= t.lpMax) return t;
    }
    if (count > tiers[tiers.length - 1].lpMin) return tiers[tiers.length - 1];
    return tiers[0];
  }

  window.NEIIA_DATA = {
    personas: { gp, lp },
    funds, portfolio, capitalCalls, distributions, messages, notifications,
    pricing, subscription, lpSubscription, gpActivity, lpHoldings, lpActivity, documents, reports, taxDocs,
    lpTypes, dealTerms, dealNegotiations, dealMemos, dealReports, apexConversations,
    fundWrappers, reportTemplates, meetings, contactsFor: contactsFor,
    computeCyclePrice: computeCyclePrice,
    perMonthForCycle: perMonthForCycle,
    tierForLpCount: tierForLpCount
  };

  // localStorage-backed state
  const KEY = 'neiia_state_v1';
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  const initial = load();
  const State = {
    get role() { return localStorage.getItem('neiia_role') || initial.role || null; },
    set role(v) { localStorage.setItem('neiia_role', v); const s = load(); s.role = v; save(s); },
    get currentUser() { const s = load(); return s.currentUser || null; },
    set currentUser(v) { const s = load(); s.currentUser = v; save(s); },
    get signedCalls() { const s = load(); return s.signedCalls || []; },
    addSignedCall(id) { const s = load(); s.signedCalls = s.signedCalls || []; if (!s.signedCalls.includes(id)) s.signedCalls.push(id); save(s); },
    get messagesUnread() { const s = load(); return s.messagesUnread != null ? s.messagesUnread : 1; },
    set messagesUnread(v) { const s = load(); s.messagesUnread = v; save(s); },
    get signupDraft() { const s = load(); return s.signupDraft || {}; },
    set signupDraft(v) { const s = load(); s.signupDraft = v; save(s); },
    updateSignupDraft(patch) { const s = load(); s.signupDraft = Object.assign({}, s.signupDraft || {}, patch || {}); save(s); return s.signupDraft; },
    get apexThread() { const s = load(); return s.apexThread || null; },
    set apexThread(v) { const s = load(); s.apexThread = v; save(s); },
    get dealMemos() { const s = load(); return s.dealMemos || []; },
    addDealMemo(memo) { const s = load(); s.dealMemos = s.dealMemos || []; s.dealMemos.push(memo); save(s); return memo; },
    getDealMemo(id) { const s = load(); return (s.dealMemos || []).find(function (m) { return m.id === id; }); },
    get dealNegotiations() { const s = load(); return s.dealNegotiations || []; },
    addDealTurn(dealId, turn) {
      const s = load(); s.dealNegotiations = s.dealNegotiations || [];
      let entry = s.dealNegotiations.find(function (n) { return n.dealId === dealId; });
      if (!entry) { entry = { dealId: dealId, turns: [] }; s.dealNegotiations.push(entry); }
      entry.turns.push(turn);
      save(s);
      return entry;
    },
    getDealTurns(dealId) {
      const s = load();
      const seeded = (window.NEIIA_DATA.dealNegotiations || []).find(function (n) { return n.dealId === dealId; });
      const stored = (s.dealNegotiations || []).find(function (n) { return n.dealId === dealId; });
      const seededTurns = (seeded && seeded.turns) || [];
      const storedTurns = (stored && stored.turns) || [];
      return seededTurns.concat(storedTurns);
    },
    // LP add-on state (mirrors seeded lpSubscription.activeAddons but can be mutated)
    get lpAddons() {
      const s = load();
      if (s.lpAddons) return s.lpAddons;
      // first-time read: seed from data layer
      return (window.NEIIA_DATA && window.NEIIA_DATA.lpSubscription && window.NEIIA_DATA.lpSubscription.activeAddons) || ['apex'];
    },
    setLpAddons(list) { const s = load(); s.lpAddons = list.slice(); save(s); },
    hasLpAddon(id) { return this.lpAddons.indexOf(id) > -1; },
    activateLpAddon(id) {
      const s = load();
      s.lpAddons = (s.lpAddons || (window.NEIIA_DATA && window.NEIIA_DATA.lpSubscription && window.NEIIA_DATA.lpSubscription.activeAddons.slice()) || ['apex']).slice();
      if (s.lpAddons.indexOf(id) === -1) s.lpAddons.push(id);
      save(s);
      // Keep data layer in sync (visual indicator)
      if (window.NEIIA_DATA && window.NEIIA_DATA.lpSubscription) {
        window.NEIIA_DATA.lpSubscription.activeAddons = s.lpAddons.slice();
        (window.NEIIA_DATA.lpSubscription.addons || []).forEach(function (a) { a.active = s.lpAddons.indexOf(a.id) > -1; });
      }
    },
    // GP tier
    get gpTier() { const s = load(); return s.gpTier || (window.NEIIA_DATA && window.NEIIA_DATA.subscription && window.NEIIA_DATA.subscription.tier) || 'growth'; },
    set gpTier(v) { const s = load(); s.gpTier = v; save(s); },
    // Meetings
    get meetings() {
      const s = load();
      const stored = s.meetings || [];
      const seeded = (window.NEIIA_DATA && window.NEIIA_DATA.meetings) || [];
      return seeded.concat(stored);
    },
    addMeeting(mt) { const s = load(); s.meetings = s.meetings || []; s.meetings.push(mt); save(s); return mt; },
    // Downloaded / uploaded docs (vault tracking)
    get downloadedDocs() { const s = load(); return s.downloadedDocs || []; },
    trackDownload(docId) { const s = load(); s.downloadedDocs = s.downloadedDocs || []; s.downloadedDocs.push({ docId: docId, ts: Date.now() }); save(s); },
    get uploadedDocs() { const s = load(); return s.uploadedDocs || []; },
    trackUpload(doc) { const s = load(); s.uploadedDocs = s.uploadedDocs || []; s.uploadedDocs.push(Object.assign({ ts: Date.now() }, doc)); save(s); return doc; },
    // GP bank accounts
    get gpBankAccounts() {
      const s = load();
      if (s.gpBankAccounts) return s.gpBankAccounts;
      return [
        { id: 'bk-1', bankName: 'Stanbic IBTC', currency: 'NGN', accountName: 'NEIIA Growth Fund I — Capital Account', accountNumber: '0123456789', swift: 'SBICNGLX', sortCode: 'SBIC0001', primary: true },
        { id: 'bk-2', bankName: 'GTBank', currency: 'NGN', accountName: 'NEIIA Tech Ventures — Capital Account', accountNumber: '0223411432', swift: 'GTBINGLA', sortCode: 'GTBI0002', primary: false },
        { id: 'bk-3', bankName: 'Standard Chartered', currency: 'USD', accountName: 'NEIIA Offshore — USD', mask: '****0091', accountNumber: '00911002991', swift: 'SCBLNGLA', sortCode: 'SCBL0003', primary: false }
      ];
    },
    setGpBankAccounts(list) { const s = load(); s.gpBankAccounts = list.slice(); save(s); },
    getPrimaryGpBank() { const list = this.gpBankAccounts; return list.find(function (b) { return b.primary; }) || list[0]; },
    // GP-published reports (added on top of seeded dealReports)
    get gpReports() { const s = load(); return s.gpReports || []; },
    addGpReport(r) { const s = load(); s.gpReports = s.gpReports || []; s.gpReports.push(r); save(s); return r; },
    clear() { localStorage.removeItem(KEY); localStorage.removeItem('neiia_role'); }
  };
  window.NEIIA_STATE = State;
})();
