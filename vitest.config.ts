import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom', // importante para document, window, etc.
        include: ['tests/**/*.test.ts'],
    },
})