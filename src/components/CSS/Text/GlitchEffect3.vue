<template>
    <div
        id="root"
        class="main-body"
    >
        <div
            id="text"
            :data-text="text"
        >
            {{ text }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    text: { type: String, default: 'Glitch Text' },
})
</script>

<style scoped lang="scss">
@use "sass:math";
@import url("https://fonts.googleapis.com/css?family=Bungee");

@mixin animation($animate...) {
    $max: length($animate);
    $animations: '';

    @for $i from 1 through $max {
        $animations: #{$animations + nth($animate, $i)};

        @if $i < $max {
            $animations: #{$animations + ", "};
        }
    }
    -webkit-animation: $animations;
    -moz-animation:    $animations;
    -o-animation:      $animations;
    animation:         $animations;
}

@mixin keyframes($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }
    @-moz-keyframes #{$animationName} {
        @content;
    }
    @-o-keyframes #{$animationName} {
        @content;
    }
    @keyframes #{$animationName} {
        @content;
    }
}

@mixin transform($value){
  -webkit-transform: $value;
  -moz-transform: $value;
  -ms-transform: $value;
  -o-transform: $value;
  transform: $value;
}

@mixin opacity($value) {
  $IEValue: $value*100;
  opacity: $value;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity="+$IEValue+")";
  filter: alpha(opacity=$IEValue);
}

$offset: 6px;
$bgcolor: #111;

.main-body{
  background: $bgcolor;
  font-family: 'Bungee', cursive;
  text-transform: uppercase;
  font-size: 80px;
  font-weight: bold;
}

#root{
  position: absolute;
  top: 50%;
  @include transform(translateY(-50%) translateX(-50%));
  left: 50%;
}

#text{
  margin: 100px;
  top: 0;
  left: -$offset;
  color: red;
  mix-blend-mode: screen;
  position: relative;
  white-space: nowrap;
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
   filter: blur(1px);
  @include animation('skew 2s infinite', 'flash .04s infinite');

  &:after, &:before{
    content: attr(data-text);
    position: absolute;
    mix-blend-mode: screen;
  }
  &:after{
    top: 0;
    left: $offset;
    color: blue;
    @include animation('move 1.5s infinite');
  }
  &:before{
    top: -0.4*$offset;
    left: 0.6*$offset;
    color: limegreen;
  }
}

@include keyframes(skew){
  0%    { @include transform(none) }
  30%   { @include transform(none) }
  30.2% { @include transform(skewX(50deg)) }
  30.4% { @include transform(skewX(-50deg)) }
  31%   { @include transform(none) }
}
@include keyframes(move){
  0%   { @include transform(none); }
  30%  { @include transform(none); }
  31%  { @include transform(translateX(-$offset)) }
  33%  { @include transform(none); }
  98%  { @include transform(none); }
  100% { @include transform(translateX($offset)) }
}
@include keyframes(flash){
  0%   { @include opacity(1) }
  50%  { @include opacity(0.5) }
}
@include keyframes(lines){
  0%   { @include opacity(0.1) }
  50%  { @include opacity(1) }
}
</style>
