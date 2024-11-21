<template>
    <div class="main-body">
        <div class="carousel">
            <!-- Left Navigation Button -->
            <button
                v-if="active > 0"
                class="nav left"
                @click="setActive(active - 1)"
            >
                <span class="mdi mdi-chevron-left" />
            </button>

            <!-- Cards -->
            <div
                v-for="(card, i) in cards"
                :key="i"
                class="card-container"
                :style="{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'pointer-events': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= maxVisibility ? '0' : '1',
                    'display': Math.abs(active - i) > maxVisibility ? 'none' : 'block',
                }"
            >
                <div class="card">
                    <h2>{{ card.title }}</h2>
                    <p>{{ card.content }}</p>
                </div>
            </div>

            <!-- Right Navigation Button -->
            <button
                v-if="active < cards.length - 1"
                class="nav right"
                @click="setActive(active + 1)"
            >
                <span class="mdi mdi-chevron-right" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    initialActive: {
        type: Number,
        default: 2,
    },
    maxVisibility: {
        type: Number,
        default: 3,
    },
})

// Default 10 cards
const cards = Array.from({ length: 10 }, (_, i) => ({
    title: `Card ${i + 1}`,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}))

// State
const active = ref(props.initialActive)

// Methods
function setActive (index: number) {
    active.value = index
}
</script>

<style scoped lang="scss">
$color-purple: #8B5CF6;
$color-pink: #EC4899;
$color-gray: #9CA3AF;
$color-black: #1F2937;
$card-size: 23rem;

.main-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

* {
  box-sizing: border-box;
}

.carousel {
  position: relative;
  width: $card-size;
  height: $card-size;
  perspective: 500px;
  transform-style: preserve-3d;
}

.card-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transform:
    rotateY(calc(var(--offset) * 50deg))
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -5rem));
  filter: blur(calc(var(--abs-offset) * 1rem));
  transition: all 0.3s ease-out;
}

.card {
  width: 100%;
  min-height: 100%;
  padding: 2rem;
  background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
  border-radius: 1rem;
  color: $color-gray;
  text-align: justify;
  transition: all 0.3s ease-out;

  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.7em;
    color: $color-black;
  }

  p, h2 {
    transition: all 0.3s ease-out;
    opacity: var(--active);
  }
}

.nav {
  color: white;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;

  &.left {
    transform: translateX(-100%) translatey(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translatey(-50%);
  }
}
</style>
