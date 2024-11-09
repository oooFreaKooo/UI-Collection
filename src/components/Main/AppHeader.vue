<template>
    <v-app-bar
        app
        elevation="0"
        class="nav-blur nav-gradient px-4 mb-3"
    >
        <ScrollProgress />
        <UserAvatar
            :progress="progress"
            :current-theme-icon="currentThemeIcon"
        />
        <v-toolbar-title class="text-h5 font-weight-bold primary--text">
            <span class="mr-1">Creative Nav</span>
            <v-chip
                x-small
                color="primary"
                text-color="white"
                class="ml-1"
            >
                2.0
            </v-chip>
        </v-toolbar-title>

        <v-spacer />

        <NavItem
            v-for="(item, index) in menuItems"
            :key="index"
            :item="item"
            :current-page="currentPage"
            @navigate="handleNavClick"
        />

        <SearchBar
            v-model="searchQuery"
            :show-search="showSearch"
            @toggle="toggleSearch"
        />

        <v-btn
            icon
            class="mx-4"
            @click="toggleTheme"
        >
            <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>

        <UserMenu :user-menu-items="userMenuItems" />

        <LoadingProgress v-if="loading" />
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const progress = ref<number>(0)
const loading = ref<boolean>(false)
const showSearch = ref<boolean>(false)
const searchQuery = ref<string>('')
const currentPage = ref<string>('Welcome')
const isDark = ref<boolean>(false)
const currentThemeIcon = ref<string>('mdi-atom')

const menuItems = ref<Array<{ title: string, icon: string, notifications?: number }>>([
    { title: 'Dashboard', icon: 'mdi-view-dashboard', notifications: 3 },
    { title: 'Analytics', icon: 'mdi-chart-bar' },
    { title: 'Projects', icon: 'mdi-folder-multiple' },
    { title: 'Team', icon: 'mdi-account-group', notifications: 2 },
])

const userMenuItems = ref<Array<{ title: string, icon: string, color: string, badge?: string }>>([
    { title: 'Profile', icon: 'mdi-account', color: 'primary' },
    { title: 'Settings', icon: 'mdi-cog', color: 'grey' },
    { title: 'Messages', icon: 'mdi-email', color: 'blue', badge: '3' },
    { title: 'Logout', icon: 'mdi-logout', color: 'red' },
])

function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}

function handleNavClick (item: { title: string }) {
    loading.value = true
    currentPage.value = item.title
    setTimeout(() => {
        loading.value = false
    }, 1000)
}

function toggleSearch () {
    showSearch.value = !showSearch.value
    if (!showSearch.value) {
        searchQuery.value = ''
    }
}
</script>

<style scoped>
.nav-blur {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.85) !important;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.nav-gradient {
  background: linear-gradient(45deg, rgba(25,118,210,0.05), rgba(25,118,210,0.1));
}
.v-app {
  transition: background-color 0.3s ease;
}
.v-app.theme-transition {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.v-app-bar {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>
