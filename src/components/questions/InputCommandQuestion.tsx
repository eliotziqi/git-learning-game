import { useState } from 'react'
import type { InputCommandQuestion } from '../../types/level'

interface InputCommandQuestionProps {
  question: InputCommandQuestion
  onComplete?: () => void
}

export default function InputCommandQuestionComponent({
  question,
  onComplete,
}: InputCommandQuestionProps) {
  const [input, setInput] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)

  const normalizeInput = (text: string): string => {
    return text
      .trim()
      .replace(/\s+/g, ' ') // 将多个空格替换为单个空格
  }

  const checkAnswer = (userInput: string): boolean => {
    const normalized = normalizeInput(userInput)
    return question.correctAnswers.some((answer) => {
      const normalizedAnswer = normalizeInput(answer)
      return normalized === normalizedAnswer
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isComplete) return

    const normalizedInput = normalizeInput(input)
    if (!normalizedInput) {
      setHasError(true)
      return
    }

    if (checkAnswer(normalizedInput)) {
      setIsComplete(true)
      setHasError(false)
      onComplete?.()
    } else {
      setHasError(true)
    }
  }

  const handleRetry = () => {
    setInput('')
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

      <div className="mb-4 p-3 bg-gray-900 dark:bg-black rounded-lg font-mono text-sm">
        <div className="text-green-400 dark:text-green-500 mb-2">
          $ {question.prompt}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400 dark:text-green-500">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setHasError(false)
            }}
            disabled={isComplete}
            className={`
              flex-1 bg-transparent text-white dark:text-gray-100 outline-none
              ${isComplete ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            placeholder="输入命令..."
            autoFocus
          />
          {!isComplete && (
            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
            >
              运行
            </button>
          )}
        </form>
      </div>

      {question.hint && !isComplete && !hasError && (
        <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm text-yellow-800 dark:text-yellow-200">
          💡 提示: {question.hint}
        </div>
      )}

      {isComplete && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <p className="text-green-800 dark:text-green-200 font-medium">
              命令正确！
            </p>
          </div>
        </div>
      )}

      {hasError && !isComplete && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">❌</span>
            <p className="text-red-800 dark:text-red-200 font-medium">
              命令不正确，请重试。
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

