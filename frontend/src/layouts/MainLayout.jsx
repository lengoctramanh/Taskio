import { Outlet, Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/token'

function MainLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold">
            Taskio
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/profile" className="text-sm font-medium">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout