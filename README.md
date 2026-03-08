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