import { Link } from 'react-router-dom'
import { useSettingsStore } from '../store/settingsStore'

export default function Navbar() {
  const { theme, learningMode } = useSettingsStore()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Git 学习游戏
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              主题: {theme}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              模式: {learningMode}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

