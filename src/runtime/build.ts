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

const templateComponent = (attrs: FeatherAttrs, innerHTML: string) => `
import { h, computed } from 'vue'

export default {
  name: 'FeatherIcon',
  props: {
    size: {
      type: [String, Number],
      default: 24
    },
    strokeWidth: {
      type: [String, Number],
      default: 2
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const size = computed(() => 
      typeof props.size === 'string' && props.size.endsWith('x')
        ? props.size.slice(0, -1) + 'em'
        : props.size + 'px'
    )

    return () => h('svg', {
      ...${JSON.stringify(attrs)},
      width: size.value,
      height: size.value,
      'stroke-width': props.strokeWidth,
      class: '${attrs.class || ''}' + ' ' + props.class,
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

            const component = templateComponent(
                iconData.attrs,
                iconData.contents
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