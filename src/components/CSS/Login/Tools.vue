<template>
    <MenuSection
        id="tools-section"
        icon="mdi mdi-toolbox"
        title="What's Appening?"
    >
        <div
            v-for="tool in tools"
            :key="tool.id"
            class="tool-card"
        >
            <div
                class="tool-card-background background-image"
                :style="{ backgroundImage: `url(${tool.image})` }"
            />
            <div class="tool-card-content">
                <div class="tool-card-content-header">
                    <span class="tool-card-label">{{ tool.label }}</span>
                    <span class="tool-card-name">{{ tool.name }}</span>
                </div>
                <i :class="['tool-card-icon', tool.icon]" />
            </div>
        </div>
    </MenuSection>
</template>

<script setup lang="ts">
const tools = [
    {
        icon: 'mdi mdi-weather-sunny',
        id: 1,
        image: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?auto=format&fit=crop&w=500&q=60',
        label: 'Weather',
        name: 'Cloudly',
    },
    {
        icon: 'mdi mdi-calculator',
        id: 2,
        image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=500&q=60',
        label: 'Calc',
        name: 'Mathio',
    },
    {
        icon: 'mdi mdi-piggy-bank',
        id: 3,
        image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&w=500&q=60',
        label: 'Bank',
        name: 'Cashy',
    },
    {
        icon: 'mdi mdi-airplane',
        id: 4,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=60',
        label: 'Travel',
        name: 'Fly-er-io-ly',
    },
    {
        icon: 'mdi mdi-gamepad-variant',
        id: 5,
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=500&q=60',
        label: 'Games',
        name: 'Gamey',
    },
    {
        icon: 'mdi mdi-video',
        id: 6,
        image: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?auto=format&fit=crop&w=500&q=60',
        label: 'Video Chat',
        name: 'Chatty',
    },
]
</script>
