<template>
    <v-row>
        <!-- Dropdown to select component -->
        <v-col
            cols="6"
            md="4"
        >
            <v-select
                v-model="localSelectedComponent"
                :items="componentOptions"
                label="Select Component"
                item-text="label"
                item-value="name"
                outlined
                variant="solo-filled"
            />
        </v-col>

        <!-- Navigation Buttons -->
        <v-col
            cols="6"
            md="4"
        >
            <v-btn
                :disabled="!hasPrev"
                color="warning"
                class="my-1"
                @click="prevComponent"
            >
                Prev
            </v-btn>
            <v-btn
                :disabled="!hasNext"
                class="my-1"
                color="success"
                @click="nextComponent"
            >
                Next
            </v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
const props = defineProps({
    componentOptions: {
        type: Array as () => string[],
        required: true,
    },
    modelValue: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['update:modelValue'])

const localSelectedComponent = ref<string>(props.modelValue)

const hasPrev = computed(() => {
    const currentIndex = props.componentOptions.indexOf(localSelectedComponent.value)
    return currentIndex > 0
})

const hasNext = computed(() => {
    const currentIndex = props.componentOptions.indexOf(localSelectedComponent.value)
    return currentIndex < props.componentOptions.length - 1
})

const prevComponent = () => {
    const currentIndex = props.componentOptions.indexOf(localSelectedComponent.value)
    if (currentIndex > 0) {
        localSelectedComponent.value = props.componentOptions[currentIndex - 1]
    }
}

const nextComponent = () => {
    const currentIndex = props.componentOptions.indexOf(localSelectedComponent.value)
    if (currentIndex < props.componentOptions.length - 1) {
        localSelectedComponent.value = props.componentOptions[currentIndex + 1]
    }
}

watch(localSelectedComponent, (newValue) => {
    emits('update:modelValue', newValue)
})

onMounted(() => {
    if (!localSelectedComponent.value && props.componentOptions.length) {
        localSelectedComponent.value = props.componentOptions[0]
    }
})
</script>

<style>

</style>
