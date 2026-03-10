import * as icons from '#feather-icons-map'
import { markRaw } from 'vue'

export function useFeatherIcon(name: string) {
    if (!name) return null

    // O 'icons' aqui é o objeto exportado pelo arquivo .mjs gerado pelo Nuxt
    const iconComponent = (icons as any)[name]

    if (!iconComponent) {
        return null
    }

    // markRaw é vital aqui para evitar que o Vue tente tornar
    // um componente estático em um objeto reativo (ganho de performance)
    return markRaw(iconComponent)
}