<script setup>
defineProps({
  pupilTransform: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="relative z-10 w-[260px] h-[260px]" aria-hidden="true">
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-2xl">
      <g class="char-purple">
        <path d="M 100 50 L 250 50 L 220 300 L 70 300 Z" fill="#6d28d9" />
        <g class="eyes">
          <circle cx="140" cy="100" r="12" fill="white" />
          <circle cx="190" cy="100" r="12" fill="white" />
          <circle cx="140" cy="100" r="5" fill="#0f172a" class="pupil" :style="{ transform: pupilTransform }" />
          <circle cx="190" cy="100" r="5" fill="#0f172a" class="pupil" :style="{ transform: pupilTransform }" />
        </g>
      </g>

      <g class="char-black">
        <rect x="200" y="150" width="80" height="250" rx="10" fill="#1e293b" />
        <g class="eyes">
          <circle cx="225" cy="180" r="8" fill="white" />
          <circle cx="255" cy="180" r="8" fill="white" />
          <circle cx="225" cy="180" r="3" fill="black" class="pupil" :style="{ transform: pupilTransform }" />
          <circle cx="255" cy="180" r="3" fill="black" class="pupil" :style="{ transform: pupilTransform }" />
        </g>
      </g>

      <g class="char-yellow">
        <path d="M 250 400 L 250 250 Q 250 200 300 200 Q 350 200 350 250 L 350 400 Z" fill="#fde047" />
        <g class="eyes">
          <circle cx="285" cy="230" r="5" fill="#1e293b" class="pupil" :style="{ transform: pupilTransform }" />
          <circle cx="315" cy="230" r="5" fill="#1e293b" class="pupil" :style="{ transform: pupilTransform }" />
        </g>
        <path d="M 275 255 L 325 255" stroke="#1e293b" stroke-width="4" stroke-linecap="round" />
      </g>

      <g class="char-orange">
        <path d="M 50 400 L 50 300 Q 50 200 150 200 Q 250 200 250 300 L 250 400 Z" fill="#fb923c" />
        <g class="eyes">
          <circle cx="120" cy="270" r="6" fill="#1e293b" class="pupil" :style="{ transform: pupilTransform }" />
          <circle cx="180" cy="270" r="6" fill="#1e293b" class="pupil" :style="{ transform: pupilTransform }" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pupil {
  transition: none;
}

:global(.pwd-shown) .pupil {
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

:global(.pwd-shown) .char-purple,
:global(.pwd-shown) .char-black {
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
