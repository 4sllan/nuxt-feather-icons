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
const isDark = computed(() => !colorMode.unknown && colorMode.value === 'dark')
</script>

<template>
  <div class="container" :class="{'dark': isDark}">
    <header class="header">
      <div class="controls">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search icons..."
            class="search-input"
        />

        <div class="customization">
          <div class="control-group">
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

          <div class="control-group">
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
          role="button"
          tabindex="0"
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
/* 1. Definição das Variáveis de Tema */
.container {
  --bg-page: transparent;
  --bg-card: #ffffff;
  --border-color: #e2e8f0;
  --text-main: #475569;
  --text-muted: #64748b;
  --input-focus: #00DC82;

  min-height: 100vh;
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-page);
  color: var(--text-main);
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* 2. Sobrescrita para o Dark Mode */
.container.dark {
  --bg-page: transparent;
  --bg-card: #1e1f22;
  --border-color: #313339;
  --text-main: #8c8d8f;
  --text-muted: #a7a8aa;
}

/* 3. Estilos usando as variáveis */
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
  border: 2px solid var(--border-color);
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  background: var(--bg-card);
  color: var(--text-main);
}

.search-input:focus {
  border-color: var(--input-focus);
  box-shadow: 0 0 0 4px rgba(0, 220, 130, 0.1);
}

.customization {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
  min-width: 60px;
}

.slider {
  width: 120px;
  height: 6px;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  background: var(--border-color);
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--input-focus);
  border: 2px solid white;
  cursor: pointer;
}

.value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--input-focus);
  min-width: 45px;
}

.theme-toggle {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-main);
  cursor: pointer;
  font-weight: 600;
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
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.icon-card:hover {
  border-color: var(--input-focus);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 220, 130, 0.1);
}

.icon {
  color: var(--text-main);
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
}

.icon-card:hover .icon {
  color: var(--input-focus);
  transform: scale(1.1);
}

.icon-name {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
  text-align: center;
  word-break: break-all;
}

.no-results {
  text-align: center;
  padding: 4rem;
  color: var(--text-muted);
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--input-focus);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 220, 130, 0.3);
  z-index: 1000;
}

/* Transições do Toast */
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(1rem); }

@media (max-width: 768px) {
  .icons-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
  .customization { flex-direction: column; }
}
</style>
