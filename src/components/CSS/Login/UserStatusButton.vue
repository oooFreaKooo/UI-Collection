<template>
    <button
        :id="id"
        class="user-status-button clear-button"
        :disabled="userStatus === status"
        type="button"
        @click="handleOnClick"
    >
        <i :class="icon" />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string
    id: string
    status: UserStatus
}>()

// Destructure user status and status-setting method from the composable
const { userStatus, setUserStatusTo } = useUserStatus()

// Handle button click to update the user status
const handleOnClick = (): void => {
    setUserStatusTo(props.status)
}
</script>
