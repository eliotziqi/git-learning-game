import { Link } from 'react-router-dom'
import { useAchievementStore, ACHIEVEMENTS } from '../store/achievementStore'
import { useCurrentThemeDefinition } from '../themes/themeConfig'

export default function AchievementsPage() {
  const { achievements, isUnlocked } = useAchievementStore()
  const theme = useCurrentThemeDefinition()

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = ACHIEVEMENTS.length

  return (
    <div className={`min-h-screen ${theme.backgroundClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className={`${theme.accentClass} hover:opacity-80 mb-4 inline-block`}
          >
            ← 返回首页
          </Link>
        </div>

        <h1 className={`text-3xl font-bold ${theme.textClass} mb-2`}>
          成就系统
        </h1>
        <p className={`${theme.textClass} opacity-80 mb-6`}>
          已解锁 {unlockedCount} / {totalCount}
        </p>

        <div className="space-y-4">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = isUnlocked(achievement.id)
            const achievementData = achievements.find(
              (a) => a.id === achievement.id
            )

            return (
              <div
                key={achievement.id}
                className={`
                  ${theme.surfaceClass} p-6 rounded-lg shadow
                  ${unlocked ? '' : 'opacity-60'}
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-4xl ${
                      unlocked ? '' : 'grayscale opacity-50'
                    }`}
                  >
                    {achievement.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`text-xl font-semibold ${
                          unlocked ? theme.textClass : 'text-gray-400'
                        }`}
                      >
                        {achievement.name}
                      </h3>
                      {unlocked && (
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                          已解锁
                        </span>
                      )}
                    </div>
                    <p
                      className={`${
                        unlocked ? theme.textClass : 'text-gray-400'
                      } opacity-80 mb-2`}
                    >
                      {achievement.description}
                    </p>
                    {unlocked && achievementData?.date && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        解锁时间:{' '}
                        {new Date(achievementData.date).toLocaleString('zh-CN')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

