<template>
    <div class="banner">
        <SVGStrokeAnimation ref="svgAnimation" />
        <button
            class="replay-button mx-10"
            @click="replayAnimation"
        >
            Replay
        </button>
    </div>
</template>

<script lang="ts" setup>
const svgAnimation = ref()

function replayAnimation () {
    svgAnimation.value?.replayAnimation()
}
</script>

<style scoped>
.banner {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.replay-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.replay-button:hover {
  background-color: #555;
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
