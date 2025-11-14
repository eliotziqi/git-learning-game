import type { GitRepoState, CommitNode } from '../types/gitState'

/**
 * 应用 Git 命令到仓库状态
 * 这是一个简化的模拟实现，不执行真实的 Git 命令
 */
export function applyGitCommand(
  state: GitRepoState,
  command: string
): GitRepoState {
  const newState: GitRepoState = {
    files: [...state.files],
    commits: [...state.commits],
  }

  // 处理 "modify <fileId>" 命令
  if (command.startsWith('modify ')) {
    const fileId = command.replace('modify ', '').trim()
    // 如果文件不存在，创建一个新的未跟踪文件
    const fileExists = newState.files.some((f) => f.id === fileId)
    if (!fileExists) {
      // 创建一个新文件（根据 fileId 推断文件名）
      newState.files.push({
        id: fileId,
        name: fileId === 'file1' ? 'README.md' : `${fileId}.txt`,
        status: 'modified',
      })
    } else {
      // 修改已存在的文件：committed -> modified, untracked -> modified
      newState.files = newState.files.map((file) =>
        file.id === fileId && (file.status === 'committed' || file.status === 'untracked')
          ? { ...file, status: 'modified' }
          : file
      )
    }
    return newState
  }

  // 处理 "git add <fileId>" 命令
  if (command.startsWith('git add ')) {
    const target = command.replace('git add ', '').trim()
    
    if (target === '.' || target === '--all' || target === '-A') {
      // 添加所有修改和未跟踪的文件
      newState.files = newState.files.map((file) =>
        file.status === 'modified' || file.status === 'untracked'
          ? { ...file, status: 'staged' }
          : file
      )
    } else {
      // 添加特定文件
      newState.files = newState.files.map((file) =>
        file.id === target || file.name === target
          ? file.status === 'modified' || file.status === 'untracked'
            ? { ...file, status: 'staged' }
            : file
          : file
      )
    }
    return newState
  }

  // 处理 "git commit -m '<message>'" 命令
  if (command.startsWith('git commit')) {
    const match = command.match(/git commit(?: -m)? ['"](.*)['"]/)
    const message = match ? match[1] : 'Update files'
    
    // 将所有暂存的文件标记为已提交
    const hasStagedFiles = newState.files.some((f) => f.status === 'staged')
    
    if (hasStagedFiles) {
      // 更新文件状态
      newState.files = newState.files.map((file) =>
        file.status === 'staged' ? { ...file, status: 'committed' } : file
      )

      // 创建新的提交节点
      const newCommit: CommitNode = {
        id: `commit-${Date.now()}`,
        message,
        shortHash: generateShortHash(),
        isHead: true,
      }

      // 将之前的 HEAD 标记为 false
      newState.commits = newState.commits.map((commit) => ({
        ...commit,
        isHead: false,
      }))

      // 添加新提交
      newState.commits.push(newCommit)
    }
    
    return newState
  }

  // 处理 "git init" 命令（初始化空仓库）
  if (command === 'git init') {
    return {
      files: [],
      commits: [],
    }
  }

  // 未知命令，返回原状态
  return state
}

/**
 * 生成简短的提交哈希（模拟）
 */
function generateShortHash(): string {
  const chars = '0123456789abcdef'
  let hash = ''
  for (let i = 0; i < 7; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

/**
 * 创建初始仓库状态
 */
export function createInitialState(): GitRepoState {
  return {
    files: [],
    commits: [],
  }
}

/**
 * 创建示例状态（用于演示）
 */
export function createExampleState(): GitRepoState {
  return {
    files: [
      { id: 'file1', name: 'README.md', status: 'untracked' },
      { id: 'file2', name: 'src/App.tsx', status: 'untracked' },
    ],
    commits: [],
  }
}

