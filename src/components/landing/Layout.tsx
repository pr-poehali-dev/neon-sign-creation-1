import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/about', label: 'О нас' },
    { to: '/news', label: 'Новости' },
  ]

  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>
      <header className="absolute top-0 left-0 right-0 z-30 px-8 py-4 flex flex-col gap-1">

        {/* Нижняя строка — логотип + навигация */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-white font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity">
              Ява <span className="text-[#FF4D00]">Дизайн</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    location.pathname === link.to
                      ? 'text-white bg-zinc-800'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  )
}