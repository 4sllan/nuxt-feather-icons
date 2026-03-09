import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addTypeTemplate,
    addComponent
} from '@nuxt/kit'
import {join} from 'node:path'

import {buildIcons} from './runtime/build'
import {generateIconsTypes} from './types/generate-icons-types'

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
            nuxt: '>=3.0.0',
        }
    },

    defaults: {
        prefix: ''
    },

    async setup(options, nuxt) {
        const logger = useLogger(PACKAGE_NAME)

        logger.info('Generating Feather icons components...')

        const icons = await buildIcons(nuxt)

        for (const icon of icons) {
            const componentName = `${options.prefix}${icon.componentPascalName}`

            addComponent({
                name: componentName,
                export: 'default',
                filePath: `#build/feather-icons/${icon.componentPascalName}`,
                chunkName: `feather-${componentName}`,
            })
        }

        addTypeTemplate({
            filename: 'types/nuxt-feather-icons.d.ts',
            getContents: () => generateIconsTypes(icons, options)
        })

        nuxt.options.runtimeConfig.public.featherIcons = {
            prefix: options.prefix || ''
        }

        nuxt.hook('prepare:types', ({references}) => {
            references.push({path: 'types/nuxt-feather-icons.d.ts'})
        })

        logger.success(`${icons.length} Feather icons registered`)
    }
})