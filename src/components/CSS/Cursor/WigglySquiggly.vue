<template>
    <div
        id="app"
        ref="container"
    >
        <svg
            ref="stage"
            :width="width"
            :height="height"
            xmlns="http://www.w3.org/2000/svg"
        />
    </div>
</template>

<script setup lang="ts">
type Position = { x: number, y: number }

enum SquiggleState {
    ready,
    animating,
    ended,
}
interface SquiggleSettings {
    x: number
    y: number
    directionX: number
    directionY: number
    length?: number
    sections: number
    width?: number
    chunkLength?: number
    color?: string
    progress?: number
    opacity?: number
}
interface SquiggleSet {
    path: SVGPathElement
    settings: SquiggleSettings
}

// Easing function
function easeOutPower1 (t: number): number {
    return 1 - Math.pow(1 - t, 1)
}

// Animation function
function animate (
    settings: any,
    duration: number,
    to: any,
    options: { delay?: number, easing?: (t: number) => number, onComplete?: () => void } = {},
) {
    const startTime = performance.now() + (options.delay || 0) * 1000
    const startValues = { ...settings }
    const deltas: any = {}
    for (const prop in to) {
        deltas[prop] = to[prop] - startValues[prop]
    }
    const easing = options.easing || (t => t)

    function step (currentTime: number) {
        const elapsed = currentTime - startTime
        if (elapsed < 0) {
            requestAnimationFrame(step)
            return
        }
        const progress = Math.min(elapsed / (duration * 1000), 1)
        const easedProgress = easing(progress)
        for (const prop in to) {
            settings[prop] = startValues[prop] + deltas[prop] * easedProgress
        }
        if (progress < 1) {
            requestAnimationFrame(step)
        } else if (options.onComplete) {
            options.onComplete()
        }
    }
    requestAnimationFrame(step)
}

// Function to create a Squiggle
function createSquiggle (stage: SVGSVGElement, settings: SquiggleSettings, grid: number) {
    const sqwigs: SquiggleSet[] = []
    let state: SquiggleState = SquiggleState.ready

    settings.width = 0
    settings.opacity = 1

    state = SquiggleState.animating
    const path = createLine(settings)
    const sqwigCount: number = 3

    for (let i = 0; i < sqwigCount; i++) {
        createSqwig(i, sqwigCount, path, { ...settings }, i == sqwigCount - 1)
    }

    function createSqwig (
        index: number,
        total: number,
        path: string,
        settings: SquiggleSettings,
        forceWhite: boolean,
    ) {
        const sqwig = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        sqwig.setAttribute('d', path)
        sqwig.style.fill = 'none'
        sqwig.style.stroke = forceWhite ? '#303030' : getColor()
        sqwig.style.strokeLinecap = 'round'

        settings.length = sqwig.getTotalLength()
        settings.chunkLength = settings.length / 6
        settings.progress = settings.chunkLength

        sqwig.style.strokeDasharray = `${settings.chunkLength}, ${settings.length + settings.chunkLength}`
        sqwig.style.strokeDashoffset = `${settings.progress}`

        stage.appendChild(sqwig)

        sqwigs.unshift({ path: sqwig, settings })

        animate(
            settings,
            settings.sections * 0.1,
            {
                progress: -settings.length,
                width: settings.sections * 0.9,
            },
            {
                delay: index * (settings.sections * 0.01),
                easing: easeOutPower1,
                onComplete: () => {
                    if (index === total - 1) {
                        state = SquiggleState.ended
                    }
                    sqwig.remove()
                },
            },
        )
    }

    function update () {
        sqwigs.forEach((set: SquiggleSet) => {
            set.path.style.strokeDashoffset = `${set.settings.progress}`
            set.path.style.strokeWidth = `${set.settings.width}px`
            set.path.style.opacity = `${set.settings.opacity}`
        })
    }

    function createLine (settings: SquiggleSettings): string {
        let x = settings.x
        let y = settings.y
        let dx = settings.directionX
        let dy = settings.directionY
        const path: string[] = [
            'M', '' + x, '' + y, 'Q',
        ]

        const steps = settings.sections
        let step = 0
        const getNewDirection = (direction: 'x' | 'y', goAnywhere: boolean) => {
            const key = direction === 'x' ? 'directionX' : 'directionY'

            if (!goAnywhere && settings[key] !== 0) {
                return settings[key]
            }

            return Math.random() < 0.5 ? -1 : 1
        }

        while (step < steps * 2) {
            step++
            x += dx * (step / 30) * grid
            y += dy * (step / 30) * grid
            if (step != 1) {
                path.push(',')
            }
            path.push('' + x)
            path.push('' + y)

            if (step % 2 != 0) {
                dx = dx == 0 ? getNewDirection('x', step > 8) : 0
                dy = dy == 0 ? getNewDirection('y', step > 8) : 0
            }
        }

        return path.join(' ')
    }

    function getColor (): string {
        const offset = Math.round(Math.random() * 100)
        const r = Math.sin(0.3 * offset) * 100 + 155
        const g = Math.sin(0.3 * offset + 2) * 100 + 155
        const b = Math.sin(0.3 * offset + 4) * 100 + 155
        return (
            '#' +
        componentToHex(r) +
        componentToHex(g) +
        componentToHex(b)
        )
    }

    function componentToHex (c: number) {
        const hex = Math.round(c).toString(16)
        return hex.length == 1 ? '0' + hex : hex
    }

    return {
        update,
        getState: () => state,
    }
}

const container = ref<HTMLElement | null>(null)
const stage = ref<SVGSVGElement | null>(null)
const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

const squiggles: ReturnType<typeof createSquiggle>[] = []
let lastMousePosition: Position | null = null
let direction: Position | null = null
const grid: number = 40

function onResize () {
    width.value = container.value?.offsetWidth || window.innerWidth
    height.value = container.value?.offsetHeight || window.innerHeight

    if (stage.value) {
        stage.value.setAttribute('width', String(width.value))
        stage.value.setAttribute('height', String(height.value))
    }
}

function setupInputHandlers (element: HTMLElement) {
    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('touchstart', handleTouchStart)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
}

function handleMouseDown (event: MouseEvent) {
    event.preventDefault()

    if (container.value) {
        const { left, top } = container.value.getBoundingClientRect()
        const position = { x: event.clientX - left, y: event.clientY - top }
        lastMousePosition = position
    }
}

function handleMouseMove (event: MouseEvent) {
    event.preventDefault()

    if (container.value) {
        const { left, top } = container.value.getBoundingClientRect()
        const position = { x: event.clientX - left, y: event.clientY - top }

        for (let i = 0; i < 3; i++) {
            createSqwigFromMouse(position)
        }
    }
}

function handleMouseUp (event: MouseEvent) {
    event.preventDefault()
    burst(true)
}

function handleTouchStart (event: TouchEvent) {
    event.preventDefault()
    const touch = event.changedTouches[0]

    if (container.value) {
        const { left, top } = container.value.getBoundingClientRect()
        const position = { x: touch.clientX - left, y: touch.clientY - top }
        lastMousePosition = position
    }
}

function handleTouchMove (event: TouchEvent) {
    event.preventDefault()
    const touch = event.changedTouches[0]

    if (container.value) {
        const { left, top } = container.value.getBoundingClientRect()
        const position = { x: touch.clientX - left, y: touch.clientY - top }

        for (let i = 0; i < 3; i++) {
            createSqwigFromMouse(position)
        }
    }
}

function handleTouchEnd (event: TouchEvent) {
    event.preventDefault()
    burst(true)
}

function burst (fromMouse: boolean = false) {
    for (let i = 0; i < 5; i++) {
        createRandomSqwig(fromMouse)
    }
}

function createSqwigFromMouse (position: Position) {
    let sections: number = 4
    if (lastMousePosition) {
        const newDirection: Position = { x: 0, y: 0 }
        const xAmount = Math.abs(lastMousePosition.x - position.x)
        const yAmount = Math.abs(lastMousePosition.y - position.y)

        if (xAmount > yAmount) {
            newDirection.x = lastMousePosition.x - position.x < 0 ? 1 : -1
            sections += Math.round(xAmount / 4)
        } else {
            newDirection.y = lastMousePosition.y - position.y < 0 ? 1 : -1
            sections += Math.round(yAmount / 4)
        }
        direction = newDirection
    }

    if (direction) {
        const settings: SquiggleSettings = {
            x: lastMousePosition!.x,
            y: lastMousePosition!.y,
            directionX: direction.x,
            directionY: direction.y,
            sections: sections > 20 ? 20 : sections,
        }
        const newSqwig = createSquiggle(
            stage.value!,
            settings,
            10 + Math.random() * (sections * 1.5),
        )
        squiggles.push(newSqwig)
    }

    lastMousePosition = position
}

function createRandomSqwig (fromMouse: boolean = false) {
    let dx = Math.random()
    if (dx > 0.5) {
        dx = dx > 0.75 ? 1 : -1
    } else {
        dx = 0
    }
    let dy = 0
    if (dx == 0) {
        dy = Math.random() > 0.5 ? 1 : -1
    }

    const settings: SquiggleSettings = {
        x: fromMouse && lastMousePosition ? lastMousePosition.x : width.value / 2,
        y: fromMouse && lastMousePosition ? lastMousePosition.y : height.value / 2,
        directionX: dx,
        directionY: dy,
        sections: 5 + Math.round(Math.random() * 15),
    }
    const newSqwig = createSquiggle(
        stage.value!,
        settings,
        grid / 2 + Math.random() * (grid / 2),
    )
    squiggles.push(newSqwig)
}

function tick () {
    let step = squiggles.length - 1

    while (step >= 0) {
        if (squiggles[step].getState() != SquiggleState.ended) {
            squiggles[step].update()
        } else {
            squiggles.splice(step, 1)
        }

        --step
    }

    requestAnimationFrame(tick)
}

onMounted(() => {
    if (container.value && stage.value) {
        onResize()
        window.addEventListener('resize', onResize)

        setupInputHandlers(container.value)
        tick()
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
#app {
    display: flex;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  position: relative;
}
svg {
display: block;
}
</style>
