<template>
    <div class="main-body">
        <div class="wrap">
            <div
                ref="cardShadow"
                class="card-shadow"
            />
            <div
                ref="card"
                class="card"
            >
                <div class="card-front">
                    <div
                        ref="cardTitle"
                        class="card-title"
                    >
                        3D perspective title
                    </div>
                    <div
                        ref="cardSubtitle"
                        class="card-subtitle"
                    >
                        3D perspective subtitle
                    </div>
                    <div
                        ref="cardShine"
                        class="card-shine"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Refs for elements
const card = ref<HTMLElement | null>(null)
const cardTitle = ref<HTMLElement | null>(null)
const cardSubtitle = ref<HTMLElement | null>(null)
const cardShine = ref<HTMLElement | null>(null)
const cardShadow = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!card.value || !cardTitle.value || !cardSubtitle.value || !cardShine.value || !cardShadow.value) { return }

    const currentMousePos = { x: 0, y: 0 }
    const mouseFromCenter = { x: 0, y: 0 }

    document.addEventListener('mousemove', (event) => {
        const wHeight = window.innerHeight
        const wWidth = window.innerWidth

        currentMousePos.x = event.pageX
        currentMousePos.y = event.pageY
        mouseFromCenter.x = currentMousePos.x - wWidth / 2
        mouseFromCenter.y = currentMousePos.y - wHeight / 2

        const around1 = `${-1 * (currentMousePos.y * 100 / wHeight * 0.2 - 10)}deg`
        const around2 = `${1 * (currentMousePos.x * 100 / wWidth * 0.2 - 10)}deg`
        const trans1 = `${currentMousePos.x * 100 / wHeight * 0.3}px`
        const trans2 = `${currentMousePos.y * 100 / wHeight * 0.3}px`
        const dy = event.pageY - wHeight / 2
        const dx = event.pageX - wWidth / 2
        const theta = Math.atan2(dy, dx)
        const angle = theta * 180 / Math.PI - 90
        const mousePositionX = (currentMousePos.x / wWidth) * 100
        const mousePositionY = 50 + (currentMousePos.y / wHeight) * 10

        // Gradient angle and opacity for card shine effect
        cardShine.value!.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${(currentMousePos.y / wHeight) * 0.7}) 0%,rgba(255,255,255, 0) 80%)`

        // Card position and angle
        card.value!.style.transform = `translate3d(${trans1}, ${trans2}, 0) scale(1) rotateX(${around1}) rotateY(${around2})`
        card.value!.style.backgroundPosition = `${mousePositionX}% ${(currentMousePos.y / wHeight) * 50}%`
        card.value!.style.backgroundPosition = `${mousePositionX}% ${mousePositionY}%`

        // Card shadow position and angle
        cardShadow.value!.style.transform = `scale(0.9, 0.9) translateX(${mouseFromCenter.x * -0.02 + 12}px) translateY(${mouseFromCenter.y * -0.02 + 12}px) scale(1.0) rotateY(${(mouseFromCenter.x / 25) * 0.5}deg) rotateX(${mouseFromCenter.y / -25}deg)`

        // Card title position
        cardTitle.value!.style.transform = `translateX(${(mouseFromCenter.x / 25) * 0.7}px) translateY(${(mouseFromCenter.y / 25) * 1.65}px)`

        // Card subtitle position
        cardSubtitle.value!.style.transform = `translateX(${(mouseFromCenter.x / 25) * 0.5}px) translateY(${(mouseFromCenter.y / 25) * 1.15}px) translateZ(60px)`
    })
})
</script>

<style scoped lang="scss">
$clip: -0px;
@import url('https://fonts.googleapis.com/css?family=Roboto');

.main-body {
  --background-color: var(--color-background, #fff);
  --text-color: var(--color-text, #fff);
  --accent-color: var(--color-accent, rgba(255, 255, 255, 0.1));
  --shadow-color: var(--color-shadow, rgba(0, 0, 0, 0.5));
  --card-shadow-color: var(--color-card-shadow, rgba(0, 0, 0, 0.4));
  --shine-color: var(--color-shine, rgba(255, 255, 255, 0.1));
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  transform-style: preserve-3d;
  perspective: 800px;
  background: inherit;
}

.wrap {
  position: absolute;
  perspective: 600px;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.card-shadow,
.card {
  margin: 0 auto;
  margin-top: 100px;
  width: 300px;
  height: 450px;
  z-index: 1;
  position: absolute;
  border-radius: 10px;
  top: $clip;
  bottom: $clip;
  left: $clip;
  right: $clip;
}

.card {
  background: var(--background-color) url('https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?fit=crop&fm=jpg&h=950&q=80&w=1925')
    50% 50%;
  background-size: 450%;
}

.card-shine {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 1;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    var(--shine-color) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  z-index: -1;
}

.card-shadow {
  top: 10px;
  transform-style: preserve-3d;
  transform: translateZ(40px);
  z-index: -1;
  background: var(--card-shadow-color);
  transform: scale(0.5, 0.5);
  box-shadow: 0 0 25px 10px var(--shadow-color);
}

.card-front,
.card-title,
.card-subtitle {
  position: absolute;
  color: var(--text-color);
  transform-style: preserve-3d;
}

.card-front {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.1); // Assuming a subtle overlay
}

.card-title {
  font-weight: 700;
  text-align: left;
  left: 30px;
  bottom: 140px;
  font-size: 35px;
  line-height: 30px;
  text-shadow: 0 5px 8px var(--shadow-color);
  transform: translateZ(0px);
  overflow: hidden;
  margin: 0;
  width: 80%;
}

.card-subtitle {
  font-weight: normal;
  text-align: left;
  left: 30px;
  width: 80%;
  bottom: 80px;
  font-size: 25px;
  line-height: 20px;
  text-shadow: 0 3px 6px var(--card-shadow-color);
  transform: translateZ(0px);
}
</style>
