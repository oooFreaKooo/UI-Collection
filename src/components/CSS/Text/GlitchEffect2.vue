<template>
    <div class="main-body">
        <div class="wrapper">
            <h1
                class="glitch"
                :class="{ loop: isLooping }"
                :style="{
                    '--dynamic-text': `'${text}'`,
                }"
            >
                {{ text }}
            </h1>
        </div>
        <button
            v-if="!isLooping"
            @click="isLooping = true"
        >
            Loop
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    text: { type: String, default: 'Glitch Text' },
    loop: { type: Boolean, default: false },
})

const isLooping = ref(props.loop)

watch(
    () => props.loop,
    (newVal) => {
        isLooping.value = newVal
    },
)
</script>

<style scoped lang="scss">
@use "sass:math";

$content: v-bind('text');
.main-body {
  width: 100%;
  height: 100%;
  background-color: black;
}

button {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1.glitch {
  color: white;
  font-family: sans-serif;
  font-weight: 800;
  position: relative;
  font-size: 100px;
  padding: 30px;

  &::before,
  &::after {
    padding: 30px;
    color: white;
    content: var(--dynamic-text);
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    overflow: hidden;
    top: 0;
  }

  &::before {
    left: 3px;
    text-shadow: -2px 0 red;
    animation-name: glitch-animation-1;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse-alternate;
  }

  &::after {
    left: -3px;
    text-shadow: -2px 0 blue;
    animation-name: glitch-animation-2;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: reverse-alternate;
  }

  &.loop::before,
  &.loop::after {
    animation-iteration-count: infinite;
  }

  &:not(.loop)::before,
  &:not(.loop)::after {
    animation-iteration-count: 1;
  }
}

@keyframes glitch-animation-1 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      clip: rect(math.div(random(150), 1) + px, 1000px, math.div(random(150), 1) + px, 30px);
    }
  }
}

@keyframes glitch-animation-2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      clip: rect(math.div(random(150), 1) + px, 1000px, math.div(random(150), 1) + px, 30px);
    }
  }
}
</style>
