<h1 align="center">Nuxt Feather Icons</h1>
    <p align="center">
        <span>Support for Nuxt 3</span>
    </p>
<br>

<div align="center">


[![Static Badge](https://img.shields.io/badge/NPM:nuxt-feather-icons)](https://www.npmjs.com/package/nuxt-feather-icons)
[![Static Badge](https://img.shields.io/badge/GITHUB:nuxt-feather-icons)](https://www.npmjs.com/package/nuxt-feather-icons)
[![npm version](https://img.shields.io/npm/v/nuxt-feather-icons/latest.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-feather-icons)
[![npm downloads](https://img.shields.io/npm/dt/nuxt-feather-icons.svg?style=flat-square)](https://www.npmjs.com/package/nuxt-feather-icons)


</div>


## Install

```bash
npm i nuxt-feather-icons
```

```bash
yarn add nuxt-feather-icons
```

## Usage

### nuxt.config.js

``` js
modules: [
    'nuxt-feather-icons'
],
```

## Sizing

Os ícones são dimensionados automaticamente com base no tamanho da fonte do elemento pai por padrão.

No entanto, se desejar um tamanho personalizado, você pode utilizar o atributo size. Para dimensionamento com base em
múltiplos, especifique o múltiplo desejado seguido do caractere x.

Icons are automatically sized based on the font size of the parent element by default.

However, if you wish to customize the size, you can use the size attribute. For sizing based on multiples, specify the
desired multiple followed by an x.

```html

<XIcon size="1.5x"></XIcon>
```

Além disso, é possível definir um tamanho absoluto em pixels (px) simplesmente passando um número inteiro.
Additionally, you can set an absolute size in pixels (px) by simply passing an integer.

```html

<XIcon size="1.5x"></XIcon>
```

Essa flexibilidade permite que você ajuste facilmente o tamanho dos ícones conforme suas necessidades específicas.
This flexibility allows you to easily adjust the icon size according to your specific needs.