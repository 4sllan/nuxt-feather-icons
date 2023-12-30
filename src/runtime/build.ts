import path from 'path'
// @ts-ignore
import feather from 'feather-icons'
// @ts-ignore
import fs from 'fs-extra'
// @ts-ignore
import pascalcase from 'pascalcase';

import {createResolver} from '@nuxt/kit'

const {resolve} = createResolver(import.meta.url)

type ModuleIconsNames = {
    name: string
    componentName: string
    componentPascalName: string
}

type ModuleFeatherIconsAttrs = {
    xmlns: string
    width: number
    height: number
    viewBox: string,
    fill?: string,
    stroke?: string,
    'stroke-width'?: number,
    'stroke-linecap'?: string,
    'stroke-linejoin'?: string,
    class: string
    innerHTML: string
}

const templateComponent = (name: string, el: string): string => `
import { h } from 'vue'

    export default {
        props: {
            size: {
                type: String,
                default: '24',
                validator: (s) => (!isNaN(s) || s.length >= 2 && !isNaN(s.slice(0, s.length - 1)) && s.slice(-1) === 'x')
            }, 
            class: {
                type: String,
            }
        },
        setup(props, {slots}) {

            const size = props.size.slice(-1) === 'x'
                ? props.size.slice(0, props.size.length - 1) + 'em'
                : parseInt(props.size) + 'px';

            const attrs = ${el}
            attrs.width = size
            attrs.height = size
            attrs.class = attrs.class+' '+props.class
                       
            return () => [
                h('svg', attrs)
            ]
        }
    }
`.trim()

const icons: ModuleIconsNames[] = Object.keys(feather.icons).map(name => ({
    name,
    componentName: `${name}-icon`,
    componentPascalName: pascalcase(`${name}-icon`)
}))

const build = Promise.all(icons.map(icon => {
    const content: string = feather.icons[icon.name].contents;
    const el: ModuleFeatherIconsAttrs = feather.icons[icon.name].attrs;
    el.innerHTML = content;
    const component: string = templateComponent(icon.name, JSON.stringify(el))
    const filepath: string = resolve(`./runtime/components/${icon.componentPascalName}.js`)

    fs.ensureDir(path.dirname(filepath))
        .then(() => fs.writeFile(filepath, component, 'utf8'))

    return {
        componentPascalName: icon.componentPascalName,
        componentName: icon.componentName
    }
}))
export default build;



