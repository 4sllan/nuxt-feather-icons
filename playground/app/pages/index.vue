<script setup lang="ts">
import { ref, computed } from 'vue'

// Importa todos os arquivos do build de icons (eager)
const modules = import.meta.glob('#build/feather-icons/*.js', { eager: true })

// Pega os nomes dos arquivos e os componentes default
const icons = Object.entries(modules).map(([path, mod]) => {
  const match = path.match(/\/([^/]+)\.js$/)
  const name = match ? match[1] : ''
  return {
    name,
    component: (mod as any).default
  }
}).filter(icon => icon.name)

const searchQuery = ref('')
const iconSize = ref(32)
const strokeWidth = ref(2)
const showToast = ref(false)
const copiedIconName = ref('')

const filteredIcons = computed(() => {
  if (!searchQuery.value) {return icons}
  const query = searchQuery.value.toLowerCase()
  return icons.filter(icon => icon.name.toLowerCase().includes(query))
})

const copyIconName = (name: string) => {
  navigator.clipboard.writeText(name)
  copiedIconName.value = name
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>

<template>
  <div class="container">
    <header class="header">
      <img src="https://raw.githubusercontent.com/4sllan/nuxt-feather-icons/refs/heads/main/.github/nuxt-feather-icons.svg" width="100"/>
      <h1 class="title">Nuxt Feather Icons</h1>
      <p class="subtitle">A beautiful collection of open-source icons</p>

      <div class="controls">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search icons..."
            class="search-input"
        />

        <div class="customization">
          <div class="control-group">
            <label>Size</label>
            <input
                v-model="iconSize"
                type="range"
                min="16"
                max="64"
                step="4"
                class="slider"
            />
            <span class="value">{{ iconSize }}px</span>
          </div>

          <div class="control-group">
            <label>Stroke</label>
            <input
                v-model="strokeWidth"
                type="range"
                min="1"
                max="4"
                step="0.5"
                class="slider"
            />
            <span class="value">{{ strokeWidth }}px</span>
          </div>
        </div>
      </div>
    </header>

    <div class="icons-grid">
      <div
          v-for="icon in filteredIcons"
          :key="icon.name"
          class="icon-card"
          @click="copyIconName(icon.name)"
      >
        <component
            :is="icon.component"
            :size="iconSize"
            :stroke-width="strokeWidth"
            class="icon"
        />
        <span class="icon-name">{{ icon.name }}</span>
      </div>
    </div>

    <div v-if="filteredIcons.length === 0" class="no-results">
      <p>Nenhum ícone encontrado</p>
    </div>

    <transition name="toast">
      <div v-if="showToast" class="toast">
        {{ copiedIconName }} copiado!
      </div>
    </transition>
  </div>
</template>
<style scoped>
.container {
  min-height: 100vh;
  padding: 3rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00DC82 0%, #36E4A8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 3rem;
  font-weight: 400;
}

.controls {
  max-width: 800px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  background: white;
}

.search-input:focus {
  border-color: #00DC82;
  box-shadow: 0 0 0 4px rgba(0, 220, 130, 0.1);
}

.customization {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  min-width: 80px;
}

.slider {
  width: 150px;
  height: 6px;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  background: linear-gradient(to right, #00DC82 0%, #36E4A8 100%);
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 3px solid #00DC82;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 3px solid #00DC82;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.3);
}

.value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #00DC82;
  min-width: 50px;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: white;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-card:hover {
  border-color: #00DC82;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 220, 130, 0.15);
}

.icon-card:hover .icon {
  color: #00DC82;
  transform: scale(1.1);
}

.icon {
  color: #475569;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.icon-name {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-align: center;
  word-break: break-word;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #94a3b8;
  gap: 1rem;
}

.no-results p {
  font-size: 1.125rem;
  font-weight: 500;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #00DC82;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 220, 130, 0.3);
  z-index: 1000;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(1rem);
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }

  .icon-card {
    padding: 1.5rem 0.75rem;
  }

  .customization {
    flex-direction: column;
    gap: 1.5rem;
  }

  .control-group {
    flex-direction: column;
    text-align: center;
  }
}
</style>
