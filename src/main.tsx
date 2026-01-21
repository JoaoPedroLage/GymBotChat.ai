import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PlanDetails from './PlanDetails.tsx'
import { MarketDashboard, CompetitorDashboard } from './Dashboards.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<PlanDetails />} />
        <Route path="/market-data" element={<MarketDashboard />} />
        <Route path="/competitors" element={<CompetitorDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
