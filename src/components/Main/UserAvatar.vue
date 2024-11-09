<template>
    <v-avatar
        class="mr-2 avatar-pulse"
        size="40"
    >
        <v-progress-circular
            :rotate="360"
            :size="40"
            :width="4"
            :value="progress"
            color="primary"
        >
            <v-icon class="rotate-icon">
                {{ currentThemeIcon }}
            </v-icon>
        </v-progress-circular>
    </v-avatar>
</template>

<script lang="ts" setup>
const progress = ref<number>(0)
const currentThemeIcon = ref<string>('mdi-atom')

function rotateThemeIcons () {
    const icons = [
        'mdi-atom', 'mdi-rocket', 'mdi-star', 'mdi-shield-star',
    ]
    let index = 0
    setInterval(() => {
        index = (index + 1) % icons.length
        currentThemeIcon.value = icons[index]
    }, 3000)
}

onMounted(() => rotateThemeIcons())
</script>

<style scoped>
.avatar-pulse {
  animation: avatarGlow 3s infinite;
}
@keyframes avatarGlow {
  0% { box-shadow: 0 0 0 0 rgba(var(--v-primary-base), 0.4); }
  50% { box-shadow: 0 0 20px 5px rgba(var(--v-primary-base), 0.2); }
  100% { box-shadow: 0 0 0 0 rgba(var(--v-primary-base), 0.4); }
}
</style>
