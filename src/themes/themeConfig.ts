import { useSettingsStore } from '../store/settingsStore'
import type { ThemeName } from '../store/settingsStore'

export interface ThemeDefinition {
  name: string
  backgroundClass: string
  surfaceClass: string
  textClass: string
  accentClass: string
  badgeClass: string
  guideEmoji: string
}

export const themeConfig: Record<ThemeName, ThemeDefinition> = {
  modern: {
    name: 'Modern',
    backgroundClass: 'bg-gray-50 dark:bg-gray-900',
    surfaceClass: 'bg-white dark:bg-gray-800',
    textClass: 'text-gray-900 dark:text-white',
    accentClass: 'text-blue-500',
    badgeClass: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    guideEmoji: '🤖',
  },
  pixel: {
    name: 'Pixel',
    backgroundClass: 'bg-slate-900',
    surfaceClass: 'bg-slate-800 border-2 border-slate-500',
    textClass: 'text-slate-50',
    accentClass: 'text-lime-300',
    badgeClass: 'bg-lime-900 text-lime-100',
    guideEmoji: '🕹️',
  },
  cartoon: {
    name: 'Cartoon',
    backgroundClass: 'bg-orange-50',
    surfaceClass: 'bg-white border border-orange-200',
    textClass: 'text-orange-900',
    accentClass: 'text-pink-500',
    badgeClass: 'bg-pink-100 text-pink-800',
    guideEmoji: '🐙',
  },
  minimal: {
    name: 'Minimal',
    backgroundClass: 'bg-white',
    surfaceClass: 'bg-white border border-gray-200',
    textClass: 'text-gray-900',
    accentClass: 'text-black',
    badgeClass: 'bg-gray-100 text-gray-700',
    guideEmoji: '⬛',
  },
}

export function useCurrentThemeDefinition() {
  const theme = useSettingsStore((s) => s.theme)
  return themeConfig[theme]
}

