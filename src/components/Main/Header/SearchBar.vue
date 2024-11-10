<template>
    <v-slide-x-transition>
        <v-text-field
            v-if="showSearch"
            v-model="searchInput"
            label="Search..."
            prepend-inner-icon="mdi-magnify"
            dense
            hide-details
            outlined
            autofocus
            @keyup.esc="toggle"
        />
    </v-slide-x-transition>
</template>

<script lang="ts" setup>
const props = defineProps({
    showSearch: Boolean,
    searchQuery: String,
})
const emits = defineEmits([ 'toggle', 'update:searchQuery' ])

// Local ref to track input changes
const searchInput = ref(props.searchQuery)

// Emit updates to the parent when local input changes
watch(searchInput, (val) => {
    emits('update:searchQuery', val)
    console.log('Searching for:', val)
})

// Sync searchInput with searchQuery prop changes
watch(
    () => props.searchQuery,
    (newQuery) => {
        searchInput.value = newQuery
    },
)

function toggle () {
    emits('toggle')
}
</script>
