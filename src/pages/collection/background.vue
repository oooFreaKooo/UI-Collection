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
            />
        </v-container>
    </div>
</template>

<script lang="ts" setup>
const pageFolder = 'Background'
const showCodeDialog = ref(false)
const selectedComponent = ref<string>('')
const selectedComponentInstance = ref(null)
const componentOptions = [
    'GsapScrollSVGMask', 'IncAnimation', 'OpenerAnimation',
]

// Watch for component selection changes
watch(
    selectedComponent,
    async (newValue) => {
        if (newValue) {
            try {
                const component = await import(`~/components/CSS/${pageFolder}/${newValue}.vue`)
                selectedComponentInstance.value = markRaw(component.default)
            } catch (error) {
                console.error(`Error loading component ${newValue}:`, error)
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

</style>
