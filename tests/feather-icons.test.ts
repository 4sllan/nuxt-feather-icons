import { describe, it, expect } from 'vitest'
import * as feather from 'feather-icons'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('Feather Icons', () => {
    it('deve gerar componente Vue para cada ícone', () => {
        for (const name in feather.icons) {
            const icon = feather.icons[name]
            const IconComponent = defineComponent({
                render() {
                    return h('div', { innerHTML: icon.toSvg() })
                }
            })
            const wrapper = mount(IconComponent)
            expect(wrapper.html()).toContain('<svg')
        }
    })
})