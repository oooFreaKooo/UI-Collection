<template>
    <div class="main-body">
        <div id="movie-card-list">
            <div
                v-for="(movie, index) in movieList"
                :key="index"
                class="movie-card"
                :style="{ backgroundImage: `url(${movie.image})` }"
            >
                <div class="movie-card__overlay" />
                <div class="movie-card__share">
                    <div class="movie-card__share">
                        <button class="movie-card__icon">
                            <i class="mdi mdi-heart-outline" />
                        </button>
                        <button class="movie-card__icon">
                            <i class="mdi mdi-share-variant" />
                        </button>
                        <button class="movie-card__icon">
                            <i class="mdi mdi-play-circle-outline" />
                        </button>
                    </div>
                </div>
                <div class="movie-card__content">
                    <div class="movie-card__header">
                        <h1 class="movie-card__title">
                            {{ movie.title }}
                        </h1>
                        <h4 class="movie-card__info">
                            {{ movie.info }}
                        </h4>
                    </div>
                    <p class="movie-card__desc">
                        {{ movie.description }}
                    </p>
                    <button
                        class="btn btn-outline movie-card__button"
                        type="button"
                    >
                        <i class="mdi mdi-play-circle-outline" /> Watch Trailer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const movieList = [
    {
        title: 'Blade Runner',
        info: '(1982) Sci-Fi, Thriller',
        description: 'A blade runner must pursue...',
        image: 'http://digitalspyuk.cdnds.net/15/47/1600x800/landscape-1447754794-harrison-ford-blade-runner.jpg',
    },
    {
        title: 'Back to the Future',
        info: '(1985) Adventure, Comedy, Sci-Fi',
        description: 'Marty McFly, a 17-year-old...',
        image: 'http://www.blastr.com/sites/blastr/files/back-to-the-future-part-ii-original.jpg',
    },
    {
        title: 'Akira',
        info: '(1988) Animation, Action, Drama',
        description: 'A secret military project...',
        image: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/58d86b3db3db2b57ce8f2986/1490578241899/?format=2500w',
    },
]
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800');

$primary-color: #cfd6e1;
$title-color: #9ac7fa;
$font-stack-content: 'Montserrat', helvetica, arial, sans-serif;
$font-stack-header: 'Montserrat', helvetica, arial, sans-serif;
$secondary-color: #2a9fff;

*,*::before, *::after {
box-sizing:inherit;
}

.main-body {
font-family: $font-stack-content;
font-size: 14px;
color:$primary-color;
line-height: 1.5;
font-weight: 400;
overflow-x: hidden;
}

* {
transition: .4s;
}

a {
text-decoration: none;
}

button {
font-family: inherit;
border: 0;
cursor: pointer;
&:focus {
outline: 0;
}
}

.movie-card {
  background-size: contain;
  background-repeat: no-repeat;
  width:100%;
  max-width: 800px;
  height: 100%;
  min-height: 300px;
  display: block;
  margin: 8vh auto;
  border-radius: 8px;
  box-shadow: 0px 8px 12px 0px rgba(0,0,0,0.25);
  position: relative;
  @media screen and (max-width: 800px) {
    width: 95%;
    max-width: 95%;
  }
  @media screen and (max-width: 600px) {
    background-position:50% 0%;
    background-size: cover;
    height: 400px;
  }

  &__overlay {
    width:100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(to right, rgba(42,159,255,.2) 0%,rgba(33,33,32,1) 60%,rgba(33,33,32,1) 100%);
    background-blend-mode: multiply;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    @media screen and (max-width: 600px) {
        background: linear-gradient(to bottom, rgba(42,159,255,.2) 0%,rgba(33,33,32,1) 60%,rgba(33,33,32,1) 100%);
    }
  }
  &__share {
  padding: 1em;
  display: inline-block;
  width: 100%;
  max-width: 130px;
  @media screen and (max-width: 600px) {
      display: block;
      width: 100%;
  }
  }
  &__icon {
  color: #ffffff;
  mix-blend-mode: lighten;
  opacity: .4;
  background: none;
  padding: 0;
  &:hover {
      opacity:1;
      mix-blend-mode: lighten;
  }
  &:not(:first-of-type) {
      margin-left: 5px;
  }
  i {
      font-size: 1.5em;
  }
  }
  &__content {
  width: 100%;
  max-width:370px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position:relative;
  float: right;
  padding-right: 1.2em;
  padding-bottom: 1em;
  padding-top: 1.2em;
  @media screen and (max-width: 1000px) {
      width: 50%;
  }
  @media screen and (max-width: 600px) {
      margin-top: 4.2em;
      width: 100%;
      float: inherit;
      max-width: 100%;
      padding: 0 1em 1em;
  }
  }
&__header {
margin-bottom: 2em;
}
&__title {
color: #ffffff;
margin-bottom: .25em;
opacity: .75;
}
&__info {
text-transform: uppercase;
letter-spacing: 2px;
font-size: .8em;
color: $secondary-color;
line-height: 1;
margin: 0;
font-weight: 700;
opacity:.5;
}
&__desc {
font-weight: 300;
opacity: .84;
margin-bottom: 2em;
}
}

h1,h2,h3 {
font-family: $font-stack-header;
text-transform: uppercase;
letter-spacing: 2px;
line-height: 1;
font-weight: 400;
}

.btn {
padding: .5rem 2rem;
background-color: rgba(255,255,255,.4);
color: rgba(255,255,255,1);
}

.btn-outline {
background-color: transparent;
border: 3px solid #ffffff;
}

.btn-outline:hover {
border-color: $secondary-color;
color: $secondary-color;
box-shadow: 0px 1px 8px 0px rgba(245,199,0,.2);
}
</style>
