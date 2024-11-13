<template>
    <div
        :id="id"
        class="menu-section"
    >
        <div class="menu-section-title">
            <i :class="icon" />
            <span class="menu-section-title-text">{{ title }}</span>
        </div>
        <component
            :is="contentComponent"
            class="menu-section-content"
        >
            <slot />
        </component>
    </div>
</template>

<script setup lang="ts">
import ScrollableComponent from '~/components/CSS/Login/ScrollableComponent.vue'

// Define props
const props = defineProps<{
    icon: string
    id: string
    scrollable?: boolean
    title: string
}>()

// Conditionally set the content component
const contentComponent = computed(() => {
    return props.scrollable ? ScrollableComponent : 'div'
})
</script>
