<!-- MainComponent.vue -->
<template>
    <div
        id="app"
        :class="statusClass"
    >
        <Info id="app-info" />
        <Pin />
        <Menu />
        <Background />
        <div id="sign-in-button-wrapper">
            <UserStatusButton
                id="sign-in-button"
                :icon="'mdi mdi-login'"
                :status="UserStatus.LoggingIn"
            />
        </div>
        <Loading />
    </div>
</template>

<script setup lang="ts">
const { userStatus } = useUserStatus()

// Compute dynamic class based on user status
const statusClass = computed(() => {
    return userStatus.value.replace(/\s+/g, '-').toLowerCase()
})
</script>
