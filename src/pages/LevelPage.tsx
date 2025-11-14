import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getLevelById } from '../data/levels'
import type { Question } from '../types/level'
import { useProgressStore } from '../store/progressStore'
import ButtonFlowQuestionComponent from '../components/questions/ButtonFlowQuestion'
import SingleChoiceQuestionComponent from '../components/questions/SingleChoiceQuestion'
import OrderingQuestionComponent from '../components/questions/OrderingQuestion'
import InputCommandQuestionComponent from '../components/questions/InputCommandQuestion'

function QuestionRenderer({
  question,
  onQuestionComplete,
}: {
  question: Question
  index: number
  onQuestionComplete: (questionId: string) => void
}) {
  const handleComplete = () => {
    onQuestionComplete(question.id)
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
  const navigate = useNavigate()
  const level = id ? getLevelById(id) : undefined
  
  const { completedLevelIds, completeLevel, currentRecommendedLevelId } = useProgressStore()
  const [completedQuestionIds, setCompletedQuestionIds] = useState<string[]>([])
  const [isLevelCompleted, setIsLevelCompleted] = useState(false)

  const isAlreadyCompleted = level ? completedLevelIds.includes(level.id) : false

  // 初始化：如果关卡已完成，标记所有问题为已完成
  useEffect(() => {
    if (level && isAlreadyCompleted) {
      setCompletedQuestionIds(level.questions.map((q) => q.id))
      setIsLevelCompleted(true)
    }
  }, [level, isAlreadyCompleted])

  const handleQuestionComplete = (questionId: string) => {
    if (isLevelCompleted) return

    setCompletedQuestionIds((prev) => {
      if (prev.includes(questionId)) {
        return prev
      }
      const newCompleted = [...prev, questionId]
      
      // 检查是否所有问题都完成了
      if (level && newCompleted.length === level.questions.length) {
        // 标记关卡为完成
        completeLevel(level.id)
        setIsLevelCompleted(true)
      }
      
      return newCompleted
    })
  }

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

  const progressPercentage = level.questions.length > 0
    ? Math.round((completedQuestionIds.length / level.questions.length) * 100)
    : 0

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
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {level.title}
            </h1>
            {isAlreadyCompleted && (
              <span className="inline-block px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full mb-2">
                ✅ 已完成
              </span>
            )}
          </div>
        </div>
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
        
        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              进度: {completedQuestionIds.length} / {level.questions.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

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
                  {completedQuestionIds.includes(question.id) && (
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                      ✓ 已完成
                    </span>
                  )}
                </div>
                <QuestionRenderer
                  question={question}
                  index={index}
                  onQuestionComplete={handleQuestionComplete}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 关卡完成提示 */}
        {isLevelCompleted && (
          <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🎉</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  恭喜，你已完成本关！
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                  你已经掌握了本关卡的所有知识点。
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    返回首页
                  </Link>
                  {currentRecommendedLevelId && currentRecommendedLevelId !== level.id && (
                    <button
                      onClick={() => navigate(`/level/${currentRecommendedLevelId}`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      继续下一关 →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

