<template>
    <span class="time">{{ time }}</span>
</template>

<script setup lang="ts">
const date = useCurrentDateEffect()

// Computed property to format the date
const time = computed(() => T.format(date.value))
</script>
