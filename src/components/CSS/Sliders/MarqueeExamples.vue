<template>
    <div class="main-body">
        <div class="marquee-container">
            <h1>CSS Marquee Examples</h1>

            <section
                v-for="(section, index) in sections"
                :key="index"
                :class="[
                    section.enableAnimation ? 'enable-animation' : '',
                    section.reverse ? 'marquee--reverse' : '',
                    section.hoverPause ? 'marquee--hover-pause' : '',
                    section.fitContent ? 'marquee--fit-content' : '',
                    section.absolutePosition ? 'marquee--pos-absolute' : '',
                ]"
            >
                <h2>{{ section.title }}</h2>
                <input
                    :id="'enable-animation-' + (index + 1)"
                    v-model="section.enableAnimation"
                    type="checkbox"
                >
                <label :for="'enable-animation-' + (index + 1)">Enable animation</label>

                <div class="marquee">
                    <ul class="marquee__content">
                        <li
                            v-for="item in section.content"
                            :key="item"
                        >
                            {{ item }}
                        </li>
                    </ul>

                    <ul
                        aria-hidden="true"
                        class="marquee__content"
                    >
                        <li
                            v-for="item in section.content"
                            :key="'ghost-' + item"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Default content for marquee sections
const defaultContent = Array.from({ length: 6 }, (_, i) => i + 1)

// Reactive sections
const sections = reactive([
    {
        title: 'Full-width (default)',
        enableAnimation: false,
        reverse: false,
        hoverPause: false,
        fitContent: false,
        absolutePosition: false,
        content: defaultContent,
    },
    {
        title: 'Reverse',
        enableAnimation: false,
        reverse: true,
        hoverPause: false,
        fitContent: false,
        absolutePosition: false,
        content: defaultContent,
    },
    {
        title: 'Pause on hover',
        enableAnimation: false,
        reverse: false,
        hoverPause: true,
        fitContent: false,
        absolutePosition: false,
        content: defaultContent,
    },
    {
        title: 'Fit content',
        enableAnimation: false,
        reverse: false,
        hoverPause: false,
        fitContent: true,
        absolutePosition: false,
        content: defaultContent.slice(0, 3), // Only 3 items for fit content
    },
    {
        title: 'Fit content + position absolute :last-child',
        enableAnimation: false,
        reverse: false,
        hoverPause: false,
        fitContent: true,
        absolutePosition: true,
        content: defaultContent.slice(0, 3), // Only 3 items for fit content
    },
])
</script>

<style scoped>
/* Marquee styles */
.marquee {
  --gap: 1rem;
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

/* Pause animation when reduced-motion is set */
@media (prefers-reduced-motion: reduce) {
  .marquee__content {
    animation-play-state: paused !important;
  }
}

/* Enable animation */
.enable-animation .marquee__content {
  animation: scroll 10s linear infinite;
}

/* Reverse animation */
.marquee--reverse .marquee__content {
  animation-direction: reverse;
}

/* Pause on hover */
.marquee--hover-pause .marquee:hover .marquee__content {
  animation-play-state: paused;
}

.marquee--hover-pause .marquee:hover {
  border: 1px solid red;
}

/* Attempt to size parent based on content.
* Keep in mind that the parent width is equal to both content containers that stretch to fill the parent.
*/
.marquee--fit-content {
  max-width: fit-content;
}

/* A fit-content sizing fix: Absolute position the duplicate container.
* This will set the size of the parent wrapper to a single child container.
* Shout out to Olavi's article that had this solution 👏 @link: https://olavihaapala.fi/2021/02/23/modern-marquee.html
*/
.marquee--pos-absolute .marquee__content:last-child {
  position: absolute;
  top: 0;
  left: 0;
}

/* Enable position absolute animation on the duplicate content (last-child) */
.enable-animation .marquee--pos-absolute .marquee__content:last-child {
  animation-name: scroll-abs;
}

@keyframes scroll-abs {
  from {
    transform: translateX(calc(100% + var(--gap)));
  }
  to {
    transform: translateX(0);
  }
}

/* Other page demo styles */
.marquee__content > * {
  flex: 0 0 auto;
  color: white;
  background: dodgerblue;
  margin: 2px;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  text-align: center;
  list-style-type: none;
}

.marquee {
  border: 2px dashed lightgray;
}

* {
  box-sizing: border-box;
}

.main-body {
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-block: 2rem 1rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

input {
  margin-right: 1em;
}

section {
  margin-block: 3rem;
}

section > * + * {
  margin-block-start: 0.5rem;
}
</style>
