<template>
    <div class="main-body">
        <div class="slide-container">
            <div class="wrapper">
                <div class="clash-card-container">
                    <!-- Transition wraps the current card -->
                    <transition
                        :name="transitionName"
                    >
                        <!-- Wrap v-for output with a root div -->
                        <div
                            v-if="currentCards.length"
                            :key="currentCards[0].id"
                        >
                            <div
                                v-for="card in currentCards"
                                :key="card.id"
                                class="clash-card"
                            >
                                <div :class="['clash-card__image', `clash-card__image--${card.type}`]">
                                    <img
                                        :src="card.image"
                                        :alt="card.name"
                                        :style="{ display: imageLoaded ? 'block' : 'none' }"
                                        @load="handleImageLoad"
                                    >
                                </div>
                                <div :class="['clash-card__level', `clash-card__level--${card.type}`]">
                                    Level {{ card.level }}
                                </div>
                                <div class="clash-card__unit-name">
                                    {{ card.name }}
                                </div>
                                <div class="clash-card__unit-description">
                                    {{ card.description }}
                                </div>
                                <div
                                    :class="[
                                        'clash-card__unit-stats',
                                        `clash-card__unit-stats--${card.type}`,
                                        'clearfix',
                                    ]"
                                >
                                    <div class="one-third">
                                        <div class="stat">
                                            {{ card.trainingTime }}<sup>{{ card.trainingUnit }}</sup>
                                        </div>
                                        <div class="stat-value">
                                            Training
                                        </div>
                                    </div>

                                    <div class="one-third">
                                        <div class="stat">
                                            {{ card.speed }}
                                        </div>
                                        <div class="stat-value">
                                            Speed
                                        </div>
                                    </div>

                                    <div class="one-third no-border">
                                        <div class="stat">
                                            {{ card.cost }}
                                        </div>
                                        <div class="stat-value">
                                            Cost
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <button
                class="nav-button prev-button"
                :disabled="isTransitioning"
                aria-label="Previous Card"
                @click="prevSlide"
            >
                Prev
            </button>
            <button
                class="nav-button next-button"
                :disabled="isTransitioning"
                aria-label="Next Card"
                @click="nextSlide"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Define the Card interface
interface Card {
    id: number
    type: string
    level: number
    name: string
    description: string
    trainingTime: number
    trainingUnit: string
    speed: number
    cost: number
    image: string
}

// Reactive references
const currentSlide = ref(1) // Start with the first card (id: 1)
const imageLoaded = ref(false)
const transitionName = ref('slide-left')
const isTransitioning = ref(false)

// Define the cards array with unique IDs
const cards: Card[] = [
    {
        id: 1,
        type: 'barbarian',
        level: 4,
        name: 'The Barbarian',
        description:
      'The Barbarian is a kilt-clad Scottish warrior with an angry, battle-ready expression, hungry for destruction. He has a killer yellow horseshoe mustache.',
        trainingTime: 20,
        trainingUnit: 'S',
        speed: 16,
        cost: 150,
        image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png',
    },
    {
        id: 2,
        type: 'archer',
        level: 5,
        name: 'The Archer',
        description:
      'The Archer is a female warrior with sharp eyes. She wears a short, light green dress, a hooded cape, a leather belt, and an attached small pouch.',
        trainingTime: 25,
        trainingUnit: 'S',
        speed: 24,
        cost: 300,
        image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer.png',
    },
    {
        id: 3,
        type: 'giant',
        level: 5,
        name: 'The Giant',
        description:
      'Slow, steady, and powerful, Giants are massive warriors that soak up huge amounts of damage. Show them a turret or cannon and you\'ll see their fury unleashed!',
        trainingTime: 2,
        trainingUnit: 'M',
        speed: 12,
        cost: 2250,
        image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant.png',
    },
    {
        id: 4,
        type: 'goblin',
        level: 5,
        name: 'The Goblin',
        description:
      'These pesky little creatures only have eyes for one thing: LOOT! They are faster than a Spring Trap, and their hunger for resources is limitless.',
        trainingTime: 30,
        trainingUnit: 'S',
        speed: 32,
        cost: 100,
        image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin.png',
    },
    {
        id: 5,
        type: 'wizard',
        level: 6,
        name: 'The Wizard',
        description:
      'The Wizard is a terrifying presence on the battlefield. Pair him up with some of his fellows and cast concentrated blasts of destruction on anything, land or sky!',
        trainingTime: 5,
        trainingUnit: 'M',
        speed: 16,
        cost: 4000,
        image:
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard.png',
    },
]

// Computed property to get the current card as an array
const currentCards = computed(() => {
    return cards.filter(card => card.id === currentSlide.value)
})

// Function to handle image load
const handleImageLoad = () => {
    imageLoaded.value = true
}

// Navigation Functions
const prevSlide = () => {
    if (isTransitioning.value) { return }
    isTransitioning.value = true
    imageLoaded.value = false
    transitionName.value = 'slide-right'

    if (currentSlide.value === 1) {
        currentSlide.value = cards.length
    } else {
        currentSlide.value--
    }
}

const nextSlide = () => {
    if (isTransitioning.value) { return }
    isTransitioning.value = true
    imageLoaded.value = false
    transitionName.value = 'slide-left'

    if (currentSlide.value === cards.length) {
        currentSlide.value = 1
    } else {
        currentSlide.value++
    }
}

// Watch for slide changes to reset the transitioning state
watch(currentSlide, () => {
    // Allow some time for the transition to complete
    setTimeout(() => {
        isTransitioning.value = false
    }, 100)
})

// Initial setup
onMounted(() => {
    imageLoaded.value = false
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');

$border-radius-size: 14px;
$barbarian: #ec9b3b;
$archer: #ee5487;
$giant: #f6901a;
$goblin: #82bb30;
$wizard: #4facff;

.main-body {
  background: linear-gradient(
      to bottom,
      rgba(140, 122, 122, 1) 0%,
      rgba(175, 135, 124, 1) 65%,
      rgba(175, 135, 124, 1) 100%
    )
    fixed;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/coc-background.jpg')
    no-repeat center center fixed;
  background-size: cover;
  font: 14px/20px 'Lato', Arial, sans-serif;
  color: #9e9e9e;
  margin-top: 30px;
}

.slide-container {
  margin: auto;
  width: 100%;
  height: 100vh;
  text-align: center;
  position: relative;

  .wrapper {
    padding-top: 40px;
    padding-bottom: 40px;

    .clash-card-container {
      position: relative;
    }

    .clash-card {
      background: white;
      width: 300px;
      display: inline-block;
      margin: auto;
      border-radius: $border-radius-size + 5;
      position: relative;
      text-align: center;
      box-shadow: -1px 15px 30px -12px black;
      z-index: 9999;

      &__image {
        position: relative;
        height: 230px;
        margin-bottom: 35px;
        border-top-left-radius: $border-radius-size;
        border-top-right-radius: $border-radius-size;
      }

      &__image--barbarian {
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg');
        img {
          width: 400px;
          position: absolute;
          top: -65px;
          left: -70px;
        }
      }

      &__image--archer {
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer-bg.jpg');
        img {
          width: 400px;
          position: absolute;
          top: -34px;
          left: -37px;
        }
      }

      &__image--giant {
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant-bg.jpg');
        img {
          width: 340px;
          position: absolute;
          top: -30px;
          left: -25px;
        }
      }

      &__image--goblin {
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin-bg.jpg');
        img {
          width: 370px;
          position: absolute;
          top: -21px;
          left: -37px;
        }
      }

      &__image--wizard {
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard-bg.jpg');
        img {
          width: 345px;
          position: absolute;
          top: -28px;
          left: -10px;
        }
      }

      &__level {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 3px;

        &--barbarian {
          color: $barbarian;
        }

        &--archer {
          color: $archer;
        }

        &--giant {
          color: $giant;
        }

        &--goblin {
          color: $goblin;
        }

        &--wizard {
          color: $wizard;
        }
      }

      &__unit-name {
        font-size: 26px;
        color: black;
        font-weight: 900;
        margin-bottom: 5px;
      }

      &__unit-description {
        padding: 20px;
        margin-bottom: 10px;
      }

      &__unit-stats {
        color: white;
        font-weight: 700;
        border-bottom-left-radius: $border-radius-size;
        border-bottom-right-radius: $border-radius-size;

        &--barbarian {
          background: $barbarian;
          .one-third {
            border-right: 1px solid #bd7c2f;
          }
        }

        &--archer {
          background: $archer;
          .one-third {
            border-right: 1px solid #d04976;
          }
        }

        &--giant {
          background: $giant;
          .one-third {
            border-right: 1px solid darken($giant, 8%);
          }
        }

        &--goblin {
          background: $goblin;
          .one-third {
            border-right: 1px solid darken($goblin, 6%);
          }
        }

        &--wizard {
          background: $wizard;
          .one-third {
            border-right: 1px solid darken($wizard, 6%);
          }
        }

        .one-third {
          width: 33%;
          float: left;
          padding: 20px 15px;

          &:last-child {
            border-right: none;
          }

          .stat {
            position: relative;
            font-size: 24px;
            margin-bottom: 10px;
            sup {
              position: absolute;
              bottom: 4px;
              font-size: 45%;
              margin-left: 2px;
            }
          }

          .stat-value {
            text-transform: uppercase;
            font-weight: 400;
            font-size: 12px;
          }
        }
      }
    }
  }

  .nav-button {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #fff;
    padding: 10px;
  }

  .prev-button {
    left: 20%;
  }

  .next-button {
    right: 20%;
  }
}

.clearfix::after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}

/* General Styles for Transitions */
.transition-active {
  position: absolute;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Transition Styles */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
transition: transform 0.5s ease, opacity 0.25s ease;
width: 100%;
height: 100%;
opacity: 1;
}

.slide-left-enter-from {
  opacity: 0;
transform: translateX(-100%);
}

.slide-left-enter-to {
  position: absolute;
transform: translateX(0%);
}

.slide-left-leave-to {
  position: absolute;
  opacity: 0;
transform: translateX(100%);
}

.slide-right-enter-to {
transform: translateX(0%);
}

.slide-right-leave-to {
transform: translateX(-100%);
}
</style>
