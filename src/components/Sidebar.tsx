import { LayoutDashboard, Plus, FileText, Heart, Settings, LogOut } from 'lucide-react'

interface SidebarProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new', label: 'Novo Roteiro', icon: Plus },
    { id: 'scripts', label: 'Meus Roteiros', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span>📹 ROTEIRO AI</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`sidebar__link ${currentPage === item.id ? 'active' : ''}`}
            >
              <Icon className="sidebar__icon" size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar__bottom">
        <button className="sidebar__link">
          <LogOut className="sidebar__icon" size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}
