import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addComponent
} from '@nuxt/kit'
import type {
    ModuleOptions,
} from './runtime/types'

import icons from './runtime/build.js'

const PACKAGE_NAME = 'nuxt-feather-icons'

export default defineNuxtModule<ModuleOptions>({

    meta: {
        name: PACKAGE_NAME,
        // The key in `nuxt.config` that holds your module options
        configKey: 'nuxtFeatherIcons',
        // Compatibility constraints
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '^3.0.0'
        }
    },

    setup(moduleOptions, nuxt) {
        const logger = useLogger(PACKAGE_NAME)

        const {resolve} = createResolver(import.meta.url)

        icons.forEach(icon => {
            addComponent({
                name: icon.componentName,
                filePath: resolve(`./runtime/components/${icon.componentPascalName}.js`),
                pascalName: icon.componentPascalName,
                global: true,
                mode: 'all',
            })
        })
    }
})