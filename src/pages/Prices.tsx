import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/landing/Layout'
import Icon from '@/components/ui/icon'
import BusinessCardCalculator from '@/components/landing/BusinessCardCalculator'

const CATEGORIES = [
  {
    id: 'digital',
    label: 'Цифровая печать',
    icon: 'Printer',
    subcategories: [
      { id: 'business-cards', label: 'Визитки' },
      { id: 'flyers', label: 'Листовки' },
      { id: 'booklets', label: 'Буклеты' },
      { id: 'calendars', label: 'Календари' },
    ]
  },
  { id: 'wide', label: 'Широкоформатная печать', icon: 'Monitor' },
  { id: 'offset', label: 'Офсетная печать', icon: 'Layers' },
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

export default function Prices() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  const selected = CATEGORIES.find(c => c.id === activeCategory)

  const handleCategory = (id: string) => {
    const cat = CATEGORIES.find(c => c.id === id)
    if (cat?.subcategories) {
      setActiveCategory(id)
      setActiveSubcategory(cat.subcategories[0].id)
    } else {
      setActiveCategory(id)
      setActiveSubcategory(null)
    }
  }

  const handleBack = () => {
    setActiveCategory(null)
    setActiveSubcategory(null)
  }

  return (
    <Layout>
      <div className="relative z-20 min-h-screen overflow-y-auto">
        <div className="p-8 md:p-16 pt-24 md:pt-28 min-h-screen">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Калькулятор
          </motion.h1>

          <div className="flex gap-8 min-h-[70vh]">
            {/* Левое меню категорий */}
            <motion.div
              className="w-full max-w-xs flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategory(cat.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-all group ${
                        activeCategory === cat.id
                          ? 'bg-zinc-800 text-[#FF4D00]'
                          : 'text-zinc-300 hover:text-[#FF4D00] hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={cat.icon} size={16} className={activeCategory === cat.id ? 'text-[#FF4D00]' : 'text-zinc-500 group-hover:text-[#FF4D00]'} />
                        <span className="text-sm">{cat.label}</span>
                      </div>
                      <Icon name="ChevronRight" size={14} className="text-zinc-600 flex-shrink-0" />
                    </button>
                    {/* Подкатегории */}
                    <AnimatePresence>
                      {activeCategory === cat.id && cat.subcategories && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-7 mt-1 space-y-0.5 overflow-hidden"
                        >
                          {cat.subcategories.map(sub => (
                            <li key={sub.id}>
                              <button
                                onClick={() => setActiveSubcategory(sub.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                  activeSubcategory === sub.id
                                    ? 'text-white bg-zinc-800'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                              >
                                {sub.label}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Правая панель контента */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {!activeCategory && (
                  <motion.div
                    key="empty"
                    className="flex items-center justify-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-zinc-600 text-lg">Выберите категорию слева</p>
                  </motion.div>
                )}

                {activeCategory === 'digital' && activeSubcategory === 'business-cards' && (
                  <motion.div
                    key="business-cards"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Заголовок + описание */}
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                      <h2 className="text-3xl md:text-4xl font-bold text-white flex-shrink-0">Визитки</h2>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-xl pt-1">
                        Визитки играют важную роль в сфере бизнеса, так как являются эффективным средством коммуникации и рекламы. Печать визиток позволяет создать материал, на котором будут указаны данные и информация о компании или человеке для установления деловых контактов на конференциях, семинарах, ярмарках, а также магазинах и офисах. Мы поможем в создании дизайн-макета и выполним ламинацию визиток при необходимости.
                        <br /><br />
                        Обращайтесь к нам за срочной печатью визиток тиражом от 100 шт. с индивидуальным дизайном. Гарантируем высокое качество выполнения заказа за короткий срок.
                      </p>
                    </div>
                    {/* Калькулятор без заголовка */}
                    <BusinessCardCalculatorInline />
                  </motion.div>
                )}

                {activeCategory === 'digital' && activeSubcategory && activeSubcategory !== 'business-cards' && (
                  <motion.div
                    key={activeSubcategory}
                    className="flex items-center justify-center h-64"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-zinc-600 text-lg">Калькулятор в разработке</p>
                  </motion.div>
                )}

                {activeCategory && activeCategory !== 'digital' && (
                  <motion.div
                    key={activeCategory}
                    className="flex items-center justify-center h-64"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-zinc-600 text-lg">Раздел в разработке</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function BusinessCardCalculatorInline() {
  return <BusinessCardCalculator isActive={true} inline={true} />
}