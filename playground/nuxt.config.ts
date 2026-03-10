import myModule from '../src/module';
export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    ssr:false,

    modules: [
        myModule
    ],
    nuxtFeatherIcons: {
        // prefix: 'F'
    },
    compatibilityDate: '2026-03-07'
})