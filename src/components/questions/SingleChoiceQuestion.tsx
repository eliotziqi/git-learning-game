import { useState } from 'react'
import type { SingleChoiceQuestion } from '../../types/level'

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion
  onComplete?: () => void
}

export default function SingleChoiceQuestionComponent({
  question,
  onComplete,
}: SingleChoiceQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleOptionClick = (index: number) => {
    if (isComplete) return

    setSelectedIndex(index)
    setHasError(false)

    if (index === question.correctAnswer) {
      setIsComplete(true)
      onComplete?.()
    } else {
      setHasError(true)
    }
  }

  const handleRetry = () => {
    setSelectedIndex(null)
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
        <p className="text-base text-gray-700 dark:text-gray-300 font-medium mb-4">
          {question.question}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isCorrect = index === question.correctAnswer
          const isDisabled = isComplete

          let buttonClass = `
            w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
            ${
              isSelected
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={isDisabled}
              className={buttonClass}
            >
              <span className="mr-2 font-semibold">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          )
        })}
      </div>

      {isComplete && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-green-800 dark:text-green-200 font-medium mb-1">
                回答正确！
              </p>
              {question.explanation && (
                <p className="text-sm text-green-700 dark:text-green-300">
                  {question.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {hasError && !isComplete && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">❌</span>
            <p className="text-red-800 dark:text-red-200 font-medium">
              不对，再试试看。
            </p>
          </div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
          >
            重试
          </button>
        </div>
      )}
    </div>
  )
}

