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
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    z-index: 1;
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
    z-index: -1;
    mask-image: url('/images/ink_lv2.gif');
    mask-size: cover;
    mask-position: center;
}
</style>
