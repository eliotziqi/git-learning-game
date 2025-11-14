import { getAllLevels } from '../data/levels'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const levels = getAllLevels()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          欢迎来到 Git 学习游戏
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          选择一个关卡开始学习 Git 命令吧！
        </p>
        <div className="space-y-4 mb-8">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {level.order}. {level.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {level.description}
                  </p>
                  {level.tags && level.tags.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {level.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    包含 {level.questions.length} 个问题
                  </p>
                </div>
                <Link
                  to={`/level/${level.id}`}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  开始
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            随机挑战（待实现）
          </button>
        </div>
      </div>
    </div>
  )
}

