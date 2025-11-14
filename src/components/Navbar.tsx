import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Git 学习游戏
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {/* 主题切换占位 */}
              主题: 待实现
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {/* 模式切换占位 */}
              模式: 待实现
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

