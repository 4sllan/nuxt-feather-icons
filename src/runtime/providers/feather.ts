import feather from "feather-icons";
import type { IconNormalized } from './index'

export function getFeatherIcons(): IconNormalized[] {
    return Object.entries(feather.icons).map(([name, icon]) => ({
        name,
        attrs: icon.attrs,
        contents: icon.contents
    }))
}