import { useEffect, useMemo, useState, type ReactNode } from 'react'
import './App.css'
import PortfolioPage from './pages/portfolio'
import TripDispatchDemo from './pages/demos/TripDispatch'
import SalesForecastDashboardDemo from './pages/demos/SalesForecastDashboard'
import LiveGpsMonitoringDemo from './pages/demos/LiveGpsMonitoring'
import WebScrapingDemo from './pages/demos/WebScraping'
import MicrosoftGraphApiDemo from './pages/demos/MicrosoftGraphApi'
import SharePointRestApiDemo from './pages/demos/SharePointRestApi'
import PowerAutomateDemo from './pages/demos/PowerAutomate'
import MicrosoftLakehouseDemo from './pages/demos/MicrosoftLakehouse'
import PersonalInfoPage from './pages/PersonalInfo';

const routeMap: Record<string, ReactNode> = {
  portfolio: <PortfolioPage />,
  'demo/trip-dispatch': <TripDispatchDemo />,
  'demo/sales-forecast-dashboard': <SalesForecastDashboardDemo />,
  'demo/live-gps-monitoring': <LiveGpsMonitoringDemo />,
  'demo/web-scraping': <WebScrapingDemo />,
  'demo/microsoft-graph-api': <MicrosoftGraphApiDemo />,
  'demo/sharepoint-rest-api': <SharePointRestApiDemo />,
  'demo/power-automate': <PowerAutomateDemo />,
  'demo/microsoft-lakehouse': <MicrosoftLakehouseDemo />,
  'resume': <PersonalInfoPage />
}

const internalAnchors = new Set(['portfolio', 'projects', 'skills', 'architecture', 'contact', 'resume'])

function getCurrentRoute(): string {
  const route = window.location.hash.replace('#', '')
  return route || 'portfolio'
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute())
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem('theme') ?? 'dark'
  })

  useEffect(() => {
    const onHashChange = () => setRoute(getCurrentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const page = useMemo(() => {
    if (routeMap[route]) {
      return routeMap[route]
    }

    if (route === 'portfolio' || internalAnchors.has(route)) {
      return <PortfolioPage />
    }

    return (
      <div className="not-found-page">
        <h2>Page not found</h2>
        <p>The route <strong>{route}</strong> does not exist yet.</p>
        <p>
          Go back to the <a href="#portfolio">Portfolio</a> section while you
          add more demo pages.
        </p>
      </div>
    )
  }, [route])

  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="app-nav">
          <a href="#portfolio">Portfolio</a>
          <a href="#portfolio">Projects / Demos</a>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </header>
      <main>{page}</main>
    </div>
  )
}

export default App
