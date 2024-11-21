<template>
    <div class="main-body">
        <div class="scrollDist" />
        <div class="main">
            <svg
                viewBox="0 0 1200 800"
                xmlns="http://www.w3.org/2000/svg"
            >
                <mask id="m">
                    <g class="cloud1">
                        <rect
                            fill="#fff"
                            width="100%"
                            height="801"
                            y="799"
                        />
                        <image
                            xlink:href="https://assets.codepen.io/721952/cloud1Mask.jpg"
                            width="1200"
                            height="800"
                        />
                    </g>
                </mask>

                <image
                    class="sky"
                    xlink:href="https://assets.codepen.io/721952/sky.jpg"
                    width="1200"
                    height="590"
                />
                <image
                    class="mountBg"
                    xlink:href="https://assets.codepen.io/721952/mountBg.png"
                    width="1200"
                    height="800"
                />
                <image
                    class="mountMg"
                    xlink:href="https://assets.codepen.io/721952/mountMg.png"
                    width="1200"
                    height="800"
                />
                <image
                    class="cloud2"
                    xlink:href="https://assets.codepen.io/721952/cloud2.png"
                    width="1200"
                    height="800"
                />
                <image
                    class="mountFg"
                    xlink:href="https://assets.codepen.io/721952/mountFg.png"
                    width="1200"
                    height="800"
                />
                <image
                    class="cloud1"
                    xlink:href="https://assets.codepen.io/721952/cloud1.png"
                    width="1200"
                    height="800"
                />
                <image
                    class="cloud3"
                    xlink:href="https://assets.codepen.io/721952/cloud3.png"
                    width="1200"
                    height="800"
                />
                <text
                    fill="#fff"
                    x="350"
                    y="200"
                >EXPLORE</text>
                <polyline
                    class="arrow"
                    fill="#fff"
                    points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
                />

                <g mask="url(#m)">
                    <rect
                        fill="#fff"
                        width="100%"
                        height="100%"
                    />
                    <text
                        x="350"
                        y="200"
                        fill="#162a43"
                    >FURTHER</text>
                </g>

                <rect
                    id="arrowBtn"
                    width="100"
                    height="100"
                    opacity="0"
                    x="550"
                    y="220"
                    style="cursor:pointer"
                />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

onMounted(() => {
    gsap.set('.main', {
        position: 'relative',
        background: '#fff',
        width: '100%',
        maxWidth: '1200px',
        height: '100vh',
        top: 0,
        left: '50%',
    })

    gsap.set('.scrollDist', { width: '100%', height: '200%' })

    gsap.timeline({
        scrollTrigger: {
            trigger: '.scrollDist',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 3, // Slows down the scrub rate for smoother animation
        },
    })
        .fromTo('.sky', { y: 0 }, { y: -200, ease: 'power1.out' }, 0)
        .fromTo('.cloud1', { y: 100 }, { y: -800, ease: 'power1.out' }, 0)
        .fromTo('.cloud2', { y: -150 }, { y: -500, ease: 'power1.out' }, 0)
        .fromTo('.cloud3', { y: -50 }, { y: -650, ease: 'power1.out' }, 0)
        .fromTo('.mountBg', { y: -10 }, { y: -100, ease: 'power1.out' }, 0)
        .fromTo('.mountMg', { y: -30 }, { y: -250, ease: 'power1.out' }, 0)
        .fromTo('.mountFg', { y: -50 }, { y: -600, ease: 'power1.out' }, 0)

    const arrowBtn = document.querySelector('#arrowBtn')
    arrowBtn?.addEventListener('mouseenter', () => {
        gsap.to('.arrow', {
            y: 10,
            duration: 1,
            ease: 'back.inOut(3)',
            overwrite: 'auto',
        })
    })
    arrowBtn?.addEventListener('mouseleave', () => {
        gsap.to('.arrow', {
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto',
        })
    })
    arrowBtn?.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: window.innerHeight,
            duration: 2,
            ease: 'power1.inOut',
        })
    })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

.main-body {
  width: 100%;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  font-size: 99px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.scrollDist{
  width:'100%';
  height:'200%';
}

.main {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  pointer-events: none;
}

svg {
  pointer-events: auto;
}
</style>
