<template>
    <v-btn
        icon
        class="mx-4"
        @click="toggleTheme"
    >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

const isDark = ref<boolean>(false)
const theme = useTheme()
function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}
</script>

<style>

</style>
