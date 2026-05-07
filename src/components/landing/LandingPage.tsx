import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './Layout'
import Icon from '@/components/ui/icon'

const MENU_ITEMS = [
  {
    id: 'digital',
    label: 'Цифровая печать',
    icon: 'Printer',
    groups: [
      { title: 'Листовая печать', items: ['Цветная печать и копирование', 'Черно-белая печать и копирование'] },
      { title: 'Брошюры', items: ['На болты', 'На КБС', 'На металлическую пружину', 'На пластиковую пружину', 'На скобы'] },
      { title: 'Календари', items: ['Карманные', 'Квартальные', 'Настенные', 'Настольные перекидные', 'Планеры', 'Производственные'] },
      { title: 'Полиграфическая продукция', items: ['Авторефераты', 'Бейджи', 'Бирки', 'Бланки', 'Блокноты', 'Брошюры', 'Буклеты и лифлеты', 'Визитки', 'Ветеринарные паспорта', 'Детские карточки', 'Дипломы и грамоты', 'Диссертации', 'Дорхэнгеры', 'Журналы', 'Инструкции', 'Каталоги КБС', 'Книги', 'Карточки', 'Коробки', 'Листовки', 'Меню', 'Наклейки (цифровые)', 'Открытки', 'DTF печать на сумках', 'DTF печать на толстовках', 'DTF печать на футболках', 'Пособия', 'Презентации', 'Приглашения', 'Раскраски', 'Сертификаты', 'Сканирование документов', 'Тетради', 'Тейбл-тенты', 'Финансовая отчетность', 'Фотографии', 'Ценники', 'Шуберы'] },
    ]
  },
  {
    id: 'wide',
    label: 'Широкоформатная печать',
    icon: 'Monitor',
    groups: [
      { title: 'Полиграфическая продукция', items: ['Цветная УФ-печать', 'Визитки', 'Открытки', 'Сертификаты', 'Наклейки', 'Стикерпаки'] },
      { title: 'Интерьерная печать', items: ['Печать и накатка на пенокартон', 'Печать и накатка на пластик', 'Печать на холсте', 'Планшеты на пенокартоне', 'Ростомеры'] },
      { title: 'Для бизнеса', items: ['Афиши', 'Баннеры', 'Информационные стенды', 'Мобильные стенды Roll Up', 'Печать на самоклеящейся плёнке', 'Печать на серебряной плёнке', 'Печать на золотой плёнке', 'Печать на голографической плёнке', 'Печать на светоотражающей плёнке', 'Печать на бэклите', 'Плакаты', 'Постеры', 'Таблички на пластике', 'Этикетки', 'Штрих коды'] },
    ]
  },
  {
    id: 'uv',
    label: 'УФ-печать',
    icon: 'Zap',
    groups: [
      { title: 'Для бизнеса', items: ['Афиши', 'Баннеры', 'Информационные стенды', 'Мобильные стенды Roll Up', 'Наклейки', 'Плакаты', 'Постеры', 'Стикерпаки', 'Таблички на пластике', 'Этикетки', 'Штрих коды'] },
      { title: 'Интерьерная печать', items: ['Печать и накатка на пенокартон', 'Печать и накатка на пластик', 'Печать на холсте', 'Планшеты на пенокартоне', 'Раскраски', 'Ростомеры', 'Упаковочная бумага'] },
      { title: 'Тип материала', items: ['На самоклеящейся плёнке', 'На серебряной плёнке', 'На золотой плёнке', 'На голографической плёнке', 'На светоотражающей плёнке', 'На бэклите'] },
    ]
  },
  {
    id: 'stickers',
    label: 'Наклейки',
    icon: 'Tag',
    groups: [
      { title: 'Виды наклеек', items: ['Наклейки (цифровые)', 'Стикерпаки', 'Этикетки', 'Штрих коды', 'Печать на самоклеящейся плёнке', 'Печать на серебряной плёнке', 'Печать на золотой плёнке', 'Печать на голографической плёнке', 'Печать на светоотражающей плёнке'] },
    ]
  },
  {
    id: 'popular',
    label: 'Популярная полиграфия',
    icon: 'Star',
    groups: [
      { title: 'Популярные позиции', items: ['Визитки', 'Листовки', 'Буклеты и лифлеты', 'Брошюры', 'Открытки', 'Приглашения', 'Сертификаты', 'Дипломы и грамоты', 'Плакаты', 'Постеры', 'Календари', 'Блокноты'] },
    ]
  },
  {
    id: 'engineering',
    label: 'Инженерная печать',
    icon: 'Building2',
    groups: [
      { title: 'Инженерная печать', items: ['Проектная документация', 'Чертежи', 'Планы', 'Схемы', 'Черно-белая печать'] },
    ]
  },
  {
    id: 'postprint',
    label: 'Постпечатная обработка',
    icon: 'Scissors',
    groups: [
      { title: 'Обработка', items: ['Ламинация', 'Soft Touch ламинация', 'Фальцовка', 'Биговка', 'Резка', 'Плоттерная резка', 'Перфорация', 'Тиснение', 'Высечка'] },
    ]
  },
  {
    id: 'restaurant',
    label: 'Для ресторанов и кафе',
    icon: 'Coffee',
    groups: [
      { title: 'Для HoReCa', items: ['Меню', 'Тейбл-тенты', 'Флаеры', 'Папки', 'Визитки', 'Наклейки', 'Упаковочная бумага', 'Дорхэнгеры'] },
    ]
  },
  {
    id: 'students',
    label: 'Для студентов и учащихся',
    icon: 'GraduationCap',
    groups: [
      { title: 'Для учёбы', items: ['Авторефераты', 'Диссертации', 'Дипломы и грамоты', 'Брошюры', 'Планеры', 'Блокноты', 'Тетради', 'Раскраски', 'Детские карточки', 'Пособия'] },
    ]
  },
  {
    id: 'business',
    label: 'Бизнес и мероприятия',
    icon: 'Briefcase',
    groups: [
      { title: 'Для бизнеса', items: ['Афиши', 'Баннеры', 'Информационные стенды', 'Мобильные стенды Roll Up', 'Бейджи', 'Визитки', 'Сертификаты', 'Презентации', 'Финансовая отчетность', 'Инструкции', 'Каталоги КБС'] },
      { title: 'Мероприятия', items: ['Приглашения', 'Открытки', 'Плакаты', 'Программки', 'Наклейки'] },
    ]
  },
  {
    id: 'souvenirs',
    label: 'Сувенирная продукция',
    icon: 'Gift',
    groups: [
      { title: 'Сувениры', items: ['DTF печать на футболках', 'DTF печать на толстовках', 'DTF печать на сумках', 'Фотографии', 'Открытки', 'Стикерпаки'] },
    ]
  },
  {
    id: 'kids',
    label: 'Для детей',
    icon: 'Smile',
    groups: [
      { title: 'Детские товары', items: ['Раскраски', 'Детские карточки', 'Книги', 'Блокноты', 'Наклейки', 'Стикерпаки', 'Плакаты'] },
    ]
  },
  {
    id: 'design',
    label: 'Дизайн и верстка',
    icon: 'PenTool',
    groups: [
      { title: 'Дизайн', items: ['Разработка логотипа', 'Фирменный стиль', 'Верстка буклетов', 'Верстка брошюр', 'Разработка макетов', 'Подготовка к печати'] },
    ]
  },
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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

  const activeMenuData = MENU_ITEMS.find(m => m.id === hoveredItem)

  return (
    <Layout>
      <div className="relative z-20 h-full overflow-y-auto">

        {/* Главный блок */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-32 pb-8">

          {/* Меню категорий + Карусель */}
          <motion.div
            className="flex gap-6 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Левое меню с дропдауном */}
            <div
              className="hidden lg:block flex-shrink-0 relative"
              ref={menuRef}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ul className="w-72 bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                {MENU_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                      className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-base transition-all text-left ${
                        hoveredItem === item.id
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onClick={() => navigate('/services')}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon} size={16} className={hoveredItem === item.id ? 'text-[#FF4D00]' : 'text-zinc-500'} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <Icon name="ChevronRight" size={14} className="text-zinc-600 flex-shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Выпадающий дропдаун */}
              <AnimatePresence>
                {hoveredItem && activeMenuData && (
                  <motion.div
                    key={hoveredItem}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full top-0 ml-1 bg-white rounded-xl shadow-2xl border border-zinc-200 p-6 w-[600px] max-h-[80vh] overflow-y-auto z-50"
                    onMouseEnter={() => setHoveredItem(hoveredItem)}
                  >
                    <div className={`grid gap-8 ${activeMenuData.groups.length >= 3 ? 'grid-cols-3' : activeMenuData.groups.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {activeMenuData.groups.map(group => (
                        <div key={group.title}>
                          <h3 className="text-[#FF4D00] font-semibold text-sm mb-3 leading-tight">{group.title}</h3>
                          <ul className="space-y-1.5">
                            {group.items.map(item => (
                              <li key={item}>
                                <Link
                                  to="/services"
                                  className="text-zinc-700 hover:text-[#FF4D00] text-sm leading-snug transition-colors block"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Карусель новостей — уменьшена */}
            <div className="flex-1 min-w-0">
              <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNews}
                    className={`absolute inset-0 bg-gradient-to-br ${NEWS[activeNews].color} p-6 md:p-8 flex flex-col justify-end`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-2 w-fit">
                      {NEWS[activeNews].tag}
                    </span>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 leading-tight">
                      {NEWS[activeNews].title}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                      {NEWS[activeNews].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-3 left-6 flex gap-2 z-10">
                  {NEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToNews(i)}
                      className={`h-1 rounded-full transition-all ${i === activeNews ? 'w-5 bg-white' : 'w-2.5 bg-white/40'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goToNews((activeNews - 1 + NEWS.length) % NEWS.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <button
                  onClick={() => goToNews((activeNews + 1) % NEWS.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <Icon name="ChevronRight" size={14} />
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
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
              className="px-8 py-3 bg-[#FF4D00] hover:bg-[#cc3d00] text-white text-base font-semibold rounded-lg transition-colors w-fit"
            >
              Оставить заявку
            </button>
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
