<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('docs').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () => {
    return queryCollectionItemSurroundings(
      'docs',
      route.path,
      { fields: ['description'] }
    )
  }
)

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

defineOgImageComponent(
  'Docs',
  {
    headline: headline.value
  }
)

const links = computed(() => {
  const links = []

  if (toc?.bottom?.edit) {
    links.push({
      icon: 'ExternalLinkIcon',
      label: 'Edit this page',
      to: `${toc.bottom.edit}`,
      target: '_blank'
    })
    // /${page?.value?.stem}.${page?.value?.extension}
  }

  return [
    ...links,
    ...(toc?.bottom?.links || [])
  ].filter(Boolean)
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    >
      <template #links>
        <UButton
          v-for="(link, index) in page.links"
          :key="index"
          v-bind="link"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround">
        <template #link-leading="{link}">
          <component
              :is="useFeatherIcon(link.icon as string)"
              :size="18"
              :stroke-width="2"
          />
        </template>
      </UContentSurround>
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            >
              <template #link-leading="{link}">
                <component
                    :is="useFeatherIcon(link.icon as string)"
                    :size="18"
                    :stroke-width="2"
                />
              </template>
            </UPageLinks>
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
