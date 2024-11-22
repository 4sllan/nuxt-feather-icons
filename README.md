<div align="center">
<img src=".github/nuxt-feather-icons.svg" width="200">
</div>
<h1 align="center">Nuxt Feather Icons</h1>
<p align="center">Support for Nuxt 3</p>
<br>


[![npm version][npm-v-src]][npm-v-href]
[![GitHub License][license]][license-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![Nuxt nuxt-feather-icons][nuxt-src]][nuxt-href]
[![Static Badge][sponsor-src]][sponsor-href]

## Install

```bash
npx nuxi@latest module add nuxt-feather-icons
```

## Usage

### nuxt.config.js

``` js
modules: [
    'nuxt-feather-icons'
],
```

## Sizing

<p>Icons are automatically sized based on the font size of the parent element by default.</p>
<p>However, if you wish to customize the size, you can use the size attribute. For sizing based on multiples, specify the
desired multiple followed by an x.</p>

```html

<XIcon size="1.5x" class="custom-class"></XIcon>
```

<p>Additionally, you can set an absolute size in pixels (px) by simply passing an integer.</p>

```html

<XIcon size="30" class="custom-class"></XIcon>
```

<p>This flexibility allows you to easily adjust the icon size according to your specific needs.</p>

```html
<script setup>
const menuItems = ref([
  {
    icon: resolveComponent('HomeIcon'),
  },
  {
    icon: resolveComponent('UsersIcon'),
  },
  {
    icon: resolveComponent('LayersIcon'),
  },
])
</script>

<template>
  <ul>
    <li v-for="(item, index) in menuItems" :key="index">
      <component :is="item.icon" size="2x"/>
    </li>
  </ul>
</template>

```

<p>Use the resolveComponent function to dynamically load icon components. In the template, leverage the <component> tag and specify the corresponding icon using the :is property.</p>
<p>This approach simplifies the creation of dynamic and reusable icon lists, making it ideal for menus or other components requiring flexibility with multiple icons.</p>




## ⚖️ License

Released under [MIT](/LICENSE) by [@4slan](https://github.com/4sllan).


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