<template>
    <span class="weather">
        <i class="weather-type mdi mdi-weather-sunny" />
        <span class="weather-temperature-value">{{ temperature }}</span>
        <span class="weather-temperature-unit">°F</span>
    </span>
</template>

<script setup lang="ts">
const temperature = ref<number>(N.rand(65, 85))
</script>
