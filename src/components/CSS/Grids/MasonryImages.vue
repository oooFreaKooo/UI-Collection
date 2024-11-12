<template>
    <div
        class="list"
    >
        <img
            v-for="(index) in 11"
            :key="index"
            :src="'https://picsum.photos/' + getRandomSize() + '?random=' + index"
            :alt="'Image ' + index"
        >
    </div>
</template>

<script setup lang="ts">
function getRandomSize () {
    const width = Math.floor(Math.random() * 401) + 100
    const height = Math.random() > 0.7 ? width : Math.floor(Math.random() * 401) + 100
    return `${width}/${height}`
}
</script>

<style scoped>
img {
  width: 100%;
  margin-bottom: 1em;
}

.list {
  columns: 300px;
}
</style>
