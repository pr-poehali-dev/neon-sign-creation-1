import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '@/components/landing/Layout'
import Icon from '@/components/ui/icon'

const FILTERS = [
  'Все',
  'Цифровая печать',
  'Широкоформатная печать',
  'УФ-печать',
  'Инженерная печать',
  'Постпечатная обработка',
  'Дизайн',
]

const IMG = {
  cards: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/114a4b3b-f0ae-4c48-a373-595b76b98e97.jpg',
  brochure: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/ca201879-fd08-4f2c-ba3a-8858c6c61c38.jpg',
  banner: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/48b121d5-9c93-4359-8f27-22c6f7775e51.jpg',
  notebook: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/3e805bb0-2656-4d68-8895-507fd05411b3.jpg',
  stickers: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/55ef005c-a0af-4d4c-ad35-5a2210e4e4ec.jpg',
  calendar: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/c0cd00c0-3f91-4955-b942-7ef8fddf57c0.jpg',
  flyer: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/b6bf4c6b-d4d7-44cc-b325-cbc9007d1117.jpg',
  widebanner: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/785b7464-3660-4ea3-aa9c-11235952e683.jpg',
  book: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/69ca5c65-be9e-4a6a-833c-0b7b85fbcd8e.jpg',
  tshirt: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/d5a2e7a4-3129-4e50-bf8e-f699cf49453d.jpg',
  postcard: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/abdff71c-168d-48f6-89c0-7234aa7aabac.jpg',
  blueprint: 'https://cdn.poehali.dev/projects/a4434fe8-c885-4bea-a628-bc90e0057aab/files/f688b179-de54-4872-ab5e-5b07c91de7ff.jpg',
}

const ALL_PRODUCTS = [
  { name: 'Авторефераты', img: IMG.book, category: 'Цифровая печать' },
  { name: 'Афиши', img: IMG.flyer, category: 'Широкоформатная печать' },
  { name: 'Баннеры', img: IMG.widebanner, category: 'Широкоформатная печать' },
  { name: 'Бейджи', img: IMG.cards, category: 'Цифровая печать' },
  { name: 'Биговка', img: IMG.brochure, category: 'Постпечатная обработка' },
  { name: 'Бирки', img: IMG.stickers, category: 'Цифровая печать' },
  { name: 'Бланки', img: IMG.flyer, category: 'Цифровая печать' },
  { name: 'Блокноты', img: IMG.notebook, category: 'Цифровая печать' },
  { name: 'Брошюры', img: IMG.brochure, category: 'Цифровая печать' },
  { name: 'Буклеты и лифлеты', img: IMG.brochure, category: 'Цифровая печать' },
  { name: 'Ветеринарные паспорта', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Визитки', img: IMG.cards, category: 'Цифровая печать' },
  { name: 'Детские карточки', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Дипломы и грамоты', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Диссертации', img: IMG.book, category: 'Цифровая печать' },
  { name: 'Дорхэнгеры', img: IMG.stickers, category: 'Цифровая печать' },
  { name: 'DTF печать на футболках', img: IMG.tshirt, category: 'Цифровая печать' },
  { name: 'DTF печать на толстовках', img: IMG.tshirt, category: 'Цифровая печать' },
  { name: 'DTF печать на сумках', img: IMG.tshirt, category: 'Цифровая печать' },
  { name: 'Журналы', img: IMG.book, category: 'Цифровая печать' },
  { name: 'Информационные стенды', img: IMG.widebanner, category: 'Широкоформатная печать' },
  { name: 'Инструкции', img: IMG.book, category: 'Цифровая печать' },
  { name: 'Каталоги КБС', img: IMG.book, category: 'Цифровая печать' },
  { name: 'Календари', img: IMG.calendar, category: 'Цифровая печать' },
  { name: 'Карточки', img: IMG.cards, category: 'Цифровая печать' },
  { name: 'Книги', img: IMG.book, category: 'Цифровая печать' },
  { name: 'Коробки', img: IMG.notebook, category: 'Цифровая печать' },
  { name: 'Листовки', img: IMG.flyer, category: 'Цифровая печать' },
  { name: 'Меню', img: IMG.brochure, category: 'Цифровая печать' },
  { name: 'Мобильные стенды Roll Up', img: IMG.banner, category: 'Широкоформатная печать' },
  { name: 'Наклейки', img: IMG.stickers, category: 'УФ-печать' },
  { name: 'Открытки', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Плакаты', img: IMG.widebanner, category: 'Широкоформатная печать' },
  { name: 'Планеры', img: IMG.notebook, category: 'Цифровая печать' },
  { name: 'Постеры', img: IMG.widebanner, category: 'Широкоформатная печать' },
  { name: 'Приглашения', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Проектная документация', img: IMG.blueprint, category: 'Инженерная печать' },
  { name: 'Раскраски', img: IMG.flyer, category: 'Цифровая печать' },
  { name: 'Ростомеры', img: IMG.banner, category: 'Широкоформатная печать' },
  { name: 'Сертификаты', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Стикерпаки', img: IMG.stickers, category: 'УФ-печать' },
  { name: 'Таблички на пластике', img: IMG.stickers, category: 'Широкоформатная печать' },
  { name: 'Тейбл-тенты', img: IMG.cards, category: 'Цифровая печать' },
  { name: 'Тетради', img: IMG.notebook, category: 'Цифровая печать' },
  { name: 'Фотографии', img: IMG.postcard, category: 'Цифровая печать' },
  { name: 'Ценники', img: IMG.stickers, category: 'Цифровая печать' },
  { name: 'Чертежи', img: IMG.blueprint, category: 'Инженерная печать' },
  { name: 'Шуберы', img: IMG.notebook, category: 'Цифровая печать' },
  { name: 'Этикетки', img: IMG.stickers, category: 'УФ-печать' },
  { name: 'Ламинация', img: IMG.brochure, category: 'Постпечатная обработка' },
  { name: 'Soft Touch ламинация', img: IMG.brochure, category: 'Постпечатная обработка' },
  { name: 'Плоттерная резка', img: IMG.stickers, category: 'Постпечатная обработка' },
  { name: 'Разработка логотипа', img: IMG.cards, category: 'Дизайн' },
  { name: 'Верстка буклетов', img: IMG.brochure, category: 'Дизайн' },
  { name: 'Подготовка к печати', img: IMG.flyer, category: 'Дизайн' },
]

const PAGE_SIZE = 12

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [shown, setShown] = useState(PAGE_SIZE)

  const filtered = activeFilter === 'Все'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeFilter)

  const visible = filtered.slice(0, shown)
  const hasMore = shown < filtered.length

  const handleFilter = (f: string) => {
    setActiveFilter(f)
    setShown(PAGE_SIZE)
  }

  return (
    <Layout>
      <div className="relative z-20 h-full overflow-y-auto bg-white">
        <div className="px-8 md:px-16 lg:px-24 pt-36 pb-16">

          {/* Хлебные крошки */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
            <Link to="/" className="hover:text-zinc-600 transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={13} className="text-zinc-300" />
            <span className="text-zinc-600">Все услуги</span>
          </div>

          <motion.h1
            className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Все услуги
          </motion.h1>

          <motion.p
            className="text-[#FF4D00] text-base leading-relaxed max-w-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Ява Дизайн предлагает полный спектр полиграфических услуг. Современное оборудование позволяет оперативно и в любом количестве печатать все виды рекламно-информационных материалов для корпоративных клиентов и частных лиц.
          </motion.p>

          {/* Фильтры */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
                  activeFilter === f
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500 hover:text-zinc-800'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
            {visible.map((product, i) => (
              <motion.div
                key={`${product.name}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (i % PAGE_SIZE) * 0.03 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-full aspect-square flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <span className="text-sm font-medium text-zinc-800 leading-tight group-hover:text-[#FF4D00] transition-colors">
                  {product.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Кнопка "Показать ещё" */}
          {hasMore && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setShown(prev => prev + PAGE_SIZE)}
                className="px-8 py-2.5 border border-zinc-400 text-zinc-600 hover:border-zinc-700 hover:text-zinc-900 text-sm rounded-lg transition-colors"
              >
                Показать ещё
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
