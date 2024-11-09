<template>
    <v-main>
        <v-container fluid>
            <transition
                name="page-transition"
                mode="out-in"
            >
                <v-row
                    :key="currentPage"
                    justify="center"
                    align="center"
                    style="height: 80vh"
                >
                    <v-col
                        cols="12"
                        class="text-center"
                    >
                        <v-scale-transition>
                            <h1 class="text-h2 primary--text font-weight-light">
                                {{ currentPage }}
                                <v-chip
                                    v-if="pageInfo[currentPage]"
                                    class="ml-2"
                                    :color="pageInfo[currentPage].color"
                                    text-color="white"
                                    small
                                >
                                    {{ pageInfo[currentPage].status }}
                                </v-chip>
                            </h1>
                        </v-scale-transition>

                        <v-fade-transition>
                            <p
                                v-if="pageInfo[currentPage]"
                                class="text-subtitle-1 grey--text mt-2"
                            >
                                {{ pageInfo[currentPage].description }}
                            </p>
                        </v-fade-transition>

                        <v-btn
                            v-if="currentPage !== 'Welcome'"
                            color="primary"
                            class="mt-4 menu-hover"
                            @click="goToWelcome"
                        >
                            <v-icon left>
                                mdi-arrow-left
                            </v-icon>
                            Back to Welcome
                        </v-btn>
                    </v-col>
                </v-row>
            </transition>
        </v-container>
    </v-main>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

interface PageInfo {
    status: string
    color: string
    description: string
}

defineProps<{
    currentPage: string
    pageInfo: Record<string, PageInfo>
}>()

const emits = defineEmits(['update:currentPage'])

function goToWelcome () {
    emits('update:currentPage', 'Welcome')
}
</script>

<style scoped>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-transition-enter,
.page-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.menu-hover {
  transition: transform 0.3s ease;
}
.menu-hover:hover {
  transform: scale(1.05);
}
</style>
