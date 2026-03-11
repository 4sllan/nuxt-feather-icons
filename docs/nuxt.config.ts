export default defineNuxtConfig({
    app: {
        baseURL: '/nuxt-feather-icons/',
    },

    devtools: {
        enabled: true
    },

    css: ['~/assets/css/main.css'],

    modules: [
        'nuxt-feather-icons',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxt/content',
        'nuxt-og-image',
        'nuxt-llms'
    ],

    compatibilityDate: '2024-07-11',

    nitro: {
        preset: 'static',
        prerender: {
            routes: [
                '/'
            ],
            crawlLinks: true,
            autoSubfolderIndex: false
        }
    },

    icon: {
        provider: 'iconify'
    },

    llms: {
        domain: 'https://4sllan.github.io/nuxt-feather-icons/',
        title: 'Nuxt Feather Icons',
        description: 'A optimized Nuxt module for Feather Icons featuring automatic tree-shaking, full SSR support, and customizable SVG attributes via props.',
        full: {
            title: 'Nuxt Feather Icons Documentation',
            description: 'Comprehensive guide for integrating Feather Icons into Nuxt applications. Includes installation, component usage, TypeScript support, and performance optimization details.'
        },

        sections: [
            {
                title: 'Installation & Setup',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/getting-started%'}
                ]
            },
            {
                title: 'Component Usage',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/usage%'}
                ]
            },
            {
                title: 'API Reference & Props',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/api%'}
                ]
            }
        ]
    },

    content: {
        experimental: { sqliteConnector: 'native' },
        build: {
            markdown: {
                toc: {
                    searchDepth: 1
                }
            }
        }
    },
})
