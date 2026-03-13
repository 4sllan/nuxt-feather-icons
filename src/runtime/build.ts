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
const templateComponent = (attrs: FeatherAttrs, innerHTML: string, componentName: string) => `
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
    const config = useRuntimeConfig().public.featherIconsn || {}

    const size = computed(() => {
      const s = props.size ?? config.size ?? 24
      return typeof s === 'string' && s.endsWith('x')
        ? s.slice(0, -1) + 'em'
        : s + 'px'
    })

    const strokeWidth  = computed(() => props.strokeWidth ?? config.strokeWidth ?? 2)
    
    const classes = computed(() => {
      return [
        'feather', 
        'feather-${attrs.name || ""}', 
        config.class, 
        props.class
      ].filter(Boolean).join(' ').trim()
    })

    return () => h('svg', {
      ...${JSON.stringify(attrs)},
      width: finalSize.value,
      height: finalSize.value,
      'stroke-width': finalStrokeWidth.value,
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
                throw new Error(`Icon "\${icon.name}" not found in feather-icons`)
            }

            // Passamos o nome do ícone para o template para melhor debug no Vue DevTools
            const component = templateComponent(
                iconData.attrs,
                iconData.contents,
                icon.componentPascalName
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