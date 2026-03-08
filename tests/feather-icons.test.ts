import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import fs from 'node:fs'
import path from 'node:path'

// Caminho para a pasta onde os ícones compilados estão
const iconsDir = path.resolve(__dirname, '../.nuxt/feather-icons')

describe('Feather Icons Components', () => {
    it('deve conter ícones compilados', () => {
        const files = fs.readdirSync(iconsDir)
        expect(files.length).toBeGreaterThan(0)
    })

    it('cada ícone deve ser um componente Vue válido', async () => {
        const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.js'))

        for (const file of files) {
            const iconPath = path.join(iconsDir, file)
            const iconModule = await import(iconPath)
            const Component = iconModule.default || iconModule

            const wrapper = mount(Component, {
                props: {
                    class: 'test-class',
                    width: 24,
                    height: 24
                }
            })

            // Checa se o wrapper existe
            expect(wrapper.exists()).toBe(true)

            // Checa se o SVG contém a classe
            expect(wrapper.html()).toContain('class="test-class"')
            expect(wrapper.html()).toContain('<svg')
        }
    })
})