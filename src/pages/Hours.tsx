import { motion } from 'framer-motion'
import Layout from '@/components/landing/Layout'
import Icon from '@/components/ui/icon'

const SCHEDULE = [
  { days: 'Понедельник — Пятница', hours: '10:00 — 20:00', isToday: [1,2,3,4,5].includes(new Date().getDay()) },
  { days: 'Суббота — Воскресенье', hours: '10:00 — 18:00', isToday: [0,6].includes(new Date().getDay()) },
]

export default function Hours() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  const min = now.getMinutes()
  const totalMin = hour * 60 + min
  const isWeekday = day >= 1 && day <= 5
  const isOpen = isWeekday
    ? totalMin >= 600 && totalMin < 1200
    : totalMin >= 600 && totalMin < 1080

  return (
    <Layout>
      <div className="relative z-20 min-h-screen overflow-y-auto">
        <div className="px-8 md:px-16 lg:px-24 pt-36 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight">
              Режим работы
            </h1>
            <p className="text-zinc-400 text-lg mb-10">
              г. Москва, ул. Толбухина 13к1
            </p>

            {/* Статус */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-10 ${isOpen ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              {isOpen ? 'Сейчас открыто' : 'Сейчас закрыто'}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Расписание */}
              <div className="space-y-3">
                {SCHEDULE.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`flex items-center justify-between p-5 rounded-xl border ${
                      s.isToday
                        ? 'border-[#FF4D00]/50 bg-[#FF4D00]/10'
                        : 'border-zinc-800 bg-zinc-900/50'
                    }`}
                  >
                    <div>
                      {s.isToday && (
                        <span className="text-[#FF4D00] text-xs font-semibold uppercase tracking-wider block mb-1">Сегодня</span>
                      )}
                      <p className="text-white font-medium">{s.days}</p>
                    </div>
                    <p className={`text-lg font-bold ${s.isToday ? 'text-[#FF4D00]' : 'text-zinc-300'}`}>
                      {s.hours}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Контакты */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="border border-zinc-800 bg-zinc-900/50 rounded-xl p-5 space-y-4"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Как связаться</h3>
                <a href="tel:89663386505" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-[#FF4D00]/20 flex items-center justify-center transition-colors">
                    <Icon name="Phone" size={16} className="text-[#FF4D00]" />
                  </div>
                  <span>8 966 338-65-05</span>
                </a>
                <a href="https://t.me/YavaDesign" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-[#2AABEE]/20 flex items-center justify-center transition-colors">
                    <Icon name="Send" size={16} className="text-[#2AABEE]" />
                  </div>
                  <span>@YavaDesign</span>
                </a>
                <a href="https://max.ru/u/f9LHodD0cOL8MiE9Z8F-z-o-BaYnKOXpJi31ljzSTyZ2g8cckpoq90QIad8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Icon name="MessageCircle" size={16} className="text-zinc-300" />
                  </div>
                  <span>MAX</span>
                </a>
                <a
                  href="https://yandex.ru/maps/213/moscow/house/ulitsa_tolbukhina_13k1/Z04YdQ5pQUwEQFtvfXtzcn1qYw==/?ll=37.399892%2C55.723197&source=serp_navig&z=17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 group-hover:bg-[#FF4D00]/20 flex items-center justify-center transition-colors">
                    <Icon name="MapPin" size={16} className="text-[#FF4D00]" />
                  </div>
                  <span>ул. Толбухина 13к1</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Яндекс карта */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-5xl rounded-2xl overflow-hidden border border-zinc-800"
            style={{ height: '420px' }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.399893%2C55.723197&z=16&pt=37.399893%2C55.723197%2Cpm2rdm~Ява+Принт&l=map"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Ява Принт на карте"
              allowFullScreen
              style={{ display: 'block' }}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}