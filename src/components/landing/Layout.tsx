import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/ui/icon'
import { Squares } from "./squares-background"
import LeadModal from './LeadModal'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)

  const navLinks = [
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

      {/* ШАПКА */}
      <header className="absolute top-0 left-0 right-0 z-30 px-8 py-3 flex items-center justify-between">
        {/* Навигация */}
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

        {/* Контакты справа */}
        <div className="hidden md:flex items-center gap-4 text-xs text-zinc-500">
          <a href="tel:89663386505" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="Phone" size={12} />
            8 966 338-65-05
          </a>
          <a href="https://t.me/YavaDesign" target="_blank" rel="noopener noreferrer" className="hover:text-[#2AABEE] transition-colors flex items-center gap-1.5">
            <Icon name="Send" size={12} />
            @YavaDesign
          </a>
          <a href="https://max.ru/u/f9LHodD0cOL8MiE9Z8F-z-o-BaYnKOXpJi31ljzSTyZ2g8cckpoq90QIad8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="MessageCircle" size={12} />
            MAX
          </a>
        </div>
      </header>

      {/* HERO-БЛОК — постоянный на всех страницах */}
      <div className="absolute top-12 left-0 right-0 z-30 px-8 md:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="group">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-none tracking-tight">
            Ява <span className="text-[#FF4D00]">Дизайн</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1 group-hover:text-zinc-400 transition-colors">
            Ваша идея — наш результат.
          </p>
        </Link>

        {/* Кнопки справа */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2 bg-[#FF4D00] hover:bg-[#cc3d00] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Быстрый расчёт
          </button>
          <Link
            to="/hours"
            className="px-5 py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm rounded-lg transition-colors flex items-center gap-2"
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
