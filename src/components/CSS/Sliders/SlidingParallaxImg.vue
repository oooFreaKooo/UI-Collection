<template>
    <div
        id="image-track"
        :style="{ transform: transformStyle }"
    >
        <img
            v-for="(image, index) in images"
            :key="index"
            class="image"
            :src="`https://picsum.photos/600/200?random=${index}`"
            alt="Random Image"
            draggable="false"
            :style="{ objectPosition }"
        >
    </div>
</template>

<script setup lang="ts">
const images = Array.from({ length: 12 })

const mouseDownAt = ref(0)
const prevPercentage = ref(0)
const percentage = ref(0)

const transformStyle = computed(() => `translate(${percentage.value}% , 0)`)
const objectPosition = computed(() => `${100 + percentage.value}% center`)

const handleOnDown = (event: MouseEvent | TouchEvent) => {
    mouseDownAt.value = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
}

const handleOnUp = () => {
    mouseDownAt.value = 0
    prevPercentage.value = percentage.value
}

const handleOnMove = (event: MouseEvent | TouchEvent) => {
    if (mouseDownAt.value === 0) { return }

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
    const mouseDelta = mouseDownAt.value - clientX
    const maxDelta = window.innerWidth / 2
    const deltaPercentage = (mouseDelta / maxDelta) * -100
    const nextPercentageUnconstrained = prevPercentage.value + deltaPercentage
    percentage.value = Math.max(Math.min(nextPercentageUnconstrained, 0), -100)
}

useEventListener(window, 'mousedown', handleOnDown)
useEventListener(window, 'mouseup', handleOnUp)
useEventListener(window, 'mousemove', handleOnMove)
useEventListener(window, 'touchstart', handleOnDown)
useEventListener(window, 'touchend', handleOnUp)
useEventListener(window, 'touchmove', handleOnMove)
</script>

<style scoped>
#image-track {
  display: flex;
  gap: 2vmin;
  user-select: none;
  transition: transform 1.0s ease;
}

#image-track > .image {
  width: 30vmin;
  height: 46vmin;
  object-fit: cover;
  transition: object-position 1.0s ease;
}
</style>
