<template>
    <div>
        <h1
            :data-value="originalText"
            @mouseover="handleMouseOver"
        >
            {{ displayText }}
        </h1>
    </div>
</template>

<script setup lang="ts">
// Reactive variables
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const originalText = 'HYPERPLEXED'
const displayText = ref(originalText)

// Animation function
let iteration = 0
const { pause, resume } = useIntervalFn(() => {
    displayText.value = displayText.value
        .split('')
        .map((letter, index) => {
            if (index < iteration) {
                return originalText[index]
            }
            return letters[Math.floor(Math.random() * letters.length)]
        })
        .join('')

    if (iteration >= originalText.length) {
        pause()
        iteration = 0
    }

    iteration += 1 / 3
}, 30, { immediate: false })

// Event handlers
const handleMouseOver = () => {
    iteration = 0
    resume()
}

// Cleanup
onUnmounted(() => {
    pause()
})
</script>

<style scoped>
h1 {
  font-family: 'Space Mono', monospace;
  font-size: clamp(3rem, 10vw, 10rem);
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
