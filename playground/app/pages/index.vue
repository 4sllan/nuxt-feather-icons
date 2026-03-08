<script setup>
const menuItems = ([
  {
    icon: resolveComponent('HomeIcon'),
  },
  {
    icon: resolveComponent('UsersIcon'),
  },
  {
    icon: resolveComponent('LayersIcon'),
  },
])
</script>

<template>
  <div>
    <XIcon size="30" class="custom-class"></XIcon>

    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <component :is="item.icon" size="2.5x"/>
      </li>
    </ul>

    <FeatherIcon name="HomeIcon" size="2.5x" class="text"/>
  </div>
</template>
