<div align="center">
<img src=".github/nuxt-feather-icons.svg" width="200">
</div>
<h1 align="center">Nuxt Feather Icons</h1>
<p align="center">Feather Icons support for Nuxt with easy usage and dynamic components.</p>
<br>


[![npm version][npm-v-src]][npm-v-href]
[![GitHub License][license]][license-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![Nuxt nuxt-feather-icons][nuxt-src]][nuxt-href]
[![Static Badge][sponsor-src]][sponsor-href]

# 🚀 Pro-Tips: Performance & Architecture

## 🌳 Smart Tree-Shaking
Unlike traditional icon libraries that might bundle the entire SVG set, Nuxt Feather Icons uses a static mapping strategy. When you use useFeatherIcon('HomeIcon'), Vite's dependency graph identifies the specific import path for HomeIcon.js.

- Result: Only the icons you actually reference in your code (as components or via the composable) are included in your final JS bundle.
- Zero-Runtime Compiler: All icons are pre-compiled into Vue render functions (h()). This means they work out-of-the-box in Nuxt production builds without needing the heavy Vue template compiler.

## ⚡ SSR & Hydration
The components are generated as pure functional-like components. This ensures:

- Fast SSR: Lightning-fast string generation on the server.
- Lightweight Hydration: Minimal overhead when the client takes over, as there's no complex reactive state inside the icon itself.

## 🛠️ Handling Prefixes Dynamically
If you use a custom prefix, the composable expects the full PascalCase name. You can easily create a helper if your data only contains the icon slug:

```vue
<script setup lang="ts">
// If prefix is 'Fi'
const getIcon = (slug: string) => useFeatherIcon(`Fi${slug}Icon`)
</script>
<template>
  <--Usage-->
  <component :is="getIcon('Home')" />
</template>
```


## Install

Add the module to your Nuxt project:

```bash
npx nuxi@latest module add nuxt-feather-icons
```

## Setup

Add the module to `nuxt.config.js`:

```typescript jsx
export default defineNuxtConfig({
  modules: [
    'nuxt-feather-icons'
  ],
})
```
Feather Icons are automatically registered as components. You can use any icon like `<HomeIcon />`.

```typescript
export default defineNuxtConfig({
    nuxtFeatherIcons: {
        // optional prefix for icons
        prefix: 'Fi'
    }
})
 
```

## Basic Usage

```vue
<template>
    <div>
        <HomeIcon size="2x" />
        <UsersIcon size="40" class="text-blue-500" />
    </div>
</template>
```
- `size="2x"` → multiples of the parent font-size
- `size="40"` → absolute pixels
- `class` → custom CSS classes

## Dynamic Icons

```vue
<script setup lang="ts">
    import { shallowRef, resolveComponent } from 'vue'

    // Menu items com componentes resolvidos
    const menuItems = shallowRef([
        { icon: resolveComponent('HomeIcon') },
        { icon: resolveComponent('UsersIcon') },
        { icon: resolveComponent('LayersIcon') },
    ])
</script>

<template>
    <ul>
        <li v-for="(item, index) in menuItems" :key="index">
            <component :is="item.icon" size="2x" class="mr-2"/>
            {{ item.icon.name }}
        </li>
    </ul>
</template>
```
- Use resolveComponent to dynamically load icons
- Perfect for menus, toolbars, or any dynamic lists

## ⚡ Enhanced Dynamic Icons (Recommended)

Now you can use the `useFeatherIcon` composable. This is the **most efficient way** to render icons dynamically because it works perfectly with Nuxt's tree-shaking and doesn't require the Vue runtime compiler.

```vue
<script setup lang="ts">
  const menuItems = [
    { name: 'Home', icon: 'HomeIcon' },
    { name: 'Users', icon: 'UsersIcon' },
    { name: 'Settings', icon: 'SettingsIcon' },
  ]
</script>

<template>
  <ul>
    <li v-for="item in menuItems" :key="item.name">
      <component
          :is="useFeatherIcon(item.icon)"
          size="20"
          class="mr-2"
      />
      {{ item.name }}
    </li>
  </ul>
</template>

```


### Why use useFeatherIcon?
- Tree-shaking Friendly: Only the icons you actually use (or reference in your logic) will be included in the final bundle.
- Runtime Ready: Works in environments without the Vue template compiler (runtime-only).
- Type Safe: If you are using TypeScript, you'll get autocomplete for icon names.

## Props

| Prop    | Type               | Default | Description                             |
|---------|--------------------|---------|-----------------------------------------|
| `size`  | `String \| Number` | `'1x'`  | Sets the icon size (e.g., `2x` or `30`) |
| `class` | `String`           | `''`    | Custom CSS classes                      |

## Custom Styling

- Combine with Tailwind, Windi, or any utility CSS
- Icons inherit parent font size by default
- Example with Tailwind:

```vue
<XIcon size="3x" class="text-red-500 hover:text-green-500 transition-colors" />
```


## ⚖️ License

Released under the [MIT](/LICENSE) by [@4slan](https://github.com/4sllan).


[npm-v-src]: https://img.shields.io/npm/v/nuxt-feather-icons/latest.svg?style=flat-square&colorA=18181B&colorB=28CF8D

[npm-v-href]: https://www.npmjs.com/package/nuxt-feather-icons

[license]: https://img.shields.io/github/license/4sllan/nuxt-feather-icons?style=flat-square&colorA=18181B&colorB=28CF8D

[license-href]: https://github.com/4sllan/nuxt-feather-icons

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com/

[npm-d-src]: https://img.shields.io/npm/dt/nuxt-feather-icons.svg?style=flat-square&colorA=18181B&colorB=28CF8D

[npm-d-href]: https://www.npmjs.com/package/nuxt-feather-icons

[sponsor-src]: https://img.shields.io/badge/-%E2%99%A5%20Sponsors-ec5cc6?style=flat-square

[sponsor-href]:https://github.com/sponsors/4sllan