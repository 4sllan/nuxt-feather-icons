import type { ModuleOptions } from '../module'

interface ModuleIconsNames {
    componentPascalName: string
}

const PACKAGE_NAME = 'nuxt-feather-icons'

export function generateIconsTypes(
    icons: ModuleIconsNames[],
    options: ModuleOptions
) {
    const components = icons
        .map((icon) => {
            const name = options.prefix
                ? `${options.prefix}${icon.componentPascalName}`
                : icon.componentPascalName

            return `    ${name}: typeof import('${PACKAGE_NAME}')['${name}']`
        })
        .join('\n')

    return `
import type { DefineComponent } from 'vue'

declare module 'vue' {
  export interface GlobalComponents {
${components}
  }
}

export {}
`
}