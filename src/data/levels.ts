import type { Level } from '../types/level'

export const levels: Level[] = [
  {
    id: "level-1",
    title: "Git 初始化与状态查看",
    description: "学习如何初始化 Git 仓库并使用 git status 查看仓库状态",
    order: 1,
    tags: ["basics", "init", "status"],
    questions: [
      {
        type: "button-flow",
        id: "q1-1",
        title: "初始化 Git 仓库",
        description: "按照正确的顺序执行操作来初始化一个 Git 仓库",
        expectedSequence: ["init"],
        buttons: [
          {
            id: "init",
            label: "git init",
            action: "初始化 Git 仓库"
          },
          {
            id: "status",
            label: "git status",
            action: "查看仓库状态"
          }
        ]
      },
      {
        type: "single-choice",
        id: "q1-2",
        title: "git status 的作用",
        question: "git status 命令的主要作用是什么？",
        options: [
          "查看当前分支的提交历史",
          "查看工作区和暂存区的状态",
          "切换到另一个分支",
          "提交更改到仓库"
        ],
        correctAnswer: 1,
        explanation: "git status 用于显示工作区和暂存区的状态，包括哪些文件被修改、哪些文件已暂存等。"
      },
      {
        type: "input",
        id: "q1-3",
        title: "输入初始化命令",
        prompt: "输入命令来初始化一个名为 'my-project' 的 Git 仓库",
        correctAnswers: ["git init", "git  init"],
        hint: "使用 git init 命令"
      }
    ]
  },
  {
    id: "level-2",
    title: "Git 添加文件",
    description: "学习如何使用 git add 将文件添加到暂存区",
    order: 2,
    prerequisites: ["level-1"],
    tags: ["basics", "add", "staging"],
    questions: [
      {
        type: "button-flow",
        id: "q2-1",
        title: "添加文件到暂存区",
        description: "模拟修改文件并添加到暂存区的完整流程",
        expectedSequence: ["modify", "add"],
        buttons: [
          {
            id: "modify",
            label: "修改文件",
            action: "修改 README.md"
          },
          {
            id: "add",
            label: "git add README.md",
            action: "添加文件到暂存区"
          },
          {
            id: "add-all",
            label: "git add .",
            action: "添加所有文件到暂存区"
          }
        ]
      },
      {
        type: "single-choice",
        id: "q2-2",
        title: "git add 的用法",
        question: "以下哪个命令可以将所有修改的文件添加到暂存区？",
        options: [
          "git add -a",
          "git add .",
          "git add *",
          "git add all"
        ],
        correctAnswer: 1,
        explanation: "git add . 会将当前目录下所有修改的文件添加到暂存区。"
      },
      {
        type: "input",
        id: "q2-3",
        title: "添加特定文件",
        prompt: "输入命令将 'src/App.tsx' 文件添加到暂存区",
        correctAnswers: ["git add src/App.tsx", "git add ./src/App.tsx", "git  add  src/App.tsx"],
        hint: "使用 git add 后跟文件路径"
      }
    ]
  },
  {
    id: "level-3",
    title: "Git 提交更改",
    description: "学习如何使用 git commit 提交更改，包括 -m 和 -v 选项",
    order: 3,
    prerequisites: ["level-2"],
    tags: ["basics", "commit"],
    questions: [
      {
        type: "button-flow",
        id: "q3-1",
        title: "完整的提交流程",
        description: "从修改文件到提交的完整流程",
        expectedSequence: ["modify", "add", "commit"],
        buttons: [
          {
            id: "modify",
            label: "修改文件",
            action: "修改代码"
          },
          {
            id: "add",
            label: "git add .",
            action: "添加到暂存区"
          },
          {
            id: "commit",
            label: "git commit -m",
            action: "提交更改"
          }
        ]
      },
      {
        type: "single-choice",
        id: "q3-2",
        title: "git commit -m 的作用",
        question: "git commit -m 'message' 中的 -m 参数的作用是什么？",
        options: [
          "指定提交的作者",
          "直接提供提交信息，不打开编辑器",
          "修改上一次提交",
          "查看提交历史"
        ],
        correctAnswer: 1,
        explanation: "-m 参数允许你直接在命令行中提供提交信息，而不需要打开编辑器。"
      },
      {
        type: "single-choice",
        id: "q3-3",
        title: "git commit -v 的作用",
        question: "git commit -v 中的 -v 参数的作用是什么？",
        options: [
          "显示详细版本信息",
          "在编辑器中显示要提交的更改差异",
          "验证提交信息格式",
          "查看提交历史"
        ],
        correctAnswer: 1,
        explanation: "-v 参数会在提交编辑器中显示要提交的更改的完整差异，帮助你更好地理解即将提交的内容。"
      },
      {
        type: "input",
        id: "q3-4",
        title: "提交更改",
        prompt: "输入命令提交更改，提交信息为 'Add new feature'",
        correctAnswers: [
          "git commit -m 'Add new feature'",
          'git commit -m "Add new feature"',
          "git commit -m Add new feature"
        ],
        hint: "使用 git commit -m 后跟提交信息"
      }
    ]
  },
  {
    id: "level-4",
    title: "Git 查看历史",
    description: "学习如何使用 git log 查看提交历史，包括 --oneline 选项",
    order: 4,
    prerequisites: ["level-3"],
    tags: ["basics", "log", "history"],
    questions: [
      {
        type: "single-choice",
        id: "q4-1",
        title: "git log 的作用",
        question: "git log 命令的主要作用是什么？",
        options: [
          "查看工作区状态",
          "查看提交历史记录",
          "查看暂存区内容",
          "查看分支列表"
        ],
        correctAnswer: 1,
        explanation: "git log 用于显示当前分支的提交历史记录。"
      },
      {
        type: "single-choice",
        id: "q4-2",
        title: "git log --oneline",
        question: "git log --oneline 的作用是什么？",
        options: [
          "只显示最近一次提交",
          "以简洁的单行格式显示提交历史",
          "显示所有分支的提交",
          "按时间倒序显示"
        ],
        correctAnswer: 1,
        explanation: "--oneline 选项会以简洁的单行格式显示每个提交，只显示提交哈希的前7位和提交信息。"
      },
      {
        type: "input",
        id: "q4-3",
        title: "查看简洁历史",
        prompt: "输入命令以单行格式查看提交历史",
        correctAnswers: [
          "git log --oneline",
          "git log --oneline ",
          "git  log  --oneline"
        ],
        hint: "使用 git log --oneline"
      }
    ]
  }
]

// 根据 ID 获取关卡
export function getLevelById(id: string): Level | undefined {
  return levels.find(level => level.id === id)
}

// 获取所有关卡（按顺序排序）
export function getAllLevels(): Level[] {
  return [...levels].sort((a, b) => a.order - b.order)
}

