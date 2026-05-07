import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '@/components/landing/Layout'
import Icon from '@/components/ui/icon'

const CATEGORIES = [
  { label: 'DTF печать на текстиле', icon: 'Shirt' },
  { label: 'Брошюры', icon: 'BookOpen' },
  { label: 'Буклеты', icon: 'BookMarked' },
  { label: 'Визитки', icon: 'CreditCard' },
  { label: 'Дизайн / Вёрстка', icon: 'PenTool' },
  { label: 'Календари', icon: 'CalendarDays' },
  { label: 'Листовки / Афиши (до А3 формата)', icon: 'FileText' },
  { label: 'Открытки / Приглашения', icon: 'Heart' },
  { label: 'Персонализация', icon: 'LayoutList' },
  { label: 'Плоттерная резка бумаги', icon: 'Scissors' },
  { label: 'Проектная документация / Чертежи', icon: 'Ruler' },
  { label: 'Стикеры / Наклейки', icon: 'Smile' },
  { label: 'Тейбл-тенты', icon: 'Triangle' },
  { label: 'Широкоформатная печать', icon: 'Monitor' },
  { label: 'Шуберы', icon: 'Package' },
]

export default function LayoutRequirements() {
  return (
    <Layout>
      <div className="relative z-20 h-full overflow-y-auto">
        <div className="px-8 md:px-16 lg:px-24 pt-36 pb-16 max-w-6xl">

          {/* Хлебные крошки */}
          <motion.div
            className="flex items-center gap-2 text-sm text-zinc-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="hover:text-zinc-300 transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={13} className="text-zinc-600" />
            <span className="text-zinc-600">База знаний</span>
            <Icon name="ChevronRight" size={13} className="text-zinc-600" />
            <span className="text-zinc-300">Требования к макетам</span>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Требования к макетам
          </motion.h1>

          {/* Вводный текст */}
          <motion.div
            className="space-y-4 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-zinc-300 leading-relaxed max-w-4xl">
              Перед отправкой макета на печать убедитесь, что он соответствует всем техническим требованиям. Любое несоответствие в файле может привести к производственному браку.
            </p>
            <p className="text-zinc-400 leading-relaxed max-w-4xl">
              При получении макетов мы проверяем их на соответствие техническим требованиям, однако не даём гарантии на обнаружение всех ошибок и недочётов. При необходимости мы поможем подготовить макет к печати за дополнительную стоимость, которая рассчитывается индивидуально в зависимости от сложности работ и затраченного времени.
            </p>
          </motion.div>

          {/* Сетка категорий */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                className="flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700 rounded-xl cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#FF4D00]/10 group-hover:bg-[#FF4D00]/20 transition-colors flex-shrink-0">
                  <Icon name={cat.icon} size={22} className="text-[#FF4D00]" />
                </div>
                <span className="text-zinc-300 group-hover:text-white text-sm font-medium leading-tight transition-colors">
                  {cat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
