import { motion } from 'framer-motion'
import Layout from '@/components/landing/Layout'

const ALL_SERVICES = [
  {
    category: 'Листовая печать',
    items: ['Цветная печать и копирование', 'Черно-белая печать и копирование'],
  },
  {
    category: 'Брошюры',
    items: ['На болты', 'На КБС', 'На металлическую пружину', 'На пластиковую пружину', 'На скобы'],
  },
  {
    category: 'Календари',
    items: ['Карманные', 'Квартальные', 'Настенные', 'Настольные перекидные', 'Планеры', 'Производственные'],
  },
  {
    category: 'Полиграфическая продукция',
    items: ['Авторефераты', 'Бейджи', 'Бирки', 'Бланки', 'Блокноты', 'Буклеты и лифлеты', 'Ветеринарные паспорта', 'Визитки', 'Детские карточки', 'Дипломы и грамоты', 'Диссертации', 'Дорхэнгеры', 'Журналы', 'Инструкции', 'Каталоги КБС', 'Книги', 'Карточки', 'Коробки', 'Листовки', 'Меню', 'Наклейки (цифровые)', 'Открытки', 'Пособия', 'Презентации', 'Приглашения', 'Раскраски', 'Сертификаты', 'Сканирование документов', 'Тетради', 'Тейбл-тенты', 'Финансовая отчетность', 'Фотографии', 'Ценники', 'Шуберы'],
  },
  {
    category: 'DTF-печать',
    items: ['DTF печать на футболках', 'DTF печать на толстовках', 'DTF печать на сумках'],
  },
  {
    category: 'Интерьерная печать',
    items: ['Печать и накатка на пенокартон', 'Печать и накатка на пластик', 'Печать на холсте', 'Планшеты на пенокартоне', 'Ростомеры', 'Упаковочная бумага'],
  },
  {
    category: 'Для бизнеса',
    items: ['Афиши', 'Баннеры', 'Информационные стенды', 'Мобильные стенды Roll Up', 'Наклейки', 'Плакаты', 'Постеры', 'Стикерпаки', 'Таблички на пластике', 'Этикетки', 'Штрих коды'],
  },
  {
    category: 'Тип материала',
    items: ['На самоклеящейся плёнке', 'На серебряной плёнке', 'На золотой плёнке', 'На голографической плёнке', 'На светоотражающей плёнке', 'На бэклите'],
  },
  {
    category: 'Постпечатная обработка',
    items: ['Ламинация', 'Soft Touch ламинация', 'Фальцовка', 'Биговка', 'Резка', 'Плоттерная резка', 'Перфорация', 'Тиснение', 'Высечка'],
  },
  {
    category: 'Инженерная печать',
    items: ['Проектная документация', 'Чертежи', 'Планы', 'Схемы', 'Черно-белая печать'],
  },
  {
    category: 'Дизайн и верстка',
    items: ['Разработка логотипа', 'Фирменный стиль', 'Верстка буклетов', 'Верстка брошюр', 'Разработка макетов', 'Подготовка к печати'],
  },
]

export default function Services() {
  return (
    <Layout>
      <div className="relative z-20 h-full overflow-y-auto">
        <div className="px-8 md:px-16 lg:px-24 pt-36 pb-16">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Все услуги
          </motion.h1>
          <motion.p
            className="text-zinc-400 text-lg mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Полный каталог услуг типографии Ява Дизайн
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((section, i) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <h2 className="text-[#FF4D00] font-semibold text-sm uppercase tracking-wide mb-3">
                  {section.category}
                </h2>
                <ul className="space-y-1.5">
                  {section.items.map(item => (
                    <li key={item} className="text-zinc-300 text-sm leading-snug hover:text-white transition-colors cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
