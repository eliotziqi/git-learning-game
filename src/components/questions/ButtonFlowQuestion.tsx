import { useState } from 'react'
import type { ButtonFlowQuestion } from '../../types/level'

interface ButtonFlowQuestionProps {
  question: ButtonFlowQuestion
  onComplete?: () => void
}

export default function ButtonFlowQuestionComponent({
  question,
  onComplete,
}: ButtonFlowQuestionProps) {
  const [clickedSequence, setClickedSequence] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleButtonClick = (buttonId: string) => {
    if (isComplete) return

    const newSequence = [...clickedSequence, buttonId]
    setClickedSequence(newSequence)
    setHasError(false)

    // 检查是否完成
    if (newSequence.length === question.expectedSequence.length) {
      const isCorrect =
        newSequence.length === question.expectedSequence.length &&
        newSequence.every((id, index) => id === question.expectedSequence[index])

      if (isCorrect) {
        setIsComplete(true)
        onComplete?.()
      } else {
        setHasError(true)
      }
    } else if (newSequence.length > question.expectedSequence.length) {
      // 如果点击次数超过预期，标记为错误
      setHasError(true)
    } else {
      // 检查当前序列是否正确（部分匹配）
      const isPartialCorrect = newSequence.every(
        (id, index) => id === question.expectedSequence[index]
      )
      if (!isPartialCorrect) {
        setHasError(true)
      }
    }
  }

  const handleReset = () => {
    setClickedSequence([])
    setIsComplete(false)
    setHasError(false)
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
      </div>

      <div className="mb-4">
        <div className="flex gap-2 flex-wrap">
          {question.buttons.map((button) => {
            const isClicked = clickedSequence.includes(button.id)
            const clickIndex = clickedSequence.indexOf(button.id)
            const isDisabled = isComplete || hasError

            return (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button.id)}
                disabled={isDisabled}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isClicked
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {button.label}
                {isClicked && (
                  <span className="ml-2 text-xs">
                    ({clickIndex + 1})
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {clickedSequence.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            已点击顺序:
          </p>
          <div className="flex gap-2 flex-wrap">
            {clickedSequence.map((id, index) => {
              const button = question.buttons.find((b) => b.id === id)
              return (
                <span
                  key={`${id}-${index}`}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                >
                  {index + 1}. {button?.label}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <p className="text-green-800 dark:text-green-200 font-medium">
              正确！你完成了正确的操作序列。
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

