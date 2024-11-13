<template>
    <ScrollableComponent id="quick-nav">
        <div
            v-for="item in items"
            :key="item.id"
            class="quick-nav-item clear-button"
        >
            <span class="quick-nav-item-label">{{ item.label }}</span>
        </div>
    </ScrollableComponent>
</template>

<script setup lang="ts">
// Define items as a reactive reference
const items = ref([
    { id: 1, label: 'Weather' },
    { id: 2, label: 'Food' },
    { id: 3, label: 'Apps' },
    { id: 4, label: 'Movies' },
])
</script>
