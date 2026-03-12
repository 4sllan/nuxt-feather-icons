<script setup lang="ts">
import { ref, computed } from 'vue'
// Importa todos os ícones mapeados no alias
import * as allIcons from '#feather-icons-map'

/**
 * Transformamos o objeto importado em uma lista tratada.
 * Como o import * traz componentes nomeados (ex: IconUser, IconHome),
 * podemos formatar o nome para exibição.
 */
const icons = Object.entries(allIcons).map(([key, component]) => {
  return {
    id: key,
    // Remove o prefixo "Icon" (se houver) para uma busca mais natural
    name: key.replace(/^Icon/, ''),
    component: component
  }
})

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

const copyIconName = async (name: string) => {
  // Formata como o usuário provavelmente usaria no código: <IconName />
  const componentTag = `<${name} />`
  try {
    await navigator.clipboard.writeText(componentTag)
    copiedIconName.value = componentTag
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 2000)
  } catch {
    showToast.value = false
  }
}

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="controls">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search icons..."
            class="search-input"
            :class="{'dark': isDark}"
        />

        <div class="customization">
          <div class="control-group" :class="{'dark': isDark}">
            <label for="icon-size">Size</label>
            <input
                id="icon-size"
                v-model="iconSize"
                type="range"
                min="16"
                max="64"
                step="4"
                class="slider"
            />
            <span class="value">{{ iconSize }}px</span>
          </div>

          <div class="control-group" :class="{'dark': isDark}">
            <label for="icon-stroke-width">Stroke</label>
            <input
                id="icon-stroke-width"
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
          :class="{'dark': isDark}"
          role="button"
          tabindex="0"
          @click="copyIconName(icon.name)"
      >
        <component
            :is="icon.component"
            :size="iconSize"
            :stroke-width="strokeWidth"
            class="icon"
            :class="{'dark': isDark}"
        />
        <span class="icon-name" :class="{'dark': isDark}">{{ icon.name }}</span>
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

.search-input.dark{
  border: 2px solid #2d2e32;
  background: #1e1f22;
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

.control-group.dark label{
  color: white;
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

.icon-card.dark{
  background: #1e1f22;
  border: 2px solid #2d2e32;
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

.icon.dark{
  color: #a4b7cf;
}

.icon-name {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-align: center;
  word-break: break-word;
}

.icon-name.dark{
  color: #a4b7cf;
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
