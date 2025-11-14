import { Link } from 'react-router-dom'
import { useSettingsStore } from '../store/settingsStore'
import { useCurrentThemeDefinition } from '../themes/themeConfig'
import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
  const { learningMode } = useSettingsStore()
  const theme = useCurrentThemeDefinition()

  return (
    <nav className={`${theme.surfaceClass} shadow-md border-b border-gray-200 dark:border-gray-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className={`text-xl font-bold ${theme.textClass}`}>
            Git 学习游戏
          </Link>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className={`text-xs px-2 py-1 ${theme.badgeClass} rounded-full`}>
              模式: {learningMode}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

