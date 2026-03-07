import feather from 'feather-icons'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

type ModuleIconsNames = {
    componentName: string
    componentPascalName: string
}

type FeatherAttrs = {
    [key: string]: string | number
}

function pascalCase(str: string) {
    return str.replace(/(^\w|-\w)/g, s => s.replace('-', '').toUpperCase())
}

const templateComponent = (attrs: FeatherAttrs, innerHTML: string) => `
import { h } from 'vue'

export default {
  name: 'FeatherIcon',
  props: {
    size: {
      type: [String, Number],
      default: 24
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const size =
      typeof props.size === 'string' && props.size.endsWith('x')
        ? props.size.slice(0, -1) + 'em'
        : parseInt(props.size) + 'px'

    const svgAttrs = {
      ...${JSON.stringify(attrs)},
      width: size,
      height: size,
      class: ${JSON.stringify(attrs.class || '')} + ' ' + props.class,
      innerHTML: ${JSON.stringify(innerHTML)}
    }

    return () => h('svg', svgAttrs)
  }
}
`.trim()

const icons = Object.keys(feather.icons).map((name) => ({
    name,
    componentName: `${name}-icon`,
    componentPascalName: pascalCase(`${name}-icon`)
}))

async function writeIfChanged(file: string, content: string) {
    try {
        const existing = await fs.readFile(file, 'utf8')

        if (existing === content) {
            return
        }
    } catch {
        // arquivo não existe
    }

    await fs.writeFile(file, content, 'utf8')
}

async function buildIcons(): Promise<ModuleIconsNames[]> {
    const componentsDir = resolve('./components')

    await fs.mkdir(componentsDir, { recursive: true })

    return Promise.all(
        icons.map(async (icon) => {
            const iconData = feather.icons[icon.name]

            if (!iconData) {
                throw new Error(`Icon "${icon.name}" not found in feather-icons`)
            }

            const attrs = { ...iconData.attrs }
            const innerHTML = iconData.contents

            const component = templateComponent(attrs, innerHTML)

            const filepath = path.join(
                componentsDir,
                `${icon.componentPascalName}.js`
            )

            await writeIfChanged(filepath, component)

            return {
                componentName: icon.componentName,
                componentPascalName: icon.componentPascalName
            }
        })
    )
}

export default buildIcons()