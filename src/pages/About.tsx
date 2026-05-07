import { motion } from 'framer-motion'
import Layout from '@/components/landing/Layout'

export default function About() {
  return (
    <Layout>
      <div className="relative z-20 min-h-screen overflow-y-auto">
        {/* Секция 1: Всё под одной крышей */}
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Всё под одной крышей.
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            От разработки дизайна до финальной упаковки — мы берём на себя весь производственный процесс. Никаких посредников, только качество и скорость.
          </motion.p>
        </section>

        <div className="border-t border-zinc-800 mx-8 md:mx-16 lg:mx-24" />

        {/* Секция 2: Что мы печатаем */}
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Что мы печатаем
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Визитки, буклеты, каталоги, баннеры, упаковка, брендированная продукция — любой тираж от 1 до 100 000 экземпляров с доставкой по всей России.
          </motion.p>
        </section>

        <div className="border-t border-zinc-800 mx-8 md:mx-16 lg:mx-24" />

        {/* Секция 3: Работаем с бизнесом */}
        <section className="min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Работаем с бизнесом любого масштаба.
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Малый бизнес, крупные корпорации, event-агентства и маркетплейсы — сотни клиентов доверяют нам свои печатные проекты каждый месяц.
          </motion.p>
        </section>
      </div>
    </Layout>
  )
}
