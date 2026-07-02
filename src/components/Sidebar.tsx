'use client'

import { Home, FileText, BarChart3, HelpCircle, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Relatórios', href: '/reports' },
  { icon: BarChart3, label: 'Análises', href: '/analytics' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-lk-gray-rose flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-lk-gray-rose">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lk-pink to-lk-pink-dark flex items-center justify-center">
            <span className="text-white font-bold text-lg">LK</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">Analytics</h2>
            <p className="text-xs text-gray-500">AI Powered</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              pathname === item.href
                ? 'bg-lk-pink text-white shadow-soft'
                : 'text-gray-600 hover:bg-lk-cream'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-lk-gray-rose space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-600 hover:bg-lk-cream transition-all">
          <HelpCircle size={20} />
          <span className="font-medium">Ajuda</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-600 hover:bg-lk-cream transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}
