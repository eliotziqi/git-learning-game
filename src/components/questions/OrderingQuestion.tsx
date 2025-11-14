import { useState } from 'react'
import type { OrderingQuestion } from '../../types/level'

interface OrderingQuestionProps {
  question: OrderingQuestion
  onComplete?: () => void
}

export default function OrderingQuestionComponent({
  question,
  onComplete,
}: OrderingQuestionProps) {
  const [clickedOrder, setClickedOrder] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleStepClick = (stepIndex: number) => {
    if (isComplete) return

    // 如果已经点击过，忽略
    if (clickedOrder.includes(stepIndex)) return

    const newOrder = [...clickedOrder, stepIndex]
    setClickedOrder(newOrder)
    setHasError(false)

    // 检查是否完成
    if (newOrder.length === question.correctOrder.length) {
      const isCorrect =
        newOrder.length === question.correctOrder.length &&
        newOrder.every((index, pos) => index === question.correctOrder[pos])

      if (isCorrect) {
        setIsComplete(true)
        onComplete?.()
      } else {
        setHasError(true)
      }
    } else if (newOrder.length > question.correctOrder.length) {
      setHasError(true)
    } else {
      // 检查当前顺序是否正确（部分匹配）
      const isPartialCorrect = newOrder.every(
        (index, pos) => index === question.correctOrder[pos]
      )
      if (!isPartialCorrect) {
        setHasError(true)
      }
    }
  }

  const handleReset = () => {
    setClickedOrder([])
    setIsComplete(false)
    setHasError(false)
  }

  const getStepPosition = (stepIndex: number) => {
    const position = clickedOrder.indexOf(stepIndex)
    return position >= 0 ? position + 1 : null
  }

  const isStepClicked = (stepIndex: number) => {
    return clickedOrder.includes(stepIndex)
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {question.description}
          </p>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          请按照正确的顺序点击步骤：
        </p>
      </div>

      <div className="mb-4">
        <div className="space-y-2">
          {question.steps.map((step, index) => {
            const position = getStepPosition(index)
            const isClicked = isStepClicked(index)
            const isDisabled = isComplete || hasError

            return (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                disabled={isDisabled}
                className={`
                  w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    isClicked
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {position && (
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-300 rounded-full text-xs font-bold">
                    {position}
                  </span>
                )}
                {step}
              </button>
            )
          })}
        </div>
      </div>

      {clickedOrder.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            已选择顺序:
          </p>
          <div className="flex flex-col gap-1">
            {clickedOrder.map((stepIndex, orderIndex) => (
              <div
                key={`${stepIndex}-${orderIndex}`}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
              >
                {orderIndex + 1}. {question.steps[stepIndex]}
              </div>
            ))}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <p className="text-green-800 dark:text-green-200 font-medium">
              正确！你完成了正确的步骤顺序。
            </p>
          </div>
        </div>
      )}

      {hasError && !isComplete && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">❌</span>
            <p className="text-red-800 dark:text-red-200 font-medium">
              顺序不正确，请重试。
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
          >
            重置
          </button>
        </div>
      )}
    </div>
  )
}

