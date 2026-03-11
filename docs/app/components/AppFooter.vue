<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
        <UButton
            v-for="(link, index) of footer.links"
            :key="index"
            :to="link.to"
            :target="link.target"
            :aria-label="link['aria-label']"
            color="neutral"
            variant="ghost"
        >
          <component size="20" :is="useFeatherIcon(link.icon)"/>
        </UButton>
      </template>
    </template>
  </UFooter>
</template>
