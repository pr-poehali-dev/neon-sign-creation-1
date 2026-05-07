import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-white border-white">Типография полного цикла</Badge>,
    title: "Ваша идея — наш результат.",
    showButton: true,
    buttonText: 'Получить расчёт'
  },
  {
    id: 'join',
    title: 'Готовы к печати?',
    content: 'Оставьте заявку — мы свяжемся в течение 30 минут, рассчитаем стоимость и сроки. Первый заказ со скидкой 10%.',
    showButton: true,
    buttonText: 'Оставить заявку'
  },
]