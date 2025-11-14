import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeName = 'modern' | 'pixel' | 'cartoon' | 'minimal'
export type LearningMode = 'basic' | 'intermediate' | 'expert'

export interface SettingsState {
  theme: ThemeName
  learningMode: LearningMode
  hasSeenIntro: boolean
  setTheme: (theme: ThemeName) => void
  setLearningMode: (mode: LearningMode) => void
  setHasSeenIntro: (value: boolean) => void
}

const STORAGE_KEY = 'gitGame:settings'

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'modern',
      learningMode: 'basic',
      hasSeenIntro: false,

      setTheme: (theme: ThemeName) => {
        set({ theme })
      },

      setLearningMode: (mode: LearningMode) => {
        set({ learningMode: mode })
      },

      setHasSeenIntro: (value: boolean) => {
        set({ hasSeenIntro: value })
      },
    }),
    {
      name: STORAGE_KEY,
      // 在非浏览器环境中跳过持久化
      skipHydration: typeof window === 'undefined',
    }
  )
)

