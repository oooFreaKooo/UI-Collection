<template>
    <div
        id="app"
        :style="{
            '--animation-iteration': isLooping ? 'infinite' : '1',
        }"
    >
        <div id="wrapper">
            <h1
                class="glitch"
                data-text="glitch"
            >
                glitch
            </h1>
            <span class="sub">EFFECT</span>
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:100');

h1 {
  font-family: 'Montserrat', sans-serif;
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

#app {
  background: rgb(10,10,10);
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

#wrapper {
  text-align: center;
}

.sub {
  color: rgb(100,220,220);
  letter-spacing: 1em;
}

@mixin glitchCopy {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch {
  position: relative;
  color: white;
  font-size: 4em;
  letter-spacing: .5em;
  animation: glitch-skew 1s var(--animation-iteration) linear alternate-reverse;

  &::before {
    @include glitchCopy;
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s var(--animation-iteration) linear alternate-reverse;
  }

  &::after {
    @include glitchCopy;
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim2 1s var(--animation-iteration) linear alternate-reverse;
  }
}

@keyframes glitch-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      clip: rect(math.div(random(100), 1) + px, 9999px, math.div(random(100), 1) + px, 0);
      transform: skew(math.div(random(100), 100) + deg);
    }
  }
}

@keyframes glitch-anim2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      clip: rect(math.div(random(100), 1) + px, 9999px, math.div(random(100), 1) + px, 0);
      transform: skew(math.div(random(100), 100) + deg);
    }
  }
}

@keyframes glitch-skew {
  $steps: 10;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      transform: skew((math.div(random(10), 1) - 5) + deg);
    }
  }
}
</style>
