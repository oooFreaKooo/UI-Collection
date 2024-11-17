<template>
    <div class="main-body">
        <h1
            :data-value="originalText"
            @mouseover="handleMouseOver"
        >
            {{ displayText }}
        </h1>
    </div>
</template>

<script setup lang="ts">
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const props = defineProps({
    originalText: {
        type: String,
        default: 'HOVEREFFECT',
    },
})
const displayText = ref(props.originalText)

let iteration = 0
const { pause, resume } = useIntervalFn(() => {
    displayText.value = displayText.value
        .split('')
        .map((letter, index) => {
            if (index < iteration) {
                return props.originalText[index]
            }
            return letters[Math.floor(Math.random() * letters.length)]
        })
        .join('')

    if (iteration >= props.originalText.length) {
        pause()
        iteration = 0
    }

    iteration += 1 / 3
}, 30, { immediate: false })

const handleMouseOver = () => {
    iteration = 0
    resume()
}

onUnmounted(() => {
    pause()
})
</script>

<style scoped>
.main-body{
  width: 100%;
  display: flex;
  justify-content: center;
}

h1 {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1.5rem, 5vw, 5rem);
    color: black;
    padding: 0 clamp(1rem, 2vw, 3rem);
    border-radius: clamp(0.4rem, 0.75vw, 1rem);
    transition: background-color 0.3s, color 0.3s;
}

h1:hover {
  background-color: black;
  color: white;
}
</style>
