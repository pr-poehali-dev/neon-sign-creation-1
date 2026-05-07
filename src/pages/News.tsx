import { motion } from 'framer-motion'
import Layout from '@/components/landing/Layout'

const NEWS_LIST = [
  {
    id: 1,
    tag: 'Акция',
    date: '05 мая 2026',
    title: 'Скидка 10% на первый заказ',
    desc: 'Новым клиентам — скидка 10% на любую печатную продукцию при первом заказе. Просто упомяните при оформлении заявки или позвоните нам.',
    color: 'bg-[#FF4D00]/10 border-[#FF4D00]/30',
    tagColor: 'bg-[#FF4D00]/20 text-[#FF4D00]',
  },
  {
    id: 2,
    tag: 'Новинка',
    date: '28 апреля 2026',
    title: 'Soft Touch ламинация',
    desc: 'Теперь в нашем арсенале — бархатистое Soft Touch покрытие для визиток и буклетов. Ощущение роскоши в каждом прикосновении. Доступно для матовой и глянцевой бумаги.',
    color: 'bg-zinc-900/50 border-zinc-800',
    tagColor: 'bg-zinc-700 text-zinc-300',
  },
  {
    id: 3,
    tag: 'Акция',
    date: '15 апреля 2026',
    title: 'Визитки 1000 шт. — специальная цена',
    desc: 'Цифровая печать матовых визиток тиражом 1000 штук с быстрым сроком изготовления — от 5 280 ₽. Двусторонняя печать — от 8 070 ₽.',
    color: 'bg-zinc-900/50 border-zinc-800',
    tagColor: 'bg-[#FF4D00]/20 text-[#FF4D00]',
  },
  {
    id: 4,
    tag: 'Услуга',
    date: '01 апреля 2026',
    title: 'Срочная печать за 2 часа',
    desc: 'Запустили услугу срочного изготовления. Нужно срочно? Выполним заказ за 2 часа прямо в день обращения. Доступно с понедельника по пятницу до 18:00.',
    color: 'bg-zinc-900/50 border-zinc-800',
    tagColor: 'bg-zinc-700 text-zinc-300',
  },
]

export default function News() {
  return (
    <Layout>
      <div className="relative z-20 min-h-screen overflow-y-auto">
        <div className="px-8 md:px-16 lg:px-24 pt-28 pb-16 max-w-4xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Новости и акции
          </motion.h1>
          <motion.p
            className="text-zinc-400 text-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Следите за нашими предложениями и обновлениями
          </motion.p>

          <div className="space-y-4">
            {NEWS_LIST.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`border rounded-2xl p-6 md:p-8 ${item.color}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-zinc-600 text-sm">{item.date}</span>
                  </div>
                </div>
                <h2 className="text-white text-xl md:text-2xl font-bold mb-3">{item.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
