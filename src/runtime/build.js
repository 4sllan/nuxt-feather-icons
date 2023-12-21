import path from 'path'
import feather from 'feather-icons'
import fs from 'fs-extra'
import pascalcase from 'pascalcase';

const templateComponent = (name) => `
import feather from 'feather-icons'
    export default {
        props: {
            size: {
                type: String,
                default: '24',
                validator: (s) => (!isNaN(s) || s.length >= 2 && !isNaN(s.slice(0, s.length - 1)) && s.slice(-1) === 'x')
            }
        },
        setup(props, {slots}) {

            const size = props.size.slice(-1) === 'x'
                ? props.size.slice(0, props.size.length - 1) + 'em'
                : parseInt(props.size) + 'px';

            const content = feather.icons['${name}'].contents;
            const attrs = feather.icons['${name}'].attrs;
            attrs.width = size
            attrs.height = size
            attrs.innerHTML = content

            return () => [
                h('svg', attrs)
            ]
        }
    }
`.trim()

const build = Object.keys(feather.icons).map(name => ({
    name,
    componentName: `${name}-icon`,
    componentPascalName: pascalcase(`${name}-icon`)
}))

Promise.all(build.map(icon => {
    const component = templateComponent(icon.name)
    const filepath = `./runtime/components/${icon.componentPascalName}.js`
    return fs.ensureDir(path.dirname(filepath))
        .then(() => fs.writeFile(filepath, component, 'utf8'))
})).then(() => {
    return fs.outputFile('./runtime/index.js', build, 'utf8')
})

export default build;



