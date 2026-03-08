import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: { tooling: true, typescript: true },
})
    .override('nuxt/javascript', {
      rules: {
        curly: ['error', 'all'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'prefer-const': ['error'],
      },
    })
    // --- BLOCO PARA VUE ---
    .override('nuxt/vue/rules', {
      rules: {
        'vue/html-self-closing': ['error', {
          html: {
            void: 'always',      // Exige /> em tags como <input>, <br>, <img>
            normal: 'always',    // Exige /> em tags vazias como <div v-if="..." />
            component: 'always'  // Exige /> em componentes <MeuComponente />
          },
          svg: 'always',
          math: 'always'
        }],
        'vue/multi-word-component-names': 'off', // desativa erro de nome de componente
        'vue/attributes-order': 'off',           // ignora aviso de ordem de atributos
      }
    })
    // ------------------------------------
    .override('nuxt/typescript/rules', {
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/consistent-type-imports': 'off', // ignora erro de imports só como type
      },
    })
    .append({
      files: [
        'src/runtime/**/*.ts',
        'src/module.ts',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-number-properties': 'off',
        'curly': 'off',
      },
    })