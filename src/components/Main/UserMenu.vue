<template>
    <v-menu
        offset-y
        transition="slide-y-transition"
    >
        <template #activator="{ props }">
            <v-btn
                icon
                v-bind="props"
            >
                <v-avatar size="36">
                    <v-img src="https://avatars.dicebear.com/api/avataaars/creative.svg" />
                </v-avatar>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                v-for="(item, index) in userMenuItems"
                :key="index"
                link
                class="mb-1"
            >
                <v-icon
                    :color="item.color"
                    class="mr-2"
                >
                    {{ item.icon }}
                </v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts" setup>
interface UserMenuItem {
    title: string
    icon: string
    color: string
    badge?: string
}

defineProps<{ userMenuItems: UserMenuItem[] }>()
</script>
