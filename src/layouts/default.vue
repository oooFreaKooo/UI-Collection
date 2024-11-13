<template>
    <v-card rounded="0">
        <v-layout>
            <v-app-bar
                color="primary"
            >
                <!-- Navigation drawer toggle button for small screens -->
                <v-app-bar-nav-icon
                    v-if="$vuetify.display.smAndDown"
                    @click.stop="drawer = !drawer"
                />

                <!-- Title with link -->
                <NuxtLink
                    to="/"
                    style="text-decoration: none; color: inherit;"
                    class="mx-8"
                >
                    <v-toolbar-title>UI Collection</v-toolbar-title>
                </NuxtLink>
                <template v-if="$vuetify.display.mdAndUp">
                    <NuxtLink
                        v-for="(item, index) in menuItems"
                        :key="index"
                        :to="`/${(item.href || '').replace(/^\//, '')}`"
                        style="text-decoration: none; color: inherit;"
                        class="mx-4"
                    >
                        {{ item.title }}
                    </NuxtLink>
                </template>

                <v-spacer />

                <!-- Theme toggle and search button only shown on medium and larger screens -->
                <template v-if="$vuetify.display.mdAndUp">
                    <ThemeToggle />
                    <v-btn
                        class="mx-4"
                        icon="mdi-magnify"
                    />
                </template>

                <!-- User menu -->
                <div class="me-4">
                    <UserMenu :user-menu-items="userMenuItems" />
                </div>
            </v-app-bar>

            <!-- Navigation drawer for small screens -->
            <v-navigation-drawer
                v-model="drawer"
                :temporary="true"
                location="start"
                class="sm-drawer"
            >
                <v-list>
                    <!-- Theme toggle and search button at the top inside the drawer -->
                    <div class="drawer-header mt-4">
                        <ThemeToggle />
                        <v-btn
                            class="mx-2"
                            icon="mdi-magnify"
                        />
                    </div>
                    <v-divider />

                    <!-- Menu items -->
                    <v-list-item
                        v-for="(item, index) in menuItems"
                        :key="index"
                        link
                        class="mb-2"
                    >
                        <NuxtLink
                            :to="item.href"
                            style="text-decoration: none; color: inherit;"
                        >
                            <v-icon
                                :color="item.color"
                                class="mx-2"
                            >
                                {{ item.icon }}
                            </v-icon>
                            {{ item.title }}
                        </NuxtLink>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <!-- Main content -->
            <v-main style="height: 100%;">
                <slot />
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
const drawer = ref<boolean>(false)

const menuItems = ref<Array<{ title: string, icon: string, href?: string, color?: string }>>([
    { title: 'Collection', icon: 'mdi-view-dashboard', href: 'collection', color: 'primary' },
    { title: 'Analytics', icon: 'mdi-chart-bar', color: 'secondary' },
    { title: 'Projects', icon: 'mdi-folder-multiple', color: 'blue' },
    { title: 'Team', icon: 'mdi-account-group', color: 'red' },
])

const userMenuItems = ref<Array<{ title: string, icon: string, color: string }>>([
    { title: 'Profile', icon: 'mdi-account', color: 'primary' },
    { title: 'Settings', icon: 'mdi-cog', color: 'grey' },
    { title: 'Messages', icon: 'mdi-email', color: 'blue' },
    { title: 'Logout', icon: 'mdi-logout', color: 'red' },
])
</script>

<style scoped lang="scss">

</style>
