<template>
    <div>
        <div id="wrapper">
            <h1
                class="glitch"
                :data-text="text"
            >
                {{ text }}
            </h1>
            <span class="sub">{{ subtext }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    text: { type: String, default: 'glitch' },
    subtext: { type: String, default: 'EFFECT' },
})
</script>

<style scoped lang="scss">
@use "sass:math";
@import url('https://fonts.googleapis.com/css?family=Montserrat:100');

h1 {
  font-family: 'Montserrat', sans-serif;
}

#wrapper {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.sub {
  color: rgb(100,220,220);
  letter-spacing: 1em;
}

@mixin glitchCopy {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch {
  position: relative;
  color: currentColor;
  font-size: 4em;
  letter-spacing: .5em;
  animation: glitch-skew 1s infinite linear alternate-reverse;

  &::before {
    @include glitchCopy;
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }

  &::after {
    @include glitchCopy;
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim2 1s infinite linear alternate-reverse;
  }
}

@keyframes glitch-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      clip: rect(math.div(random(100), 1) + px, 9999px, math.div(random(100), 1) + px, 0);
      transform: skew(math.div(random(100), 100) + deg);
    }
  }
}

@keyframes glitch-anim2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      clip: rect(math.div(random(100), 1) + px, 9999px, math.div(random(100), 1) + px, 0);
      transform: skew(math.div(random(100), 100) + deg);
    }
  }
}

@keyframes glitch-skew {
  $steps: 10;
  @for $i from 0 through $steps {
    #{percentage($i * math.div(1, $steps))} {
      transform: skew((math.div(random(10), 1) - 5) + deg);
    }
  }
}
</style>
