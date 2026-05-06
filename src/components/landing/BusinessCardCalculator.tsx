import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PAPER_OPTIONS = [
  { id: 'matte', label: 'Матовая', price: 0.5, lamination: true },
  { id: 'glossy', label: 'Глянцевая', price: 0.5, lamination: true },
  { id: 'linen', label: 'Лён белый', price: 2.25, lamination: false },
  { id: 'kraft', label: 'Крафт', price: 1.4, lamination: false },
]

const LAMINATION_OPTIONS = [
  { id: 'none', label: 'Без ламинации', price: 0 },
  { id: 'matte', label: 'Матовая', price: 7.4 },
  { id: 'glossy', label: 'Глянцевая', price: 5.4 },
  { id: 'softtouch', label: 'Soft Touch', price: 15.4 },
]

const PRINT_OPTIONS = [
  { id: 'single', label: 'Односторонняя', price: 0.5 },
  { id: 'double', label: 'Двусторонняя', price: 1.0 },
]

const PRESET_QUANTITIES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const MIN_TOTAL = 1000

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

    const paperPrice = selectedPaper.price
    const laminationPrice = canLaminate ? (LAMINATION_OPTIONS.find(l => l.id === lamination)?.price ?? 0) : 0
    const printPrice = PRINT_OPTIONS.find(p => p.id === print)!.price

    let pricePerPiece = paperPrice + laminationPrice + printPrice
    if (urgent) pricePerPiece *= 4

    let total = pricePerPiece * qty
    if (total < MIN_TOTAL) total = MIN_TOTAL

    return {
      qty,
      pricePerPiece: pricePerPiece,
      total,
      sheets: Math.ceil(qty / 21),
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
                Свой
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
                Срочная ×4
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
                <p className="text-white text-2xl font-semibold">
                  {result.total === MIN_TOTAL
                    ? '—'
                    : `${result.pricePerPiece.toFixed(2)} руб.`}
                </p>
              </div>
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-zinc-500 text-sm mb-1">Итого</p>
                <p className="text-[#FF4D00] text-4xl font-bold">
                  {result.total.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
                </p>
                {result.total === MIN_TOTAL && (
                  <p className="text-zinc-600 text-xs mt-1">Минимальный заказ — 1 000 ₽</p>
                )}
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
