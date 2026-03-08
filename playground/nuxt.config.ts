import myModule from '../src/module';
export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    modules: [
        myModule
    ],
    compatibilityDate: '2026-03-07'
})