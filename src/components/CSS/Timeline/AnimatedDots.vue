<template>
    <div id="fizz-buzz-app">
        <div id="fizz-buzz-timeline-bar" />
        <div id="fizz-buzz-items">
            <div
                v-for="i in items"
                :key="i"
                :ref="el => trackItem(el, i)"
                :style="getFizzBuzzProps(i).style.border"
            >
                <h1
                    class="background-text"
                    :style="getFizzBuzzProps(i).style.text"
                >
                    {{ getFizzBuzzProps(i).text }}
                </h1>
                <h1
                    class="text"
                    :style="getFizzBuzzProps(i).style.text"
                >
                    {{ getFizzBuzzProps(i).text }}
                </h1>
                <div class="bar">
                    <div
                        class="dot dot-1"
                        :style="getFizzBuzzProps(i).style.background"
                    />
                    <div
                        class="dot dot-2"
                        :style="getFizzBuzzProps(i).style.background"
                    />
                    <div
                        class="dot dot-3"
                        :style="getFizzBuzzProps(i).style.background"
                    />
                </div>
                <div class="dot">
                    <div
                        class="center"
                        :style="getFizzBuzzProps(i).style.background"
                    />
                    <div
                        class="ring"
                        :style="getFizzBuzzProps(i).style.border"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const RED = 'rgb(239,83,80)'
const ORANGE = 'rgb(255,152,0)'
const YELLOW = 'rgb(253,216,53)'

// Utility functions
const isInViewport = (el: HTMLElement): boolean => {
    const rect = el.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= window.innerHeight
}

const isWayOutOfViewport = (el: HTMLElement): boolean => {
    const rect = el.getBoundingClientRect()
    return rect.top <= -600 || rect.bottom >= window.innerHeight + 600
}

const getFizzBuzzProps = (i: number) => {
    let text = ''
    const textStyle: Record<string, string> = {}
    const borderStyle: Record<string, string> = {}
    const backgroundStyle: Record<string, string> = {}

    if (i % 15 === 0) {
        text = `FizzBuzz (${i})`
        textStyle.color = ORANGE
        borderStyle.borderColor = ORANGE
        backgroundStyle.backgroundColor = ORANGE
    } else if (i % 3 === 0) {
        text = `Fizz (${i})`
        textStyle.color = RED
        borderStyle.borderColor = RED
        backgroundStyle.backgroundColor = RED
    } else if (i % 5 === 0) {
        text = `Buzz (${i})`
        textStyle.color = YELLOW
        borderStyle.borderColor = YELLOW
        backgroundStyle.backgroundColor = YELLOW
    } else {
        text = i.toString()
    }

    return {
        text,
        style: {
            text: textStyle,
            border: borderStyle,
            background: backgroundStyle,
        },
    }
}

// Items and states
const items = Array.from({ length: 30 }, (_, i) => i + 1)
const itemsState = new Map<number, HTMLElement>()

// Class and style management
const updateItemState = (el: HTMLElement, i: number) => {
    const inViewport = isInViewport(el)
    const wayOutOfViewport = isWayOutOfViewport(el)

    const props = getFizzBuzzProps(i)
    el.className = `item ${props.text.toLowerCase()} ${inViewport ? 'in-viewport' : 'not-in-viewport'} ${
        wayOutOfViewport ? 'way-out-of-viewport' : ''
    }`
}

const trackItem = (el: Element | ComponentPublicInstance | null, i: number) => {
    if (el instanceof HTMLElement) {
        itemsState.set(i, el)
        updateItemState(el, i)
    }
}

// Efficient scroll handler
let ticking = false
const handleScroll = () => {
    if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
            itemsState.forEach((el, i) => updateItemState(el, i))
            ticking = false
        })
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
})
</script>

<style scoped lang="scss">
$projectBlue: rgb(79,195,247);
$gray200: rgb(200,200,200);
$gray230: rgb(230,230,230);
$shadow1: rgba(0,0,0,0.1);

#app{
  height: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.main-body{
  overflow-x: hidden;

  &::-webkit-scrollbar {
    background-color: white;
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $gray200;
    border-radius: 100px;
  }
}

.scroll-bar{
  &::-webkit-scrollbar {
    background-color: white;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $gray200;
    border-radius: 100px;
  }
}

#fizz-buzz-app{
  margin: auto;
  position: relative;
  width: 100%;

  div, h1, h2, h3, h4, h5, h6, input, button, li, textarea{
    font-family: 'Roboto', sans-serif;
  }

  #fizz-buzz-timeline-bar{
    background-color: $gray230;
    box-shadow: $shadow1;
    font-size: 0px;
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0px;
    transform: translateX(-50%);
    width: 2px;
  }

  #fizz-buzz-items{
    padding: 100px 0px;
    width: 100%;

    .item{
      display: inline-block;
      height: 140px;
      padding: 100px 0px;
      opacity: 0;
      position: relative;
      vertical-align: top;
      transition: all 0.5s;
      width: calc(50% - 44px);

      &:hover{
        .dot{
          .center{
            transform: translate(-50%, -50%) scale(1.1);
          }

          .ring{
            transform: translate(-50%, -50%) scale(1.5);
          }
        }
      }

      &:nth-child(odd){
        border-left: 4px solid $projectBlue;
        margin-right: 40px;

        h1{
          padding-right: 160px;
          right: 0px;
          transform: translateX(-75%) translateY(-50%);

          &.background-text{
            left: 0px;
            padding-right: 0px;
            right: auto;
            text-align: left;
            transform: translateX(-20%) translateY(-50%);
          }
        }

        .bar{
          right: 20px;
          transform: translateX(-50%) translateY(-50%) scale(1.5, 0.5);
        }

        > .dot{
          right: -60px;
        }
      }

      &:nth-child(even){
        border-right: 4px solid $projectBlue;
        margin-left: 40px;
        margin-top: 180px;

        h1{
          padding-left: 160px;
          transform: translateX(75%) translateY(-50%);

          &.background-text{
            padding-left: 20px;
            right: 0px;
            text-align: right;
            transform: translateX(20%) translateY(-50%);
          }
        }

        .bar{
          left: 20px;
          transform: translateX(50%) translateY(-50%) scale(1.5, 0.5);
        }

        > .dot{
          left: -60px;
        }
      }

      &.in-viewport{
        opacity: 1;

        h1{
          transform: translateX(0%) translateY(-50%);

          &.background-text{
            transform: translateX(0%) translateY(-50%);
          }
        }

        .bar{
          transform: translateX(0%) translateY(-50%) scale(1, 1);
        }

        > .dot{
          animation: bounceIn 1s ease-in-out;
          transform: translateY(-50%) scale(1);
        }
      }

      &.way-out-of-viewport{
        > * {
          display: none;
        }
      }

      h1{
        border-radius: 4px;
        color: $projectBlue;
        display: inline-block;
        font-size: 2em;
        font-weight: 300;
        margin: 0px;
        padding: 20px;
        position: absolute;
        text-align: center;
        text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        text-transform: uppercase;
        top: 50%;
        transition: all 0.5s;
        white-space: nowrap;

        &.background-text{
          font-size: 8em;
          font-weight: 700;
          overflow: hidden;
          opacity: 0.1;
        }
      }

      .bar{
        height: 8px;
        position: absolute;
        top: 50%;
        transition: all 0.5s;
        width: 100px;

        .dot{
          background-color: $projectBlue;
          border-radius: 100px;
          box-shadow: $shadow1;
          content: "";
          height: 8px;
          position: absolute;
          top: 0px;
          transform: translateX(-50%);
          transition: all 0.5s;
          width: 8px;

          &.dot-1{
            left: 0px;
          }

          &.dot-2{
            left: 50%;
          }

          &.dot-3{
            left: 100%;
          }
        }
      }

      .dot{
        height: 40px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) scale(0.25);
        transition: all 0.5s;
        width: 40px;

        .center, .ring{
          box-shadow: $shadow1;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.25s;
        }

        .center{
          background-color: $projectBlue;
          border-radius: 100px;
          height: 15px;
          width: 15px;
        }

        .ring{
          border: 2px solid $projectBlue;
          border-radius: 100px;
          height: 30px;
          width: 30px;
        }
      }
    }
  }
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translateY(-50%) scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: translateY(-50%) scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: translateY(-50%) scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: translateY(-50%) scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: translateY(-50%) scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: translateY(-50%) scale3d(1, 1, 1);
  }
}
</style>
