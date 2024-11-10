<template>
    <v-menu
        offset-y
        location="bottom end"
        transition="scale-transition"
    >
        <template #activator="{ props }">
            <v-btn
                icon="mdi-account-circle"
                size="x-large"
                v-bind="props"
            />
        </template>

        <v-list>
            <v-list-item
                v-for="(item, index) in userMenuItems"
                :key="index"
                link
                class="mb-2"
            >
                <v-btn
                    :prepend-icon="item.icon"
                    variant="text"
                    :color="item.color"
                >
                    {{ item.title }}
                </v-btn>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts" setup>
defineProps<{
    userMenuItems: Array<{ title: string, icon: string, color: string }>
}>()
</script>

<style scoped>
/* Optional: Customize menu styling here */
</style>
