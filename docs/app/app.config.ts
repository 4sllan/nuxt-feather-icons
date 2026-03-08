const siteName = 'Nuxt Umbuzeiro'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'lime',
      neutral: 'zinc'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: siteName
  },
  header: {
    title: siteName,
    to: '/',
    logo: {
      alt: 'Nuxt Umbuzeiro - Laravel Sanctum & Laravel Passport',
      light: 'logo.svg',
      dark: 'logo.svg'
    },
    search: true,
    colorMode: true,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/4sllan/nuxt-umbu',
        'target': '_blank',
        'aria-label': 'GitHub'
      }
    ]
  },
  footer: {
    credits: `Aslan Gama © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/4sllan',
        'target': '_blank',
        'aria-label': '4slan on GitHub'
      },
    ]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Ready to contribute?',
      edit: 'https://github.com/4sllan/nuxt-umbu/edit/main/docs/content',
      links: [
        {
          icon: 'i-lucide-star',
          label: 'Star on GitHub',
          to: 'https://github.com/4sllan/nuxt-umbu',
          target: '_blank'
        },
        {
          icon: 'i-lucide-git-pull-request-create',
          label: 'Suggest a feature',
          to: 'https://github.com/4sllan/nuxt-umbu/issues/new?template=feature_request.md',
          target: '_blank'
        },
        {
          icon: 'i-simple-icons-github',
          label: 'Support project',
          to: 'https://github.com/sponsors/4sllan',
          target: '_blank'
        }
      ]
    }
  }
})
