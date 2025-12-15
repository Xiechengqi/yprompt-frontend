export default function GitCommit() {
  const commitHash = import.meta.env.VITE_GIT_COMMIT_HASH || ''
  const commitDate = import.meta.env.VITE_GIT_COMMIT_DATE || ''
  
  if (!commitHash) {
    return null
  }
  
  return (
    <div
      className="git-commit-badge inline-flex items-center gap-1.5 px-1.5 py-0.5 bg-transparent border-0 rounded-none text-[10px] font-mono text-gray-400 cursor-default transition-colors hover:text-gray-500"
      title={`Git Commit: ${commitHash}${commitDate ? `\nDate: ${commitDate}` : ''}`}
    >
      <svg
        className="git-icon w-3 h-3 flex-shrink-0 opacity-50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
      <span className="commit-hash font-normal tracking-wide select-text">{commitHash}</span>
    </div>
  )
}
