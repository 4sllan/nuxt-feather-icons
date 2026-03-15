import { getFeatherIcons } from './feather'
import { getLucideIcons } from './lucide'

export interface IconNormalized {
    name: string
    attrs: Record<string, string | number>
    contents: string
}

export function getIcons(provider: 'feather' | 'lucide'): IconNormalized[] {
    if (provider === 'lucide') return getLucideIcons()
    return getFeatherIcons()
}