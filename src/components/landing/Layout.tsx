import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/ui/icon'
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
    { to: '/prices', label: 'Калькулятор' },
    { to: '/hours', label: 'Режим работы' },
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
        {/* Верхняя строка — контакты */}
        <div className="hidden md:flex items-center justify-end gap-5 text-xs text-zinc-500">
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
          <span className="text-zinc-700">|</span>
          <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_tolbukhina_13k1/Z04YdQ5pQUwEQFtvfXtzcn1qYw==/?ll=37.399892%2C55.723197&source=serp_navig&z=17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="MapPin" size={12} />
            Толбухина 13к1
          </a>
        </div>
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
