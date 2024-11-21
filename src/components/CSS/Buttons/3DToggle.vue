<template>
    <div class="background">
        <div class="toggles">
            <!-- Toggle Button -->
            <button
                :id="id"
                class="block"
                type="button"
                :aria-pressed="isPressed"
                @click="toggle"
            >
                <div>
                    <div>OFF</div>
                    <div>ON</div>
                </div>
            </button>
            <label
                :for="id"
                class="block"
            >{{ label }}</label>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    id: {
        type: String,
        default: 'option1',
    },
    label: {
        type: String,
        default: 'Toggle Option',
    },
    defaultState: {
        type: Boolean,
        default: false,
    },
})

// Reactive state for the button
const isPressed = ref(props.defaultState)

// Toggle function to update aria-pressed
function toggle () {
    isPressed.value = !isPressed.value
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Silkscreen&display=swap");

.background {
  font-family: "Silkscreen", cursive;
}

.toggles {
  width: 300px;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  transform: skewY(15deg);

  :not(button).block {
    &:first-of-type:after {
      z-index: -1;
      box-shadow: 10rem 11rem 50px rgba(120, 90, 145, 0.5);
    }

    &:last-of-type:after {
      z-index: -1;
      box-shadow: 15rem 16rem 120px rgba(120, 90, 145, 0.3);
    }
  }

  button.block {
    cursor: pointer;
    font: inherit;
    z-index: 0;
    font-size: 0.7rem;

    &:first-of-type:after {
      z-index: -1;
      box-shadow: 7rem 8rem 50px rgba(120, 90, 145, 0.5);
    }

    &:last-of-type:after {
      z-index: -1;
      box-shadow: 15rem 16rem 120px rgba(120, 90, 145, 0.3);
    }

    > div {
      position: absolute;
      height: calc(3rem - 2%);
      width: 100%;
      z-index: 1;
      top: -99%;
      transform: skewX(-45deg);
      display: flex;
      transform-origin: bottom;

      > div {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;

        &:first-child {
          background: #c84150;
          justify-content: start;
          padding-left: 18px;
          color: #f0695f;
        }

        &:last-child {
          background: #237d5f;
          justify-content: end;
          padding-right: 20px;
          color: #46c3a5;
        }
      }
    }
  }

  .block {
    background: #f59baf;
    flex: 1;
    min-height: 3rem;
    border: none;
    color: #000000;
    font-size: 1.2rem;
    letter-spacing: 0;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out,
      transform 0.5s cubic-bezier(0.5, 1.2, 0.5, 1.2);

    &[aria-pressed="true"] {
      transform: translateX(4rem);
    }

    &[aria-pressed="false"] {
      transform: translateX(-5rem);
    }

    &:before {
      content: "";
      position: absolute;
      background: #f59baf;
      height: 3rem;
      width: 3rem;
      right: -3rem;
      transform-origin: left;
      transform: skewY(-45deg);
      transition: all 0.3s ease-in-out;
    }

    &:after {
      content: "";
      position: absolute;
      background: #f59baf;
      height: 3rem;
      width: 100%;
      top: -100%;
      transform-origin: bottom;
      transform: skewX(-45deg);
      transition: all 0.3s ease-in-out;
    }
  }

  button.block:hover {
    background: #ffd75a;
    &:after,
    &:before {
      background: #ffd75a;
    }
    + label.block {
      color: #1969b4;
    }
  }
}
</style>
