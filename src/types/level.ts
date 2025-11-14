export type QuestionType = "button-flow" | "single-choice" | "ordering" | "input"

// Button Flow Question: 用户需要按顺序点击按钮来模拟 Git 操作
export interface ButtonFlowQuestion {
  type: "button-flow"
  id: string
  title: string
  description?: string
  expectedSequence: string[] // 按钮 ID 的期望顺序
  buttons: Array<{
    id: string
    label: string
    action: string // 例如: "Modify file", "git add", "git commit"
  }>
}

// Single Choice Question: 单选题
export interface SingleChoiceQuestion {
  type: "single-choice"
  id: string
  title: string
  description?: string
  question: string
  options: string[]
  correctAnswer: number // 选项索引（从 0 开始）
  explanation?: string
}

// Ordering Question: 排序题，用户需要将步骤按正确顺序排列
export interface OrderingQuestion {
  type: "ordering"
  id: string
  title: string
  description?: string
  steps: string[] // 所有步骤
  correctOrder: number[] // 正确顺序的索引数组
}

// Input Command Question: 用户需要输入 Git 命令
export interface InputCommandQuestion {
  type: "input"
  id: string
  title: string
  description?: string
  prompt: string // 例如: "输入命令来初始化 Git 仓库"
  correctAnswers: string[] // 允许的正确答案变体（例如: ["git init", "git  init"]）
  hint?: string
}

// 问题类型的联合类型
export type Question =
  | ButtonFlowQuestion
  | SingleChoiceQuestion
  | OrderingQuestion
  | InputCommandQuestion

// 关卡接口
export interface Level {
  id: string
  title: string
  description: string
  order: number // 推荐顺序
  prerequisites?: string[] // 前置关卡 ID 列表
  tags?: string[] // 标签，例如: ["basics", "init", "status"]
  questions: Question[]
}

