import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addTypeTemplate,
    addComponentsDir
} from '@nuxt/kit'

import { buildIcons } from './runtime/build'
import { generateIconsTypes } from './types/generate-icons-types'

const PACKAGE_NAME = 'nuxt-feather-icons'

export interface ModuleOptions {
    /**
     * Optional prefix for icons
     * Example: FiHomeIcon
     */
    prefix?: string
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

        addTypeTemplate({
            filename: 'types/nuxt-feather-icons.d.ts',
            getContents: () => generateIconsTypes(icons, options)
        })

        nuxt.options.runtimeConfig.public.featherIcons = {
            prefix: options.prefix || ''
        }

        nuxt.hook('prepare:types', ({ references }) => {
            references.push({ path: 'types/nuxt-feather-icons.d.ts' })
        })

        logger.success(`${icons.length} Feather icons registered`)
    }
})