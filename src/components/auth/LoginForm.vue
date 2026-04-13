<script setup>
import { nextTick, reactive, ref } from 'vue'

const props = defineProps({
  passwordVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'focus-input',
  'blur-input',
  'update:password-visible',
  'switch-panel',
  'submit',
])

const form = reactive({
  account: '',
  password: '',
  remember: false,
})

const passwordInput = ref(null)

const textInputClass =
  'w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm text-[13px] text-slate-900 transition-colors focus:bg-white focus:border-indigo-300 focus:ring-0 focus:outline-none focus:shadow-[0_0_0_3px_rgba(109,40,217,0.2)_inset]'

function togglePassword() {
  emit('update:password-visible', !props.passwordVisible)
  emit('focus-input', 'loginPassword')

  nextTick(() => {
    passwordInput.value?.focus()
  })
}

function submit() {
  emit('submit', { ...form })
}
</script>

<template>
  <div class="fade-enter block">
    <div class="text-center mb-7">
      <h2 class="text-[22px] leading-tight font-bold text-slate-900 mb-1.5">Welcome back!</h2>
      <p class="text-[13px] text-slate-500">Please enter your details</p>
    </div>

    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <label class="block text-[12px] font-medium text-slate-700 mb-1">Account</label>
        <input
          v-model="form.account"
          type="text"
          :class="textInputClass"
          placeholder="Enter your account"
          @focus="emit('focus-input', 'loginAccount')"
          @blur="emit('blur-input', 'loginAccount')"
        />
      </div>

      <div>
        <label class="block text-[12px] font-medium text-slate-700 mb-1">Password</label>
        <div class="relative">
          <input
            ref="passwordInput"
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            :class="textInputClass"
            placeholder="••••••••••••"
            @focus="emit('focus-input', 'loginPassword')"
            @blur="emit('blur-input', 'loginPassword')"
          />

          <button
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 toggle-pwd outline-none"
            :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
            @mousedown.prevent
            @click="togglePassword"
          >
            <svg
              v-if="passwordVisible"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between text-[12px]">
        <label class="flex items-center text-slate-600 cursor-pointer">
          <input
            v-model="form.remember"
            type="checkbox"
            class="mr-2 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
          />
          Remember for 30 days
        </label>

        <a href="/" class="text-indigo-600 hover:text-indigo-700 font-medium" @click.prevent>
          Forgot password?
        </a>
      </div>

      <button
        class="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-900 rounded-xl text-[14px] font-semibold hover:bg-slate-50 transition-colors shadow-sm"
      >
        Log in
      </button>
    </form>

    <p class="text-center text-[13px] text-slate-500 mt-6">
      Don't have an account?
      <button
        type="button"
        class="font-semibold text-slate-900 hover:underline cursor-pointer"
        @click="emit('switch-panel', 'signup')"
      >
        Sign Up
      </button>
    </p>
  </div>
</template>
