import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addComponent,
    addTypeTemplate
} from '@nuxt/kit'

import build from './runtime/build'
import { generateIconsTypes } from './types/generate-icons-types'

const PACKAGE_NAME = 'nuxt-feather-icons'

export interface ModuleOptions {
    /**
     * Optional prefix for icons
     * Example: FiHomeIcon
     */
    prefix?: string
}

interface ModuleIconsNames {
    componentName: string
    componentPascalName: string
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: PACKAGE_NAME,
        configKey: 'nuxtFeatherIcons',
        compatibility: {
            nuxt: '^3.0.0 || ^4.0.0'
        }
    },

    defaults: {
        prefix: ''
    },

    async setup(options, nuxt) {
        const logger = useLogger(PACKAGE_NAME)
        const {resolve} = createResolver(import.meta.url)

        logger.info('Generating Feather icons components...')

        const icons: ModuleIconsNames[] = await build

        icons.forEach(icon => {
            const componentName =
                options.prefix
                    ? `${options.prefix}${icon.componentPascalName}`
                    : icon.componentPascalName

            addComponent({
                name: componentName,
                export: 'default',
                filePath: resolve(`./runtime/components/${icon.componentPascalName}.js`),
                global: false
            })
        })

        addTypeTemplate({
            filename: 'types/nuxt-feather-icons.d.ts',
            getContents: () => generateIconsTypes(icons, options)
        })

        nuxt.hook('prepare:types', ({ references }) => {
            references.push({ path: 'types/nuxt-feather-icons.d.ts' })
        })

        logger.success(`${icons.length} Feather icons registered`)
    }
})