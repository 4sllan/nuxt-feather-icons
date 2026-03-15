import type { IconNormalized } from './index'

export function getLucideIcons(): IconNormalized[] {
    // Importamos o mapa de ícones
    const lucide = require('lucide')

    // O Lucide exporta um objeto 'icons'. Cada ícone nele é um array:
    // [ ['path', { d: '...' }], ['circle', { ... }] ]
    const iconsMap = lucide.icons

    if (!iconsMap) {
        throw new Error('Não foi possível carregar os ícones do Lucide. Verifique se o pacote "lucide" está instalado.')
    }

    return Object.entries(iconsMap).map(([name, icon]: [string, any]) => {
        // No Lucide puro, o 'icon' em si já é o array de elementos (children)
        // Se estiver usando lucide-vue, a estrutura pode variar, mas no core JS é um array.
        const nodes = Array.isArray(icon) ? icon : (icon.children || [])

        const contents = nodes
            .map(([tagName, attrs]: [string, any]) => {
                const attrString = Object.entries(attrs || {})
                    .map(([k, v]) => `${k}="${v}"`)
                    .join(' ')
                return `<${tagName} ${attrString}></${tagName}>`
            })
            .join('')

        return {
            name,
            // Atributos padrão para SVGs do Lucide
            attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 24,
                height: 24,
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': 2,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
            },
            contents
        }
    })
}