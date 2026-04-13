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
  role: 'student',
  displayName: '',
  account: '',
  password: '',
  agree: false,
})

const passwordInput = ref(null)

const textInputClass =
  'w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm text-[11px] text-slate-900 transition-colors focus:bg-white focus:border-indigo-300 focus:ring-0 focus:outline-none focus:shadow-[0_0_0_3px_rgba(109,40,217,0.2)_inset]'

function togglePassword() {
  emit('update:password-visible', !props.passwordVisible)
  emit('focus-input', 'signupPassword')

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
    <div class="text-center mb-5">
      <h2 class="text-[18px] leading-tight font-bold text-slate-900 mb-1">Create an account</h2>
      <p class="text-[11px] text-slate-500">Join CareerCompass to find your next opportunity</p>
    </div>

    <form class="space-y-3" @submit.prevent="submit">
      <div>
        <label class="block text-[10px] font-medium text-slate-700 mb-1">I am a...</label>
        <div class="flex gap-4">
          <button
            type="button"
            class="flex-1 py-2 border rounded-xl text-[11px] font-medium transition-colors focus:outline-none"
            :class="
              form.role === 'student'
                ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            "
            @click="form.role = 'student'"
          >
            Student
          </button>

          <button
            type="button"
            class="flex-1 py-2 border rounded-xl text-[11px] font-medium transition-colors focus:outline-none"
            :class="
              form.role === 'institute'
                ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            "
            @click="form.role = 'institute'"
          >
            Institute
          </button>
        </div>
      </div>

      <div>
        <label class="block text-[10px] font-medium text-slate-700 mb-1">Full Name or Institute Name</label>
        <input
          v-model="form.displayName"
          type="text"
          :class="textInputClass"
          placeholder="John Doe or Tech University"
          @focus="emit('focus-input', 'signupName')"
          @blur="emit('blur-input', 'signupName')"
        />
      </div>

      <div>
        <label class="block text-[10px] font-medium text-slate-700 mb-1">Account</label>
        <input
          v-model="form.account"
          type="text"
          :class="textInputClass"
          placeholder="Enter your account"
          @focus="emit('focus-input', 'signupAccount')"
          @blur="emit('blur-input', 'signupAccount')"
        />
      </div>

      <div>
        <label class="block text-[10px] font-medium text-slate-700 mb-1">Password</label>
        <div class="relative">
          <input
            ref="passwordInput"
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            :class="textInputClass"
            placeholder="••••••••••••"
            @focus="emit('focus-input', 'signupPassword')"
            @blur="emit('blur-input', 'signupPassword')"
          />

          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 toggle-pwd outline-none"
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
              class="w-4 h-4"
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
              class="w-4 h-4"
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

      <div class="flex items-start text-[10px]">
        <div class="flex items-center h-5">
          <input
            v-model="form.agree"
            type="checkbox"
            class="w-3 h-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
          />
        </div>

        <label class="ml-2 text-slate-600 leading-tight">
          I agree to the
          <a href="/" class="text-indigo-600 hover:underline" @click.prevent>Privacy Policy</a>
          and
          <a href="/" class="text-indigo-600 hover:underline" @click.prevent>Terms of Service</a>
        </label>
      </div>

      <button
        class="w-full py-2 px-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-[12px] font-semibold hover:bg-slate-50 transition-colors shadow-sm mt-1"
      >
        Create Account
      </button>
    </form>

    <p class="text-center text-[11px] text-slate-500 mt-3">
      Already have an account?
      <button
        type="button"
        class="font-semibold text-slate-900 hover:underline cursor-pointer"
        @click="emit('switch-panel', 'login')"
      >
        Sign in
      </button>
    </p>
  </div>
</template>
