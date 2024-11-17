<template>
    <div class="main-body">
        <div class="banner">
            <div class="content">
                <div class="title">
                    {{ title }}
                </div>
                <p>{{ subTitle }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: 'PAGE TITLE',
    },
    subTitle: {
        type: String,
        default: 'Background Ink Animation',
    },
})
</script>

<style scoped>
.main-body {
    margin: 0;
    color: #fff;

}

.banner {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.banner .content .title {
    font-family: 'Hallowed Grounds';
    font-size: 9em;
    letter-spacing: 0.05em;
}

.banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/valentin-petrov-m-mal-01.jpg');
    background-size: cover;
    background-position: center;
    animation: bgZoomIn 4s ease-in-out 1 forwards;
    z-index: -1;
    pointer-events: none;
}

.banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/after.png');
    background-size: cover;
    background-position: top;
    transform: scale(2);
    animation: bgZoomOut 4s ease-in-out 1 forwards;
    z-index: -1;
    pointer-events: none;
}

@keyframes bgZoomIn {
from {
  transform: scale(1.2);
}
to {
  transform: scale(1);
}
}

@keyframes bgZoomOut {
from {
  transform: scale(1);
}
to {
  transform: scale(2);
}
}
</style>
