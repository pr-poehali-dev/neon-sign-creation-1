import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PAPER_OPTIONS = [
  { id: 'matte', label: 'Матовая', lamination: true },
  { id: 'glossy', label: 'Глянцевая', lamination: true },
  { id: 'linen', label: 'Лён белый', lamination: false },
  { id: 'kraft', label: 'Крафт', lamination: false },
]

const LAMINATION_OPTIONS = [
  { id: 'none', label: 'Без ламинации', price: 0 },
  { id: 'matte', label: 'Матовая', price: 7.4 },
  { id: 'glossy', label: 'Глянцевая', price: 5.4 },
  { id: 'softtouch', label: 'Soft Touch', price: 15.4 },
]

const PRINT_OPTIONS = [
  { id: 'single', label: 'Односторонняя' },
  { id: 'double', label: 'Двусторонняя' },
]

const PRESET_QUANTITIES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const MIN_PRICE_PER_PIECE = 4

// Полные таблицы цен за штуку по бумаге и типу печати
const PRICES: Record<string, Record<string, Record<number, number>>> = {
  matte: {
    single:  { 100: 10, 200: 8, 300: 7.7, 400: 6.51, 500: 6.45, 600: 6.41, 700: 6.38, 800: 5.31, 900: 5.29, 1000: 5.28 },
    double:  { 100: 14.7, 200: 12, 300: 11.77, 400: 10.11, 500: 10.06, 600: 10.01, 700: 10, 800: 8.11, 900: 8.09, 1000: 8.07 },
  },
  glossy: {
    single:  { 100: 10, 200: 8, 300: 7.7, 400: 6.51, 500: 6.45, 600: 6.41, 700: 6.38, 800: 5.31, 900: 5.29, 1000: 5.28 },
    double:  { 100: 14.7, 200: 12, 300: 11.77, 400: 10.11, 500: 10.06, 600: 10.01, 700: 10, 800: 8.11, 900: 8.09, 1000: 8.07 },
  },
  linen: {
    single:  { 100: 14.7, 200: 12, 300: 11.77, 400: 10.11, 500: 10.06, 600: 10.01, 700: 10, 800: 9.54, 900: 9.52, 1000: 9.51 },
    double:  { 100: 19, 200: 16.2, 300: 16, 400: 14.34, 500: 14.28, 600: 14.24, 700: 14.21, 800: 12.84, 900: 12.32, 1000: 12.3 },
  },
  kraft: {
    single:  { 100: 12.6, 200: 10.68, 300: 10.47, 400: 9.22, 500: 9.15, 600: 9.11, 700: 9.08, 800: 8.01, 900: 7.99, 1000: 7.97 },
    double:  { 100: 17.4, 200: 14.68, 300: 14.47, 400: 12.81, 500: 12.75, 600: 12.71, 700: 12.68, 800: 10.81, 900: 10.79, 1000: 10.78 },
  },
}

// Линейная интерполяция для произвольного тиража
function getPrice(paperId: string, printId: string, qty: number): number {
  const table = PRICES[paperId]?.[printId]
  if (!table) return 0
  const breakpoints = PRESET_QUANTITIES

  if (qty <= breakpoints[0]) return table[breakpoints[0]]

  for (let i = 0; i < breakpoints.length - 1; i++) {
    const lo = breakpoints[i]
    const hi = breakpoints[i + 1]
    if (qty >= lo && qty <= hi) {
      const t = (qty - lo) / (hi - lo)
      return table[lo] + t * (table[hi] - table[lo])
    }
  }

  // Тираж > 1000: экстраполяция по тренду последних двух точек (900→1000)
  const last = breakpoints[breakpoints.length - 1]
  const prev = breakpoints[breakpoints.length - 2]
  const slope = (table[last] - table[prev]) / (last - prev)
  return Math.max(MIN_PRICE_PER_PIECE, table[last] + slope * (qty - last))
}

interface Props {
  isActive: boolean
}

export default function BusinessCardCalculator({ isActive }: Props) {
  const [quantity, setQuantity] = useState<number | ''>(100)
  const [customQty, setCustomQty] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [paper, setPaper] = useState('matte')
  const [lamination, setLamination] = useState('none')
  const [print, setPrint] = useState('single')
  const [urgent, setUrgent] = useState(false)

  const selectedPaper = PAPER_OPTIONS.find(p => p.id === paper)!
  const canLaminate = selectedPaper.lamination

  const result = useMemo(() => {
    const qty = isCustom ? (parseInt(customQty) || 0) : (quantity as number)
    if (qty <= 0) return null

    const laminationPrice = canLaminate ? (LAMINATION_OPTIONS.find(l => l.id === lamination)?.price ?? 0) : 0
    const basePrice = getPrice(paper, print, qty) * (urgent ? 1.5 : 1)

    let pricePerPiece = basePrice + laminationPrice
    if (pricePerPiece < MIN_PRICE_PER_PIECE) pricePerPiece = MIN_PRICE_PER_PIECE

    const total = pricePerPiece * qty

    return {
      qty,
      pricePerPiece,
      total,
    }
  }, [quantity, customQty, isCustom, paper, lamination, print, urgent, selectedPaper, canLaminate])

  const handlePreset = (val: number) => {
    setIsCustom(false)
    setQuantity(val)
    setCustomQty('')
  }

  const handleCustom = () => {
    setIsCustom(true)
    setQuantity('')
  }

  return (
    <section className="relative min-h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Калькулятор<br />визиток
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Левая колонка — параметры */}
        <div className="flex flex-col gap-7">

          {/* Тираж */}
          <div>
            <Label className="text-zinc-400 text-sm mb-3 block">Тираж, шт.</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUANTITIES.map(q => (
                <button
                  key={q}
                  onClick={() => handlePreset(q)}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                    !isCustom && quantity === q
                      ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {q}
                </button>
              ))}
              <button
                onClick={handleCustom}
                className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                  isCustom
                    ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                Свой тираж
              </button>
            </div>
            {isCustom && (
              <Input
                className="mt-3 bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 w-40"
                placeholder="Введите кол-во"
                type="number"
                min={1}
                value={customQty}
                onChange={e => setCustomQty(e.target.value)}
              />
            )}
          </div>

          {/* Печать */}
          <div>
            <Label className="text-zinc-400 text-sm mb-3 block">Печать</Label>
            <div className="flex flex-wrap gap-2">
              {PRINT_OPTIONS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPrint(p.id)}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                    print === p.id
                      ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Бумага */}
          <div>
            <Label className="text-zinc-400 text-sm mb-3 block">Бумага</Label>
            <div className="flex flex-wrap gap-2">
              {PAPER_OPTIONS.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPaper(p.id)
                    if (!p.lamination) setLamination('none')
                  }}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                    paper === p.id
                      ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ламинация */}
          <div>
            <Label className={`text-sm mb-3 block ${canLaminate ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Ламинация {!canLaminate && <span className="text-zinc-600 text-xs">(недоступна для дизайнерской бумаги)</span>}
            </Label>
            <div className="flex flex-wrap gap-2">
              {LAMINATION_OPTIONS.map(l => (
                <button
                  key={l.id}
                  disabled={!canLaminate && l.id !== 'none'}
                  onClick={() => setLamination(l.id)}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    lamination === l.id
                      ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Срочность */}
          <div>
            <Label className="text-zinc-400 text-sm mb-3 block">Срочность</Label>
            <div className="flex gap-2">
              <button
                onClick={() => setUrgent(false)}
                className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                  !urgent
                    ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                Обычная
              </button>
              <button
                onClick={() => setUrgent(true)}
                className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                  urgent
                    ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                Срочная
              </button>
            </div>
          </div>
        </div>

        {/* Правая колонка — результат */}
        <div className="flex flex-col justify-center">
          {result ? (
            <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-900/50 backdrop-blur-sm">
              <div className="mb-6">
                <p className="text-zinc-500 text-sm mb-1">Тираж</p>
                <p className="text-white text-2xl font-semibold">{result.qty.toLocaleString('ru-RU')} шт.</p>
              </div>
              <div className="mb-6">
                <p className="text-zinc-500 text-sm mb-1">Цена за штуку</p>
                <p className="text-zinc-400 text-base">
                  {result.pricePerPiece.toFixed(2)} руб.
                </p>
              </div>
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-zinc-500 text-sm mb-1">Итого</p>
                <p className="text-[#FF4D00] text-4xl font-bold">
                  {result.total.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
                </p>

              </div>
              <Button
                className="mt-8 w-full bg-[#FF4D00] hover:bg-[#cc3d00] text-white border-0"
                size="lg"
              >
                Заказать
              </Button>
            </div>
          ) : (
            <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-900/50 text-zinc-600 text-center">
              Укажите тираж для расчёта
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}