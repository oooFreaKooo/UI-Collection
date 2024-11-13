<template>
    <div
        id="cards"
        class="body"
    >
        <div
            v-for="(card, index) in cards"
            :key="index"
            class="card"
            :data-color="card.color"
            @mouseenter="setBackgroundColor(card.color)"
            @mouseleave="resetBackgroundColor"
        >
            <img
                class="card-front-image card-image"
                :src="card.frontImage"
                alt="Card Front"
            >
            <div class="card-faders">
                <img
                    v-for="(image, idx) in card.faderImages"
                    :key="idx"
                    class="card-fader card-image"
                    :src="image"
                    alt="Card Fader"
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Card {
    color: string
    frontImage: string
    faderImages: string[]
}

const cards = ref<Card[]>([
    {
        color: 'blue',
        frontImage:
          'https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80',
        faderImages: Array(8).fill(
            'https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80',
        ),
    },
    {
        color: 'green',
        frontImage:
          'https://assets.codepen.io/1468070/game+cover+-+minecraft.png?format=auto&quality=80',
        faderImages: Array(8).fill(
            'https://assets.codepen.io/1468070/game+cover+-+minecraft.png?format=auto&quality=80',
        ),
    },
    {
        color: 'brown',
        frontImage:
          'https://assets.codepen.io/1468070/game+cover+-+tetris.png?format=auto&quality=80',
        faderImages: Array(8).fill(
            'https://assets.codepen.io/1468070/game+cover+-+tetris.png?format=auto&quality=80',
        ),
    },
])

const backgroundColor = ref('black')

function setBackgroundColor (color: string) {
    switch (color) {
        case 'blue':
            backgroundColor.value = 'rgba(92, 192, 249, 0.25)'
            break
        case 'green':
            backgroundColor.value = 'rgba(125, 161, 35, 0.25)'
            break
        case 'brown':
            backgroundColor.value = 'rgba(127, 46, 23, 0.25)'
            break
        default:
            backgroundColor.value = 'black'
    }
}

function resetBackgroundColor () {
    backgroundColor.value = 'black'
}

onMounted(() => {
    document.getElementById('cards')!.style.backgroundColor = backgroundColor.value
})

watch(backgroundColor, (newColor) => {
    document.getElementById('cards')!.style.backgroundColor = newColor
})
</script>

<style scoped>
* {
--blue-rgb: 92 192 249;
--green-rgb: 125 161 35;
--brown-rgb: 127 46 23;
}

.body {
  background-color: black;
}

.body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 1000ms;
}

#cards {
width: 100%;
display: flex;
justify-content: space-evenly;
}

.card {
background-size: cover;
background-position: center;
position: relative;
cursor: pointer;
outline: none;
transition: transform 100ms;
}

.card .card-front-image {
position: relative;
z-index: 2;
}

.card .card-image {
width: clamp(300px, 10vw, 500px);
aspect-ratio: 2 / 3;
border-radius: clamp(0.5rem, 0.75vw, 2rem);
}

.card-faders {
height: 100%;
width: 100%;
position: absolute;
left: 0px;
top: 0px;
z-index: 1;
opacity: 0;
transition: opacity 1500ms;
pointer-events: none;
}

.card:hover .card-faders {
opacity: 1;
}

.card:active {
transform: scale(0.98);
}

.card-fader {
position: absolute;
left: 0px;
top: 0px;
}

.card-fader:nth-child(odd) {
animation: fade-left 3s linear infinite;
}

.card-fader:nth-child(even) {
animation: fade-right 3s linear infinite;
}

.card-fader:is(:nth-child(3), :nth-child(4)) {
animation-delay: 750ms;
}

.card-fader:is(:nth-child(5), :nth-child(6)) {
animation-delay: 1500ms;
}

.card-fader:is(:nth-child(7), :nth-child(8)) {
animation-delay: 2250ms;
}

@media (max-width: 1200px) {
body {
  justify-content: flex-start;
  align-items: flex-start;
}

#cards {
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 4rem;
}

.card .card-image {
  width: 400px;
}
}

@media (max-width: 600px) {
#cards {
  gap: 2rem;
  padding: 2rem;
}

.card {
  width: 80%;
}

.card .card-image {
  width: 100%;
}
}

@keyframes fade-left {
from {
  transform: scale(1) translateX(0%);
  opacity: 1;
}

to {
  transform: scale(0.8) translateX(-30%);
  opacity: 0;
}
}

@keyframes fade-right {
from {
  transform: scale(1) translateX(0%);
  opacity: 1;
}

to {
  transform: scale(0.8) translateX(30%);
  opacity: 0;
}
}
</style>
