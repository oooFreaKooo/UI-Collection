<template>
    <v-progress-linear
        :active="true"
        :indeterminate="true"
        absolute
        bottom
        color="primary"
        class="progress-linear"
    />
</template>

<script lang="ts" setup></script>

<style scoped>
.progress-linear {
  margin: 0;
  position: absolute;
  bottom: 0;
}
</style>
