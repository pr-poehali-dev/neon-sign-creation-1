import { ReactNode } from 'react'
import Icon from '@/components/ui/icon'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
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
      <header className="absolute top-0 left-0 right-0 z-30 px-8 py-5 flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-wide">
          Ява <span className="text-[#FF4D00]">Дизайн</span>
        </span>
        <div className="hidden md:flex items-center gap-5 text-sm text-zinc-400">
          <a href="tel:89663386505" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="Phone" size={14} />
            8 966 338-65-05
          </a>
          <a href="https://t.me/YavaDesign" target="_blank" rel="noopener noreferrer" className="hover:text-[#2AABEE] transition-colors flex items-center gap-1.5">
            <Icon name="Send" size={14} />
            @YavaDesign
          </a>
          <a href="https://max.ru/u/f9LHodD0cOL8MiE9Z8F-z-o-BaYnKOXpJi31ljzSTyZ2g8cckpoq90QIad8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="MessageCircle" size={14} />
            MAX
          </a>
          <span className="text-zinc-600">|</span>
          <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_tolbukhina_13k1/Z04YdQ5pQUwEQFtvfXtzcn1qYw==/?ll=37.399892%2C55.723197&source=serp_navig&z=17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Icon name="MapPin" size={14} />
            Толбухина 13к1
          </a>
        </div>
      </header>
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  )
}