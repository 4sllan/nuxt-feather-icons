import path from 'path'
import feather from 'feather-icons'
import fs from 'fs-extra'
import pascalcase from 'pascalcase';

import {createResolver} from '@nuxt/kit'

const {resolve} = createResolver(import.meta.url)

const templateComponent = (name, el) => `
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

const icons = Object.keys(feather.icons).map(name => ({
    name,
    componentName: `${name}-icon`,
    componentPascalName: pascalcase(`${name}-icon`)
}))

Promise.all(icons.map(icon => {
    const content = feather.icons[icon.name].contents;
    const el = feather.icons[icon.name].attrs;
    el.innerHTML = content;
    const component = templateComponent(icon.name, JSON.stringify(el))
    const filepath = resolve(`./runtime/components/${icon.componentPascalName}.js`)

    return fs.ensureDir(path.dirname(filepath))
        .then(() => fs.writeFile(filepath, component, 'utf8'))
}))

export default icons;



