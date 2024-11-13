<template>
    <div
        id="logo"
        ref="logoRef"
    >
        <img
            v-for="(src, index) in imageSources"
            :key="index"
            :src="src"
            draggable="false"
        >
    </div>
</template>

<script setup lang="ts">
const imageSources = [
    'https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+1.svg',
    'https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+2.svg',
    'https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+3.svg',
    'https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+4.svg',
    'https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+5.svg',
]

const logoRef = ref<HTMLElement | null>(null)
const images = ref<HTMLImageElement[]>([])
const active = ref(false)

const shift = (
    image: HTMLImageElement,
    index: number,
    rangeX: number,
    rangeY: number,
) => {
    const translationIntensity = active.value ? 24 : 4
    const maxTranslation = translationIntensity * (index + 1)
    const currentTranslation = `${maxTranslation * rangeX}% ${
        maxTranslation * rangeY
    }%`

    const scale = active.value ? 1 + index * 0.4 : 1

    image.animate(
        {
            translate: currentTranslation,
            scale,
        },
        { duration: 750, fill: 'forwards', easing: 'ease' },
    )
}

const shiftAll = (rangeX: number, rangeY: number) => {
    images.value.forEach((image, index) => shift(image, index, rangeX, rangeY))
}

const shiftLogo = (e: MouseEvent) => {
    if (!logoRef.value) { return }

    const rect = logoRef.value.getBoundingClientRect()
    const radius = 1000

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rangeX = (e.clientX - centerX) / radius
    const rangeY = (e.clientY - centerY) / radius

    shiftAll(rangeX, rangeY)
}

const resetLogo = () => {
    active.value = false
    shiftAll(0.4, -0.7)
}

const handleMouseMove = (e: MouseEvent) => {
    shiftLogo(e)
}

const handleMouseLeave = () => {
    if (!active.value) { resetLogo() }
}

const handleMouseDown = (e: MouseEvent) => {
    active.value = true
    shiftLogo(e)
}

const handleMouseUp = () => {
    resetLogo()
}

onMounted(() => {
    if (!logoRef.value) { return }
    images.value = Array.from(logoRef.value.querySelectorAll('img'))

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    resetLogo()
})

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
    document.body.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
#logo {
  position: relative;
  width: 300px;
  aspect-ratio: 1000 / 556;
  user-select: none;
}

#logo > img {
  width: 100%;
  position: absolute;
}
</style>
