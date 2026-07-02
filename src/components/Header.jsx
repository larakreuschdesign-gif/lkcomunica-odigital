import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">LK Analytics AI</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            Home
          </button>
        </nav>
      </div>
    </header>
  )
}
