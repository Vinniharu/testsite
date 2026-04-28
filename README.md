# National Energy Investment & Intelligence Administration (NEIIA)

## Project Overview

NEIIA serves as Nigeria’s centralized platform for energy investment intelligence, asset visibility, and strategic coordination. By aggregating data across funds, projects, SPVs, and energy assets, the platform enables government bodies, investors, and stakeholders to make informed decisions, identify investment gaps, manage risk, and accelerate the implementation of national energy priorities.

## Core Modules & Architecture

The NEIIA platform is composed of several specialized portals and tools:

### 1. The Energy Ecosystem (Public & Investor Portals)
- **NEFUND / Fund Administration:** Interfaces for Sub Funds, Venture Funds, Rolling Funds, Scout Funds, SPVs, and Roll Up Vehicles.
- **Investor Management:** Digital Subscriptions and access to the National Energy Data Bank.
- **Energy Assets & Finance:** Overviews and analytics on capital placement across the Nigerian energy ecosystem.

### 2. Intelligence Platform (Dashboard)
A secured operational dashboard located in `/intelligence-platform/` for administrative and executive oversight.
- **Spatial Tracking:** Geospatial mapping of grid assets and field deployments.
- **Risk Models:** Simulation environments and ESG risk scoring across portfolios.
- **Regulatory Reports:** Automated compliance tracking and document generation.
- **Carbon Credits:** Live metrics on VCU prices, carbon offset trading, and project registration.
- **Power Plants:** Generation metrics and capacity statistics for registered infrastructure.
- **Audit Logs:** Immutable tracking of user actions and systemic changes.

### 3. Education & Intelligence Programs
- **Apex AI BETA:** Access to upcoming financial intelligence tools.
- **NEIIA Edu Center:** Educational tracks on fund assessment, portfolio management, TVPI metrics, and venture capital economics.
- **eVillage:** Digital cooperative tracking.

## Technology Stack

- **Frontend Structure:** HTML5
- **Styling:** CSS3 variables with modular design (Custom NEIIA Font ecosystem).
- **Interactivity:** Vanilla JavaScript (ES6+).
- **Data Visualization:** Chart.js 4.4.0 implementations for KPIs, trend analysis, and regional breakdowns.
- **Icons:** FontAwesome 6.4.0 vector graphics.

## Running the Application Locally

The platform runs purely on static frontend technologies. No build steps are required.

Open a terminal in the root directory and start a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Navigate to `http://localhost:8000` to view the landing page.
Access the Intelligence Dashboard directly via `http://localhost:8000/intelligence-platform/index.html`.

## Security Features & Authentication
- Demonstrative Secure Frameworks are active on the Intelligence Platform, including simulated exponential lockout mechanisms and modal-based user confirmation checks. 

## Maintenance Notes
- **Responsive Design:** Core metric cards and modal dialogs are engineered to gracefully scale across mobile (1-column), tablet (2-column), and desktop (3+-column) breakpoints.
- **Component Styling:** Global styles for the Intelligence Platform are maintained centrally in `intelligence-platform/styles.css`.
- **Global Injections:** Shared logic (like side-navigation outside-click dismissal) is distributed uniformly across all dashboard HTML entities. 

## License & Contact
Demonstration Build for the Federal Republic of Nigeria. For integration support, issues, or further expansion of the data feeds, please refer to the project technical administrators.
