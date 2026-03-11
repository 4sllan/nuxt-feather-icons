<script setup lang="ts">
import type {ContentNavigationItem} from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation
              highlight
              :navigation="navigation"
          >
            <template #link-leading="{link}">
              <component
                  :is="useFeatherIcon(link.icon as string)"
                  :size="18"
                  :stroke-width="2"
              />
            </template>
          </UContentNavigation>
        </UPageAside>
      </template>
      <slot/>
    </UPage>
  </UContainer>
</template>
