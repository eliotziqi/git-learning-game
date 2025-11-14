import { useCurrentThemeDefinition } from '../themes/themeConfig'
import type { GitRepoState } from '../types/gitState'

interface GitStateVisualizerProps {
  state: GitRepoState
  className?: string
  title?: string
}

export default function GitStateVisualizer({
  state,
  className = '',
  title = 'Git 仓库状态',
}: GitStateVisualizerProps) {
  const theme = useCurrentThemeDefinition()

  const stagedFiles = state.files.filter((f) => f.status === 'staged')
  const workingFiles = state.files.filter(
    (f) => f.status !== 'staged' && f.status !== 'committed'
  )

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'untracked':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 italic'
      case 'modified':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'staged':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'committed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'untracked':
        return '未跟踪'
      case 'modified':
        return '已修改'
      case 'staged':
        return '已暂存'
      case 'committed':
        return '已提交'
      default:
        return status
    }
  }

  return (
    <div className={`${className}`}>
      {title && (
        <h3 className={`text-lg font-semibold ${theme.textClass} mb-4`}>
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 工作区 */}
        <div className={`${theme.surfaceClass} p-4 rounded-lg border border-gray-200 dark:border-gray-700`}>
          <h4 className={`${theme.textClass} font-semibold mb-3 text-sm`}>
            工作区 (Working Directory)
          </h4>
          {workingFiles.length === 0 ? (
            <p className={`${theme.textClass} text-xs opacity-60`}>
              工作区干净
            </p>
          ) : (
            <div className="space-y-2">
              {workingFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800"
                >
                  <span className={`${theme.textClass} text-sm truncate flex-1`}>
                    {file.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusBadgeClass(
                      file.status
                    )}`}
                  >
                    {getStatusLabel(file.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 暂存区 */}
        <div className={`${theme.surfaceClass} p-4 rounded-lg border border-gray-200 dark:border-gray-700`}>
          <h4 className={`${theme.textClass} font-semibold mb-3 text-sm`}>
            暂存区 (Staging Area)
          </h4>
          {stagedFiles.length === 0 ? (
            <p className={`${theme.textClass} text-xs opacity-60`}>
              暂存区为空
            </p>
          ) : (
            <div className="space-y-2">
              {stagedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 rounded bg-blue-50 dark:bg-blue-900/20"
                >
                  <span className={`${theme.textClass} text-sm truncate flex-1`}>
                    {file.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusBadgeClass(
                      file.status
                    )}`}
                  >
                    {getStatusLabel(file.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 提交历史 */}
        <div className={`${theme.surfaceClass} p-4 rounded-lg border border-gray-200 dark:border-gray-700`}>
          <h4 className={`${theme.textClass} font-semibold mb-3 text-sm`}>
            提交历史 (Commits)
          </h4>
          {state.commits.length === 0 ? (
            <p className={`${theme.textClass} text-xs opacity-60`}>
              暂无提交
            </p>
          ) : (
            <div className="space-y-2">
              {[...state.commits].reverse().map((commit) => (
                <div
                  key={commit.id}
                  className={`
                    p-2 rounded
                    ${
                      commit.isHead
                        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-400 dark:border-green-600'
                        : 'bg-gray-50 dark:bg-gray-800'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-mono ${
                        commit.isHead
                          ? 'text-green-600 dark:text-green-400'
                          : theme.textClass
                      }`}
                    >
                      {commit.shortHash}
                    </span>
                    {commit.isHead && (
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                        HEAD
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      commit.isHead ? theme.textClass : theme.textClass
                    } opacity-80`}
                  >
                    {commit.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

