import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './Layout'
import Icon from '@/components/ui/icon'

const CATEGORIES = [
  { id: 'digital', label: 'Цифровая печать', icon: 'Printer' },
  { id: 'wide', label: 'Широкоформатная печать', icon: 'Monitor' },
  { id: 'uv', label: 'УФ-печать', icon: 'Zap' },
  { id: 'stickers', label: 'Наклейки', icon: 'Tag' },
  { id: 'popular', label: 'Популярная полиграфия', icon: 'Star' },
  { id: 'engineering', label: 'Инженерная печать', icon: 'Building2' },
  { id: 'postprint', label: 'Постпечатная обработка', icon: 'Scissors' },
  { id: 'restaurant', label: 'Для ресторанов и кафе', icon: 'Coffee' },
  { id: 'students', label: 'Для студентов и учащихся', icon: 'GraduationCap' },
  { id: 'business', label: 'Бизнес и мероприятия', icon: 'Briefcase' },
  { id: 'souvenirs', label: 'Сувенирная продукция', icon: 'Gift' },
  { id: 'kids', label: 'Для детей', icon: 'Smile' },
  { id: 'design', label: 'Дизайн и верстка', icon: 'PenTool' },
]

const NEWS = [
  {
    id: 1,
    tag: 'Акция',
    title: 'Скидка 10% на первый заказ',
    desc: 'Новым клиентам — скидка 10% на любую печатную продукцию. Просто упомяните при заказе.',
    color: 'from-[#FF4D00] to-[#ff7a40]',
  },
  {
    id: 2,
    tag: 'Новинка',
    title: 'Soft Touch ламинация',
    desc: 'Бархатистое покрытие для визиток и буклетов. Ощущение роскоши в каждом прикосновении.',
    color: 'from-zinc-800 to-zinc-700',
  },
  {
    id: 3,
    tag: 'Акция',
    title: 'Визитки 1000 шт. от 5 280 ₽',
    desc: 'Цифровая печать матовых визиток тиражом 1000 штук с быстрым сроком изготовления.',
    color: 'from-[#1a1a2e] to-[#16213e]',
  },
  {
    id: 4,
    tag: 'Услуга',
    title: 'Срочная печать за 2 часа',
    desc: 'Нужно срочно? Выполним заказ за 2 часа прямо в день обращения. Работаем без выходных.',
    color: 'from-zinc-900 to-zinc-800',
  },
]

export default function LandingPage() {
  const [activeNews, setActiveNews] = useState(0)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveNews(prev => (prev + 1) % NEWS.length)
    }, 4000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const goToNews = (i: number) => {
    setActiveNews(i)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveNews(prev => (prev + 1) % NEWS.length)
    }, 4000)
  }

  return (
    <Layout>
      <div className="relative z-20 h-full overflow-y-auto">

        {/* Главный блок */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-40 pb-8">

          {/* Меню категорий + Карусель */}
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Левое меню */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ul className="space-y-0.5">
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <Link
                      to="/prices"
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-all group ${
                        hoveredCategory === cat.id
                          ? 'bg-zinc-800 text-[#FF4D00]'
                          : 'text-zinc-400 hover:text-[#FF4D00] hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon name={cat.icon} size={14} className={hoveredCategory === cat.id ? 'text-[#FF4D00]' : 'text-zinc-600 group-hover:text-[#FF4D00]'} />
                        <span>{cat.label}</span>
                      </div>
                      <Icon name="ChevronRight" size={13} className="text-zinc-600 flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Карусель новостей */}
            <div className="flex-1 min-w-0">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNews}
                    className={`absolute inset-0 bg-gradient-to-br ${NEWS[activeNews].color} p-8 md:p-10 flex flex-col justify-end`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-3 w-fit">
                      {NEWS[activeNews].tag}
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 leading-tight">
                      {NEWS[activeNews].title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {NEWS[activeNews].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Точки навигации */}
                <div className="absolute bottom-4 left-8 flex gap-2 z-10">
                  {NEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToNews(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeNews ? 'w-6 bg-white' : 'w-3 bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Стрелки */}
                <button
                  onClick={() => goToNews((activeNews - 1 + NEWS.length) % NEWS.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={() => goToNews((activeNews + 1) % NEWS.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Слайд 2: Готовы к печати */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Готовы к печати?
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Оставьте заявку — мы свяжемся в течение 30 минут, рассчитаем стоимость и сроки. Первый заказ со скидкой 10%.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">
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
              <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_tolbukhina_13k1/Z04YdQ5pQUwEQFtvfXtzcn1qYw==/?ll=37.399892%2C55.723197&source=serp_navig&z=17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Icon name="MapPin" size={14} />
                Толбухина 13к1
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  )
}
