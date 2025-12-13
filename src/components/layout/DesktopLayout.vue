<template>
  <div class="desktop-layout atmospheric-bg">
    <!-- Atmospheric Background Elements -->
    <div class="background-orb orb-1"></div>
    <div class="background-orb orb-2"></div>
    <div class="background-orb orb-3"></div>

    <!-- Main Structure -->
    <div class="main-structure">
      <!-- Top Navigation Bar -->
      <TopNavigation />

      <!-- Main Content Area -->
      <div class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <!-- Footer Git Commit Section -->
      <div class="footer-container">
        <GitCommit />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNavigation from './TopNavigation.vue'
import GitCommit from '@/components/GitCommit.vue'
</script>

<style scoped>
/* Desktop Layout Container */
.desktop-layout {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background-color: var(--ct-slate-50);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Atmospheric Background Orbs */
.background-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.orb-1 {
  width: 500px;
  height: 500px;
  top: -200px;
  left: -200px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%);
  animation: float 20s infinite ease-in-out;
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  right: -150px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
  animation: float 25s infinite ease-in-out reverse;
}

.orb-3 {
  width: 350px;
  height: 350px;
  top: 40%;
  left: 60%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
  animation: float 30s infinite ease-in-out;
}

/* Main Structure */
.main-structure {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Content Area */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

/* Footer Container */
.footer-container {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--ct-space-2) 0;
  background: linear-gradient(to top, rgba(248, 250, 252, 0.8), rgba(248, 250, 252, 0.4), transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(226, 232, 240, 0.5);
}

/* Page Transition Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Floating Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  25% {
    transform: translateY(-20px) translateX(10px) scale(1.02);
  }
  50% {
    transform: translateY(-10px) translateX(15px) scale(1);
  }
  75% {
    transform: translateY(-30px) translateX(5px) scale(1.01);
  }
}


</style>