<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  uploadResult: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['back'])

const jobs = [
  {
    tab: '岗位 1：大模型算法工程师',
    title: '大模型算法工程师',
    badge: '匹配极佳',
    score: 87,
    intro:
      '大模型算法工程师负责通用大语言模型的预训练、微调与底层架构优化。岗位要求候选人具备强数学基础、深度学习框架经验，以及对底层算子和分布式计算的理解。',
    dims: [
      { label: '基础要求', value: 88, text: 'text-indigo-600', track: 'bg-indigo-100/50', fill: 'from-indigo-400 to-indigo-500' },
      { label: '职业技能', value: 70, text: 'text-sky-600', track: 'bg-sky-100/50', fill: 'from-sky-400 to-sky-500' },
      { label: '职业素养', value: 85, text: 'text-emerald-600', track: 'bg-emerald-100/50', fill: 'from-emerald-400 to-emerald-500' },
      { label: '发展潜力', value: 90, text: 'text-amber-600', track: 'bg-amber-100/50', fill: 'from-amber-400 to-amber-500' },
    ],
    diag: {
      plus: '你在 C++、系统优化与计算机体系结构上的基础很强，做底层工程优化很有优势。',
      gap: '目前在 PyTorch、模型微调与机器学习底层原理上距离行业标准还有明显差距。',
      tip: '如果把深度学习框架能力从 65 拉到 85，你冲击顶级 AI 算法岗的概率会大幅提升。',
    },
    path: [
      { stage: '大二/大三', label: '日常实习', tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30', align: 'self-start' },
      { stage: '毕业 1-3年', label: '初级研究员', tone: 'from-amber-400 to-orange-500 shadow-orange-500/30', align: 'self-end' },
      { stage: '3-5年', label: '高级研究员', tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30', align: 'self-start' },
      { stage: '未来', label: '算法专家', tone: 'from-indigo-400 to-indigo-600 shadow-indigo-500/30', align: 'self-end' },
    ],
    short: {
      badge: '大二 / 大三',
      badgeClass: 'bg-indigo-100 text-indigo-600',
      title: '短期目标',
      titleClass: 'text-indigo-700',
      border: 'border-indigo-100',
      ring: 'focus:ring-indigo-400',
      opts: ['寻找一段高含金量的日常实习', '系统掌握 PyTorch 并复现经典模型', '准备算法类竞赛与认证'],
      reason: '日常实习是后续冲刺大厂暑期实习的核心跳板，越早建立项目与工程履历，越容易拿到面试机会。',
    },
    long: {
      badge: '大四 / 毕业',
      badgeClass: 'bg-sky-100 text-sky-600',
      title: '长期目标',
      titleClass: 'text-sky-700',
      border: 'border-sky-100',
      ring: 'focus:ring-sky-400',
      opts: ['进入互联网大厂担任算法实习生', '参与 AI 实验室科研项目', '保研至 NLP / CV 强校'],
      reason: '结合你的底层优化优势与新增深度学习能力，可以主打“大模型工程优化”这一稀缺赛道。',
    },
    explain: [
      '根据你上传的简历与技能雷达，你在数学和底层系统方向已经具备很好的基础。',
      '结合行业趋势，我们优先推荐你把“大模型算法工程师”作为核心目标，这个岗位和你的技术偏好高度吻合。',
      '如果大三结束前还没获得对口实习，也可以平滑切换到后端架构开发方向。',
    ],
    suggest: ['保持算法类课程优势', '尽早开展 PyTorch 与 Transformer 复现'],
    radar: {
      main: { labels: ['基础要求', '职业技能', '职业素养', '发展潜力'], target: [90, 85, 80, 95], current: [88, 70, 85, 90] },
      基础要求: { labels: ['学历层级', '专业对口', '数学功底', '外语文献', '逻辑思维', '学术背景'], target: [90, 90, 85, 80, 85, 75], current: [95, 100, 85, 70, 90, 60] },
      职业技能: { labels: ['C/C++', 'PyTorch', '模型微调', '算法基础', '分布式', '系统架构'], target: [85, 90, 85, 85, 80, 80], current: [90, 65, 60, 80, 50, 70] },
      职业素养: { labels: ['抗压能力', '团队协作', '自驱力', '目标导向', '沟通表达', '稳定性'], target: [85, 80, 90, 85, 75, 80], current: [85, 85, 95, 90, 80, 85] },
      发展潜力: { labels: ['学习敏锐度', '技术视野', '创新能力', '跨界融合', '商业思维', '抗逆力'], target: [90, 85, 85, 70, 60, 75], current: [95, 90, 85, 80, 70, 80] },
    },
  },
  {
    tab: '岗位 2：后端架构开发',
    title: '后端架构开发',
    badge: '工程强项',
    score: 82,
    intro:
      '后端架构开发强调服务治理、系统设计与高并发场景下的稳定交付。岗位要求候选人既能做业务，又能理解中间件、数据库与可观测性体系。',
    dims: [
      { label: '基础要求', value: 90, text: 'text-indigo-600', track: 'bg-indigo-100/50', fill: 'from-indigo-400 to-indigo-500' },
      { label: '职业技能', value: 78, text: 'text-sky-600', track: 'bg-sky-100/50', fill: 'from-sky-400 to-sky-500' },
      { label: '职业素养', value: 82, text: 'text-emerald-600', track: 'bg-emerald-100/50', fill: 'from-emerald-400 to-emerald-500' },
      { label: '发展潜力', value: 84, text: 'text-amber-600', track: 'bg-amber-100/50', fill: 'from-amber-400 to-amber-500' },
    ],
    diag: {
      plus: '你在系统思维、编码质量和问题排查上有不错的底子，适合工程型岗位。',
      gap: '分布式中间件、数据库设计与线上稳定性治理仍是当前最关键的能力缺口。',
      tip: '补齐 Redis、MySQL、MQ 与接口幂等后，你在校招后端岗会更有竞争力。',
    },
    path: [
      { stage: '大二/大三', label: '后端实习', tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30', align: 'self-start' },
      { stage: '毕业 1-3年', label: '业务开发', tone: 'from-amber-400 to-orange-500 shadow-orange-500/30', align: 'self-end' },
      { stage: '3-5年', label: '架构工程师', tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30', align: 'self-start' },
      { stage: '未来', label: '技术负责人', tone: 'from-indigo-400 to-indigo-600 shadow-indigo-500/30', align: 'self-end' },
    ],
    short: {
      badge: '大二 / 大三',
      badgeClass: 'bg-indigo-100 text-indigo-600',
      title: '短期目标',
      titleClass: 'text-indigo-700',
      border: 'border-indigo-100',
      ring: 'focus:ring-indigo-400',
      opts: ['补齐 Java / Go 后端基础栈', '完成一个高并发项目后端', '准备后端暑期实习面试'],
      reason: '后端岗很看重真实项目，因此短期内最重要的是拿出能证明你理解缓存、数据库和接口设计的作品。',
    },
    long: {
      badge: '大四 / 毕业',
      badgeClass: 'bg-sky-100 text-sky-600',
      title: '长期目标',
      titleClass: 'text-sky-700',
      border: 'border-sky-100',
      ring: 'focus:ring-sky-400',
      opts: ['进入大厂核心业务线', '深入基础架构方向', '成长为业务技术骨干'],
      reason: '如果能把底层优化优势转化成“稳定、快、可扩展”的系统设计能力，这条路线会很稳。',
    },
    explain: [
      '后端架构开发比算法岗更强调业务复杂度处理能力。',
      '你在工程质量和系统理解速度上的优势，会让你在中后台基础岗位中更容易脱颖而出。',
      '建议把“会写代码”升级成“能设计系统、能排查故障、能保证上线稳定”。',
    ],
    suggest: ['形成完整后端项目作品', '系统学习数据库与中间件原理'],
    radar: {
      main: { labels: ['基础要求', '职业技能', '职业素养', '发展潜力'], target: [88, 82, 80, 84], current: [90, 78, 82, 84] },
      基础要求: { labels: ['学历层级', 'CS基础', '网络原理', '数据库', '工程规范', '问题定位'], target: [80, 85, 85, 85, 80, 78], current: [88, 90, 80, 72, 86, 78] },
      职业技能: { labels: ['Java/Go', '缓存中间件', '数据库设计', '系统设计', '性能优化', '微服务'], target: [80, 82, 85, 82, 78, 80], current: [72, 70, 74, 80, 82, 68] },
      职业素养: { labels: ['协作意识', '责任心', '沟通能力', '交付稳定性', '业务理解', '执行节奏'], target: [78, 82, 80, 84, 76, 78], current: [85, 84, 78, 82, 76, 80] },
      发展潜力: { labels: ['学习速度', '架构视野', '抽象能力', '抗压能力', 'Owner意识', '长期成长'], target: [82, 80, 82, 76, 78, 80], current: [88, 82, 84, 80, 82, 86] },
    },
  },
  {
    tab: '岗位 3：AI 产品经理',
    title: 'AI 产品经理',
    badge: '潜力可塑',
    score: 79,
    intro:
      'AI 产品经理需要把技术能力、用户场景与商业价值打通。岗位核心是理解模型能力边界，并把它落成用户真正需要的产品。',
    dims: [
      { label: '基础要求', value: 84, text: 'text-indigo-600', track: 'bg-indigo-100/50', fill: 'from-indigo-400 to-indigo-500' },
      { label: '职业技能', value: 74, text: 'text-sky-600', track: 'bg-sky-100/50', fill: 'from-sky-400 to-sky-500' },
      { label: '职业素养', value: 90, text: 'text-emerald-600', track: 'bg-emerald-100/50', fill: 'from-emerald-400 to-emerald-500' },
      { label: '发展潜力', value: 88, text: 'text-amber-600', track: 'bg-amber-100/50', fill: 'from-amber-400 to-amber-500' },
    ],
    diag: {
      plus: '你的结构化表达、自驱性和跨学科理解能力，比较适合做技术型产品。',
      gap: '当前主要不足在产品方法论、用户研究与业务量化能力，不能只靠技术背景切产品岗。',
      tip: '如果补齐竞品分析、需求文档和指标分析，你会成为“懂技术又能讲业务”的稀缺型选手。',
    },
    path: [
      { stage: '大二/大三', label: '产品实习', tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30', align: 'self-start' },
      { stage: '毕业 1-3年', label: '产品经理', tone: 'from-amber-400 to-orange-500 shadow-orange-500/30', align: 'self-end' },
      { stage: '3-5年', label: 'AI PM', tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30', align: 'self-start' },
      { stage: '未来', label: '产品负责人', tone: 'from-indigo-400 to-indigo-600 shadow-indigo-500/30', align: 'self-end' },
    ],
    short: {
      badge: '大二 / 大三',
      badgeClass: 'bg-indigo-100 text-indigo-600',
      title: '短期目标',
      titleClass: 'text-indigo-700',
      border: 'border-indigo-100',
      ring: 'focus:ring-indigo-400',
      opts: ['拆解 3 个 AI 产品形成分析报告', '尝试主导一个校园产品 MVP', '补齐用户研究与需求文档能力'],
      reason: 'AI 产品岗位特别依赖判断与表达，短期内最重要的是建立产品视角和场景感知。',
    },
    long: {
      badge: '大四 / 毕业',
      badgeClass: 'bg-sky-100 text-sky-600',
      title: '长期目标',
      titleClass: 'text-sky-700',
      border: 'border-sky-100',
      ring: 'focus:ring-sky-400',
      opts: ['进入 AI 团队担任产品经理', '主导垂类 AI 场景设计', '成为连接技术和业务的桥梁'],
      reason: '保持技术理解优势，同时提升业务表达和用户洞察，你会很适合这条产品路线。',
    },
    explain: [
      'AI 产品经理不是“不会技术的人转管理”，而是要真正理解技术能力边界。',
      '你的理工背景能帮助你更快理解模型能力、技术限制和研发协作语言。',
      '如果你更看重业务影响力和跨团队协作成就感，这条路径也值得认真考虑。',
    ],
    suggest: ['坚持做竞品分析与功能拆解', '训练 PRD、需求评审和业务指标分析能力'],
    radar: {
      main: { labels: ['基础要求', '职业技能', '职业素养', '发展潜力'], target: [82, 78, 88, 85], current: [84, 74, 90, 88] },
      基础要求: { labels: ['技术理解', '行业认知', '逻辑表达', '写作能力', '用户同理心', '信息整合'], target: [78, 76, 82, 78, 80, 78], current: [82, 72, 88, 80, 76, 84] },
      职业技能: { labels: ['PRD输出', '需求分析', '竞品拆解', '数据分析', '项目推进', 'AI理解'], target: [80, 82, 78, 76, 80, 80], current: [68, 74, 72, 66, 76, 88] },
      职业素养: { labels: ['沟通协作', '同理心', '推进力', '全局观', '责任感', '复盘能力'], target: [84, 82, 82, 80, 84, 80], current: [88, 84, 86, 90, 88, 86] },
      发展潜力: { labels: ['学习能力', '表达潜力', '技术迁移', '商业嗅觉', '领导倾向', '成长速度'], target: [82, 84, 78, 76, 74, 80], current: [90, 88, 84, 72, 80, 90] },
    },
  },
]

const jobIndex = ref(0)
const radarKey = ref('main')
const radarVisible = ref(true)
let timerId = null

const activeJob = computed(() => jobs[jobIndex.value])
const skillTags = computed(() => props.uploadResult?.parsed_skills?.slice(0, 8) || [])
const radarData = computed(() => activeJob.value.radar[radarKey.value] || activeJob.value.radar.main)
const radarTitle = computed(() => (radarKey.value === 'main' ? '核心维度匹配总览' : `${radarKey.value} 细分剖析`))

const center = 100
const radius = 62

function animateRadar(update) {
  radarVisible.value = false
  if (timerId) window.clearTimeout(timerId)
  timerId = window.setTimeout(() => {
    update()
    radarVisible.value = true
  }, 180)
}

function selectJob(index) {
  if (index === jobIndex.value) return
  animateRadar(() => {
    jobIndex.value = index
    radarKey.value = 'main'
  })
}

function openRadar(label) {
  if (radarKey.value !== 'main') return
  animateRadar(() => {
    radarKey.value = label
  })
}

function resetRadar() {
  if (radarKey.value === 'main') return
  animateRadar(() => {
    radarKey.value = 'main'
  })
}

function point(value, index, total) {
  const angle = index * ((Math.PI * 2) / total) - Math.PI / 2
  const distance = (value / 100) * radius
  return { x: center + distance * Math.cos(angle), y: center + distance * Math.sin(angle), angle }
}

function polygon(values) {
  return values
    .map((value, index) => {
      const p = point(value, index, values.length)
      return `${p.x},${p.y}`
    })
    .join(' ')
}

const levels = computed(() => [33.33, 66.66, 100].map((level) => polygon(Array.from({ length: radarData.value.labels.length }, () => level))))
const axes = computed(() => radarData.value.labels.map((_, index) => point(100, index, radarData.value.labels.length)))
const targetPolygon = computed(() => polygon(radarData.value.target))
const currentPolygon = computed(() => polygon(radarData.value.current))
const dots = computed(() => radarData.value.current.map((value, index) => point(value, index, radarData.value.current.length)))
const labels = computed(() =>
  radarData.value.labels.map((label, index) => {
    const angle = index * ((Math.PI * 2) / radarData.value.labels.length) - Math.PI / 2
    const x = center + (radius + 18) * Math.cos(angle)
    const y = center + (radius + 18) * Math.sin(angle)
    let anchor = 'middle'
    if (Math.abs(Math.cos(angle)) > 0.1) anchor = Math.cos(angle) > 0 ? 'start' : 'end'
    const dy = Math.sin(angle) > 0.5 ? 5 : Math.sin(angle) < -0.5 ? 0 : 3
    return { label, x, y: y + dy, anchor, clickable: radarKey.value === 'main' }
  }),
)

onBeforeUnmount(() => {
  if (timerId) window.clearTimeout(timerId)
})
</script>

<template>
  <div class="w-full max-w-[38rem] flex flex-col relative">
    <div class="mb-2 px-1.5 flex items-center justify-between gap-2">
      <h2 class="text-[14px] font-black text-slate-800 tracking-tight flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-2.25 2.25-1.41-1.41L12 7.66l4.66 4.66-1.41 1.41L13 11.5v5h-2z" />
        </svg>
        职业生涯报告
      </h2>

      <button
        type="button"
        class="px-2.5 py-1.5 bg-white/70 hover:bg-white text-slate-600 text-[9px] font-bold rounded-lg border border-white/80 shadow-sm transition-all"
        @click="emit('back')"
      >
        重新上传简历
      </button>
    </div>

    <div class="flex items-end pl-3 gap-1 z-10 relative -mb-px">
      <button
        v-for="(job, index) in jobs"
        :key="job.tab"
        type="button"
        class="folder-tab border border-b-0 font-bold transition-all"
        :class="index === jobIndex ? 'active px-3.5 py-1.5 bg-white/70 backdrop-blur-md rounded-t-[12px] border-white/90 text-[10px] text-indigo-600 shadow-[0_-4px_15px_rgba(79,70,229,0.06)]' : 'px-3 py-1.5 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-t-[10px] text-slate-500 border-white/40 shadow-sm text-[9px]'"
        @click="selectJob(index)"
      >
        {{ job.tab }}
      </button>
    </div>

    <div class="report-card glass-card rounded-[1.1rem] rounded-tl-none px-3 py-3.5 lg:px-4 lg:py-4 flex flex-col gap-4 border-white/90 shadow-2xl relative overflow-hidden pb-12">
      <div class="absolute top-[10%] right-[8%] opacity-[0.03] pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[180px] h-[180px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      </div>

      <div class="grid grid-cols-12 gap-3 relative z-10">
        <div class="col-span-12 lg:col-span-4 bg-white/60 backdrop-blur-xl rounded-[1rem] p-3.5 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-sky-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div class="flex items-start justify-between z-10 gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden p-0.5">
              <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" alt="头像" class="w-full h-full rounded-xl object-cover" />
            </div>
            <div class="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center gap-1 shadow-sm shadow-emerald-500/20">
              <div class="w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <span class="text-[8px] font-bold text-white tracking-wider">{{ activeJob.badge }}</span>
            </div>
          </div>

          <div class="mt-3.5 z-10">
            <h3 class="text-[13px] font-black text-slate-800 tracking-tight">{{ activeJob.title }}</h3>
            <p class="text-[8px] text-slate-500 font-bold mt-0.5 uppercase tracking-[0.16em]">Target Career</p>
          </div>

          <div class="mt-3.5 flex items-end gap-1.5 z-10">
            <span class="text-[32px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-sky-500 tracking-tighter drop-shadow-sm">
              {{ activeJob.score }}
            </span>
            <div class="flex flex-col pb-1">
              <span class="text-sm font-bold text-slate-400 leading-none">/100</span>
              <span class="text-[10px] font-bold text-indigo-500 mt-1">综合评估得分</span>
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-5 bg-white/40 backdrop-blur-sm rounded-[1rem] p-3.5 border border-white/60 shadow-sm flex flex-col justify-center">
          <h4 class="text-[11px] font-bold text-indigo-900 mb-2.5 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            岗位文字详细介绍
          </h4>
          <p class="text-[10px] text-slate-600 leading-relaxed text-justify">{{ activeJob.intro }}</p>
        </div>

        <div class="col-span-12 lg:col-span-3 bg-white/60 backdrop-blur-xl rounded-[1rem] p-3.5 border border-white/80 shadow-sm flex flex-col justify-between">
          <h4 class="text-[10px] font-bold text-slate-800 flex items-center gap-1.5 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            四大核心维度
          </h4>

          <div class="space-y-2.5 flex-1 flex flex-col justify-center">
            <div v-for="dimension in activeJob.dims" :key="dimension.label">
              <div class="flex justify-between text-[8px] font-bold mb-1">
                <span class="text-slate-600">{{ dimension.label }}</span>
                <span :class="dimension.text">{{ dimension.value }}%</span>
              </div>
              <div class="w-full h-1.5 rounded-full overflow-hidden shadow-inner" :class="dimension.track">
                <div class="h-full rounded-full bg-gradient-to-r" :class="dimension.fill" :style="{ width: `${dimension.value}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>

      <div class="relative z-10 flex flex-col">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3.5">
          <h3 class="text-[12px] font-black text-slate-800 flex items-center gap-1.5 transition-all">
            <div class="w-1 h-3.5 rounded-full" :class="radarKey === 'main' ? 'bg-rose-400' : 'bg-indigo-500'"></div>
            {{ radarTitle }}
          </h3>
          <span class="text-[8px] text-slate-400 font-bold bg-white/50 px-2 py-1 rounded-lg border border-white">
            点击雷达图顶点文字，可下钻查看该维度细分解析
          </span>
        </div>

        <div class="grid grid-cols-12 gap-4 relative">
          <div class="col-span-12 lg:col-span-6 bg-white/50 backdrop-blur-md rounded-[1rem] p-3.5 border border-white/80 shadow-sm flex flex-col items-center justify-center relative min-h-[190px]">
            <button
              v-if="radarKey !== 'main'"
              type="button"
              class="absolute top-2.5 left-2.5 px-2 py-1 bg-white border border-slate-200 rounded-lg text-[8px] font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-1 shadow-sm z-20"
              @click="resetRadar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回总览
            </button>

            <div class="relative w-[150px] h-[150px]">
              <svg viewBox="0 0 200 200" class="w-full h-full radar-transition" :style="{ opacity: radarVisible ? 1 : 0 }">
                <polygon v-for="(level, index) in levels" :key="`level-${index}`" :points="level" fill="none" stroke="#e2e8f0" stroke-width="1" />
                <line v-for="(axis, index) in axes" :key="`axis-${index}`" :x1="center" :y1="center" :x2="axis.x" :y2="axis.y" stroke="#cbd5e1" stroke-width="1" />
                <polygon :points="targetPolygon" fill="rgba(148, 163, 184, 0.15)" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3" />
                <polygon :points="currentPolygon" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" stroke-width="2.5" />
                <circle v-for="(dot, index) in dots" :key="`dot-${index}`" :cx="dot.x" :cy="dot.y" r="3.5" fill="#4f46e5" />
                <text
                  v-for="item in labels"
                  :key="item.label"
                  :x="item.x"
                  :y="item.y"
                  :text-anchor="item.anchor"
                  font-size="8.5"
                  fill="#475569"
                  font-weight="700"
                  class="transition-colors duration-300"
                  :class="item.clickable ? 'cursor-pointer hover:fill-indigo-600' : ''"
                  @click="openRadar(item.label)"
                >
                  {{ item.label }}
                </text>
              </svg>
            </div>

            <div class="flex flex-wrap justify-center gap-3 mt-3 text-[8px] font-bold text-slate-600 bg-white/60 px-2.5 py-1.5 rounded-full border border-white z-10">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 bg-indigo-500/40 border border-indigo-500 rounded-sm"></span>你的能力向量</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 bg-slate-300/30 border border-slate-400 border-dashed rounded-sm"></span>大厂录用基准</span>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <div class="bg-white/40 backdrop-blur-sm rounded-[1rem] p-3.5 border border-white/60 shadow-sm h-full flex flex-col">
              <h4 class="text-[11px] font-bold text-indigo-900 mb-3 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                能力匹配深度诊断
              </h4>

              <div class="space-y-3 text-[10px] leading-relaxed text-slate-600">
                <div class="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                  <p><span class="font-bold text-emerald-700">优势领域：</span>{{ activeJob.diag.plus }}</p>
                </div>
                <div class="p-2.5 bg-rose-50/50 rounded-lg border border-rose-100/50">
                  <p><span class="font-bold text-rose-600">关键缺口：</span>{{ activeJob.diag.gap }}</p>
                </div>
                <p class="pt-1"><span class="font-bold text-slate-700">提升归因：</span>{{ activeJob.diag.tip }}</p>

                <div v-if="skillTags.length" class="pt-2.5 border-t border-white/70 flex flex-wrap items-center gap-1.5">
                  <span class="text-[10px] font-bold text-slate-500">本次解析标签：</span>
                  <span
                    v-for="skill in skillTags"
                    :key="skill"
                    class="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold border border-indigo-100"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>

      <div class="grid grid-cols-12 gap-4 relative z-10">
        <div class="col-span-12 xl:col-span-7 flex flex-col gap-4">
          <div>
            <h3 class="text-[12px] font-black text-slate-800 mb-3 flex items-center gap-1.5">
              <div class="w-1 h-3.5 bg-indigo-500 rounded-full"></div>
              职业路径规划
            </h3>

            <div class="relative w-full h-[112px] flex items-center justify-between px-2">
              <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                <path d="M 12% 20% C 25% 20%, 25% 80%, 38% 80%" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8,8" />
                <path d="M 38% 80% C 50% 80%, 50% 20%, 63% 20%" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8,8" />
                <path d="M 63% 20% C 75% 20%, 75% 80%, 88% 80%" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8,8" />
              </svg>

              <div
                v-for="node in activeJob.path"
                :key="`${node.stage}-${node.label}`"
                class="relative z-10 flex flex-col items-center transform transition hover:scale-105 cursor-pointer"
                :class="node.align"
              >
                <div class="w-[46px] h-[46px] rounded-full bg-gradient-to-br shadow-lg flex flex-col items-center justify-center text-white border-2 border-white" :class="node.tone">
                  <span class="text-[6px] opacity-80 mb-0.5">{{ node.stage }}</span>
                  <span class="font-bold text-[7px]">{{ node.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-1 flex flex-col">
            <h3 class="text-[12px] font-black text-slate-800 mb-3 flex items-center gap-1.5">
              <div class="w-1 h-3.5 bg-sky-500 rounded-full"></div>
              分阶段行动计划
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
              <div class="bg-white/50 backdrop-blur-md rounded-[0.95rem] p-3.5 border border-white/80 shadow-sm flex flex-col">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold flex items-center gap-2" :class="activeJob.short.titleClass">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    {{ activeJob.short.title }}
                  </h4>
                  <span class="text-[8px] font-bold px-1.5 py-0.5 rounded-md" :class="activeJob.short.badgeClass">{{ activeJob.short.badge }}</span>
                </div>

                <select class="w-full mb-3 p-2 rounded-lg bg-white/70 text-slate-700 text-[10px] font-bold focus:outline-none focus:ring-2 appearance-none shadow-inner cursor-pointer" :class="[activeJob.short.border, activeJob.short.ring]">
                  <option v-for="option in activeJob.short.opts" :key="option">{{ option }}</option>
                </select>

                <div class="flex-1 bg-white/40 rounded-lg p-2.5 border border-white/60">
                  <p class="text-[11px] text-slate-500 leading-relaxed"><span class="font-bold text-slate-700">解释原因：</span>{{ activeJob.short.reason }}</p>
                </div>
              </div>

              <div class="bg-white/50 backdrop-blur-md rounded-[0.95rem] p-3.5 border border-white/80 shadow-sm flex flex-col">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold flex items-center gap-2" :class="activeJob.long.titleClass">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    {{ activeJob.long.title }}
                  </h4>
                  <span class="text-[8px] font-bold px-1.5 py-0.5 rounded-md" :class="activeJob.long.badgeClass">{{ activeJob.long.badge }}</span>
                </div>

                <select class="w-full mb-3 p-2 rounded-lg bg-white/70 text-slate-700 text-[10px] font-bold focus:outline-none focus:ring-2 appearance-none shadow-inner cursor-pointer" :class="[activeJob.long.border, activeJob.long.ring]">
                  <option v-for="option in activeJob.long.opts" :key="option">{{ option }}</option>
                </select>

                <div class="flex-1 bg-white/40 rounded-lg p-2.5 border border-white/60">
                  <p class="text-[11px] text-slate-500 leading-relaxed"><span class="font-bold text-slate-700">解释原因：</span>{{ activeJob.long.reason }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 xl:col-span-5 flex flex-col">
          <h3 class="text-[12px] font-black text-slate-800 mb-3 flex items-center gap-1.5">
            <div class="w-1 h-3.5 bg-amber-400 rounded-full"></div>
            规划文字解释
          </h3>

          <div class="flex-1 bg-white/50 backdrop-blur-md rounded-[1rem] p-4 border border-white/80 shadow-inner flex flex-col relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-4 right-4 w-14 h-14 text-indigo-100 opacity-50 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>

            <h4 class="text-[16px] font-bold text-indigo-900 mb-4 tracking-tight">AI 智能诊断与综合评估</h4>

            <div class="overflow-y-auto custom-scrollbar pr-2 text-[10px] leading-relaxed text-slate-600 space-y-3">
              <p v-for="paragraph in activeJob.explain" :key="paragraph">{{ paragraph }}</p>

              <div class="p-2.5 bg-indigo-50/50 rounded-lg border border-indigo-100/50 my-3">
                <p class="font-bold text-indigo-800 mb-2">核心建议：</p>
                <ul class="list-disc pl-3 space-y-1 text-indigo-700/80">
                  <li v-for="item in activeJob.suggest" :key="item">
                    <span class="text-slate-600">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-3 right-3 flex flex-wrap justify-end gap-2 z-20">
        <button class="px-3 py-1.5 bg-white/60 backdrop-blur-sm hover:bg-white text-slate-600 font-bold text-[9px] rounded-lg border border-white transition-all shadow-sm">
          加入我的收藏
        </button>
        <button class="px-3 py-1.5 bg-indigo-50/90 hover:bg-indigo-100 text-indigo-600 font-bold text-[9px] rounded-lg border border-indigo-100 transition-all shadow-sm">
          手动编辑
        </button>
        <button class="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-600 hover:to-sky-500 text-white font-bold text-[9px] rounded-lg shadow-lg shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          智能润色
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 40px -12px rgba(79, 70, 229, 0.15);
}

.folder-tab {
  position: relative;
  z-index: 1;
}

.folder-tab.active {
  z-index: 30;
  border-bottom-color: transparent;
}

.radar-transition {
  transition: opacity 0.4s ease-in-out;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(199, 210, 254, 0.8);
  border-radius: 10px;
}
</style>
