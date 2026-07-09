import { useState, useEffect } from 'react'
import { Dashboard } from './pages/Dashboard'
import { ScriptBuilder } from './pages/ScriptBuilder'
import { ScriptResult } from './pages/ScriptResult'
import { MyScripts } from './pages/MyScripts'
import { Settings } from './pages/Settings'
import { Sidebar } from './components/Sidebar'
import { useScriptStore } from './store/useScriptStore'

type Page = 'dashboard' | 'new' | 'result' | 'scripts' | 'settings'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const { currentScript } = useScriptStore()

  return (
    <div className="app">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />

      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard onStartNew={() => setCurrentPage('new')} />}
        {currentPage === 'new' && <ScriptBuilder onGenerated={() => setCurrentPage('result')} />}
        {currentPage === 'result' && currentScript && <ScriptResult />}
        {currentPage === 'scripts' && <MyScripts onSelectScript={() => setCurrentPage('result')} />}
        {currentPage === 'settings' && <Settings />}
      </main>
    </div>
  )
}
