<template>
    <div class="main-body">
        <button
            v-for="(size, index) in sizeClasses"
            :key="index"
            :class="{ active: activeIndex === index }"
            @click="toggleAnimation(index)"
        >
            <span
                class="span1 mdi"
                :class="[
                    'mdi-size-' + size,
                    activeIndex === index ? 'scaleOut' : 'scaleIn',
                ]"
            />
            <span
                class="span2 mdi"
                :class="[
                    'mdi-size-' + size,
                    activeIndex === index ? 'scaleOut' : 'scaleIn',
                ]"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
const activeIndex = ref<number | null>(null)

const toggleAnimation = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index
}

const sizeClasses = [
    'xs', 's', 'm', 'l', 'xl', 'xxl',
]
</script>

<style scoped>
.main-body {
  margin: 0 auto;
  text-align: center;
  font-size: 2rem;
  line-height: 3rem;
}

button {
  margin: 0 10px;
  cursor: pointer;
  background-color: #ffffff;
  border: 3px solid #ffffff;
  padding: 0;
  font-size: 3rem;
  font-weight: bold;
  width: 5rem;
  height: 3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.3s ease-in, transform 0.3s ease;
}

button.active {
  transform: scale(1.1);
}

span {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
}

.span1 {
  color: #000000;
  transform: scale(1.5) translateX(5%);
}

.span1.scaleIn {
  transform: scale(50);
}

.span1.scaleIn.mdi-size-l {
  transform: scale(50) translateX(5%);
}

.span1.scaleIn.mdi-size-xl,
.span1.scaleIn.mdi-size-xs {
  transform: scale(50) translate(7%, 1.9%);
}

.span1.scaleOut {
  transform: scale(1.5);
}

.span2 {
  color: #ffffff;
  transform: scale(0);
}

.span2.scaleIn {
  transform: scale(1.5);
}

.span2.scaleOut {
  transform: scale(0);
}
</style>
