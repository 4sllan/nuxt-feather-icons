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
     * Optional prefix for icon component names.
     *
     * Example:
     * If prefix is "Fi", the icon component will be:
     * FiHomeIcon, FiUserIcon, etc.
     *
     * Default: no prefix
     */
    prefix?: string

    /**
     * Default size for all icons.
     *
     * This value will be applied to both `width` and `height`
     * of the generated SVG.
     *
     * Example:
     * 24 -> width="24" height="24"
     *
     * Default: 24
     */
    size?: number | string

    /**
     * Default stroke width for the SVG icons.
     *
     * Feather icons are stroke-based, so this controls
     * the thickness of the lines.
     *
     * Example:
     * 2 -> stroke-width="2"
     *
     * Default: 2
     */
    strokeWidth?: number | string

    /**
     * Default CSS class applied to all icon components.
     *
     * Useful for applying global styles like color or spacing.
     *
     * Example:
     * "text-gray-500"
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