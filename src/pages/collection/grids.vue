<template>
    <div class="content">
        <v-container>
            <v-row>
                <!-- Dropdown to select component -->
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                        v-model="selectedComponent"
                        :items="componentOptions"
                        label="Select Component"
                        item-text="label"
                        item-value="name"
                        outlined
                    />
                </v-col>

                <!-- Button to show code -->
                <v-col
                    cols="12"
                    md="2"
                >
                    <!-- CodeDialog component with dynamic control -->
                    <CodeDialog
                        v-model:show-dialog="showCodeDialog"
                        :title="`${selectedComponent} Code`"
                        :component="selectedComponent"
                    />
                </v-col>
            </v-row>

            <!-- Preview selected component -->
            <component
                :is="selectedComponentInstance"
                v-if="selectedComponentInstance"
            />
        </v-container>
    </div>
</template>

<script lang="ts" setup>
const showCodeDialog = ref(false)
const selectedComponent = ref<string>('')
const selectedComponentInstance = ref(null)
const componentOptions = ref<string[]>([])

// Dynamically import components on mount
onMounted(() => {
    componentOptions.value = [ 'MasonryImages', 'MasonryText' ]
})

watch(selectedComponent, async (newValue) => {
    if (newValue) {
        try {
            const component = await import(`~/components/CSS/Grids/${newValue}.vue`)
            selectedComponentInstance.value = component.default
        } catch {
            selectedComponentInstance.value = null
        }
    } else {
        selectedComponentInstance.value = null
    }
})
</script>

<style scoped>

</style>
