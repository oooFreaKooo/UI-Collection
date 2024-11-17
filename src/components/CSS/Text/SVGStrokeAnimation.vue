<template>
    <SVGIcon
        :width="svgWidth"
        :height="svgHeight"
        :class="iconClass"
    />
</template>

<script lang="ts" setup>
import SVGIcon from '~/assets/icons/text-example.svg?component'

defineProps({
    svgWidth: {
        type: String,
        default: '100%',
    },
    svgHeight: {
        type: String,
        default: '500px',
    },
    strokeWidth: {
        type: Number,
        default: 1.0,
    },
    strokeDasharray: {
        type: Number,
        default: 420,
    },
    strokeDashoffset: {
        type: Number,
        default: 420,
    },
    duration: {
        type: String,
        default: '4s',
    },
})
const iconClass = ref('icon-animation')

function replayAnimation () {
    iconClass.value = ''
    requestAnimationFrame(() => {
        iconClass.value = 'icon-animation'
    })
}

defineExpose({ replayAnimation })
</script>

<style scoped>
.icon-animation {
  fill: transparent;
  stroke: #ffffff;
  stroke-width: v-bind('strokeWidth');
  stroke-dasharray: v-bind('strokeDasharray');
  stroke-dashoffset: v-bind('strokeDashoffset');
  animation: textAnimation v-bind('duration') ease-in-out 1 forwards;
}

@keyframes textAnimation {
  0% {
    stroke-dashoffset: v-bind('strokeDashoffset');
  }
  80% {
    fill: transparent;
  }
  100% {
    fill: #fff;
    stroke-dashoffset: 0;
  }
}
</style>
