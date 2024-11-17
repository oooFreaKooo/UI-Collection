<template>
    <div class="banner">
        <v-container>
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
const componentOptions = [
    'InteractiveTitleAnimation', 'SVGStrokeAnimation', 'SparkleText', 'GlitchEffect1', 'GlitchEffect2', 'GlitchEffect3',
]

// Watch for component selection changes
watch(
    selectedComponent,
    async (newValue) => {
        if (newValue) {
            try {
                const component = await import(`~/components/CSS/${pageFolder}/${newValue}.vue`)
                selectedComponentInstance.value = markRaw(component.default)
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

.dynamic-component {
    position: relative;
    display: flex;
    align-items: center;
    height: 50%;
}
</style>
