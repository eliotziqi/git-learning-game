import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_correct',
    name: '第一次答对',
    description: '第一次答对题目',
    emoji: '🎯',
  },
  {
    id: 'first_level_complete',
    name: '完成首关',
    description: '完成任意关卡',
    emoji: '🏆',
  },
  {
    id: 'three_combo',
    name: '三连击',
    description: '连续答对 3 题',
    emoji: '🔥',
  },
  {
    id: 'challenge_3_correct',
    name: '挑战全对',
    description: '随机挑战全对',
    emoji: '⭐',
  },
  {
    id: 'theme_switcher',
    name: '主题探索者',
    description: '第一次切换主题',
    emoji: '🎨',
  },
]

export interface AchievementState {
  achievements: { id: string; unlocked: boolean; date?: string }[]
  unlockAchievement: (id: string) => void
  isUnlocked: (id: string) => boolean
  resetAchievements: () => void
}

const STORAGE_KEY = 'gitGame:achievements'

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENTS.map((ach) => ({
        id: ach.id,
        unlocked: false,
      })),

      unlockAchievement: (id: string) => {
        const state = get()
        const achievement = state.achievements.find((a) => a.id === id)
        
        // 如果已经解锁，不重复解锁
        if (achievement && achievement.unlocked) {
          return
        }

        // 解锁成就
        const newAchievements = state.achievements.map((a) =>
          a.id === id
            ? { ...a, unlocked: true, date: new Date().toISOString() }
            : a
        )

        set({ achievements: newAchievements })
      },

      isUnlocked: (id: string) => {
        const state = get()
        const achievement = state.achievements.find((a) => a.id === id)
        return achievement?.unlocked || false
      },

      resetAchievements: () => {
        set({
          achievements: ACHIEVEMENTS.map((ach) => ({
            id: ach.id,
            unlocked: false,
          })),
        })
      },
    }),
    {
      name: STORAGE_KEY,
      skipHydration: typeof window === 'undefined',
    }
  )
)

