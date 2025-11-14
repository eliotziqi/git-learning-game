import { motion, AnimatePresence } from 'framer-motion'
import { useCurrentThemeDefinition } from '../themes/themeConfig'
import { ACHIEVEMENTS } from '../store/achievementStore'

interface AchievementToastProps {
  achievementId: string
  onClose: () => void
}

export default function AchievementToast({
  achievementId,
  onClose,
}: AchievementToastProps) {
  const theme = useCurrentThemeDefinition()
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId)

  if (!achievement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        onAnimationComplete={() => {
          setTimeout(onClose, 3000)
        }}
      >
        <div
          className={`${theme.surfaceClass} rounded-lg shadow-2xl p-4 border-2 border-yellow-400 min-w-[300px]`}
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">{achievement.emoji}</div>
            <div className="flex-1">
              <div className={`${theme.textClass} font-bold text-lg`}>
                成就解锁！
              </div>
              <div className={`${theme.textClass} text-sm opacity-80`}>
                {achievement.name}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

