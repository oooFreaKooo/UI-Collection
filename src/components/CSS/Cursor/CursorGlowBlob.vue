<template>
    <div
        ref="container"
        class="cursor-effect-container"
    >
        <div
            id="blob"
            ref="blob"
        />
        <div id="blur" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const blob = ref(null)
const container = ref(null)

const handlePointerMove = (event) => {
    if (!container.value || !blob.value) { return }

    // Get the bounding rectangle of the container
    const { left, top } = container.value.getBoundingClientRect()

    // Calculate the mouse position relative to the container
    const relativeX = event.clientX - left
    const relativeY = event.clientY - top

    blob.value.animate(
        {
            left: `${relativeX}px`,
            top: `${relativeY}px`,
        },
        {
            duration: 2000,
            fill: 'forwards',
        },
    )
}

onMounted(() => {
    window.addEventListener('pointermove', handlePointerMove)
})

onUnmounted(() => {
    window.removeEventListener('pointermove', handlePointerMove)
})
</script>

<style scoped>
.cursor-effect-container {
  display: flex;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  position: relative;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: scale(1, 1.5);
  }
  to {
    transform: rotate(360deg);
  }
}

#blob {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24vmax;
  height: 24vmax;
  background: linear-gradient(to right, aquamarine, mediumpurple);
  border-radius: 50%;
  animation: rotate 20s infinite;
  opacity: 0.8;
  overflow: hidden;
}

#blur {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(12vmax);
  z-index: 2;
}
</style>
