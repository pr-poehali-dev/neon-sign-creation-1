import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/ui/icon'
import { Squares } from "./squares-background"
import LeadModal from './LeadModal'

interface LayoutProps {
  children: ReactNode
  pageTitle?: string
  pageSubtitle?: string
}

export default function Layout({ children, pageTitle, pageSubtitle }: LayoutProps) {
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener('open-lead-modal', handler)
    return () => window.removeEventListener('open-lead-modal', handler)
  }, [])

  const navLinks = [
    { to: '/about', label: 'О нас' },
    { to: '/news', label: 'Новости' },
    { to: '/knowledge/layout-requirements', label: 'Требования к макету' },
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

      {/* ШАПКА — навигация */}
      <header className="absolute top-0 left-0 right-0 z-30 px-8 py-3 flex items-center justify-between">
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

        <div className="hidden md:flex items-center gap-1">
          <a href="tel:89663386505" className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-1.5">
            <Icon name="Phone" size={13} />
            8 966 338-65-05
          </a>
          <a href="https://t.me/YavaDesign" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-1.5">
            <Icon name="Send" size={13} />
            @YavaDesign
          </a>
          <a href="https://max.ru/u/f9LHodD0cOL8MiE9Z8F-z-o-BaYnKOXpJi31ljzSTyZ2g8cckpoq90QIad8" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-1.5">
            <Icon name="MessageCircle" size={13} />
            MAX
          </a>
        </div>
      </header>

      {/* HERO BANNER — оранжевая полоса под шапкой */}
      <div className="absolute top-10 left-0 right-0 z-30 bg-[#FF4D00] px-8 md:px-16 py-3 flex items-center justify-between">
        <Link to="/" className="group flex-shrink-0">
          <div className="flex items-baseline gap-0">
            <span className="text-2xl md:text-3xl font-bold text-white leading-none tracking-tight">
              Ява&nbsp;<span className="text-black">Дизайн</span>
            </span>
          </div>
          <p className="text-white/70 text-xs mt-0.5 group-hover:text-white/90 transition-colors">
            Ваша идея — наш результат.
          </p>
        </Link>

        {pageTitle && (
          <div className="flex-1 px-8 hidden md:block">
            <h1 className="text-white font-bold text-lg leading-tight truncate">{pageTitle}</h1>
            {pageSubtitle && <p className="text-white/70 text-xs truncate">{pageSubtitle}</p>}
          </div>
        )}

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-1.5 bg-white hover:bg-zinc-100 text-[#FF4D00] text-sm font-semibold rounded-lg transition-colors"
          >
            Быстрый расчёт
          </button>
          <Link
            to="/hours"
            className="px-4 py-1.5 border border-white/40 hover:border-white text-white text-sm rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Icon name="Clock" size={13} />
            Режим работы
          </Link>
        </div>
      </div>

      <div className="relative z-20 h-full">
        {children}
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
