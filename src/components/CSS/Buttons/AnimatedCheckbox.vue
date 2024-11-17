<template>
    <div class="main-body">
        <input
            id="checkbox"
            type="checkbox"
        >
        <div class="checkbox">
            <i class="mdi mdi-check" />
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
$blue: rgb(41, 182, 246);

.main-body {
  display: flex;
  justify-content: center;
}

input {
  cursor: pointer;
  height: 20px;
  margin: 0px;
  opacity: 0;
  position: absolute;
  width: 20px;
  z-index: 2;

  &:active {
    + .checkbox {
      &:before {
        height: 50px;
        width: 50px;
      }
    }
  }

  &:checked {
    + .checkbox {
      border: 2px solid $blue;

      &:before {
        animation: pulse 1s cubic-bezier(0.15, 0.8, 0.5, 1);
      }

      &:after {
        height: 20px;
        opacity: 1;
        width: 20px;
      }

      i {
        opacity: 1;
      }
    }
  }
}

.checkbox {
  border: 2px solid currentColor;
  border-radius: 2px;
  height: 16px;
  position: relative;
  transition: all 0.5s;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before,
  &:after {
    content: '';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: all 0.5s;
  }

  &:before {
    border-radius: 50%;
    height: 5px;
    width: 5px;
    z-index: -1;
  }

  &:after {
    background-color: $blue;
    border-radius: 2px;
    height: 5px;
    opacity: 0;
    width: 5px;
  }

  i {
    color: white;
    pointer-events: none;
    font-size: 18px;
    height: 26px;
    opacity: 0;
    z-index: 5;
    transition: opacity 0.3s;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0px rgba($blue, 1);
  }
  100% {
    box-shadow: 0 0 0 25px rgba(242, 242, 242, 0);
  }
}
</style>
