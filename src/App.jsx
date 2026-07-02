import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReportProvider } from './contexts/ReportContext'
import Home from './pages/Home'
import CreateReport from './pages/CreateReport'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <ReportProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/report/:id" element={<Dashboard />} />
        </Routes>
      </Router>
    </ReportProvider>
  )
}

export default App
