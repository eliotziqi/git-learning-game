import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllQuestions } from '../data/levels'
import type { Question } from '../types/level'
import { useCurrentThemeDefinition } from '../themes/themeConfig'
import { useAchievementStore } from '../store/achievementStore'
import GuideCharacter from '../components/GuideCharacter'
import AchievementToast from '../components/AchievementToast'
import ButtonFlowQuestionComponent from '../components/questions/ButtonFlowQuestion'
import SingleChoiceQuestionComponent from '../components/questions/SingleChoiceQuestion'
import OrderingQuestionComponent from '../components/questions/OrderingQuestion'
import InputCommandQuestionComponent from '../components/questions/InputCommandQuestion'

function QuestionRenderer({
  question,
  onQuestionComplete,
}: {
  question: Question
  onQuestionComplete: (questionId: string, isCorrect: boolean) => void
}) {
  const handleComplete = () => {
    onQuestionComplete(question.id, true)
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
      return null
  }
}

export default function ChallengePage() {
  const allQuestions = getAllQuestions()
  const theme = useCurrentThemeDefinition()
  const { unlockAchievement, isUnlocked } = useAchievementStore()

  const [challengeQuestions, setChallengeQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [completedQuestionIds, setCompletedQuestionIds] = useState<Set<string>>(
    new Set()
  )
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [comboCount, setComboCount] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [unlockedAchievementId, setUnlockedAchievementId] = useState<
    string | null
  >(null)
  const [hasFirstCorrect, setHasFirstCorrect] = useState(false)

  const startTimeRef = useRef<number>(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)

  // 初始化：随机抽取 1-3 题
  useEffect(() => {
    const count = Math.floor(Math.random() * 3) + 1 // 1-3 题
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    setChallengeQuestions(shuffled.slice(0, count))
    startTimeRef.current = Date.now()
  }, [])

  // 计时器
  useEffect(() => {
    if (showResult) return

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [showResult])

  const handleQuestionComplete = (
    questionId: string,
    isCorrect: boolean
  ) => {
    if (completedQuestionIds.has(questionId)) return

    setCompletedQuestionIds((prev) => new Set([...prev, questionId]))

    if (isCorrect) {
      setCorrectCount((prev) => {
        const newCount = prev + 1

        // 第一次答对
        if (!hasFirstCorrect && !isUnlocked('first_correct')) {
          unlockAchievement('first_correct')
          setUnlockedAchievementId('first_correct')
          setHasFirstCorrect(true)
        }

        // 连击系统
        setComboCount((prev) => {
          const newCombo = prev + 1

          // 三连击成就
          if (newCombo === 3 && !isUnlocked('three_combo')) {
            unlockAchievement('three_combo')
            setUnlockedAchievementId('three_combo')
          }

          return newCombo
        })

        return newCount
      })
    } else {
      setWrongCount((prev) => prev + 1)
      setComboCount(0) // 答错重置连击
    }

    // 检查是否完成所有题目
    setTimeout(() => {
      const newCompletedSize = completedQuestionIds.size + 1
      if (newCompletedSize >= challengeQuestions.length) {
        // 检查挑战全对成就
        const newCorrectCount = correctCount + (isCorrect ? 1 : 0)
        if (
          newCorrectCount === challengeQuestions.length &&
          challengeQuestions.length >= 3 &&
          !isUnlocked('challenge_3_correct')
        ) {
          unlockAchievement('challenge_3_correct')
          setUnlockedAchievementId('challenge_3_correct')
        }

        setShowResult(true)
      } else {
        setCurrentQuestionIndex((prev) => prev + 1)
      }
    }, 1000)
  }

  const handleRestart = () => {
    const count = Math.floor(Math.random() * 3) + 1
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    setChallengeQuestions(shuffled.slice(0, count))
    setCurrentQuestionIndex(0)
    setCompletedQuestionIds(new Set())
    setCorrectCount(0)
    setWrongCount(0)
    setComboCount(0)
    setShowResult(false)
    setElapsedTime(0)
    startTimeRef.current = Date.now()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (challengeQuestions.length === 0) {
    return (
      <div className={`min-h-screen ${theme.backgroundClass}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`${theme.surfaceClass} p-6 rounded-lg shadow`}>
            <p className={theme.textClass}>加载中...</p>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className={`min-h-screen ${theme.backgroundClass}`}>
        {unlockedAchievementId && (
          <AchievementToast
            achievementId={unlockedAchievementId}
            onClose={() => setUnlockedAchievementId(null)}
          />
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`${theme.surfaceClass} p-8 rounded-lg shadow`}>
            <h1 className={`text-3xl font-bold ${theme.textClass} mb-6`}>
              挑战完成！
            </h1>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className={`${theme.textClass} text-lg`}>正确：</span>
                <span className={`${theme.accentClass} text-2xl font-bold`}>
                  {correctCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme.textClass} text-lg`}>错误：</span>
                <span className="text-red-500 text-2xl font-bold">
                  {wrongCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme.textClass} text-lg`}>用时：</span>
                <span className={`${theme.textClass} text-xl font-semibold`}>
                  {formatTime(elapsedTime)}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                重新挑战
              </button>
              <Link
                to="/"
                className={`px-6 py-2 ${theme.accentClass} border-2 border-current rounded hover:opacity-80 transition-colors`}
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = challengeQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / challengeQuestions.length) * 100

  return (
    <div className={`min-h-screen ${theme.backgroundClass}`}>
      {unlockedAchievementId && (
        <AchievementToast
          achievementId={unlockedAchievementId}
          onClose={() => setUnlockedAchievementId(null)}
        />
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 顶部信息栏 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex-1">
            <GuideCharacter
              mood="hint"
              message="随机挑战开始啦！看看你能答对几题～"
            />
          </div>
          <div className="ml-4 text-right">
            <div className={`${theme.textClass} text-sm mb-1`}>
              用时: {formatTime(elapsedTime)}
            </div>
            {comboCount > 0 && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`${theme.accentClass} font-bold`}
              >
                Combo: {comboCount}
                {comboCount >= 3 && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="ml-2"
                  >
                    🔥 连击中！
                  </motion.span>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`${theme.textClass} text-sm`}>
              题目 {currentQuestionIndex + 1} / {challengeQuestions.length}
            </span>
            <span className={`${theme.textClass} text-sm`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 题目 */}
        <div className={`${theme.surfaceClass} p-6 rounded-lg shadow`}>
          <QuestionRenderer
            question={currentQuestion}
            onQuestionComplete={handleQuestionComplete}
          />
        </div>
      </div>
    </div>
  )
}

