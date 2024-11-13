<template>
    <div class="main-container">
        <div id="control-bar-wrapper">
            <div id="control-bar">
                <button
                    id="sound-toggle"
                    class="toggle"
                    type="button"
                    :data-toggled="soundEnabled.toString()"
                    title="Toggle Pulse"
                    @click="handleSoundToggle()"
                >
                    <i class="mdi mdi-volume-off off" />
                    <i class="mdi mdi-volume-high on" />
                </button>
            </div>
        </div>

        <div id="background-image" />

        <div id="background-filter" />

        <canvas
            id="paper"
            ref="paperRef"
            @click="handleSoundToggle()"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Arc {
    color: string
    velocity: number
    lastImpactTime: number
    nextImpactTime: number
}

const soundEnabled = ref(false)

function handleSoundToggle (enabled = !soundEnabled.value) {
    soundEnabled.value = enabled
}

function handleVisibilityChange () {
    if (document.hidden) {
        handleSoundToggle(false)
    }
}

onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
})

const paperRef = ref<HTMLCanvasElement | null>(null)
let pen: CanvasRenderingContext2D | null = null
let paper: HTMLCanvasElement | null = null
const arcs: Arc[] = []

const colors = Array(21).fill('#A6C48A')

const settings = {
    startTime: Date.now(),
    duration: 900,
    maxCycles: Math.max(colors.length, 100),
    pulseEnabled: true,
    instrument: 'vibraphone',
}

onMounted(() => {
    paper = paperRef.value!
    pen = paper.getContext('2d')!
    init()
    draw()
})

function init () {
    if (!pen) { return }
    pen.lineCap = 'round'

    colors.forEach((color, index) => {
        const velocity = calculateVelocity(index), lastImpactTime = 0, nextImpactTime = calculateNextImpactTime(settings.startTime, velocity)

        arcs.push({
            color,
            velocity,
            lastImpactTime,
            nextImpactTime,
        })
    })
}

function calculateVelocity (index: number): number {
    const numberOfCycles = settings.maxCycles - index, distancePerCycle = 2 * Math.PI

    return (numberOfCycles * distancePerCycle) / settings.duration
}

function calculateNextImpactTime (
    currentImpactTime: number,
    velocity: number,
): number {
    return currentImpactTime + (Math.PI / velocity) * 1000
}

function calculateDynamicOpacity (
    currentTime: number,
    lastImpactTime: number,
    baseOpacity: number,
    maxOpacity: number,
    duration: number,
): number {
    const timeSinceImpact = currentTime - lastImpactTime, percentage = Math.min(timeSinceImpact / duration, 1), opacityDelta = maxOpacity - baseOpacity

    return maxOpacity - opacityDelta * percentage
}

function determineOpacity (
    currentTime: number,
    lastImpactTime: number,
    baseOpacity: number,
    maxOpacity: number,
    duration: number,
): number {
    if (!settings.pulseEnabled) { return baseOpacity }

    return calculateDynamicOpacity(
        currentTime,
        lastImpactTime,
        baseOpacity,
        maxOpacity,
        duration,
    )
}

function calculatePositionOnArc (
    center: { x: number, y: number },
    radius: number,
    angle: number,
): { x: number, y: number } {
    return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
    }
}

function drawArc (
    x: number,
    y: number,
    radius: number,
    start: number,
    end: number,
    action: 'stroke' | 'fill' = 'stroke',
) {
    pen!.beginPath()
    pen!.arc(x, y, radius, start, end)
    if (action === 'stroke') { pen!.stroke() } else { pen!.fill() }
}

function drawPointOnArc (
    center: { x: number, y: number },
    arcRadius: number,
    pointRadius: number,
    angle: number,
) {
    const position = calculatePositionOnArc(center, arcRadius, angle)
    drawArc(position.x, position.y, pointRadius, 0, 2 * Math.PI, 'fill')
}

function getFileName (index: number): string {
    if (settings.instrument === 'default') { return `key-${index}` }
    return `${settings.instrument}-key-${index}`
}

function getUrl (index: number): string {
    return `https://assets.codepen.io/1468070/${getFileName(index)}.wav`
}

const keys = colors.map((color, index) => {
    const audio = new Audio(getUrl(index))
    audio.volume = 0.15
    return audio
})

function playKey (index: number) {
    keys[index].play()
}

function draw () {
    if (!pen || !paper) { return }

    paper.width = paper.clientWidth
    paper.height = paper.clientHeight

    const currentTime = Date.now(), elapsedTime = (currentTime - settings.startTime) / 1000

    const length = Math.min(paper.width, paper.height) * 0.9, offset = (paper.width - length) / 2

    const start = {
        x: offset,
        y: paper.height / 2,
    }

    const end = {
        x: paper.width - offset,
        y: paper.height / 2,
    }

    const center = {
        x: paper.width / 2,
        y: paper.height / 2,
    }

    const base = {
        length: end.x - start.x,
        minAngle: 0,
        startAngle: 0,
        maxAngle: 2 * Math.PI,
        initialRadius: 0,
        circleRadius: 0,
        clearance: 0,
        spacing: 0,
    }

    base.initialRadius = base.length * 0.05
    base.circleRadius = base.length * 0.006
    base.clearance = base.length * 0.03
    base.spacing =
        (base.length - base.initialRadius - base.clearance) / 2 / colors.length

    arcs.forEach((arc, index) => {
        const radius = base.initialRadius + base.spacing * index

        // Draw arcs
        pen!.globalAlpha = determineOpacity(
            currentTime,
            arc.lastImpactTime,
            0.15,
            0.65,
            1000,
        )
        pen!.lineWidth = base.length * 0.002
        pen!.strokeStyle = arc.color

        const offset = (base.circleRadius * (5 / 3)) / radius

        drawArc(
            center.x,
            center.y,
            radius,
            Math.PI + offset,
            2 * Math.PI - offset,
        )

        drawArc(center.x, center.y, radius, offset, Math.PI - offset)

        // Draw impact points
        pen!.globalAlpha = determineOpacity(
            currentTime,
            arc.lastImpactTime,
            0.15,
            0.85,
            1000,
        )
        pen!.fillStyle = arc.color

        drawPointOnArc(
            center,
            radius,
            base.circleRadius * 0.75,
            Math.PI,
        )

        drawPointOnArc(
            center,
            radius,
            base.circleRadius * 0.75,
            2 * Math.PI,
        )

        // Draw moving circles
        pen!.globalAlpha = 1
        pen!.fillStyle = arc.color

        if (currentTime >= arc.nextImpactTime) {
            if (soundEnabled.value) {
                playKey(index)
                arc.lastImpactTime = arc.nextImpactTime
            }

            arc.nextImpactTime = calculateNextImpactTime(
                arc.nextImpactTime,
                arc.velocity,
            )
        }

        const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0, angle = (Math.PI + distance) % base.maxAngle

        drawPointOnArc(center, radius, base.circleRadius, angle)
    })

    requestAnimationFrame(draw)
}
</script>

<style scoped>
.main-container {
  height: 100%;
}

canvas {
  width: 100%;
  height: 100vh;
  z-index: 9;
}

#control-bar-wrapper {
  display: flex;
  justify-content: center;
  z-index: 10;
}

.toggle {
  background-color: rgb(255 255 255 / 10%);
  backdrop-filter: blur(5px);
  padding: 1.0rem;
  border-radius: 0.25rem;
  height: 4rem;
  border: none;
  outline: none;
  cursor: pointer;
}

.toggle:is(:hover, :focus-visible) {
  background-color: rgb(255 255 255 / 15%);
}

.toggle > i {
  display: none;
  height: 2rem;
  width: 2rem;
  font-size: 2.0rem;
  line-height: 2rem;
  text-align: center;
}

.toggle[data-toggled='true'] > i.on {
  display: block;
}

.toggle[data-toggled='false'] > i.off {
  display: block;
}
</style>
