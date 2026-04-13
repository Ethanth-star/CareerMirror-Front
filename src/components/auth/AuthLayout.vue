<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { normalizeHomePathByRole, useUserStore } from '../../stores/user'
import LoginForm from './LoginForm.vue'
import SignupForm from './SignupForm.vue'
import SvgCharacters from './SvgCharacters.vue'

const activePanel = ref('login')
const activeInputKey = ref(null)

const passwordVisible = reactive({
  login: false,
  signup: false,
})

const mouse = reactive({
  x: 0.5,
  y: 0.5,
})

const router = useRouter()
const userStore = useUserStore()

const loginLoading = ref(false)
const loginErrorMessage = ref('')

const focusState = computed(() => {
  const currentPanelPasswordShown =
    activePanel.value === 'login' ? passwordVisible.login : passwordVisible.signup

  if (currentPanelPasswordShown) {
    return 'pwd-shown'
  }

  if (activeInputKey.value === `${activePanel.value}Password`) {
    return 'peeking'
  }

  if (
    activeInputKey.value === `${activePanel.value}Account` ||
    activeInputKey.value === `${activePanel.value}Name`
  ) {
    return 'peek-up'
  }

  return 'idle'
})

const pupilTransform = computed(() => {
  if (focusState.value === 'pwd-shown') {
    return 'translate(-6px, -7px)'
  }

  const moveX = (mouse.x - 0.5) * 10
  const moveY = (mouse.y - 0.5) * 10

  return `translate(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px)`
})

function switchPanel(panel) {
  activePanel.value = panel
  activeInputKey.value = null
  loginErrorMessage.value = ''
}

function handleFocusInput(key) {
  activeInputKey.value = key
  loginErrorMessage.value = ''
}

function handleBlurInput(key) {
  if (activeInputKey.value === key) {
    activeInputKey.value = null
  }
}

function setPasswordVisible(panel, visible) {
  passwordVisible[panel] = visible
}

function handleMouseMove(event) {
  mouse.x = window.innerWidth ? event.clientX / window.innerWidth : 0.5
  mouse.y = window.innerHeight ? event.clientY / window.innerHeight : 0.5
}

async function handleLoginSubmit(payload) {
  loginLoading.value = true
  loginErrorMessage.value = ''

  try {
    const loginData = await userStore.loginAction(payload)
    await router.push(normalizeHomePathByRole(loginData.role))
  } catch (error) {
    loginErrorMessage.value =
      error instanceof Error ? error.message : '账号或密码错误，请检查后重试'
  } finally {
    loginLoading.value = false
  }
}

function handleSignupSubmit(payload) {
  console.log('signup form submitted', payload)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <main class="flex h-screen bg-white text-slate-800 font-sans w-full overflow-hidden">
    <section class="hidden md:flex w-1/2 bg-[#e0f2fe] items-center justify-center relative overflow-hidden">
      <div class="absolute top-8 left-8 flex items-center gap-2 z-20 cursor-default select-none">
        <svg
          viewBox="0 0 40 40"
          class="w-6 h-6 drop-shadow-md text-slate-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            width="40"
            height="40"
            rx="10"
            fill="currentColor"
            fill-opacity="0.1"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-opacity="0.8"
          />
          <path d="M20 8L22.5 17.5L32 20L22.5 22.5L20 32L17.5 22.5L8 20L17.5 17.5L20 8Z" fill="currentColor" />
          <circle cx="20" cy="20" r="2.5" fill="currentColor" />
        </svg>

        <div
          class="text-[16px] font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-600 drop-shadow-sm"
        >
          职镜天枢
        </div>
      </div>

      <SvgCharacters :focus-state="focusState" :pupil-transform="pupilTransform" />
    </section>

    <section class="w-full md:w-1/2 flex flex-col px-6 py-5 overflow-hidden">
      <div class="flex-1 w-full flex flex-col justify-center items-center">
        <div class="w-full max-w-[18.5rem] relative">
          <LoginForm
            v-if="activePanel === 'login'"
            class="fade-enter"
            :error-message="loginErrorMessage"
            :loading="loginLoading"
            :password-visible="passwordVisible.login"
            @focus-input="handleFocusInput"
            @blur-input="handleBlurInput"
            @update:password-visible="setPasswordVisible('login', $event)"
            @switch-panel="switchPanel"
            @submit="handleLoginSubmit"
          />

          <SignupForm
            v-else
            class="fade-enter"
            :password-visible="passwordVisible.signup"
            @focus-input="handleFocusInput"
            @blur-input="handleBlurInput"
            @update:password-visible="setPasswordVisible('signup', $event)"
            @switch-panel="switchPanel"
            @submit="handleSignupSubmit"
          />
        </div>
      </div>

      <footer class="w-full mt-5 flex justify-center items-center gap-2.5 text-[10px] select-none opacity-90 pb-1.5">
        <div class="flex items-center gap-2">
          <img src="/mingshan-logo.svg" alt="明衫科技 Logo" class="h-3.5 mix-blend-multiply" />
          <span class="font-bold text-slate-800 tracking-[0.08em] text-[11px]">明衫科技</span>
        </div>

        <div class="w-[1px] h-3 bg-slate-300 rounded-full"></div>

        <div class="flex items-center gap-2">
          <svg
            viewBox="0 0 40 40"
            class="w-[14px] h-[14px] text-slate-800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              width="40"
              height="40"
              rx="10"
              fill="currentColor"
              fill-opacity="0.1"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path d="M20 8L22.5 17.5L32 20L22.5 22.5L20 32L17.5 22.5L8 20L17.5 17.5L20 8Z" fill="currentColor" />
            <circle cx="20" cy="20" r="2.5" fill="currentColor" />
          </svg>
          <span class="font-bold text-slate-800 tracking-[0.08em] text-[11px]">职镜天枢</span>
        </div>
      </footer>
    </section>
  </main>
</template>
