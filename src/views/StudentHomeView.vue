<script setup>
import { computed } from 'vue'
import ResumeInputPanel from '../components/student/ResumeInputPanel.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const displayName = computed(() => userStore.userInfo?.name || '测试用户')

const navSections = [
  {
    title: '核心功能',
    items: [
      {
        label: '输入简历',
        active: true,
        strokeWidth: '2.5',
        path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      },
      {
        label: '我的收藏',
        path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      },
      {
        label: '目标追踪',
        path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      },
    ],
  },
  {
    title: '职场情报',
    items: [
      {
        label: '热门职业',
        path: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0113 15.657V12a3 3 0 01-3-3V5.41',
      },
      {
        label: '岗位地图',
        path: 'M9 20l-5.447-2.724A2 2 0 013 15.487V6.707a2 2 0 011.553-1.954L10 3.142l5.447 2.724A2 2 0 0117 7.82V16.513a2 2 0 01-1.553 1.954L10 19.858a2 2 0 01-1 0z',
      },
    ],
  },
  {
    title: '智能工具',
    items: [
      {
        label: '简历优化',
        path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      },
      {
        label: 'AI助手',
        path: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      },
    ],
  },
]
</script>

<template>
  <section class="student-home relative flex h-screen overflow-hidden">
    <div
      class="absolute top-[-15%] left-[-10%] w-[50%] h-[60%] rounded-full bg-sky-200/50 blur-[120px] pointer-events-none z-0"
    ></div>
    <div
      class="absolute bottom-[-15%] right-[-10%] w-[50%] h-[60%] rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none z-0"
    ></div>

    <aside
      class="w-[168px] h-screen glass-panel flex flex-col z-30 transition-all duration-300 border-r border-white/60"
    >
      <div class="p-3.5 pb-3 flex items-center gap-1.5">
        <div
          class="w-6 h-6 bg-gradient-to-br from-indigo-600 to-sky-500 rounded-[7px] flex items-center justify-center text-white font-black text-[11px] shadow-lg shadow-indigo-500/20"
        >
          枢
        </div>
        <span
          class="text-[13px] font-black tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500"
        >
          职镜天枢
        </span>
      </div>

      <nav class="flex-1 px-2.5 py-1 space-y-0.5 overflow-y-auto pb-2.5 sidebar-scrollbar">
        <template v-for="section in navSections" :key="section.title">
          <div class="text-[7px] font-bold text-slate-400/80 uppercase tracking-[0.14em] pl-2.5 mb-1.5 mt-2.5">
            {{ section.title }}
          </div>

          <button
            v-for="item in section.items"
            :key="item.label"
            type="button"
            class="nav-item w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[12px] text-[10px] font-semibold text-left"
            :class="item.active ? 'active' : 'text-slate-600'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :stroke-width="item.strokeWidth || 2"
                :d="item.path"
              />
            </svg>
            {{ item.label }}
          </button>
        </template>
      </nav>

      <div class="p-2.5 mt-auto">
        <div
          class="flex items-center gap-1.5 p-1.5 bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm rounded-[12px] transition-all cursor-pointer group"
        >
          <div class="relative">
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"
              alt="Avatar"
              class="w-6 h-6 rounded-full border border-white bg-sky-50 shadow-sm"
            />
            <span class="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-white rounded-full"></span>
          </div>
          <div class="flex-1 overflow-hidden">
            <div class="text-[10px] font-bold text-slate-800 truncate">{{ displayName }}</div>
            <div class="text-[10px] font-medium text-slate-500 truncate mt-0.5">正在搜寻算法Offer...</div>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-screen relative z-10">
      <header
        class="h-[52px] glass-panel z-20 px-4 flex items-center justify-between sticky top-0 border-b border-white/60"
      >
        <div class="flex items-center">
          <span class="text-[10px] text-indigo-600/80 font-bold tracking-[0.08em] mt-0.5 uppercase">
            你的下一份offer是算出来的
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="relative w-7 h-7 flex items-center justify-center rounded-full bg-white/50 hover:bg-white border border-white/60 shadow-sm text-slate-500 hover:text-indigo-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 text-white text-[7px] font-bold flex items-center justify-center rounded-full border border-white shadow-sm"
            >
              2
            </span>
          </button>

          <div class="flex items-center gap-2.5 text-[9px] font-bold text-slate-500">
            <a href="/" class="hover:text-indigo-600 transition-colors" @click.prevent>关于我们</a>
            <div class="w-1 h-1 bg-slate-300/80 rounded-full"></div>
            <a href="/" class="hover:text-indigo-600 transition-colors" @click.prevent>联系客服</a>
          </div>
        </div>
      </header>

      <section class="flex-1 p-3 relative overflow-y-auto z-10 flex justify-center items-start pt-4 custom-scrollbar">
        <ResumeInputPanel />
      </section>
    </main>
  </section>
</template>

<style scoped>
.student-home {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #eef2ff 100%);
  min-height: 100vh;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 8px 32px 0 rgba(31, 38, 135, 0.05);
}

.nav-item {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-item:hover {
  transform: translateX(6px);
  background: rgba(255, 255, 255, 0.6);
  color: #4f46e5;
}

.nav-item.active {
  background: linear-gradient(135deg, #6366f1, #38bdf8);
  color: white;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-item.active svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  opacity: 1;
}

.sidebar-scrollbar::-webkit-scrollbar,
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.sidebar-scrollbar::-webkit-scrollbar-track,
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scrollbar::-webkit-scrollbar-thumb,
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 10px;
}
</style>
