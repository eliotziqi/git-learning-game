import { useParams, Link } from 'react-router-dom'
import { getLevelById } from '../data/levels'
import type { Question } from '../types/level'
import ButtonFlowQuestionComponent from '../components/questions/ButtonFlowQuestion'
import SingleChoiceQuestionComponent from '../components/questions/SingleChoiceQuestion'
import OrderingQuestionComponent from '../components/questions/OrderingQuestion'
import InputCommandQuestionComponent from '../components/questions/InputCommandQuestion'

function QuestionRenderer({
  question,
  index,
}: {
  question: Question
  index: number
}) {
  const handleComplete = () => {
    // Phase 3: 暂时不处理完成回调，Phase 4 会添加进度跟踪
    console.log(`Question ${question.id} completed`)
  }

  switch (question.type) {
    case 'button-flow':
      return (
        <ButtonFlowQuestionComponent
          question={question}
          onComplete={handleComplete}
        />
      )
    case 'single-choice':
      return (
        <SingleChoiceQuestionComponent
          question={question}
          onComplete={handleComplete}
        />
      )
    case 'ordering':
      return (
        <OrderingQuestionComponent
          question={question}
          onComplete={handleComplete}
        />
      )
    case 'input':
      return (
        <InputCommandQuestionComponent
          question={question}
          onComplete={handleComplete}
        />
      )
    default:
      return (
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
          <p className="text-red-800 dark:text-red-200">
            未知的问题类型: {(question as any).type}
          </p>
        </div>
      )
  }
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
            问题
          </h2>
          <div className="space-y-6">
            {level.questions.map((question, index) => (
              <div key={question.id}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    问题 {index + 1}
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {question.type}
                  </span>
                </div>
                <QuestionRenderer question={question} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

