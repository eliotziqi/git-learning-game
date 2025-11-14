import { useParams, Link } from 'react-router-dom'
import { getLevelById } from '../data/levels'
import type { Question } from '../types/level'

function QuestionPlaceholder({ question, index }: { question: Question; index: number }) {
  return (
    <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          问题 {index + 1}
        </span>
        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
          {question.type}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
        {question.title}
      </h3>
      {question.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {question.description}
        </p>
      )}
      {question.type === "single-choice" && (
        <div className="mt-2">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {question.question}
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
            {question.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      )}
      {question.type === "input" && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {question.prompt}
        </p>
      )}
      {question.type === "button-flow" && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            期望顺序: {question.expectedSequence.join(" → ")}
          </p>
          <div className="flex gap-2 flex-wrap">
            {question.buttons.map((btn) => (
              <span
                key={btn.id}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
              >
                {btn.label}
              </span>
            ))}
          </div>
        </div>
      )}
      {question.type === "ordering" && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            步骤数量: {question.steps.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default function LevelPage() {
  const { id } = useParams<{ id: string }>()
  const level = id ? getLevelById(id) : undefined

  if (!level) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            关卡未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            抱歉，找不到 ID 为 "{id}" 的关卡。
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block"
          >
            ← 返回首页
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {level.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {level.description}
        </p>
        {level.tags && level.tags.length > 0 && (
          <div className="flex gap-2 mb-8">
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            问题列表 ({level.questions.length} 个)
          </h2>
          <div className="space-y-4">
            {level.questions.map((question, index) => (
              <QuestionPlaceholder
                key={question.id}
                question={question}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

