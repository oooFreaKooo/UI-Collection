<template>
    <div
        class="main-body"
    >
        <button
            id="button"
            :class="{ toggled: toggle }"
            @click="toggleAnimation"
        >
            <div id="icon" />
        </button>
    </div>
</template>

<script lang="ts" setup>
const toggle = ref(false)

const toggleAnimation = () => {
    toggle.value = toggle.value ? false : toggle.value = true
}
</script>

<style scoped lang="scss">
$blue: rgb(41, 182, 246);

.main-body {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#button {
  width: 80px;
  height: 80px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &.toggled {
    #icon {
      background-color: transparent;

      &:before {
        top: 0px;
        transform: rotate(-45deg);
      }

      &:after {
        bottom: 0px;
        transform: rotate(45deg);
      }
    }
  }

  #icon {
    background-color: $blue;
    border-radius: 100px;
    height: 10px;
    position: relative;
    transition: all 0.25s;
    width: 100px;

    &:before,
    &:after {
      background-color: $blue;
      border-radius: 100px;
      content: "";
      height: 10px;
      left: 0px;
      position: absolute;
      transition: all 0.25s;
      width: 100px;
    }

    &:before {
      top: -30px;
    }

    &:after {
      bottom: -30px;
    }
  }
}
</style>
