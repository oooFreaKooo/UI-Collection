<template>
    <div
        id="app-background"
        @click="handleOnClick"
    >
        <div
            id="app-background-image"
            class="background-image"
        />
    </div>
</template>

<script setup lang="ts">
const { userStatus, setUserStatusTo } = useUserStatus()

// Handle click to change user status if currently logged out
const handleOnClick = (): void => {
    if (userStatus.value === UserStatus.LoggedOut) {
        setUserStatusTo(UserStatus.LoggingIn)
    }
}
</script>
