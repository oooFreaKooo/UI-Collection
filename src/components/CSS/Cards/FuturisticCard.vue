<template>
    <div class="animated-card">
        <div class="screen">
            <div class="screen-image" />
            <div class="screen-overlay" />
            <div class="screen-content">
                <i class="screen-icon mdi mdi-all-inclusive" />
                <div class="screen-user">
                    <!-- Use your InteractiveTitleAnimation component here -->
                    <h1
                        :data-value="originalText"
                        class="name"
                        @mouseover="handleMouseOver"
                    >
                        {{ displayText }}
                    </h1>
                    <p
                        class="link"
                    >
                        Design
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Reactive variables
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const originalText = 'FUTURISTIC'
const displayText = ref(originalText)

// Animation function
let iteration = 0
const { pause, resume } = useIntervalFn(() => {
    displayText.value = displayText.value
        .split('')
        .map((letter, index) => {
            if (index < iteration) {
                return originalText[index]
            }
            return letters[Math.floor(Math.random() * letters.length)]
        })
        .join('')

    if (iteration >= originalText.length) {
        pause()
        iteration = 0
    }

    iteration += 1 / 3
}, 30, { immediate: false })

// Event handlers
const handleMouseOver = () => {
    iteration = 0
    resume()
}

// Cleanup
onUnmounted(() => {
    pause()
})
</script>

<style scoped>
.screen > .screen-content > .screen-user > :is(.name, .link) {
  font-family: "Source Code Pro", monospace;
  text-align: center;
  text-transform: uppercase;
}

.screen > .screen-content > .screen-user > .name {
  position: relative;
  font-size: 4.25rem;
  font-weight: 400;
}

.screen > .screen-content > .screen-user > .name:before,
.screen > .screen-content > .screen-user > .name:after {
  content: "";
  height: 4px;
  width: 4px;
  position: absolute;
  border: 2px solid white;
  border-radius: 2px;
}

.screen > .screen-content > .screen-user > .name:before {
  top: 55%;
  right: -1.5rem;
}

.screen > .screen-content > .screen-user > .name:after {
  top: 45%;
  left: -1.5rem;
}

/* Variables */
* {
  --blue-rgb: 10, 109, 183;
  --primary-rgb: var(--blue-rgb);
}

.animated-card {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Screen Styles */
.screen {
  width: 500px;
  aspect-ratio: 10 / 16;
  display: flex;
  border: 3px solid rgba(var(--primary-rgb), 0.8);
  border-radius: 1rem;
  background-color: rgba(var(--primary-rgb), 0.1);
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.screen::before,
.screen::after {
  content: '';
  height: 5px;
  position: absolute;
  z-index: 4;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
}

.screen::before {
  width: 15%;
  top: 0;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.screen::after {
  width: 25%;
  bottom: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

/* Screen Overlay */
@keyframes pan-overlay {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 0% -100%;
  }
}

.screen-overlay {
  background: linear-gradient(
    rgba(var(--primary-rgb), 0.05),
    rgba(var(--primary-rgb), 0.15) 3px,
    transparent 3px,
    transparent 9px
  );
  background-size: 100% 9px;
  height: 100%;
  width: 100%;
  animation: pan-overlay 22s infinite linear;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
}

/* Screen Image */
@keyframes pan-image {
  0% {
    background-position: 36% 42%;
    background-size: 200%;
  }
  20% {
    background-position: 30% 35%;
    background-size: 200%;
  }
  20.0001% {
    background-position: 60% 85%;
    background-size: 500%;
  }
  40% {
    background-position: 49% 81%;
    background-size: 500%;
  }
  40.0001% {
    background-position: 80% 42%;
    background-size: 300%;
  }
  60% {
    background-position: 84% 33%;
    background-size: 300%;
  }
  60.0001% {
    background-position: 0% 0%;
    background-size: 300%;
  }
  80% {
    background-position: 15% 4%;
    background-size: 300%;
  }
  80.0001% {
    background-position: 80% 10%;
    background-size: 300%;
  }
  100% {
    background-position: 72% 14%;
    background-size: 300%;
  }
}

.screen-image {
  background-image: url('https://images.unsplash.com/photo-1515266591878-f93e32bc5937?auto=format&fit=crop&w=2574&q=80');
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  background-size: 300%;
  background-position: 0% 0%;
  filter: sepia(100%) hue-rotate(160deg);
  opacity: 0.6;
  animation: pan-image 15s linear infinite;
}

/* Screen Content */
.screen-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 4rem;
  position: relative;
  z-index: 3;
  margin: 1rem;
  padding-bottom: 6rem;
  border: 1px solid rgba(var(--primary-rgb), 0.45);
  border-radius: 0.6rem;
}

.screen-icon {
  color: white;
  font-size: 8rem;
  text-shadow: 0 0 0.5rem white;
}

.screen-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.screen-user::before,
.screen-user::after {
  content: '';
  position: absolute;
  top: 0;
  background-color: rgb(var(--primary-rgb));
  border-radius: 1rem;
  box-shadow: 0 0 8px 3px rgba(var(--primary-rgb), 0.6);
}

.screen-user::before {
  height: 2px;
  width: 50px;
  transform: translate(-20px, -1rem);
  opacity: 0.75;
}

.screen-user::after {
  height: 3px;
  width: 30px;
  transform: translate(26px, calc(-1rem - 0.5px));
}

.screen-user .link {
  font-family: 'Source Code Pro', monospace;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.8;
  font-size: 1.5rem;
  text-shadow: 0 0 0.5rem white;
  font-weight: 400;
  letter-spacing: 0.3rem;
  text-decoration: none;
}

.screen-user .link:hover,
.screen-user .link:focus {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 700px) {
  .screen {
    transform: scale(0.6);
    margin-bottom: 0;
  }
}
</style>
