<template>
    <div id="app-menu">
        <div id="app-menu-content-wrapper">
            <div id="app-menu-content">
                <div id="app-menu-content-header">
                    <div class="app-menu-content-header-section">
                        <Info id="app-menu-info" />
                        <Reminder />
                    </div>
                    <div class="app-menu-content-header-section">
                        <UserStatusButton
                            id="sign-out-button"
                            :icon="'mdi mdi-logout'"
                            :status="UserStatus.LoggedOut"
                        />
                    </div>
                </div>
                <QuickNav />
                <Weather />
                <Restaurants />
                <Tools />
                <Movies />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
