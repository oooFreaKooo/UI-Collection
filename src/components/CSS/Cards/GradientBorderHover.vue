<template>
    <div class="main-body">
        <div id="background" />
        <div id="cards">
            <div
                v-for="(icon, index) in icons"
                :key="index"
                class="card"
                :style="{ '--gradient-color': borderColors[index] }"
            >
                <div class="card-content">
                    <i
                        class="card-icon"
                        :class="icon"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const icons = [
    'mdi mdi-cat',
    'mdi mdi-food-croissant',
    'mdi mdi-fish',
    'mdi mdi-pickaxe',
    'mdi mdi-emoticon-poop',
    'mdi mdi-palm-tree',
]

const borderColors = [
    'rgb(255, 215, 137)', // Golden yellow
    'rgb(137, 255, 215)', // Mint green
    'rgb(215, 137, 255)', // Lavender
    'rgb(255, 137, 137)', // Soft red
    'rgb(137, 137, 255)', // Light blue
    'rgb(137, 255, 137)', // Lime green
]
</script>

<style scoped>
.main-body {
  --card-color: rgb(25, 25, 25);
  position: relative;
  background-color: rgb(20, 20, 20);
  display: grid;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#cards {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1000px;
  padding: 1em 0;
  place-self: center;
  position: relative;
  width: calc(100% - 2em);
  z-index: 2;
}

.card {
  background-color: var(--card-color);
  border-radius: 0.75em;
  cursor: pointer;
  height: 240px;
  position: relative;
}

.card:hover:before {
  opacity: 1;
}

.card:before {
  background: linear-gradient(
    45deg,
    transparent 5%,
    var(--gradient-color, rgb(255, 215, 137)) 50%,
    transparent 99%
  );
  border-radius: inherit;
  content: "";
  inset: 0;
  opacity: 0;
  position: absolute;
  transition: opacity 400ms;
  z-index: 0;
}

.card-content {
  background-color: var(--card-color);
  border-radius: inherit;
  display: grid;
  inset: 1px;
  padding: 1em;
  position: absolute;
}

.card:hover > .card-content > .card-icon {
  opacity: 1;
  transform: scale(1.1) translateY(-5%);
}

.card-icon {
  color: rgba(255, 255, 255, 0.25);
  font-size: 6em;
  opacity: 0.4;
  place-self: center;
  transition: transform 250ms, opacity 250ms;
}

@media (max-width: 1100px) {
  #cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  #cards {
    grid-template-columns: 1fr;
  }
}

#background {
  background-image: url("https://images.unsplash.com/photo-1565896311009-382b9e813b19?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987");
  background-position: center;
  background-size: cover;
  filter: blur(1.25em);
  height: 100%;
  left: 0;
  opacity: 0.15;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
}
</style>
