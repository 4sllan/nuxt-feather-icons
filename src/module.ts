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
     * The icon library provider to use.
     * 'feather' uses the classic Feather Icons.
     * 'lucide' uses Lucide Icons (a community-run fork with more icons).
     * @default 'lucide'
     */
    provider?: 'feather' | 'lucide'

    /**
     * Optional prefix for icons.
     * If set to 'Base', components will be named like <BaseHomeIcon />
     * @default ''
     */
    prefix?: string

    /**
     * Default icon size.
     * Can be a number (px) or a string like '1.5x' (em).
     * @default 24
     */
    size?: string | number

    /**
     * Default stroke width for the icon paths.
     * @default 2
     */
    strokeWidth?: string | number

    /**
     * Default CSS classes to be applied to all icons.
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
        provider: 'lucide',
        prefix: '',
        size: 24,
        strokeWidth: 2,
        class: ''
    },

    async setup(options, nuxt) {
        const logger = useLogger(PACKAGE_NAME)
        const resolver = createResolver(import.meta.url)

        const provider = options.provider === 'lucide' ? 'Lucide' : 'Feather'

        logger.info(`Generating ${provider} icons components...`)

        const icons = await buildIcons(nuxt, options)

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
            provider: options.provider || 'lucide',
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

        logger.success(`${icons.length} ${provider} icons registered`)
    }
})