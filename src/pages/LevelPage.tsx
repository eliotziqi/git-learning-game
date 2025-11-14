import { useParams } from 'react-router-dom'

export default function LevelPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          关卡 {id}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          关卡内容待实现
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400">
            问题组件将在这里显示
          </p>
        </div>
      </div>
    </div>
  )
}

