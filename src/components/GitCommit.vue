<template>
  <div 
    v-if="commitHash" 
    class="git-commit-badge"
    :title="`Git Commit: ${commitHash}${commitDate ? `\nDate: ${commitDate}` : ''}`"
  >
    <svg 
      class="git-icon" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
    <span class="commit-hash">{{ commitHash }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 从环境变量获取 git commit 信息
const commitHash = computed(() => {
  return import.meta.env.VITE_GIT_COMMIT_HASH || ''
})

const commitDate = computed(() => {
  return import.meta.env.VITE_GIT_COMMIT_DATE || ''
})
</script>

<style scoped>
.git-commit-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 6px;
  background: transparent;
  border: none;
  border-radius: 0;
  font-size: 10px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  color: #9ca3af;
  cursor: default;
  transition: color 0.2s;
}

.git-commit-badge:hover {
  color: #6b7280;
  background: transparent;
  border: none;
  box-shadow: none;
  transform: none;
}

.git-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  opacity: 0.5;
}

.commit-hash {
  font-weight: 400;
  letter-spacing: 0.3px;
  user-select: text;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .git-commit-badge {
    padding: 1px 4px;
    font-size: 9px;
  }

  .git-icon {
    width: 10px;
    height: 10px;
  }
}
</style>
