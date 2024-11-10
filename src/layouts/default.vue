<template>
    <AppHeader class="position-relative" />
    <div class="bg-background">
        <slot />
    </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
.bg-background {
  position: relative;
  z-index: 1;
}
</style>
