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

    llms: {
        domain: 'https://4sllan.github.io/nuxt-umbu/',
        title: 'Nuxt Umbu',
        description: 'Authentication module for Nuxt 4 with first-class Laravel Sanctum support and optional Passport driver.',
        full: {
            title: 'Nuxt Umbu – Authentication for Nuxt 4',
            description: 'Complete documentation for Nuxt Umbu authentication module for Nuxt 4, featuring Laravel Sanctum integration, optional Passport strategies, CSRF protection, httpOnly cookies, route middleware, composables and two-factor authentication.'
        },

        sections: [
            {
                title: 'Getting Started',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/getting-started%'}
                ]
            },
            {
                title: 'Sanctum Integration',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/sanctum%'}
                ]
            },
            {
                title: 'Passport Integration',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/passport%'}
                ]
            },
            {
                title: 'Composables',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/composables%'}
                ]
            },
            {
                title: 'Route Middleware',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/middleware%'}
                ]
            },
            {
                title: 'Security',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/security%'}
                ]
            },
            {
                title: 'Advanced Usage',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/advanced%'}
                ]
            },
            {
                title: 'Troubleshooting',
                contentCollection: 'docs',
                contentFilters: [
                    {field: 'path', operator: 'LIKE', value: '/troubleshooting%'}
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
