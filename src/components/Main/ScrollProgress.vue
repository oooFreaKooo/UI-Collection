<template>
    <div class="scroll-progress" />
</template>

<script lang="ts" setup>
function initScrollProgress () {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = (winScroll / height) * 100
        document.documentElement.style.setProperty('--scroll', `${scrolled}%`)
    })
}

onMounted(() => initScrollProgress())
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--v-primary-base) var(--scroll), transparent 0);
  z-index: 9999;
}
</style>
