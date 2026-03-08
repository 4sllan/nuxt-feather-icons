<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useRuntimeConfig } from '#imports'

const props = defineProps<{ name: string }>()

const config = useRuntimeConfig()
const prefix = (config.public.featherIcons as { prefix?: string })?.prefix || ''

// Converte "home-icon" ou "home" em "HomeIcon"
const componentName = computed(() => {
  const cleanName = props.name.replace(/icon$/i, '').replace(/-$/, '')
  const pascal = cleanName
      .split('-')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join('')
  return `${prefix}${pascal}Icon`
})

// Async component seguro e tipado
const IconComponent = computed(() => {
  return defineAsyncComponent({
    loader: () => import(`#build/feather-icons/${componentName.value}.js`),
    timeout: 3000,
    loadingComponent: { render: () => h('span', '...') }, // Opcional
    errorComponent: { render: () => h('span', 'Icon not found') } // Opcional
  })
})
</script>

<template>
  <IconComponent
      v-bind="$attrs"
      :key="props.name + ($attrs.class ?? '') + ($attrs.size ?? '')"
  />
</template>