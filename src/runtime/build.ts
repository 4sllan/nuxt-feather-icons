import feather from 'feather-icons'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { createResolver } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'

type ModuleIconsNames = {
    componentName: string
    componentPascalName: string
}

type FeatherAttrs = {
    [key: string]: string | number
}

let cache: ModuleIconsNames[] | null = null

function pascalCase(str: string) {
    return str.replace(/(^\w|-\w)/g, s => s.replace('-', '').toUpperCase())
}

// O template agora consome o useRuntimeConfig()
const templateComponent = (attrs: FeatherAttrs, innerHTML: string, componentName: string, name: string) => `
import { h, computed } from 'vue'
import { useRuntimeConfig } from '#imports'

export default {
  name: '${componentName}',
  props: {
    size: {
      type: [String, Number],
      default: null 
    },
    strokeWidth: {
      type: [String, Number],
      default: null
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const config = useRuntimeConfig().public.featherIcons || {}

    const size = computed(() => {
      const s = props.size ?? config.size ?? 24
      // Verifica se é uma string no formato '1x', '1.5x', etc.
      if (typeof s === 'string' && /^\\d+(\\.\\d+)?x$/.test(s)) {
        return s.slice(0, -1) + 'em'
      }
      // Se for número, adiciona px. Se for string (já com unidade), mantém.
      return typeof s === 'number' ? s + 'px' : s
    })

    const strokeWidth  = computed(() => props.strokeWidth ?? config.strokeWidth ?? 2)
    
    const classes = computed(() => {
      return [
        'feather', 
        'feather-${name || ""}', 
        config.class, 
        props.class
      ].filter(Boolean).join(' ').trim()
    })

    return () => h('svg', {
      ...${JSON.stringify(attrs)},
      width: size.value,
      height: size.value,
      'stroke-width': strokeWidth.value,
      class: classes.value,
      innerHTML: \`${innerHTML}\`
    })
  }
}
`.trim()

export async function buildIcons(nuxt: Nuxt): Promise<ModuleIconsNames[]> {
    if (cache) {
        return cache
    }

    const icons = Object.keys(feather.icons).map((name) => ({
        name,
        componentName: `${name}-icon`,
        componentPascalName: pascalCase(`${name}-icon`)
    }))

    const resolver = createResolver(import.meta.url)
    const componentsDir = resolver.resolve('../runtime/components')

    await fs.mkdir(componentsDir, { recursive: true })

    const result = await Promise.all(
        icons.map(async (icon) => {
            const iconData = feather.icons[icon.name]

            if (!iconData) {
                throw new Error(`Icon "${icon.name}" not found in feather-icons`)
            }

            // Passamos o nome do ícone para o template para melhor debug no Vue DevTools
            const component = templateComponent(
                iconData.attrs,
                iconData.contents,
                icon.componentPascalName,
                icon.name
            )

            const filepath = path.join(
                componentsDir,
                `${icon.componentPascalName}.js`
            )

            await fs.writeFile(filepath, component, 'utf8')

            return {
                componentName: icon.componentName,
                componentPascalName: icon.componentPascalName
            }
        })
    )

    cache = result
    return result
}