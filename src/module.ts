import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addTypeTemplate,
    addTemplate,
    addComponentsDir,
    addImports
} from '@nuxt/kit'

import {buildIcons} from './runtime/build'
import {generateIconsTypes} from './types/generate-icons-types'

const PACKAGE_NAME = 'nuxt-feather-icons'

export interface ModuleOptions {
    /**
     * Optional prefix for icons. Example: 'Fi' -> FiHomeIcon
     */
    prefix?: string
    /**
     * Default icon size
     * @default 24
     */
    size?: string | number
    /**
     * Default stroke width
     * @default 2
     */
    strokeWidth?: string | number
    /**
     * Default CSS classes
     * @default ''
     */
    class?: string
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: PACKAGE_NAME,
        configKey: 'nuxtFeatherIcons',
        compatibility: {
            nuxt: '>=3.0.0',
        }
    },

    defaults: {
        prefix: '',
        size: 24,
        strokeWidth: 2,
        class: ''
    },

    async setup(options, nuxt) {
        const logger = useLogger(PACKAGE_NAME)
        const resolver = createResolver(import.meta.url)

        logger.info('Generating Feather icons components...')

        const icons = await buildIcons(nuxt)

        const componentsDir = resolver.resolve('./runtime/components')

        addComponentsDir({
            path: componentsDir,
            prefix: options.prefix,
            pathPrefix: false,
            extensions: ["js"],
            transpile: true,
        });

        const template = addTemplate({
            filename: 'nuxt-feather-icons-map.mjs',
            getContents: () => {
                // Usamos o resolver para garantir caminhos que o Vite entenda
                return icons.map(icon => {
                    const importPath = resolver.resolve('./runtime/components', `${icon.componentPascalName}.js`)
                    return `export { default as ${icon.componentPascalName} } from '${importPath}'`
                }).join('\n')
            },
            write: true
        })

        addTypeTemplate({
            filename: 'types/nuxt-feather-icons.d.ts',
            getContents: () => generateIconsTypes(icons, options)
        })

        addTypeTemplate({
            filename: 'types/nuxt-feather-icons-map.d.ts',
            getContents: () => `
                declare module '#feather-icons-map' {
                  import type { Component } from 'vue'
                  ${icons.map(icon => `export const ${icon.componentPascalName}: Component`).join('\n')}
                }
              `
        })

        // Opcional: Auto-importar o composable que vamos criar
        addImports({
            name: 'useFeatherIcon',
            as: 'useFeatherIcon',
            from: resolver.resolve('./runtime/composables/useFeatherIcon')
        })

        nuxt.options.runtimeConfig.public.featherIcons = {
            prefix: options.prefix || '',
            size: options.size || 24,
            strokeWidth: options.strokeWidth || 2,
            class: options.class || ''
        }

        nuxt.hook('prepare:types', ({references}) => {
            references.push({path: 'types/nuxt-feather-icons.d.ts'})
        })

        // 2. Registre o alias para o TypeScript e para o Vite
        nuxt.options.alias['#feather-icons-map'] = template.dst

        // 3. Adicione ao tsconfig através do hook
        nuxt.hook('prepare:types', ({tsConfig}) => {
            tsConfig.compilerOptions ||= {}
            tsConfig.compilerOptions.paths ||= {}

            // Mapeia o alias para o arquivo real no diretório .nuxt
            tsConfig.compilerOptions.paths['#feather-icons-map'] = [template.dst]
        })

        logger.success(`${icons.length} Feather icons registered`)
    }
})