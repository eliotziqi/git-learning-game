import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getAllLevels } from '../data/levels'
import type { Level } from '../types/level'

export interface ProgressState {
  unlockedLevelIds: string[]
  completedLevelIds: string[]
  currentRecommendedLevelId?: string
  initialize: (allLevelIds: string[]) => void
  completeLevel: (levelId: string) => void
  unlockLevel: (levelId: string) => void
  resetProgress: () => void
}

const STORAGE_KEY = 'gitGame:progress'

// 获取第一个关卡（order 最小的）
function getFirstLevel(): Level | undefined {
  const levels = getAllLevels()
  return levels.find((level) => level.order === Math.min(...levels.map((l) => l.order)))
}

// 获取下一个关卡（基于 order）
function getNextLevel(currentLevelId: string): Level | undefined {
  const levels = getAllLevels()
  const currentLevel = levels.find((l) => l.id === currentLevelId)
  if (!currentLevel) return undefined

  // 找到 order 比当前关卡大的第一个关卡
  const nextLevel = levels
    .filter((l) => l.order > currentLevel.order)
    .sort((a, b) => a.order - b.order)[0]

  return nextLevel
}

// 检查关卡是否应该被解锁（基于 prerequisites）
function shouldUnlockLevel(level: Level, completedLevelIds: string[]): boolean {
  if (!level.prerequisites || level.prerequisites.length === 0) {
    return true
  }
  return level.prerequisites.every((prereqId) => completedLevelIds.includes(prereqId))
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      unlockedLevelIds: [],
      completedLevelIds: [],
      currentRecommendedLevelId: undefined,

      initialize: (_allLevelIds: string[]) => {
        const state = get()
        
        // 如果已经有进度数据，不重新初始化
        if (state.unlockedLevelIds.length > 0 || state.completedLevelIds.length > 0) {
          return
        }

        // 初始化：解锁第一个关卡
        const firstLevel = getFirstLevel()
        if (firstLevel) {
          set({
            unlockedLevelIds: [firstLevel.id],
            completedLevelIds: [],
            currentRecommendedLevelId: firstLevel.id,
          })
        } else {
          // 如果没有关卡，至少设置一个空状态
          set({
            unlockedLevelIds: [],
            completedLevelIds: [],
            currentRecommendedLevelId: undefined,
          })
        }
      },

      completeLevel: (levelId: string) => {
        const state = get()
        
        // 如果已经完成，不重复添加
        if (state.completedLevelIds.includes(levelId)) {
          return
        }

        const newCompletedLevelIds = [...state.completedLevelIds, levelId]
        
        // 获取下一个关卡
        const nextLevel = getNextLevel(levelId)
        const levels = getAllLevels()
        
        // 检查所有关卡，看是否有新的应该被解锁
        const newUnlockedLevelIds = [...state.unlockedLevelIds]
        
        levels.forEach((level) => {
          // 如果已经解锁，跳过
          if (newUnlockedLevelIds.includes(level.id)) {
            return
          }
          
          // 检查是否应该解锁（基于 prerequisites 和 order）
          if (shouldUnlockLevel(level, newCompletedLevelIds)) {
            newUnlockedLevelIds.push(level.id)
          }
        })

        // 更新推荐关卡
        let newRecommendedLevelId = state.currentRecommendedLevelId
        if (nextLevel && newUnlockedLevelIds.includes(nextLevel.id)) {
          newRecommendedLevelId = nextLevel.id
        } else {
          // 如果没有下一个关卡，推荐第一个未完成的解锁关卡
          const firstUncompleted = levels
            .filter((l) => newUnlockedLevelIds.includes(l.id) && !newCompletedLevelIds.includes(l.id))
            .sort((a, b) => a.order - b.order)[0]
          newRecommendedLevelId = firstUncompleted?.id
        }

        set({
          completedLevelIds: newCompletedLevelIds,
          unlockedLevelIds: newUnlockedLevelIds,
          currentRecommendedLevelId: newRecommendedLevelId,
        })
      },

      unlockLevel: (levelId: string) => {
        const state = get()
        if (state.unlockedLevelIds.includes(levelId)) {
          return
        }
        set({
          unlockedLevelIds: [...state.unlockedLevelIds, levelId],
        })
      },

      resetProgress: () => {
        const firstLevel = getFirstLevel()
        set({
          unlockedLevelIds: firstLevel ? [firstLevel.id] : [],
          completedLevelIds: [],
          currentRecommendedLevelId: firstLevel?.id,
        })
      },
    }),
    {
      name: STORAGE_KEY,
      // 在非浏览器环境中跳过持久化
      skipHydration: typeof window === 'undefined',
    }
  )
)

