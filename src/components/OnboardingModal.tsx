import { useSettingsStore } from '../store/settingsStore'
import GuideCharacter from './GuideCharacter'
import { useCurrentThemeDefinition } from '../themes/themeConfig'

export default function OnboardingModal() {
  const { hasSeenIntro, setHasSeenIntro, learningMode } = useSettingsStore()
  const theme = useCurrentThemeDefinition()

  if (hasSeenIntro) {
    return null
  }

  const handleStart = () => {
    setHasSeenIntro(true)
  }

  const modeDescriptions: Record<string, string> = {
    basic: '基础模式：适合 Git 初学者，提供详细的提示和说明',
    intermediate: '中级模式：适合有一定 Git 经验的用户',
    expert: '专家模式：适合 Git 高级用户，挑战更高难度',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleStart}
      />
      
      {/* 模态框内容 */}
      <div className={`relative ${theme.surfaceClass} rounded-lg shadow-xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-700`}>
        <GuideCharacter
          mood="welcome"
          title="欢迎来到 Git 学习游戏！"
          message="这是一个渐进式的 Git 学习闯关游戏，通过完成各种类型的题目来掌握 Git 命令。"
        />
        
        <div className={`mt-4 ${theme.textClass} text-sm space-y-3`}>
          <div>
            <h4 className="font-semibold mb-1">如何开始：</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>在首页选择第一关开始挑战</li>
              <li>完成所有问题后会自动解锁下一关</li>
              <li>推荐关卡会高亮显示</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-1">学习模式：</h4>
            <p className="text-gray-600 dark:text-gray-400">
              当前模式：<span className={`${theme.accentClass} font-medium`}>{learningMode}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {modeDescriptions[learningMode]}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-1">个性化设置：</h4>
            <p className="text-gray-600 dark:text-gray-400">
              你可以在导航栏切换不同的主题风格，让学习更有趣！
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            开始闯关
          </button>
        </div>
      </div>
    </div>
  )
}

