<template>
    <div :class="['app-pin-digit', { focused, hidden }]">
        <span class="app-pin-digit-value">{{ value || '' }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, defineProps } from 'vue'

// Define props
const props = defineProps<{
    focused: boolean
    value: string
}>()

// Reactive state for hidden
const hidden = ref(false)
let timeout: ReturnType<typeof setTimeout>

// Watch for changes in the `value` prop
watch(
    () => props.value,
    (newValue) => {
        if (newValue) {
            hidden.value = false
            timeout = setTimeout(() => {
                hidden.value = true
            }, 500)
        } else {
            hidden.value = false
        }
    },
)

// Clear timeout on component unmount
onBeforeUnmount(() => {
    clearTimeout(timeout)
})
</script>
