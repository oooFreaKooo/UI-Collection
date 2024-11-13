<template>
    <div class="card">
        <div class="card-content">
            <h3>Valuable Info</h3>
            <h1>The worst thing about coding is the dementors</h1>
            <p>I can't stand when I have spent the last 47 minutes adjusting the rgb on my gradient only to have a dementor appear and suck my soul out.</p>
        </div>
    </div>
</template>

<script setup>
// No script is necessary as this component is purely presentational.
// However, you can add script logic here if needed.
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&family=Space+Mono&display=swap');

* {
  --primary-color: mediumslateblue;
  font-family: 'Space Mono', monospace;
}

.card {
  width: 640px;
  position: relative;
  background-color: rgb(16 16 16);
  border: 1px solid rgb(255 255 255 / 5%);
  border-radius: 1.5rem;
  padding: 1rem;
}

.card:after {
  content: "";
  height: 70px;
  width: 1px;
  position: absolute;
  left: -1px;
  top: 65%;
  transition: top, opacity;
  transition-duration: 600ms;
  transition-timing-function: ease;
  background: linear-gradient(
    transparent,
    var(--primary-color),
    transparent
  );
  opacity: 0;
}

.card:after {
  top: 65%;
  opacity: 0;
}

.card:hover:after {
  top: 25%;
  opacity: 1;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-position: 50% 50%;
  background-size: 1.1rem 1.1rem;
  padding: 4rem;
  border-radius: 1.25rem;
  overflow: hidden;
}

.card-content > :is(h1, h3, p) {
  text-align: center;
}

.card-content > h1 {
  color: rgb(250 249 246);
  font-size: 2.6rem;
}

.card-content > h3 {
  color: var(--primary-color);
  text-transform: uppercase;
  font-size: 0.76rem;
}

.card-content > p {
  color: rgb(255 255 255 / 75%);
  line-height: 1.5rem;
}

@media(max-width: 700px) {
  .card {
    width: calc(100% - 2rem);
    margin: 0rem 1rem;
    padding: 0.75rem;
    border-radius: 1rem;
  }
}

@media(max-width: 600px) {
  .card-content {
    padding: 3rem;
  }

  .card-content > h1 {
    font-size: 2.2rem;
  }
}
</style>
