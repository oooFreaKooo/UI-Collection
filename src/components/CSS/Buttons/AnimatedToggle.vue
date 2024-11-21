<template>
    <div class="main-body">
        <label class="toggle">
            <input type="checkbox">
            <div class="off-knob" />
            <div class="on-knob" />

            <svg
                viewBox="0 0 44 22"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    class="outline"
                    fill="none"
                    rx="11"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1"
                />
                <rect
                    class="outline outline--blur"
                    fill="none"
                    rx="11"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1"
                />
            </svg>
        </label>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    animationDuration: {
        type: Number,
        default: 250,
    },
})

function initToggle (toggle: HTMLLabelElement) {
    const input = toggle.querySelector<HTMLInputElement>('input')
    const offKnob = toggle.querySelector<HTMLDivElement>('.off-knob')
    const onKnob = toggle.querySelector<HTMLDivElement>('.on-knob')
    const outline = toggle.querySelector<SVGRectElement>('.outline')
    const outlineBlur = toggle.querySelector<SVGRectElement>('.outline--blur')

    if (!input || !offKnob || !onKnob || !outline || !outlineBlur) {
        console.warn('Toggle elements missing, ensure all elements are present.')
        return
    }

    input.addEventListener('click', (e) => {
        const animating = toggle
            .getAnimations({ subtree: true })
            .some(animation => animation.playState !== 'finished')

        if (animating) {
            e.preventDefault()
            return
        }

        if (input.checked) {
            animateOffKnobCheck(offKnob)
            animateOnKnobCheck(onKnob)
            animateOutlineCheck(outline, outlineBlur)
        } else {
            animateOffKnobUncheck(offKnob)
            animateOnKnobUncheck(onKnob)
            animateOutlineUncheck(outline, outlineBlur)
        }
    })
}

function animateOffKnobCheck (offKnob: HTMLDivElement) {
    offKnob.animate(
        [
            { transform: 'scale(1) translateX(0)' },
            { transform: 'scale(0.1)', background: 'var(--on-color)', offset: 0.6 },
            { transform: 'scale(0.1) translateX(-430px)', background: 'var(--on-color)' },
        ],
        { duration: props.animationDuration, easing: 'cubic-bezier(0.44, -0.44, 0.98, 0.89)', fill: 'forwards' },
    )
}

function animateOffKnobUncheck (offKnob: HTMLDivElement) {
    offKnob.animate(
        [
            { transform: 'scale(0.1) translateX(-430px)', background: 'var(--off-color)' },
            { transform: 'scale(0.1) translateX(0)', background: 'var(--off-color)', offset: 0.4 },
            { transform: 'scale(1.05) translateX(0)', background: 'var(--off-color)', offset: 0.7 },
            { transform: 'scale(0.87) translateX(0)', background: 'var(--off-color)', offset: 0.8 },
            { transform: 'scale(1.01) translateX(0)', background: 'var(--off-color)', offset: 0.9 },
            { transform: 'scale(1) translateX(0)', background: 'var(--off-color)' },
        ],
        { duration: props.animationDuration, easing: 'ease-out', delay: props.animationDuration * 2, fill: 'forwards' },
    )
}

function animateOnKnobCheck (onKnob: HTMLDivElement) {
    onKnob.animate(
        [
            { background: 'var(--on-color)' },
            { transform: 'translateX(0) scale(0.1)', background: 'var(--on-color)', offset: 0.4 },
            { transform: 'translateX(0) scale(1.05)', background: 'var(--on-color)', offset: 0.7 },
            { transform: 'translateX(0) scale(0.87)', background: 'var(--on-color)', offset: 0.8 },
            { transform: 'translateX(0) scale(1.01)', background: 'var(--on-color)', offset: 0.9 },
            { transform: 'translateX(0) scale(1)', background: 'var(--on-color)' },
        ],
        { duration: props.animationDuration, easing: 'ease-out', delay: props.animationDuration * 2, fill: 'forwards' },
    )
}

function animateOnKnobUncheck (onKnob: HTMLDivElement) {
    onKnob.animate(
        [
            { transform: 'scale(0.1) translateX(0)', background: 'var(--off-color)', offset: 0.6 },
            { transform: 'scale(0.1) translateX(430px)', background: 'var(--off-color)' },
        ],
        { duration: props.animationDuration, easing: 'cubic-bezier(0.44, -0.44, 0.98, 0.89)', fill: 'forwards' },
    )
}

function animateOutlineCheck (outline: SVGRectElement, outlineBlur: SVGRectElement) {
    const keyframes = [
        { strokeOpacity: 1 },
        { strokeOpacity: 1, offset: 0.99 },
        { strokeOpacity: 0, strokeDashoffset: 89 },
    ]
    const options: KeyframeAnimationOptions = {
        duration: props.animationDuration,
        easing: 'cubic-bezier(0.55, 0.055, 0.9, 1)',
        delay: props.animationDuration,
        fill: 'forwards',
    }

    outline.animate(keyframes, options)
    outlineBlur.animate(keyframes, options)
}

function animateOutlineUncheck (outline: SVGRectElement, outlineBlur: SVGRectElement) {
    const keyframes = [
        { strokeOpacity: 1, strokeDashoffset: 89 },
        { strokeOpacity: 1, strokeDashoffset: 32.5, offset: 0.99 },
        { strokeOpacity: 0, strokeDashoffset: 32.5 },
    ]
    const options: KeyframeAnimationOptions = {
        duration: props.animationDuration,
        easing: 'cubic-bezier(0.55, 0.055, 0.9, 1)',
        delay: props.animationDuration,
        fill: 'forwards',
    }

    outline.animate(keyframes, options)
    outlineBlur.animate(keyframes, options)
}

onMounted(() => {
    document.querySelectorAll<HTMLLabelElement>('.toggle').forEach(initToggle)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.main-body {
--on-color: hsl(208.7, 100%, 50%);
--off-color: hsl(208.7, 100%, 90%);
--toggle-bg: hsl(208.7, 40%, 20%);
--toggle-gap: 10px;
--toggle-width: 160px;
--transition-color: var(--off-color);
  display: block;
  justify-items: center;
}

.toggle {
  position: relative;
  cursor: pointer;
  background: var(--toggle-bg);
  width: var(--toggle-width);
  height: calc(var(--toggle-width) / 2);
  border-radius: 160px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 2px #7c7e8855;
  -webkit-tap-highlight-color: transparent;
}

.toggle input {
  appearance: none;
  margin: 0;
  padding: 0;
}

.toggle input:checked ~ svg .outline {
  --transition-color: var(--on-color);
}

.off-knob,
.on-knob {
  position: absolute;
  height: calc(100% - var(--toggle-gap) * 2);
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0px 1px 1px rgba(10, 19, 39, 0.1),
    0px 4px 12px rgba(10, 19, 39, 0.03), 0px 4px 20px rgba(10, 19, 39, 0.04);
  transform-origin: center center;
  will-change: transform;
}

.off-knob {
  left: var(--toggle-gap);
  background: var(--off-color);
}

.on-knob {
  right: var(--toggle-gap);
  background: var(--on-color);
  transform: scale(0.1) translateX(430px);
}

.toggle input:checked ~ .on-knob {
  animation-delay: 1.1s;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.outline {
  width: 100%;
  height: 100%;
  stroke: var(--transition-color);
  stroke-dasharray: 2 125;
  stroke-dashoffset: 32.5;
  stroke-opacity: 0;
}

.outline--blur {
  filter: blur(0.8px);
}
</style>
