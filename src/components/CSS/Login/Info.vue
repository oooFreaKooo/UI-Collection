<template>
    <div
        :id="id"
        class="info"
    >
        <Time />
        <WeatherSnap />
    </div>
</template>

<script setup lang="ts">
// Define props
defineProps<{
    id?: string
}>()
</script>
