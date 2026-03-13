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
        prefix: 'F',
        size: 60,
        strokeWidth: 1,
        class: ''
    },
    compatibilityDate: '2026-03-07'
})