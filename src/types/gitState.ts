export type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed'

export interface GitFile {
  id: string
  name: string
  status: FileStatus
}

export interface CommitNode {
  id: string
  message: string
  shortHash: string
  isHead: boolean
}

export interface GitRepoState {
  files: GitFile[]
  commits: CommitNode[]
}

