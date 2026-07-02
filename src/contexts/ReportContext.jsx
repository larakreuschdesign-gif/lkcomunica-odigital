import { createContext, useState, useContext } from 'react'

const ReportContext = createContext()

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([])
  const [currentReport, setCurrentReport] = useState(null)

  const createReport = (reportData) => {
    const id = Date.now().toString()
    const newReport = {
      id,
      ...reportData,
      createdAt: new Date(),
    }
    setReports([...reports, newReport])
    setCurrentReport(newReport)
    return id
  }

  const updateReport = (id, updates) => {
    setReports(reports.map(r => r.id === id ? { ...r, ...updates } : r))
    if (currentReport?.id === id) {
      setCurrentReport({ ...currentReport, ...updates })
    }
  }

  const getReport = (id) => {
    return reports.find(r => r.id === id)
  }

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id))
  }

  return (
    <ReportContext.Provider
      value={{
        reports,
        currentReport,
        createReport,
        updateReport,
        getReport,
        deleteReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  )
}

export function useReport() {
  const context = useContext(ReportContext)
  if (!context) {
    throw new Error('useReport deve ser usado dentro de ReportProvider')
  }
  return context
}
