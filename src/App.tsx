import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'

// Floating Scroll-to-Top Button
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`app-scroll-to-top-btn ${!visible ? 'hidden' : ''}`}
      aria-label="Scroll to top"
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
    >
      ↑
    </button>
  );
}

import './App.css'
import PortfolioPage from './pages/portfolio'
import TripDispatchDemo from './pages/demos/TripDispatch'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './utils/NotificationContext'
import { TaskWorkerProvider } from './utils/TaskWorkerContext'
import type { Notification } from './components/NotificationBell'
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
  'resume': <PersonalInfoPage />,
}

const internalAnchors = new Set(['portfolio', 'projects', 'skills', 'architecture', 'contact', 'resume'])
const demoRouteLabels: Record<string, string> = {
  'trip-dispatch': 'Trip Dispatch',
  'sales-forecast-dashboard': 'Sales Forecast Dashboard',
  'live-gps-monitoring': 'Live GPS Monitoring',
  'web-scraping': 'Web Scraping',
  'microsoft-graph-api': 'Microsoft Graph API',
  'sharepoint-rest-api': 'SharePoint REST API',
  'power-automate': 'Power Automate',
  'microsoft-lakehouse': 'Microsoft Lakehouse',
}

function getCurrentRoute(): string {
  const route = window.location.hash.replace('#', '')
  return route || 'portfolio'
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute())
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem('theme') ?? 'dark'
  })
  const [_notifications, setNotifications] = useState<Notification[]>([])

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

  const breadcrumbParts = useMemo(() => {
    if (!route || route === 'portfolio') {
      return [
        { label: 'Portfolio', href: undefined as string | undefined },
      ]
    }

    if (route.startsWith('demo/')) {
      const demoSlug = route.slice('demo/'.length)
      const demoLabel = demoRouteLabels[demoSlug] ?? demoSlug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      return [
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Demo', href: '#projects' },
        { label: demoLabel, href: undefined as string | undefined },
      ]
    }

    if (internalAnchors.has(route)) {
      const sectionLabel = route.charAt(0).toUpperCase() + route.slice(1)
      return [
        { label: 'Portfolio', href: '#portfolio' },
        { label: sectionLabel, href: undefined as string | undefined },
      ]
    }

    const fallbackLabel = route.split('/').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' / ')
    return [
      { label: fallbackLabel, href: undefined as string | undefined },
    ]
  }, [route])

  const handleBreadcrumbClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== '#projects' || !route.startsWith('demo/')) {
      return
    }

    event.preventDefault()
    window.location.hash = '#portfolio'

    // Wait for portfolio to render, then jump to the section anchor.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.location.hash = '#projects'
          return
        }

        window.location.hash = '#projects'
      })
    })
  }

  return (
    <BrowserRouter>
      <NotificationProvider>
        <TaskWorkerProvider setNotifications={setNotifications}>
          <div className="app-shell">
            <header className="app-header">
              <nav className="app-nav" aria-label="Current tab">
                {breadcrumbParts.map((part, index) => (
                  <span key={`${part.label}-${index}`}>
                    {part.href ? <a href={part.href} onClick={(event) => handleBreadcrumbClick(event, part.href!)}>{part.label}</a> : <span>{part.label}</span>}
                    {index < breadcrumbParts.length - 1 && <span aria-hidden="true"> / </span>}
                  </span>
                ))}
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
            <ScrollToTopButton />
          </div>
        </TaskWorkerProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
