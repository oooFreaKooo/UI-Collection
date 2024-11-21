<template>
    <div class="main-body">
        <div class="scl-icon mdi mdi-twitter" />
        <div class="scl-icon mdi mdi-facebook" />
        <div class="scl-icon mdi mdi-linkedin" />
        <div class="scl-icon mdi mdi-youtube" />
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.main-body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

$twitter:   #00acee;
$facebook:  #3b5998;
$linkedin:  #0e76a8;
$youtube:   #c4302b;

@function shadow($color){
  $val : 0px 0px $color;
  @for $i from 1 through 5 {
    $val: #{$val}, #{$i * -10}px #{$i * 10}px rgba($color, 0.6 - $i/10 );
  }
  @return $val;
}

.scl-icon{
  width: 100px;
  height: 100px;
  color: #fff;
  background: #000;
  line-height: 100px;
  margin: 25px;
  text-align: center;
  font-size: 50px;
  transform: rotatex(45deg) rotate(-45deg);
  transition: 0.3s ease-in;
  display: inline-block;
  text-decoration:none;
  cursor: pointer;
  &:hover {
    transform: translatey(-50px) rotatex(45deg) rotate(-45deg);
  }
}

.mdi-facebook{
  background: $facebook;
  &:hover {
    box-shadow: shadow($facebook);
  }
}

.mdi-twitter{
  background: $twitter;
  &:hover {
    box-shadow: shadow($twitter);
  }
}

.mdi-linkedin{
  background: $linkedin;
  &:hover {
    box-shadow: shadow($linkedin);
  }
}
.mdi-youtube{
  background: $youtube;
  &:hover {
    box-shadow: shadow($youtube);
  }
}
</style>
