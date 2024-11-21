<template>
    <div class="content">
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
                class="h-100 mx-auto my-14"
            />
        </v-container>
    </div>
</template>

<script lang="ts" setup>
const pageFolder = 'Buttons'
const showCodeDialog = ref(false)
const selectedComponent = ref<string>('')
const selectedComponentInstance = ref(null)
const componentOptions = [
    'AnimatedSizes', 'RealisticToggle', 'MorphingPagination', 'IsometricLayerHover', 'AnimatedToggle', '3DToggle', 'MobileMenuToggle', 'AnimatedLikeButton', 'AnimatedCheckbox',
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
.h-100 {
  min-height: 100vh;
}
</style>
