<template>
    <v-card rounded="0">
        <v-layout>
            <v-app-bar
                color="primary"
                prominent
            >
                <v-app-bar-nav-icon
                    variant="text"
                    @click.stop="drawer = !drawer"
                />

                <v-toolbar-title>UI Collection</v-toolbar-title>

                <v-spacer />

                <template v-if="$vuetify.display.mdAndUp">
                    <v-btn
                        icon
                        class="mx-4"
                        @click="toggleTheme"
                    >
                        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
                    </v-btn>

                    <v-btn
                        class="mx-4"
                        icon="mdi-magnify"
                    />
                </template>
                <div class="me-4">
                    <UserMenu :user-menu-items="userMenuItems" />
                </div>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                :location="$vuetify.display.mobile ? 'top' : undefined"
                temporary
            >
                <v-list
                    :items="menuItems"
                />
            </v-navigation-drawer>

            <v-main style="height: 100vh;">
                <slot />
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
const drawer = ref<boolean>(false)
const isDark = ref<boolean>(false)

const menuItems = ref<Array<{ title: string, icon: string, href?: string }>>([
    { title: 'Collection', icon: 'mdi-view-dashboard', href: 'collection' },
    { title: 'Analytics', icon: 'mdi-chart-bar' },
    { title: 'Projects', icon: 'mdi-folder-multiple' },
    { title: 'Team', icon: 'mdi-account-group' },
])

const userMenuItems = ref<Array<{ title: string, icon: string, color: string }>>([
    { title: 'Profile', icon: 'mdi-account', color: 'primary' },
    { title: 'Settings', icon: 'mdi-cog', color: 'grey' },
    { title: 'Messages', icon: 'mdi-email', color: 'blue' },
    { title: 'Logout', icon: 'mdi-logout', color: 'red' },
])

function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped lang="scss">
.bg-background {
  position: relative;
  z-index: 1;
}
</style>
