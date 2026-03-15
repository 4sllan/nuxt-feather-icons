import * as lucide from 'lucide'
import type { IconNormalized } from './index'

export function getLucideIcons(): IconNormalized[] {
    // Lucide exports an 'icons' object. Each icon is an array:
    // [ ['path', { d: '...' }], ['circle', { ... }] ]
    const iconsMap = (lucide as any).icons || lucide

    if (!iconsMap) {
        throw new Error('Could not load Lucide icons. Please ensure the "lucide" package is installed.')
    }

    return Object.entries(iconsMap).map(([name, icon]: [string, any]) => {
        // In pure Lucide, the 'icon' itself is the array of elements (children).
        // If using lucide-vue or other wrappers, the structure might vary, so we fallback to .children.
        const nodes = Array.isArray(icon) ? icon : (icon?.children || [])

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
            // Default SVG attributes for Lucide icons
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