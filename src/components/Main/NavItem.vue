<template>
    <v-hover>
        <v-btn
            :ripple="false"
            class="nav-item-hover mx-2"
            :class="{ 'primary--text': isActive }"
            @click="navigate"
        >
            <v-icon
                left
                :class="{ 'notification-pulse': item?.notifications }"
            >
                {{ item?.icon }}
            </v-icon>
            {{ item?.title }}
            <v-scale-transition>
                <v-badge
                    v-if="item?.notifications"
                    :content="item.notifications"
                    color="error"
                    class="ml-2 notification-badge"
                />
            </v-scale-transition>
        </v-btn>
    </v-hover>
</template>

<script lang="ts" setup>
interface MenuItem {
    title?: string
    icon?: string
    notifications?: number
}

const props = defineProps<{
    item: MenuItem | undefined
    currentPage: string
}>()

const emits = defineEmits(['navigate'])

const isActive = computed(() => props.currentPage === props.item?.title)

function navigate () {
    emits('navigate', props.item)
}
</script>

<style scoped>
.nav-item-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
}
.nav-item-hover:hover {
  transform: translateY(-2px) rotateX(5deg);
  box-shadow: 0 5px 15px rgba(var(--v-primary-base), 0.2);
}
.notification-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.notification-badge {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
</style>
