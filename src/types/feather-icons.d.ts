declare module 'feather-icons' {
    export interface FeatherIcon {
        attrs: Record<string, string | number>
        contents: string
    }

    export const icons: Record<string, FeatherIcon>

    const feather: {
        icons: Record<string, FeatherIcon>
    }

    export default feather
}