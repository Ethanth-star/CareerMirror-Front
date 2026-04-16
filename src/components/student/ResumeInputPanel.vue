<script setup>
import { computed, ref } from 'vue'
import { uploadResumeAPI } from '../../api/input'

const activeTab = ref('pdf')
const needExtraTest = ref(true)
const isRecording = ref(false)
const isUploading = ref(false)
const isDragging = ref(false)
const textContent = ref('')
const selectedFile = ref(null)
const fileInput = ref(null)
const uploadError = ref('')
const uploadSuccess = ref('')
const uploadResult = ref(null)

const parseButtonText = computed(() => {
  if (isUploading.value) {
    return '解析中...'
  }

  return '开始智能解析'
})

function switchTab(tab) {
  activeTab.value = tab
  uploadError.value = ''
  uploadSuccess.value = ''
}

function openFileDialog() {
  if (activeTab.value !== 'pdf' || isUploading.value) {
    return
  }

  fileInput.value?.click()
}

function handleFileChange(event) {
  const file = event.target.files?.[0] || null
  selectedFile.value = file
  uploadError.value = ''
}

function handleDrop(event) {
  event.preventDefault()
  isDragging.value = false

  const file = event.dataTransfer?.files?.[0] || null
  if (file) {
    selectedFile.value = file
    uploadError.value = ''
  }
}

function handleDragOver(event) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function toggleRecording() {
  isRecording.value = !isRecording.value
}

async function submitResume() {
  uploadError.value = ''
  uploadSuccess.value = ''

  if (activeTab.value === 'pdf' && !selectedFile.value) {
    uploadError.value = '请先选择一份 PDF 或 DOCX 简历文件。'
    return
  }

  if (activeTab.value === 'text' && !textContent.value.trim()) {
    uploadError.value = '请输入简历文本内容后再开始解析。'
    return
  }

  isUploading.value = true

  try {
    const response = await uploadResumeAPI({
      input_type: activeTab.value === 'pdf' ? 'pdf' : 'text',
      file: activeTab.value === 'pdf' ? selectedFile.value : undefined,
      text_content: activeTab.value === 'text' ? textContent.value.trim() : undefined,
      need_extra_test: needExtraTest.value,
    })

    uploadResult.value = response.data
    uploadSuccess.value = response.msg || '简历解析成功'
  } catch (error) {
    uploadError.value = error instanceof Error ? error.message : '简历解析失败，请稍后重试'
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-[28rem] glass-card rounded-[1.25rem] p-4 relative overflow-hidden">
    <div
      class="absolute -top-20 -right-20 w-40 h-40 bg-indigo-300/20 rounded-full blur-[40px] pointer-events-none"
    ></div>

    <div class="mb-4 text-center relative z-10">
      <h2 class="text-[16px] font-black text-slate-800 tracking-tight">上传您的简历档案</h2>
      <p class="text-[10px] text-slate-500 font-medium mt-1">
        AI 将为您提取核心技能，并匹配最佳职业发展路径
      </p>
    </div>

    <div class="flex justify-center mb-4 relative z-10">
      <div class="inline-flex bg-white/40 backdrop-blur-sm p-1 rounded-[12px] border border-white/60 shadow-inner">
        <button
          class="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold transition-all rounded-[9px]"
          :class="
            activeTab === 'pdf'
              ? 'bg-white shadow-sm border border-slate-100 text-indigo-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'
          "
          @click="switchTab('pdf')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          上传 PDF
        </button>

        <button
          class="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold transition-all rounded-[9px]"
          :class="
            activeTab === 'text'
              ? 'bg-white shadow-sm border border-slate-100 text-indigo-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'
          "
          @click="switchTab('text')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          文本 / 语音录入
        </button>
      </div>
    </div>

    <div
      v-if="activeTab === 'pdf'"
      class="upload-zone border-2 border-dashed rounded-[1rem] transition-all cursor-pointer flex flex-col items-center justify-center py-8 px-3.5 mb-4 relative z-10"
      :class="
        isDragging
          ? 'border-indigo-500 bg-white/85'
          : 'border-indigo-200/60 bg-white/30 hover:bg-white/80 hover:border-indigo-500'
      "
      @click="openFileDialog"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".pdf,.doc,.docx"
        class="hidden"
        @change="handleFileChange"
      />

      <div
        class="w-9 h-9 bg-white rounded-[12px] shadow-sm border border-slate-100 flex items-center justify-center text-indigo-500 mb-2.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>

      <h3 class="text-[13px] font-bold text-slate-700 mb-1">
        {{ selectedFile ? '文件已选择，点击可重新选择' : '点击此处或将文件拖拽至此' }}
      </h3>
      <p class="text-[10px] text-slate-400 font-medium text-center">
        {{
          selectedFile
            ? `当前文件：${selectedFile.name}`
            : '支持 PDF, DOCX 格式，文件最大不超过 10MB'
        }}
      </p>
    </div>

    <div v-else class="relative w-full mb-4 group z-10">
      <textarea
        v-model="textContent"
        class="w-full h-32 bg-white/40 backdrop-blur-md border-2 border-white/60 hover:border-indigo-200 focus:border-indigo-400 rounded-[1rem] p-3 pr-12 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 resize-none transition-all shadow-inner text-[10px] leading-relaxed custom-scrollbar"
        placeholder="在此粘贴您的个人经历、项目详情或过往履历...&#10;&#10;或者点击右下方麦克风，直接告诉我你的技术栈和项目经验。"
      ></textarea>

      <button
        class="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transform transition-all"
        :class="
          isRecording
            ? 'bg-rose-500 shadow-rose-500/40 scale-110'
            : 'bg-gradient-to-br from-indigo-500 to-sky-400 shadow-indigo-500/30 hover:scale-105 active:scale-95'
        "
        title="点击开始语音输入"
        @click="toggleRecording"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
        <span
          v-if="isRecording"
          class="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping"
        ></span>
      </button>
    </div>

    <div v-if="uploadError" class="mb-3 rounded-[0.9rem] border border-rose-200 bg-rose-50/80 px-3 py-2 text-[10px] text-rose-500">
      {{ uploadError }}
    </div>

    <div
      v-if="uploadResult"
      class="mb-4 rounded-[1rem] border border-emerald-100 bg-white/60 px-3 py-2.5 relative z-10"
    >
      <p class="text-sm font-bold text-emerald-600">{{ uploadSuccess || '简历解析成功' }}</p>
      <p class="mt-2 text-xs font-medium text-slate-500">简历编号：{{ uploadResult.resume_id }}</p>
      <div class="mt-2.5 flex flex-wrap gap-1">
        <span
          v-for="skill in uploadResult.parsed_skills"
          :key="skill"
          class="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-bold border border-indigo-100"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between pt-2.5 border-t border-slate-200/50 relative z-10">
      <label class="flex items-center gap-2 cursor-pointer group">
        <div class="relative flex items-center justify-center">
          <input v-model="needExtraTest" type="checkbox" class="peer sr-only" />
          <div
            class="w-3.5 h-3.5 bg-white border-2 border-slate-300 rounded transition-all shadow-sm peer-checked:bg-indigo-500 peer-checked:border-indigo-500"
          ></div>
          <svg
            class="absolute w-2 h-2 text-white opacity-0 peer-checked:opacity-100 transition-all"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span class="text-[10px] font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">
          解析后生成专属测评题 (强烈建议)
        </span>
      </label>

      <button
        class="px-4 py-2 text-[11px] text-white font-bold rounded-[9px] shadow-lg transform transition-all flex items-center gap-1"
        :class="
          isUploading
            ? 'bg-slate-400 cursor-not-allowed shadow-slate-300/20'
            : 'bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 shadow-indigo-500/30 hover:-translate-y-0.5'
        "
        :disabled="isUploading"
        @click="submitResume"
      >
        {{ parseButtonText }}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 24px -4px rgba(79, 70, 229, 0.1);
}

.upload-zone:hover {
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.8);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(199, 210, 254, 0.8);
  border-radius: 10px;
}
</style>
