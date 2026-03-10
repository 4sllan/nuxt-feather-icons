<div align="center">
<img src=".github/nuxt-feather-icons.svg" width="200" alt="Nuxt Feather Icons Logo">
<h1 align="center">Nuxt Feather Icons</h1>
<p align="center">High-performance Feather Icons for Nuxt with full Tree-Shaking and SSR support.</p>

[![npm version][npm-v-src]][npm-v-href]
[![GitHub License][license]][license-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![Sponsors][sponsor-src]][sponsor-href]
</div>

<br/>

**Nuxt Feather Icons** is the most efficient way to use Feather Icons in your Nuxt project. Every icon is pre-compiled into a Vue render function, ensuring your production bundle only includes exactly what you use.

## 📖 Documentation

For full installation guides, configuration options, and the **Icon Gallery**, visit our documentation:

👉 **[https://4sllan.github.io/nuxt-feather-icons/](https://4sllan.github.io/nuxt-feather-icons/)**

## ✨ Highlights

- **Zero-Runtime Compiler:** Icons are pre-compiled into lightweight render functions (`h()`).
- **Smart Tree-Shaking:** Automatically excludes unused icons from your bundle.
- **Auto-imported:** Use `<HomeIcon />` anywhere without manual imports.
- **Dynamic Resolver:** Efficiently render icons from strings using `useFeatherIcon()`.
- **SSR Ready:** Optimized for fast server-side rendering and hydration.

## 📦 Quick Start

```bash
# Install using nuxi
npx nuxi@latest module add nuxt-feather-icons
```

```vue
<template>
  <div class="flex gap-4">
    <HomeIcon size="24" />
    <UsersIcon size="2x" class="text-blue-500" />
    <SettingsIcon :stroke-width="1.5" />
  </div>
</template>
```
## 🛠️ Configuration

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-feather-icons'],
  nuxtFeatherIcons: {
    prefix: 'F' // Optional: results in <FHomeIcon />
  }
})
```

## ⚖️ License

Released under the [MIT](/LICENSE) by [@4slan](https://github.com/4sllan).


[npm-v-src]: https://img.shields.io/npm/v/nuxt-feather-icons/latest.svg?style=flat-square&colorA=18181B&colorB=28CF8D

[npm-v-href]: https://www.npmjs.com/package/nuxt-feather-icons

[license]: https://img.shields.io/github/license/4sllan/nuxt-feather-icons?style=flat-square&colorA=18181B&colorB=28CF8D

[license-href]: https://github.com/4sllan/nuxt-feather-icons

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com/modules/nuxt-feather-icons

[npm-d-src]: https://img.shields.io/npm/dt/nuxt-feather-icons.svg?style=flat-square&colorA=18181B&colorB=28CF8D

[npm-d-href]: https://www.npmjs.com/package/nuxt-feather-icons

[sponsor-src]: https://img.shields.io/badge/-%E2%99%A5%20Sponsors-ec5cc6?style=flat-square

[sponsor-href]:https://github.com/sponsors/4sllan