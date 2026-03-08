<script setup lang="ts">
interface ComponentProps {
  starCount?: number
  color?: string
  size?: { min: number, max: number } | number
}

interface Star {
  x: number
  y: number
  size: number
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
      starCount: 300,
      color: 'var(--ui-primary)',
      size: () => ({
        min: 1,
        max: 2
      })
    }
)

// Unique SVG id per component instance (SSR safe)
const svgId = `stars-${useId()}`

// Generate random star positions and sizes
const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, () => ({
    x: Math.floor(Math.random() * 2000),
    y: Math.floor(Math.random() * 2000),
    size: typeof props.size === 'number'
        ? props.size
        : Math.random() * (props.size.max - props.size.min) + props.size.min
  }))
}

// Define speed configurations
const speedMap = {
  slow: { duration: 200, opacity: 0.5, ratio: 0.3 },
  normal: { duration: 150, opacity: 0.75, ratio: 0.3 },
  fast: { duration: 100, opacity: 1, ratio: 0.4 }
}

// Stars state
const stars = ref({
  slow: [] as Star[],
  normal: [] as Star[],
  fast: [] as Star[]
})

// Generate stars only on client to avoid SSR mismatch
onMounted(() => {
  stars.value = {
    slow: generateStars(Math.floor(props.starCount * speedMap.slow.ratio)),
    normal: generateStars(Math.floor(props.starCount * speedMap.normal.ratio)),
    fast: generateStars(Math.floor(props.starCount * speedMap.fast.ratio))
  }
})

// Compute layers
const starLayers = computed(() => [
  { stars: stars.value.fast, ...speedMap.fast },
  { stars: stars.value.normal, ...speedMap.normal },
  { stars: stars.value.slow, ...speedMap.slow }
])
</script>

<template>
  <div class="absolute pointer-events-none z-[-1] inset-y-0 inset-x-5 sm:inset-x-7 lg:inset-x-9 overflow-hidden">

    <svg
        class="absolute inset-0 pointer-events-none"
        viewBox="0 0 1017 181"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <mask
            :id="`${svgId}-mask`"
            fill="white"
        >
          <path d="M0 0H1017V181H0V0Z" />
        </mask>

        <path
            d="M0 0H1017V181H0V0Z"
            :fill="`url(#${svgId}-radial)`"
            fill-opacity="0.22"
        />
      </g>

      <defs>
        <radialGradient
            :id="`${svgId}-radial`"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(508.999 19.5) rotate(90.177) scale(161.501 509.002)"
        >
          <stop stop-color="var(--ui-primary)" />
          <stop
              offset="1"
              stop-color="var(--ui-primary)"
              stop-opacity="0"
          />
        </radialGradient>

        <linearGradient
            :id="`${svgId}-linear`"
            x1="10.9784"
            y1="91"
            x2="1017"
            y2="90.502"
            gradientUnits="userSpaceOnUse"
        >
          <stop
              stop-color="var(--ui-primary)"
              stop-opacity="0"
          />
          <stop
              offset="0.395"
              stop-color="var(--ui-primary)"
          />
          <stop
              offset="1"
              stop-color="var(--ui-primary)"
              stop-opacity="0"
          />
        </linearGradient>
      </defs>
    </svg>

    <div class="stars size-full absolute inset-x-0 top-0">
      <div
          v-for="(layer, index) in starLayers"
          :key="index"
          class="star-layer"
          :style="{
          '--star-duration': `${layer.duration}s`,
          '--star-opacity': layer.opacity,
          '--star-color': props.color
        }"
      >
        <div
            v-for="(star, starIndex) in layer.stars"
            :key="starIndex"
            class="star absolute rounded-full"
            :style="{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'var(--star-color)',
            opacity: 'var(--star-opacity)'
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stars {
  left: 50%;
  transform: translate(-50%);

  -webkit-mask-image: linear-gradient(
      180deg,
      rgba(217, 217, 217, 0) 0%,
      rgba(217, 217, 217, 0.8) 25%,
      #d9d9d9 50%,
      rgba(217, 217, 217, 0.8) 75%,
      rgba(217, 217, 217, 0) 100%
  );

  mask-image: linear-gradient(
      180deg,
      rgba(217, 217, 217, 0) 0%,
      rgba(217, 217, 217, 0.8) 25%,
      #d9d9d9 50%,
      rgba(217, 217, 217, 0.8) 75%,
      rgba(217, 217, 217, 0) 100%
  );

  -webkit-mask-size: cover;
  mask-size: cover;
}

.star-layer {
  animation: risingStarsAnimation linear infinite;
  animation-duration: var(--star-duration);
  will-change: transform;
}

.star {
  position: absolute;
  border-radius: 50%;
}

@keyframes risingStarsAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2000px);
  }
}
</style>