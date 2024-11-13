<template>
    <div
        :id="id"
        ref="refElement"
        :class="['scrollable-component', className]"
        @mousedown="handleOnMouseDown"
        @mousemove="handleOnMouseMove"
        @mouseup="handleOnMouseUp"
        @mouseleave="handleOnMouseUp"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    className?: string
    id?: string
}>()

// Reference to the scrollable element
const refElement = ref<HTMLDivElement | null>(null)

// Reactive state
const grabbing = ref(false)
const position = reactive(defaultPosition())

// Mouse event handlers
const handleOnMouseDown = (e: MouseEvent): void => {
    grabbing.value = true
    position.x = e.clientX
    if (refElement.value) {
        position.left = refElement.value.scrollLeft
    }
}

const handleOnMouseMove = (e: MouseEvent): void => {
    if (grabbing.value && refElement.value) {
        const left = Math.max(0, position.left + (position.x - e.clientX))
        refElement.value.scrollLeft = left
    }
}

const handleOnMouseUp = (): void => {
    grabbing.value = false
}
</script>
