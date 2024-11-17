<template>
    <div
        id="wrapper"
        class="main-body"
    >
        <div
            id="drop-zone-wrapper"
            ref="dropZoneWrapper"
        >
            <div
                id="drop-zone"
                ref="dropZone"
                @dragenter="dragStart"
                @dragover.prevent
                @dragleave="dragEnd"
                @dragend="dragEnd"
                @drop="handleDrop"
            >
                <div id="label">
                    <i class="fa fa-cloud-upload" />
                    <h1>Drop MP3 Here</h1>
                </div>
            </div>
            <div
                id="alternate-option"
                ref="alternateOption"
                @click="alternateOptionClick"
            >
                <i class="fa fa-music" />
                <h1>Or Use Default Song</h1>
            </div>
        </div>
        <div
            id="center-logo"
            ref="centerLogo"
            class="hidden"
        >
            <div id="audio-canvas-wrapper">
                <canvas
                    id="audio-canvas"
                    ref="audioCanvas"
                />
            </div>
            <div id="text">
                <h1>MUSIC</h1>
                <h1>SQUAD</h1>
            </div>
        </div>
        <div
            id="reset"
            ref="resetButton"
            @click="resetPlayer"
        >
            <h1>Reset</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
// Reactive state
const STATE = reactive({
    audio: null as HTMLAudioElement | null,
    songEnded: false,
    usingDefault: false,
    minMag: 0,
    canvas: {
        height: 600,
        width: 600,
    },
})

// Color constants
const COLORS = [
    'rgb(239,83,80)', // light red - 0
    'rgb(211,47,47)', // med red - 1
    'rgb(183,28,28)', // dark red - 2
    'rgb(255,112,67)', // light orange - 3
    'rgb(255,87,34)', // med orange - 4
    'rgb(216,67,21)', // dark orange - 5
    'rgb(255,213,79)', // light yellow - 6
    'rgb(255,193,7)', // med yellow - 7
    'rgb(255,160,0)', // dark yellow - 8
    'rgb(102,187,106)', // light green - 9
    'rgb(67,160,71)', // med green - 10
    'rgb(27,94,32)', // dark green - 11
    'rgb(41,182,246)', // light blue - 12
    'rgb(25,118,210)', // med blue - 13
    'rgb(40,53,147)', // dark blue - 14
    'rgb(126,87,194)', // light indigo - 15
    'rgb(94,53,177)', // med indigo - 16
    'rgb(69,39,160)', // dark indigo - 17
    'rgb(171,71,188)', // light violet - 18
    'rgb(142,36,170)', // med violet - 19
    'rgb(74,20,140)', // dark violet - 20
]

// Element references
const dropZoneWrapper = ref<HTMLElement | null>(null)
const dropZone = ref<HTMLElement | null>(null)
const alternateOption = ref<HTMLElement | null>(null)
const audioCanvas = ref<HTMLCanvasElement | null>(null)
const centerLogo = ref<HTMLElement | null>(null)
const resetButton = ref<HTMLElement | null>(null)

// Helper functions
const getRand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const degToRad = (deg: number) => (deg * Math.PI) / 180
const getCoords = (cX: number, cY: number, r: number, a: number) => ({
    x: cX + r * Math.cos(a),
    y: cY + r * Math.sin(a),
})

// Event handlers
const dragStart = () => dropZone.value?.classList.add('hovering')
const dragEnd = () => dropZone.value?.classList.remove('hovering')

const handleDrop = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    dragEnd()
    const mp3 = getMp3FromData(e)
    if (mp3) {
        startPlayer(mp3)
    }
}

const alternateOptionClick = () => {
    startPlayer('default')
}

// Initialization functions
const initializeCanvas = () => {
    if (audioCanvas.value) {
        const ctx = audioCanvas.value.getContext('2d')
        if (ctx) {
            ctx.canvas.width = STATE.canvas.width * 2
            ctx.canvas.height = STATE.canvas.height * 2
        }
    }
}

// Audio processing functions
let drawVisual: number | null = null

const processAudio = (mp3: File | 'default') => {
    let audio: HTMLAudioElement | null = null
    if (mp3 === 'default') {
        audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/Boost.mp3')
        audio.crossOrigin = 'anonymous'
    } else {
        audio = createAudio(mp3)
    }
    STATE.audio = audio
    audio.addEventListener('loadedmetadata', () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        const audioCtx = new AudioContext()
        const audioSrc = audioCtx.createMediaElementSource(audio!)
        const analyser = audioCtx.createAnalyser()
        const canvasCtx = audioCanvas.value?.getContext('2d')
        if (!canvasCtx) { return }

        audioSrc.connect(analyser)
        audioSrc.connect(audioCtx.destination)
        analyser.fftSize = 256
        audio!.play()

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        canvasCtx.clearRect(0, 0, STATE.canvas.width, STATE.canvas.height)

        const draw = () => {
            drawVisual = requestAnimationFrame(draw)
            analyser.getByteFrequencyData(dataArray)
            canvasCtx.clearRect(0, 0, STATE.canvas.width, STATE.canvas.height)
            canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)'
            canvasCtx.fillRect(0, 0, STATE.canvas.width, STATE.canvas.height)

            rumbleCenterLogo(dataArray)

            const radius = 200
            const cX = STATE.canvas.width / 2
            const cY = STATE.canvas.height / 2

            for (let i = 0; i < bufferLength; i++) {
                let mag = dataArray[i] / 255 * 1.5

                if (mag < 0.03) {
                    mag = getRand(STATE.minMag, 15) * 0.02
                }

                const r = radius + 12
                const angle = degToRad((i / bufferLength) * 360) - 90
                const c1 = getCoords(cX, cY, r, angle)
                const c2 = getCoords(cX, cY, r + mag * 40, angle)
                const c3 = getCoords(cX, cY, r + mag * 50, angle)
                const c4 = getCoords(cX, cY, r + mag * 60, angle)
                const c5 = getCoords(cX, cY, r + mag * 70, angle)

                canvasCtx.lineWidth = 7
                canvasCtx.lineCap = 'butt'

                drawLine(canvasCtx, COLORS[13], c3, c5)
                drawLine(canvasCtx, COLORS[16], c2, c4)
                drawLine(canvasCtx, COLORS[19], c1, c3)
                drawLine(canvasCtx, 'white', c1, c2)

                if (hasSongEnded(audio!) && !STATE.songEnded) {
                    resetPlayer()
                }
            }
        }
        draw()
    })
}

// Utility functions
const isValidMp3 = (data: DataTransfer) =>
    data.items &&
  data.items.length === 1 &&
  data.items[0].kind === 'file' &&
  (data.items[0].type === 'audio/mp3' || data.items[0].type === 'audio/mpeg')

const getMp3FromData = (e: DragEvent) => {
    const data = e.dataTransfer
    if (data && isValidMp3(data)) {
        const mp3 = data.files[0]
        return mp3
    } else {
        console.error('Error: Not a valid Mp3 file.')
        return null
    }
}

const createAudio = (mp3: File) => {
    const url = URL.createObjectURL(mp3)
    const audio = new Audio()
    audio.src = url
    return audio
}

const isBassABumpin = (dataArray: Uint8Array) => {
    if (dataArray[0] === 255 && dataArray[1] === 255) {
        if (dataArray[2] === 255) {
            return 2
        }
        return 1
    }
    return 0
}

const rumbleCenterLogo = (dataArray: Uint8Array) => {
    const isBumpin = isBassABumpin(dataArray)
    if (isBumpin > 0) {
        const rumble = isBumpin === 2 ? 'rumble-level-2' : 'rumble-level-1'
        centerLogo.value?.classList.add(rumble)
        setTimeout(() => {
            centerLogo.value?.classList.remove(rumble)
        }, 300)
    }
}

const hasSongEnded = (audio: HTMLAudioElement) => audio.currentTime >= audio.duration

const resetPlayer = () => {
    if (STATE.audio) { STATE.audio.currentTime = STATE.audio.duration }
    STATE.songEnded = true
    resetButton.value?.classList.remove('showing')
    setTimeout(() => {
        if (drawVisual !== null) { cancelAnimationFrame(drawVisual) }
        centerLogo.value?.classList.add('transition-out')

        dropZoneWrapper.value?.classList.add('transition-in')
        dropZoneWrapper.value?.classList.remove('hidden')

        dropZone.value?.classList.add('transition-in')
        dropZone.value?.classList.remove('hidden')

        alternateOption.value?.classList.add('transition-in')
        alternateOption.value?.classList.remove('hidden')

        setTimeout(() => {
            dropZoneWrapper.value?.classList.remove('transition-in')
        }, 100)

        setTimeout(() => {
            centerLogo.value?.classList.remove('transition-out')
            centerLogo.value?.classList.add('hidden')

            dropZone.value?.classList.remove('transition-in')
            dropZone.value?.classList.add('showing')

            alternateOption.value?.classList.remove('transition-in')
            alternateOption.value?.classList.add('showing')

            STATE.songEnded = false

            setTimeout(() => {
                dropZone.value?.classList.remove('showing')
                alternateOption.value?.classList.remove('showing')
            }, 1000)
        }, 1000)
    }, 1000)
}

const drawLine = (
    ctx: CanvasRenderingContext2D,
    color: string,
    c1: { x: number, y: number },
    c2: { x: number, y: number },
) => {
    ctx.beginPath()
    ctx.moveTo(c1.x, c1.y)
    ctx.lineTo(c2.x, c2.y)
    ctx.strokeStyle = color
    ctx.stroke()
}

// Player control functions
const hideDropZone = () => {
    dropZoneWrapper.value?.classList.add('transition-out')
    setTimeout(() => {
        dropZone.value?.classList.add('hidden')
    }, 1000)
    setTimeout(() => {
        dropZoneWrapper.value?.classList.remove('transition-out')
        dropZoneWrapper.value?.classList.add('hidden')
    }, 5000)
}

const showCenterLogo = () => {
    setTimeout(() => {
        centerLogo.value?.classList.remove('hidden')
        centerLogo.value?.classList.add('showing')
        setTimeout(() => {
            centerLogo.value?.classList.remove('showing')
        }, 1000)
    }, 1000)
}

const startPlayer = (mp3: File | 'default') => {
    alternateOption.value?.classList.add('transition-out')
    hideDropZone()
    showCenterLogo()
    setTimeout(() => {
        alternateOption.value?.classList.remove('transition-out')
        alternateOption.value?.classList.add('hidden')
    }, 1000)
    setTimeout(() => {
        processAudio(mp3)
    }, 2000)
    setTimeout(() => {
        resetButton.value?.classList.add('showing')
    }, 5000)
}

// Lifecycle hooks
onMounted(() => {
    initializeCanvas()

    const interval = setInterval(() => {
        STATE.minMag = getRand(3, 5)
    }, 1000)

    const handleResize = () => {
        initializeCanvas()
    }
    window.addEventListener('resize', handleResize)

    const preventDefault = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
    }
    window.addEventListener('dragover', preventDefault)
    window.addEventListener('drop', preventDefault)

    onUnmounted(() => {
        clearInterval(interval)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('dragover', preventDefault)
        window.removeEventListener('drop', preventDefault)
    })
})
</script>

<style scoped lang="scss">
$gray250: rgb(250,250,250);
$gray240: rgb(240,240,240);
$gray230: rgb(230,230,230);
$gray220: rgb(220,220,220);
$gray210: rgb(210,210,210);
$gray200: rgb(200,200,200);
$gray180: rgb(180,180,180);
$gray150: rgb(150,150,150);
$gray120: rgb(120,120,120);
$gray90: rgb(90,90,90);
$gray60: rgb(60,60,60);
$gray50: rgb(50,50,50);
$gray40: rgb(40,40,40);
$gray30: rgb(30,30,30);

$purple: rgb(171,71,188);
$darkPurple: rgb(74,20,140);
$blue: rgb(3,169,244);
$darkBlue: rgb(26,35,126);
$lightGreen: rgb(205,220,57);
$green: rgb(76,175,80);
$darkGreen: rgb(46,125,50);
$red: rgb(211,47,47);
$darkRed: rgb(183,28,28);
$orange: rgb(255,111,0);
$darkOrange: rgb(216,67,21);
$yellow: rgb(251,192,45);
$darkYellow: rgb(249,168,37);

$shadow1: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
$shadow2: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
$shadow3: rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px;

@mixin center{
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

$coolBlue: rgb(61,90,254);

.main-body{
  font-family: 'Roboto', sans-serif;
  height: 100%;
  margin: 0px;
  overflow: hidden;
  padding: 0px;
  user-select: none;
  width: 100%;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/snowy-background.jpeg');
  background-position: 50% 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

#wrapper{
  background-color: rgba(black, 0.4);
  height: 100%;
  width: 100%;

  #drop-zone-wrapper{
    background-color: rgba($gray30, 0.8);
    backface-visibility: hidden;
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    transition: all 0.4s, opacity 5s;
    width: 100%;

    &.transition-in{
      opacity: 0;
    }

    &.transition-out{
      opacity: 0;
      #drop-zone{
        animation: bounceOut 1s ease-in-out;
        border: 2px solid white;
        background-color: transparent;
        border-radius: 1000px;
      }
    }

    &.hidden{
      display: none;
      opacity: 0;
    }

    #drop-zone{
      @include center;
      background-color: $coolBlue;
      border-radius: 1000px;
      box-shadow: $shadow1;
      color: white;
      height: 200px;
      width: 200px;
      transition: all 0.5s;
      z-index: 5;

      &.showing{
        animation: bounceIn 1s ease-in-out;
      }

      &.transition-in{
        opacity: 0;
      }

      &.hidden{
        display: none;
        opacity: 0;
      }

      &.hovering{
        animation-delay: 0.5s;
        background-color: rgba(white, 0.25);
        border: 2px solid white;
        border-radius: 1000px;
        box-shadow: $shadow3;
        height: 400px;
        width: 400px;
      }

      #label{
        @include center;
        pointer-events: none;
        text-align: center;

        i{
          font-size: 5em;
          transition: all 0.4s;
        }

        h1{
          font-size: 1em;
          font-weight: 400;
          margin: 0px;
          white-space: nowrap;
        }
      }
    }

    #alternate-option{
      background-color: $coolBlue;
      border-radius: 2px;
      bottom: 20px;
      box-shadow: $shadow1;
      cursor: pointer;
      display: inline-block;
      left: 50%;
      padding: 10px 15px;
      position: absolute;
      transform: translateX(-50%);
      transition: all 0.5s;
      z-index: 10;

      &:hover{
        background-color: $blue;
      }

      &.transition-out{
        animation: bounceOutDown 1s ease-in-out;
      }

      &.showing{
        animation: bounceInUp 1s ease-in-out;
      }

      &.transition-in{
        opacity: 0;
      }

      &.hidden{
        display: none;
        opacity: 0;
      }

      h1{
        color: white;
        display: inline-block;
        font-size: 1em;
        font-weight: 400;
        margin: 0px;
      }
      i{
        color: white;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }

  #center-logo{
    @include center;
    animation: float 16s ease-in-out infinite;
    border: 14px solid white;
    border-radius: 1000px;
    box-shadow: 0px 0px 18px 2px rgba(white, 0.4),
      rgba(0, 0, 0, 0.1) 0px 10px 30px inset,
      rgba(0, 0, 0, 0.14) 0px 6px 10px inset;
    font-family: 'Permanent Marker', cursive;
    height: 400px;
    position: absolute;
    transition: all 0.4s, opacity 1s;
    width: 400px;
    z-index: 10;

    &:after{
      @include center;
      border: 14px solid white;
      border-radius: 1000px;
      content: '';
      height: 100%;
      width: 100%;
      z-index: 10;
    }

    &.transition-out{
      animation: bounceOut 1s ease-in-out;
    }

    &.hidden{
      display: none;
    }

    &.showing{
      animation: bounceIn 1s ease-in-out;
    }

    &.rumble-level-1{
      animation: rumbleLevel1 0.3s ease-in-out infinite;
      box-shadow: 0px 0px 28px 6px rgba(white, 0.6);

      #text{
        h1{
          text-shadow: 0px 0px 10px rgba(white, 0.6);
        }
      }
    }

    &.rumble-level-2{
      animation: rumbleLevel2 0.3s ease-in-out infinite;
      box-shadow: 0px 0px 36px 10px rgba(white, 0.8);

      #text{
        h1{
          text-shadow: 0px 0px 16px rgba(white, 0.8);
        }
      }
    }

    #text{
      @include center;
      display: inline-block;
      transform: translateX(-50%) translateY(-50%) rotate(-10deg);
      transition: all 0.15s;
      h1{
        color: white;
        font-size: 4em;
        height: 70px;
        line-height: 70px;
        margin: 0px;
        text-shadow: 0px 0px 8px rgba(white, 0.8);
        transition: all 0.15s;
      }
    }
  }

  #audio-canvas-wrapper{
    @include center;
    height: 600px;
    width: 600px;
    z-index: 4;
  }

  #reset{
    background-color: rgba($coolBlue, 0.25);
    border: 2px solid $coolBlue;
    border-radius: 2px;
    bottom: 20px;
    box-shadow: $shadow1;
    cursor: pointer;
    left: 20px;
    opacity: 0;
    padding: 10px 30px;
    position: absolute;
    transition: all 0.5s;
    z-index: 0;

    &:hover{
      background-color: $coolBlue;
    }

    &.showing{
      opacity: 1;
      z-index: 10;
    }

    h1{
      color: white;
      font-size: 1em;
      font-weight: 400;
      margin: 0px;
    }
  }
}

@keyframes bounceOut {
  20% {
    transform: translateX(-50%) translateY(-50%) scale3d(.9, .9, .9);
  }

  50%, 55% {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale3d(1.1, 1.1, 1.1);
  }

  90%, to {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale3d(.3, .3, .3);
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale3d(.3, .3, .3);
  }

  20% {
    transform: translateX(-50%) translateY(-50%) scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: translateX(-50%) translateY(-50%) scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: translateX(-50%) translateY(-50%) scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale3d(1, 1, 1);
  }
}

@keyframes float {
  0%, 100%{
    transform: translateX(-50%) translateY(-50%);
  }
  20%{
    transform: translateX(-52%) translateY(-53%);
  }
  40%{
    transform: translateX(-43%) translateY(-45%);
  }
  60%{
    transform: translateX(-50%) translateY(-55%);
  }
  80%{
    transform: translateX(-55%) translateY(-50%);
  }
}

@keyframes bounceOutDown {
  20% {
    transform: translateX(-50%) translateY(-50%) translate3d(0, 10px, 0);
  }

  40%, 45% {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) translate3d(0, -20px, 0);
  }

  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) translate3d(0, 2000px, 0);
  }
}

@keyframes bounceInUp {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) translate3d(0, -20px, 0);
  }

  75% {
    transform: translateX(-50%) translateY(-50%) translate3d(0, 10px, 0);
  }

  90% {
    transform: translateX(-50%) translateY(-50%) translate3d(0, -5px, 0);
  }

  to {
    transform: translateX(-50%) translateY(-50%) translate3d(0, 0, 0);
  }
}

@keyframes rumbleLevel1 {
  0%, 100% {transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1);}
  25% {transform: translateX(-51%) translateY(-52%) rotate(-1deg) scale(1.1);}
  50% {transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1.05);}
  75% {transform: translateX(-48%) translateY(-49%) rotate(1deg) scale(1.07);}
}

@keyframes rumbleLevel2 {
  0%, 100% {transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1);}
  25% {transform: translateX(-51%) translateY(-52%) rotate(-2deg) scale(1.2);}
  50% {transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1.1);}
  75% {transform: translateX(-48%) translateY(-49%) rotate(2deg) scale(1.15);}
}
</style>
