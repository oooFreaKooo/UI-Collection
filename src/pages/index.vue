<template>
    <PageContent
        :current-page="currentPage"
        :page-info="pageInfo"
        @update:current-page="currentPage = $event"
    />
</template>

<script setup lang="ts">
const currentPage = ref<string>('Welcome')
const pageInfo = ref<Record<string, { status: string, color: string, description: string }>>({
    Dashboard: {
        status: 'Active',
        color: 'success',
        description: 'Overview of your project metrics and key performance indicators',
    },
    Analytics: {
        status: 'Beta',
        color: 'warning',
        description: 'Detailed analysis and insights of your project data',
    },
    Projects: {
        status: 'New',
        color: 'info',
        description: 'Manage and track all your ongoing projects',
    },
    Team: {
        status: 'Updated',
        color: 'primary',
        description: 'Collaborate and manage your team members',
    },
    Welcome: {
        status: '2.0',
        color: 'primary',
        description: 'Welcome to your personalized dashboard experience',
    },
})
</script>

<style scoped>

</style>
