'use client'

import { Bell, Settings, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-lk-gray-rose sticky top-0 z-40 shadow-soft">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lk-pink to-lk-pink-dark flex items-center justify-center">
            <span className="text-white font-bold text-lg">LK</span>
          </div>
          <span className="text-sm text-gray-500">Premium Plan</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 hover:bg-lk-cream rounded-xl transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-lk-pink rounded-full"></span>
          </button>

          <button className="p-2 hover:bg-lk-cream rounded-xl transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>

          <button className="flex items-center gap-2 p-2 hover:bg-lk-cream rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lk-pink-medium to-lk-pink flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 hidden md:block">João</span>
          </button>
        </div>
      </div>
    </header>
  )
}
