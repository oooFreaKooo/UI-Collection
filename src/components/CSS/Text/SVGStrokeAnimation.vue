<!-- SVGStrokeAnimation.vue -->
<template>
    <div>
        <SVGIcon
            width="460"
            height="460"
            :class="iconClass"
        />
    </div>
</template>

<script lang="ts" setup>
import SVGIcon from '~/assets/icons/text-example.svg?component'

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
  stroke-width: 1.0;
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: textAnimation 4s ease-in-out 1 forwards;
}

@keyframes textAnimation {
  0% {
    stroke-dashoffset: 420;
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
