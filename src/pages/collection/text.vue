<template>
    <div class="banner">
        <v-container>
            <!-- Use the Selector component -->
            <Selector
                v-model="selectedComponent"
                :component-options="componentOptions"
            />

            <CodeDialog
                v-model:show-dialog="showCodeDialog"
                :title="`${selectedComponent} Code`"
                :component="selectedComponent"
                :collection="pageFolder"
                type="CSS"
            />

            <!-- Preview selected component -->
            <component
                :is="selectedComponentInstance"
                v-if="selectedComponentInstance"
                class="dynamic-component"
            />
        </v-container>
    </div>
</template>

<script lang="ts" setup>
const pageFolder = 'Text'
const showCodeDialog = ref(false)
const selectedComponent = ref<string>('')
const selectedComponentInstance = ref(null)
const componentOptions = [ 'InteractiveTitleAnimation', 'SVGStrokeAnimation' ]

// Watch for component selection changes
watch(
    selectedComponent,
    async (newValue) => {
        if (newValue) {
            try {
                const component = await import(`~/components/CSS/${pageFolder}/${newValue}.vue`)
                selectedComponentInstance.value = component.default
            } catch {
                selectedComponentInstance.value = null
            }
        } else {
            selectedComponentInstance.value = null
        }
    },
    { immediate: true },
)
</script>

<style scoped>
.banner {
    height: 100vh;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.banner .dynamic-component {
    display: flex;
    align-items: center;
    height: 70%;
}

.banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/valentin-petrov-m-mal-01.jpg');
    background-size: cover;
    background-position: center;
    animation: bgZoomIn 4s ease-in-out 1 forwards;
    z-index: -1;
    pointer-events: none;
}

.banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/after.png');
    background-size: cover;
    background-position: top;
    transform: scale(2);
    animation: bgZoomOut 4s ease-in-out 1 forwards;
    z-index: -1;
    pointer-events: none;
}

@keyframes bgZoomIn {
from {
  transform: scale(1.2);
}
to {
  transform: scale(1);
}
}

@keyframes bgZoomOut {
from {
  transform: scale(1);
}
to {
  transform: scale(2);
}
}
</style>
