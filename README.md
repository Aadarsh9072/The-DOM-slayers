# 🌊 HackOcean

A real-time ocean monitoring web application built for hackathon — tracking coral health, pollution, marine species, drone feeds, and environmental risk forecasts through an interactive dashboard.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Maps | Leaflet + React Leaflet |
| Charts | Recharts |
| Animations | GSAP, Framer Motion |
| Icons | Lucide React |
| PDF Export | jsPDF |
| CSV Parsing | PapaParse |
| Linting | Oxlint |

---

## 📁 Project Structure

```
src/
├── pages/          # Route-level page components
│   ├── LandingPage.jsx
│   ├── AuthPage.jsx
│   ├── DashboardOverview.jsx
│   ├── CoralHealthPage.jsx
│   ├── LiveMapPage.jsx
│   ├── PollutionMonitorPage.jsx
│   ├── DroneSensorFeedPage.jsx
│   ├── RiskForecastPage.jsx
│   └── SpeciesTrackerPage.jsx
├── components/     # Reusable UI components
├── layouts/        # Page layout wrappers
├── data/           # Static / mock data
├── constants/      # App-wide constants
├── styles/         # Global styles
└── utils/          # Helper functions
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Other Scripts

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run Oxlint
```

---

## 🌐 Pages & Features

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Hero section, project overview |
| `/auth` | Auth Page | Login / Sign up |
| `/dashboard` | Dashboard Overview | Key ocean metrics at a glance |
| `/dashboard/coral` | Coral Health | Coral reef health monitoring |
| `/dashboard/map` | Live Map | Interactive Leaflet map |
| `/dashboard/pollution` | Pollution Monitor | Ocean pollution data & charts |
| `/dashboard/drone` | Drone Sensor Feed | Live drone sensor readings |
| `/dashboard/risk` | Risk Forecast | Environmental risk predictions |
| `/dashboard/species` | Species Tracker | Marine species tracking |

---

## 📄 License

This project was created for a hackathon. Feel free to fork and build on it.
