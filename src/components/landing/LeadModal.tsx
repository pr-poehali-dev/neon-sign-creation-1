import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://functions.poehali.dev/41d070ef-5116-4919-9566-acb0e7e70571', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment })
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setName('')
      setPhone('')
      setComment('')
      setStatus('idle')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-8"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#FF4D00]/20 flex items-center justify-center">
                    <Icon name="Check" size={32} className="text-[#FF4D00]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
                <p className="text-zinc-400">Мы свяжемся с вами в течение 30 минут.</p>
                <Button
                  onClick={handleClose}
                  className="mt-6 bg-[#FF4D00] hover:bg-[#FF4D00]/80 text-white border-0"
                >
                  Закрыть
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Оставить заявку</h3>
                <p className="text-zinc-400 mb-6 text-sm">Рассчитаем стоимость и сроки за 30 минут</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder="Иван Иванов"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Телефон *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      placeholder="+7 (900) 000-00-00"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Что нужно напечатать?</label>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Визитки, баннер, каталог..."
                      rows={3}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF4D00] transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm">Ошибка отправки. Попробуйте ещё раз.</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/80 text-white border-0 py-3 text-base font-semibold"
                  >
                    {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
