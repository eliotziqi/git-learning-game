import { useSettingsStore } from '../store/settingsStore'
import { useAchievementStore } from '../store/achievementStore'
import type { ThemeName } from '../store/settingsStore'
import { themeConfig } from '../themes/themeConfig'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useSettingsStore()
  const { unlockAchievement, isUnlocked } = useAchievementStore()
  const themes: ThemeName[] = ['modern', 'pixel', 'cartoon', 'minimal']

  const handleThemeChange = (newTheme: ThemeName) => {
    if (newTheme !== theme) {
      setTheme(newTheme)
      
      // 检查主题切换成就
      if (!isUnlocked('theme_switcher')) {
        unlockAchievement('theme_switcher')
      }
    }
  }

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      {themes.map((themeName) => {
        const isActive = theme === themeName
        const themeDef = themeConfig[themeName]
        
        return (
          <button
            key={themeName}
            onClick={() => handleThemeChange(themeName)}
            className={`
              px-3 py-1 text-xs font-medium rounded transition-colors
              ${
                isActive
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }
            `}
            title={themeDef.name}
          >
            {themeDef.name}
          </button>
        )
      })}
    </div>
  )
}

