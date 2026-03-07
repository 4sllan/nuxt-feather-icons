import myModule from '../src/module';
export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    modules: [
        myModule
    ]
})