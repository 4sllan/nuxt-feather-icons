import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addComponent
} from '@nuxt/kit'

interface ModuleOptions {

}

interface ModuleIconsNames {
    componentName: string
    componentPascalName: string
}

import build from "./runtime/build";

const PACKAGE_NAME: string = 'nuxt-feather-icons'

export default defineNuxtModule<ModuleOptions>({

    meta: {
        name: PACKAGE_NAME,
        // The key in `nuxt.config` that holds your module options
        configKey: 'nuxtFeatherIcons',
        // Compatibility constraints
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '>=3.0.0'
        }
    },

    setup(moduleOptions, nuxt) {
        const logger = useLogger(PACKAGE_NAME)

        const {resolve} = createResolver(import.meta.url)

        build.then((icons: ModuleIconsNames[]): void => {
            icons.forEach(j => {
                addComponent({
                    name: j.componentName,
                    filePath: resolve(`./runtime/components/${j.componentPascalName}.js`),
                    pascalName: j.componentPascalName,
                    global: false,
                    mode: 'all',
                })
            })
        })

    }
})