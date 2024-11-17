<template>
    <div class="sparkle-text">
        <h1>
            To live is to suffer, to survive is to find
            <span class="magic">
                <span
                    v-for="n in 3"
                    :key="n"
                    class="magic-star"
                >
                    <svg viewBox="0 0 512 512">
                        <path
                            d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
                        />
                    </svg>
                </span>
                <span class="magic-text">some meaning</span>
            </span>
            in the suffering.
        </h1>
    </div>
</template>

<script setup lang="ts">
const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

const animate = (star: HTMLElement) => {
    star.style.setProperty('--star-left', `${rand(-10, 100)}%`)
    star.style.setProperty('--star-top', `${rand(-40, 80)}%`)
    star.style.animation = 'none'
    void star.offsetHeight // Trigger reflow without error
    star.style.animation = ''
}

onMounted(() => {
    const stars = document.getElementsByClassName('magic-star')
    let index = 0
    const interval = 1000

    Array.from(stars).forEach((star) => {
        setTimeout(() => {
            animate(star as HTMLElement)
            setInterval(() => animate(star as HTMLElement), interval)
        }, index++ * (interval / 3))
    })
})
</script>

<style scoped>
.sparkle-text {
  --purple: rgb(123, 31, 162);
  --violet: rgb(103, 58, 183);
  --pink: rgb(244, 143, 177);
}

@keyframes background-pan {
  from {
    background-position: 0% center;
  }

  to {
    background-position: -200% center;
  }
}

@keyframes scale {
  from, to {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

h1 {
  font-family: 'Space Mono';
  font-size: clamp(2em, 2vw, 4em);
  font-weight: 400;
  margin: 0px;
  padding: 20px;
  text-align: center;
}

h1 > .magic {
  display: inline-block;
  position: relative;
}

h1 > .magic > .magic-star {
  --size: clamp(20px, 1.5vw, 30px);

  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

h1 > .magic > .magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

h1 > .magic > .magic-star > svg > path {
  fill: var(--violet);
}

h1 > .magic > .magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    var(--purple),
    var(--violet),
    var(--pink),
    var(--purple)
  );
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
</style>
