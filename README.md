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

## ✨ Features

- **Zero-Runtime Compiler:** All icons are pre-compiled into Vue render functions (`h()`).
- **Smart Tree-Shaking:** Only the icons you use are bundled.
- **Auto-imported Components:** Use `<HomeIcon />` anywhere without imports.
- **Dynamic Resolver:** Specialized composable for dynamic menus and database-driven icons.
- **SSR Ready:** Perfect hydration and lightning-fast server-side rendering.

## 📦 Install

Add the module to your Nuxt project with a single command:

```bash
npx nuxi@latest module add nuxt-feather-icons
```
## 🛠️ Setup
Register the module in your nuxt.config.ts:

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-feather-icons'
  ],
  nuxtFeatherIcons: {
    // Optional: add a prefix to all icon components (e.g. <FiHomeIcon />)
    prefix: 'F'
  }
})
```
## 🚀 Usage
### Basic Usage
Icons are automatically registered. Just use the PascalCase name of any Feather icon:

```vue
<template>
  <div class="flex gap-4">
    <HomeIcon size="24" />
    <UsersIcon size="2x" class="text-blue-500" />
    <SettingsIcon size="1.5x" stroke-width="3" />
  </div>
</template>
```

### Dynamic Icons (The Best Way)
If you need to render icons based on data (like a sidebar menu), use the `useFeatherIcon` composable. It's the most efficient method for tree-shaking and works in runtime-only environments.

```vue

<script setup lang="ts">
const menuItems = [
  { name: 'Dashboard', icon: 'HomeIcon' },
  { name: 'Team', icon: 'UsersIcon' },
  { name: 'Settings', icon: 'SettingsIcon' },
]
</script>

<template>
  <ul>
    <li v-for="item in menuItems" :key="item.name">
      <component :is="useFeatherIcon(item.icon)" size="20" class="mr-2" />
      {{ item.name }}
    </li>
  </ul>
</template>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | string \| number | 24 | Icon size. Use numbers for px or strings like 2x, 1.5em. |
| class | string | '' | Custom CSS classes for styling. |
| stroke-width | number | 2 | Thickness of the icon lines. |

### Tailwind CSS Integration
Since they are rendered as SVGs, you can use any utility class:

```html
<HeartIcon size="3x" class="text-red-500 hover:scale-110 transition-transform" />
```


## 💡 Performance & Architecture
### 🌳 Tree-Shaking
Unlike libraries that bundle the entire SVG library, Nuxt Feather Icons uses a virtual mapping strategy. 
When you use `useFeatherIcon('HomeIcon')`, Vite identifies the specific file and excludes the rest of the library from your production build.

### ⚡ SSR & Hydration
Icons are generated as pure functional render functions. This ensures:

- Fast SSR: Minimal string overhead on the server.
- Lightweight Hydration: No reactive overhead for static icons.

### 🛠️ Handling Prefixes Dynamically
If you use a custom prefix (e.g., F), the composable expects the full PascalCase name:

```typescript
// Helper for dynamic slugs
const getIcon = (slug: string) => useFeatherIcon(`F${slug}Icon`)
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