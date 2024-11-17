<template>
    <div class="main-body">
        <nav :class="{ 'nav-toggled': navToggled }">
            <div class="nav-section nav-logo">
                <a href="#">
                    <i class="mdi mdi-fire" />
                </a>
            </div>
            <div class="nav-mobile">
                <div class="nav-section nav-links">
                    <a href="#">ABOUT</a>
                    <a href="#">WORK</a>
                </div>
                <div class="nav-section nav-social">
                    <a href="#">
                        <i class="mdi mdi-twitter" />
                    </a>
                    <a href="#">
                        <i class="mdi mdi-youtube" />
                    </a>
                    <a href="#">
                        <i class="mdi mdi-codepen" />
                    </a>
                </div>
                <div class="nav-section nav-contact">
                    <a href="#">GET IN TOUCH</a>
                </div>
            </div>
            <button
                class="nav-toggle-button"
                type="button"
                @click="handleNavToggle"
            >
                <span>Menu</span>
                <i class="mdi mdi-menu" />
            </button>
        </nav>

        <main>
            <Transition :name="transitionName">
                <article :key="activeIndex">
                    <div
                        class="article-image-section article-section"
                        :style="{ backgroundImage: `url(${currentArticle.image})` }"
                    />
                    <div class="article-description-section article-section">
                        <p v-html="currentArticle.description" />
                    </div>
                    <div class="article-title-section article-section">
                        <h2>{{ currentArticle.title }}</h2>
                        <i class="mdi mdi-plus" />
                    </div>
                    <div class="article-nav-section article-section">
                        <button
                            class="article-nav-button"
                            type="button"
                            @click="handleLeftClick"
                        >
                            <i class="mdi mdi-arrow-left" />
                        </button>
                        <button
                            class="article-nav-button"
                            type="button"
                            @click="handleRightClick"
                        >
                            <i class="mdi mdi-arrow-right" />
                        </button>
                    </div>
                </article>
            </Transition>
        </main>
    </div>
</template>

<script setup lang="ts">
const activeIndex = ref(0)
const navToggled = ref(false)
const transitionName = ref('slide-right')

const articles = [
    {
        image:
          'https://images.unsplash.com/photo-1565626424178-c699f6601afd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80',
        title: 'Recreation From Scratch',
        description: `This design is a recreation of this website:
        <a  href="https://www.dylanbrouwer.design/work" target="_blank">dylanbrouwer.design/work</a>.`,
    },
    {
        image:
          'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2574&q=80',
        title: 'Wicked Cool Library Shelves',
        description: 'A place where books hang out waiting to be grabbed. But don\'t be too grabby now, ya hear?',
    },
    {
        image:
          'https://images.unsplash.com/photo-1660580554695-d2ca5008f1f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=927&q=80',
        title: 'Neato Toledo Lighthouse',
        description: 'The neatest lighthouse you ever saw. Ehh, actually it\'s kind of messy. But that\'s why the pic is of the outside.',
    },
    {
        image:
          'https://images.unsplash.com/photo-1660766877755-4cac24f6cf21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80',
        title: 'Super Space Blob',
        description: 'The blobiest of blobs nestled deep in the heart of outer space.',
    },
]

const currentArticle = computed(() => articles[activeIndex.value])

const handleNavToggle = () => {
    navToggled.value = !navToggled.value
}

const handleLeftClick = () => {
    transitionName.value = 'slide-right'
    activeIndex.value = (activeIndex.value - 1 + articles.length) % articles.length
}

const handleRightClick = () => {
    transitionName.value = 'slide-left'
    activeIndex.value = (activeIndex.value + 1) % articles.length
}

onMounted(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)')
    const handler = () => {
        navToggled.value = false
    }
    mediaQuery.addEventListener('change', handler)
    onUnmounted(() => {
        mediaQuery.removeEventListener('change', handler)
    })
})
</script>

<style scoped>
.main-body {
  --background-color: rgb(6, 11, 25);
  --border-color: rgba(255, 255, 255, 0.1);
  --highlight-color: rgb(126, 87, 194);
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

h1, h2, h3, a, p, span {
  font-family: "Rubik", sans-serif;
  font-weight: 400;
  color: white;
  margin: 0;
}

a {
  text-decoration: none;
}

a:hover {
  color: var(--highlight-color);
}

nav {
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
}

nav .nav-section {
  padding: 3rem 2rem;
  display: flex;
  gap: 1rem;
  border-left: 1px solid var(--border-color);
  align-items: center;
  justify-content: center;
}

.nav-logo {
  flex-basis: calc(100% / 3);
  justify-content: flex-start;
}

.nav-logo a i {
  font-size: 2.5rem;
}

.nav-mobile {
  display: flex;
  flex-basis: calc(100% * (2 / 3));
  z-index: 2;
}

.nav-links {
  flex-basis: 50%;
  gap: 6rem;
}

.nav-social {
  flex-grow: 1;
  gap: 3rem;
}

.nav-contact {
  padding-bottom: 4rem;
}

.nav-toggle-button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-left: 1px solid var(--border-color);
  color: white;
  cursor: pointer;
  display: none;
  gap: 0.8rem;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 0rem 3rem;
  position: relative;
  z-index: 3;
}

.nav-toggle-button:hover,
.nav-toggle-button:hover > span {
  color: var(--highlight-color);
}

.nav-toggle-button > span,
.nav-toggle-button > i {
  display: inline-block;
  height: 1rem;
  line-height: 1rem;
}

main {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}

main > article {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  left: 0;
  top: 0;
}

.article-section {
  height: 100%;
  display: flex;
}

.article-image-section {
  background-position: center;
  background-size: cover;
}

.article-description-section,
.article-nav-section {
  border-left: 1px solid var(--border-color);
}

.article-title-section,
.article-nav-section {
  border-top: 1px solid var(--border-color);
}

.article-description-section {
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem;
}

.article-description-section p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.25em;
}

.article-description-section p a:hover {
  text-decoration: underline;
}

.article-title-section {
  align-items: center;
  justify-content: space-between;
  padding: 2rem 4rem;
}

.article-title-section * {
  color: white;
}

.article-title-section h2 {
  flex-basis: 50%;
  font-family: "Montserrat", sans-serif;
  font-size: 3.5rem;
  line-height: 3rem;
  margin: 0;
  text-transform: uppercase;
}

.article-title-section i {
  color: rgba(255, 255, 255, 0.75);
  font-size: 4rem;
}

.article-nav-button {
  background-color: transparent;
  flex-grow: 1;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 3rem;
  cursor: pointer;
}

.article-nav-button:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.article-nav-button:nth-child(2) {
  border-left: 1px solid var(--border-color);
}

@media (max-width: 1200px) {
  .nav-mobile {
    flex-basis: calc(100% * 0.75);
  }

  .nav-logo {
    flex-basis: calc(100% * 0.25);
  }

  .nav-links {
    flex-basis: calc(100% / 3);
    gap: 3rem;
  }

  main {
    overflow-y: auto;
  }

  main > article {
    grid-template-columns: none;
    grid-template-rows: 1.5fr repeat(3, 0.75fr) 0.25fr;
    height: max(900px, 100%);
  }

  .article-title-section h2 {
    font-size: 3rem;
    line-height: 2.6rem;
  }

  .article-title-section i {
    font-size: 3rem;
  }

  .article-description-section,
  .article-nav-section {
    border-left: none;
  }

  .article-image-section {
    order: 1;
  }

  .article-title-section {
    border-bottom: 1px solid var(--border-color);
    order: 2;
  }

  .article-description-section {
    justify-content: center;
    order: 3;
  }

  .article-nav-section {
    border-bottom: 1px solid var(--border-color);
    order: 4;
  }
}

@media (max-width: 800px) {
  nav .nav-section {
    border-left: none;
    padding: 1.5rem 1rem;
  }

  .nav-logo a i {
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .nav-mobile {
    background-color: var(--background-color);
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    position: fixed;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 400ms ease, opacity 400ms ease;
  }

  nav.nav-toggled .nav-mobile {
    opacity: 1;
    transform: translateY(0%);
  }

  .nav-toggle-button {
    display: flex;
  }

  .nav-links {
    flex-basis: 60%;
    flex-direction: column;
    gap: 4rem;
  }

  .nav-links a {
    font-size: 3rem;
  }

  .nav-social a {
    font-size: 2rem;
  }

  main > article {
    grid-template-rows: 1fr repeat(4, 0.5fr);
    height: max(700px, 100%);
  }

  .article-title-section {
    padding: 2rem;
  }

  .article-title-section h2 {
    flex-basis: 70%;
    font-size: 1.75em;
    line-height: 1.5rem;
  }

  .article-title-section i {
    font-size: 2rem;
  }

  .article-description-section {
    padding: 2rem;
  }

  .article-description-section p {
    font-size: 1rem;
  }
}

/* Transition Styles */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
transition: transform 0.5s ease;
position: absolute;
width: 100%;
height: 100%;
}

.slide-left-enter-from {
transform: translateX(-100%);
}

.slide-left-enter-to {
transform: translateX(0%);
}

.slide-left-leave-from {
transform: translateX(0%);
}

.slide-left-leave-to {
transform: translateX(100%);
}

.slide-right-enter-from {
transform: translateX(100%);
}

.slide-right-enter-to {
transform: translateX(0%);
}

.slide-right-leave-from {
transform: translateX(0%);
}

.slide-right-leave-to {
transform: translateX(-100%);
}
</style>
