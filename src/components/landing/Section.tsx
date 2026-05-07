import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, onButtonClick }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {content && (
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16 flex flex-col gap-6"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors w-fit"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
          {id === 'join' && (
            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">
              <a href="tel:89663386505" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Icon name="Phone" size={14} />
                8 966 338-65-05
              </a>
              <a href="https://t.me/YavaDesign" target="_blank" rel="noopener noreferrer" className="hover:text-[#2AABEE] transition-colors flex items-center gap-1.5">
                <Icon name="Send" size={14} />
                @YavaDesign
              </a>
              <a href="https://max.ru/u/f9LHodD0cOL8MiE9Z8F-z-o-BaYnKOXpJi31ljzSTyZ2g8cckpoq90QIad8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Icon name="MessageCircle" size={14} />
                MAX
              </a>
              <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_tolbukhina_13k1/Z04YdQ5pQUwEQFtvfXtzcn1qYw==/?ll=37.399892%2C55.723197&source=serp_navig&z=17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Icon name="MapPin" size={14} />
                Толбухина 13к1
              </a>
            </div>
          )}
        </motion.div>
      )}
    </section>
  )
}