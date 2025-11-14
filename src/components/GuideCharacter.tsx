import { useCurrentThemeDefinition } from '../themes/themeConfig'

interface GuideCharacterProps {
  mood?: 'welcome' | 'hint' | 'success' | 'error' | 'neutral'
  title?: string
  message: string
  className?: string
}

const moodEmojis: Record<string, string> = {
  welcome: '👋',
  hint: '💡',
  success: '🎉',
  error: '⚠️',
  neutral: '',
}

export default function GuideCharacter({
  mood = 'neutral',
  title,
  message,
  className = '',
}: GuideCharacterProps) {
  const theme = useCurrentThemeDefinition()
  const moodEmoji = moodEmojis[mood] || theme.guideEmoji
  const displayEmoji = mood === 'neutral' ? theme.guideEmoji : moodEmoji

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
          {displayEmoji}
        </div>
      </div>
      <div className={`flex-1 ${theme.surfaceClass} rounded-lg p-4 border border-gray-200 dark:border-gray-700`}>
        {title && (
          <h3 className={`${theme.textClass} font-semibold mb-1`}>
            {title}
          </h3>
        )}
        <p className={`${theme.textClass} text-sm`}>
          {message}
        </p>
      </div>
    </div>
  )
}

