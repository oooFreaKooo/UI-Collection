<template>
    <div class="body">
        <div class="card-track">
            <div class="card-wrapper">
                <div
                    ref="cardRef"
                    class="card"
                    @mousemove="handleOnMove"
                    @touchmove="handleOnTouchMove"
                >
                    <div class="card-image">
                        <img src="https://assets.codepen.io/1468070/Hyperplexed+Logo+-+Color+5.svg">
                    </div>
                    <div class="card-gradient" />
                    <div
                        ref="lettersRef"
                        class="card-letters"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const chars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const lettersRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)

const randomChar = () =>
    chars[Math.floor(Math.random() * chars.length)]

const randomString = (length: number) =>
    Array.from({ length }, randomChar).join('')

function handleOnMove (e: MouseEvent) {
    if (!cardRef.value || !lettersRef.value) { return }

    const rect = cardRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    lettersRef.value.style.setProperty('--x', `${x}px`)
    lettersRef.value.style.setProperty('--y', `${y}px`)

    lettersRef.value.textContent = randomString(1500)
}

function handleOnTouchMove (e: TouchEvent) {
    if (e.touches.length > 0) {
        handleOnMove(e.touches[0] as any)
    }
}
</script>

<style scoped>
.body {
  background: rgb(var(--background-rgb));
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
  font-family: 'Noto Sans', sans-serif;
}

* {
  --background-rgb: 2, 6, 23;
  --background-light-rgb: 30, 41, 59;

  --border-rgb: 255, 255, 255;
  --border: 1px solid rgba(var(--border-rgb), 0.2);

  --hyperplexed-main-rgb: 41, 121, 255;
  --hyperplexed-main-light-rgb: 56, 182, 255;
  --hyperplexed-secondary-rgb: 42, 252, 152;

  --card-size: 480px;
  --font-size: 0.8rem;
  --logo-size: calc(var(--card-size) * 0.3);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card-track {
  height: 100%;
  width: var(--card-size);
  display: flex;
  align-items: center;
  position: relative;
}

.card-wrapper {
  width: 100%;
  position: relative;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  position: relative;
  margin: 1rem;
  border-radius: 2rem;
  overflow: hidden;
  cursor: pointer;
}

.card-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 4;
}

.card-image > img {
  width: var(--logo-size);
}

.card-gradient {
  height: 100%;
  width: 100%;
  position: absolute;
  background: radial-gradient(
    rgb(var(--background-light-rgb)) 40%,
    rgb(var(--hyperplexed-main-rgb)) 50%,
    rgb(var(--hyperplexed-main-light-rgb)),
    rgb(var(--hyperplexed-secondary-rgb))
  );
  mix-blend-mode: darken;
  pointer-events: none;
  z-index: 3;
}

.card-letters {
  --x: 0px;
  --y: 0px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  color: white;
  font-size: var(--font-size);
  font-weight: 500;
  word-wrap: break-word;
  opacity: 0;
  transition: opacity 400ms;
  mask-image: radial-gradient(
    calc(var(--card-size) * 0.8) circle at var(--x) var(--y),
    rgb(255, 255, 255) 20%,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transform: scale(1.03);
}

.card:hover .card-letters {
  opacity: 1;
}

@media (max-width: 600px) {
  :root {
    --card-size: 340px;
  }

  .card {
    border-radius: 1rem;
  }
}

/* -- Extra Styles -- */

.card-track::before,
.card-track::after {
  content: '';
  height: 100vh;
  width: 1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.card-track::before {
  left: -1px;
  border-left: var(--border);
}

.card-track::after {
  right: -1px;
  border-right: var(--border);
}

.card-wrapper::before,
.card-wrapper::after {
  content: '';
  width: 100vw;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.card-wrapper::before {
  top: -1px;
  border-top: var(--border);
}

.card-wrapper::after {
  bottom: -1px;
  border-bottom: var(--border);
}

.card-corners {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  pointer-events: none;
}

.card-corners > .card-corner {
  display: block;
  height: 9px;
  width: 1px;
  position: absolute;
  background-color: white;
}

.card-corners > .card-corner::after {
  content: '';
  width: 9px;
  height: 1px;
  position: absolute;
  left: -4px;
  top: 4px;
  background-color: white;
}

.card-corners > .card-corner:nth-child(1) {
  left: -1px;
  top: -5px;
}

.card-corners > .card-corner:nth-child(2) {
  right: -1px;
  top: -5px;
}

.card-corners > .card-corner:nth-child(3) {
  right: -1px;
  bottom: -5px;
}

.card-corners > .card-corner:nth-child(4) {
  left: -1px;
  bottom: -5px;
}
</style>
