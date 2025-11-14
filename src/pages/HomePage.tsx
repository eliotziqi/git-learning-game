export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          欢迎来到 Git 学习游戏
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          选择一个关卡开始学习 Git 命令吧！
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 关卡卡片将在这里显示 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">关卡列表待实现</p>
          </div>
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

