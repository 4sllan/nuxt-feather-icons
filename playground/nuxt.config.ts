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
        // prefix: 'F',
        // size: '24px', // default <Icon> size applied
        // class: 'icon', // default <Icon> class applied
        // strokeWidth: '2'
    },
    compatibilityDate: '2026-03-07'
})