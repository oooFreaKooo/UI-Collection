<template>
    <div class="main-body">
        <div
            class="container"
            :data-slide="currentSlideIndex"
        >
            <!-- Header -->
            <div class="header">
                <a
                    class="menu-icon"
                    href="#"
                >
                    <!-- SVG icon here -->
                </a>
                <img
                    class="logo"
                    src="https://cdn.shopify.com/s/files/1/0689/1443/files/CLOSCA-LOGO-WEB-BLACK_130x@2x.png?v=1559116993"
                >
                <div class="header-menu">
                    <a href="#">Mask</a>
                    <a href="#">Helmet</a>
                    <a href="#">Bottle</a>
                    <a href="#">Accessories</a>
                </div>
                <div class="header-icons">
                    <!-- SVG icons here -->
                </div>
            </div>

            <!-- Slider -->
            <div class="mySlider">
                <transition
                    :name="transitionName"
                    mode="default"
                >
                    <div
                        :id="slides[currentSlideIndex].id"
                        :key="currentSlideIndex"
                        class="main"
                    >
                        <div class="left-side">
                            <div class="main-wrapper">
                                <h3 class="main-header">
                                    {{ slides[currentSlideIndex].header }}
                                </h3>
                                <h1 class="main-title">
                                    {{ slides[currentSlideIndex].title }}
                                </h1>
                                <h2 class="main-subtitle">
                                    {{ slides[currentSlideIndex].subtitle }}
                                </h2>
                            </div>
                            <div class="main-content">
                                <div class="main-content__title">
                                    {{ slides[currentSlideIndex].contentTitle }}
                                </div>
                                <div class="main-content__subtitle">
                                    {{ slides[currentSlideIndex].contentSubtitle }}
                                </div>
                                <div class="more-menu">
                                    Shop Now

                                    <span class="mdi mdi-arrow-right" />
                                </div>
                            </div>
                        </div>
                        <div class="center">
                            <div class="right-side__img">
                                <img
                                    class="bottle-bg"
                                    :src="slides[currentSlideIndex].bgImage"
                                    alt=""
                                >
                                <img
                                    class="bottle-img"
                                    :src="slides[currentSlideIndex].bottleImage"
                                >
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- Navigation Buttons -->
            <div class="button-wrapper">
                <div
                    class="swiper-button"
                    @click="prevSlide"
                >
                    <span class="mdi mdi-arrow-left" />
                </div>
                <div
                    class="swiper-button"
                    @click="nextSlide"
                >
                    <span class="mdi mdi-arrow-right" />
                </div>
            </div>

            <!-- Pagination -->
            <div class="swiper-pagination">
                <span>{{ currentSlideIndex + 1 }} / {{ slides.length }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const slides = [
    {
        id: 'beach',
        header: 'Closca Bottle',
        title: 'Beach',
        subtitle: '€ 39.90',
        contentTitle:
      'In 20 years, there could be more plastic in our oceans than fish.',
        contentSubtitle:
      'Plastic pollution injures more than 100,000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.',
        bgImage:
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2902&auto=format&fit=crop',
        bottleImage:
      'https://hellofrom.store/cdn/shop/products/AMAZONIA-BIG-1_600x_6b8e9a6b-3f90-4f4f-bf38-5f91f4efb843.png?v=1659121932&width=1100',
    },
    {
        id: 'savanna',
        header: 'Closca Bottle',
        title: 'Savanna',
        subtitle: '€ 39.90',
        contentTitle:
      'The Earth’s area affected by desertification is approx 11 times India’s size.',
        contentSubtitle:
      'The Savannas act as a carbon sink, absorbing CO2 from the atmosphere and helping to maintain the balance of global temperatures.',
        bgImage:
      'https://images.unsplash.com/photo-1613109526778-27605f1f27d2?auto=format&fit=crop&w=2340&q=80',
        bottleImage:
      'https://fnac.sa/cdn/shop/files/Closca_Bottle_Wave_Sahara_600ml_Close.png',
    },
    {
        id: 'glacier',
        header: 'Closca Bottle',
        title: 'Glacier',
        subtitle: '€ 39.90',
        contentTitle: 'Glaciers contain 75% of the World\'s freshwater.',
        contentSubtitle:
      'The effects of melting ice glaciers are biodiversity loss, the rising of the sea level and the deficiency of freshwater, among others.',
        bgImage:
      'https://www.discover-the-world.com/app/uploads/2018/05/chile-patagonia-calving-glacier-is-1150x863-c-default.jpg',
        bottleImage:
      'https://gomagcdn.ro/domains/alty.ro/files/product/original/sticla-reutilizabila-apa-closca-glacier-copie-848-7049.png',
    },
    {
        id: 'coral',
        header: 'Closca Bottle',
        title: 'Coral',
        subtitle: '€ 39.90',
        contentTitle: 'We will have lost 60% of our coral reefs by 2030.',
        contentSubtitle:
      'Coral reefs are essential to humans, as they protect the shorelines and are a source of nutrients and habitat for thousands of marine species.',
        bgImage:
      'https://images.unsplash.com/photo-1546500840-ae38253aba9b?auto=format&fit=crop&w=3260&q=80',
        bottleImage:
      'https://fnac.sa/cdn/shop/files/Closca_Bottle_Wave_Arizona_600ml_Close.png',
    },
]

const currentSlideIndex = ref(0)
const direction = ref('next')

const transitionName = computed(() =>
    direction.value === 'next' ? 'slide-left' : 'slide-right',
)

function nextSlide () {
    direction.value = 'next'
    currentSlideIndex.value =
    (currentSlideIndex.value + 1) % slides.length
}

function prevSlide () {
    direction.value = 'prev'
    currentSlideIndex.value =
    (currentSlideIndex.value - 1 + slides.length) % slides.length
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600&display=swap');

* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
}

a {
  text-decoration: none;
  color: var(--body-color);
}

h1,
h2,
h3 {
  margin: 0;
}

.main-body {
  --body-color: #2c2d2a;
  --savanna-bg: #e9bf8b;
  --beach-bg: #e7dfcf;
  --glacier-bg: #b6d6c8;
  --coral-bg: #e86357;
  --body-font: 'Montserrat', sans-serif;
  --italic-font: 'EB Garamond', serif;

  font-family: var(--body-font);
  background-color: #1d1e20;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  width: 100%;
  height: 100vh;
  color: var(--body-color);
}

.container {
  max-width: 1100px;
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e6decf;
  position: relative;
  overflow: hidden;
  padding: 0 2em 2em;
}

.logo {
  width: 116px;
}

.header {
  display: flex;
  align-items: center;
  height: 62px;
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  position: sticky;
  border-bottom: 1px solid rgba(44, 45, 42, 0.25);
  top: 0;
  background-color: var(--beach-bg);
  z-index: 6;

  &-menu {
    display: flex;
    align-items: center;
    margin-left: auto;

    a:not(:first-child) {
      margin-left: 30px;
    }
  }

  .menu-icon {
    display: flex;
    align-items: center;
    margin-right: 20px;

    svg {
      width: 22px;
    }
  }

  &-icons {
    margin-left: auto;
    display: flex;
    align-items: center;

    svg {
      width: 18px;

      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}

.left-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 420px;
  padding-left: 30px;

  @media screen and (max-width: 930px) {
    align-items: center;
    max-width: 100%;
    text-align: center;
  }
}

.mySlider {
  display: flex;
  flex-grow: 1;
  position: relative;
}

.main {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 95px 0 30px;

  @media screen and (max-width: 930px) {
    flex-direction: column;
    padding: 30px 0;
  }

  .main-wrapper {
    .main-header {
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 4px;
      font-weight: 600;
    }

    .main-title {
      font-family: var(--italic-font);
      font-size: 100px;
      font-weight: 400;
      margin-top: 10px;
      line-height: 1em;

      @media screen and (max-width: 930px) {
        font-size: 60px;
      }
    }

    .main-subtitle {
      font-family: var(--italic-font);
      font-weight: 400;
      font-size: 32px;
      margin-top: 14px;
      margin-bottom: 60px;
    }
  }

  .main-content {
    &__title {
      font-size: 26px;
      font-family: var(--italic-font);
      font-style: italic;
      margin-bottom: 14px;
    }

    &__subtitle {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 24px;
      letter-spacing: -0.01em;
    }

    .more-menu {
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;

      span {
        width: 58px;
        height: 18px;
        margin-left: 10px;
      }
    }
  }
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  .right-side__img {
    position: relative;

    .bottle-bg {
      width: 320px;
      height: 450px;
      object-fit: cover;
      border-radius: 160px;

      @media screen and (max-width: 930px) {
        width: 260px;
        height: 390px;
      }
      @media screen and (max-width: 575px) {
        width: 220px;
        height: 340px;
      }
    }

    .bottle-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.6);

      @media screen and (max-width: 930px) {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
  }
}

.swiper-pagination {
  position: absolute;
  right: 30px;
  top: 100px;
  z-index: 2;
  font-size: 14px;
  font-weight: 500;
}

.button-wrapper {
  position: absolute;
  right: 25%;
  bottom: 15%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 930px) {
    position: absolute;
    width: 50%;
    bottom: 10%;
    justify-content: space-between;
    padding: 0 16px;
  }

  @media screen and (max-width: 575px) {
    position: absolute;
    width: 50%;
    bottom: 1%;
    justify-content: space-between;
    padding: 0 16px;
  }

  .swiper-button {
    border: 1px solid var(--body-color);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: background-color 0.3s ease-out;
    cursor: pointer;

    &:hover {
      background-color: var(--body-color);

      span {
        color: #fff;
      }
    }

    & + .swiper-button {
      margin-left: 16px;
    }

    span {
      transform: scale(1.5);
    }
  }
}

/* Transition styles for slide animations */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 0.5s ease, transform 0.8s ease;
  transform: translateY(50px);
  opacity: 0;

  .main-title {
    transform: rotateX(90deg);
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease;
  }

  .bottle-bg {
    transform: scale(0.8);
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease;
  }

  .bottle-img {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
}

.slide-left-enter-to,
.slide-right-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-left-leave-to,
.slide-right-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

/* Title animation */
.slide-left-enter .main-title,
.slide-right-enter .main-title {
  transform: translateX(-100px);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.slide-left-enter-to .main-title,
.slide-right-enter-to .main-title {
  transform: translateX(0);
  opacity: 1;
}

/* Background animation */
.slide-left-enter .bottle-bg,
.slide-right-enter .bottle-bg {
  transform: scale(1);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.slide-left-enter-to .bottle-bg,
.slide-right-enter-to .bottle-bg {
  transform: scale(1);
  opacity: 1;
}

/* Image animation */
.slide-left-enter .bottle-img,
.slide-right-enter .bottle-img {
  opacity: 0;
  transition: transform 1s ease, opacity 1s ease;
}

.slide-left-enter-to .bottle-img,
.slide-right-enter-to .bottle-img {
  opacity: 1;
}

/* Slide-specific background colors */
.container[data-slide='0'],
.container[data-slide='0'] .header {
  background-color: var(--beach-bg);
}

.container[data-slide='1'],
.container[data-slide='1'] .header {
  background-color: var(--savanna-bg);
}

.container[data-slide='2'],
.container[data-slide='2'] .header {
  background-color: var(--glacier-bg);
}

.container[data-slide='3'],
.container[data-slide='3'] .header {
  background-color: var(--coral-bg);
}
</style>
