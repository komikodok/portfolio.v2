<script setup lang="ts">
const isMobile = ref(false)

onMounted(() => {
  if (window.innerWidth <= 1000) {
    isMobile.value = true
 
  }
    nextTick(() => {
    })
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: '/leaf.webp',
    }
  ]
})
</script>

<template>
  <div>
    <MobileWarning v-if="isMobile" />

    <NuxtPage v-else />
  </div>
</template>

<style>
html, body {
  overflow-x: hidden;
}
</style>
