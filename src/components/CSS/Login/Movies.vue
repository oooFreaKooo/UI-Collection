<template>
    <MenuSection
        id="movies-section"
        icon="mdi mdi-movie"
        :scrollable="true"
        title="Popcorn time!"
    >
        <div
            v-for="movie in movies"
            :id="`movie-card-${movie.id}`"
            :key="movie.id"
            class="movie-card"
        >
            <div
                class="movie-card-background background-image"
                :style="{ backgroundImage: `url(${movie.image})` }"
            />
            <div class="movie-card-content">
                <div class="movie-card-info">
                    <span class="movie-card-title">{{ movie.title }}</span>
                    <span class="movie-card-desc">{{ movie.desc }}</span>
                </div>
                <i :class="movie.icon" />
            </div>
        </div>
    </MenuSection>
</template>

<script setup lang="ts">
const movies = [
    {
        desc: 'A tale of some people watching over a large portion of space.',
        id: 1,
        icon: 'mdi mdi-creation-outline',
        image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=500&q=60',
        title: 'Protectors of the Milky Way',
    },
    {
        desc: 'Some people leave their holes to disrupt some things.',
        id: 2,
        icon: 'mdi mdi-wizard-hat',
        image: 'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&w=500&q=60',
        title: 'Hole People',
    },
    {
        desc: 'A boy with a dent in his head tries to stop a bad guy. And by bad I mean bad at winning.',
        id: 3,
        icon: 'mdi mdi-broom',
        image: 'https://images.unsplash.com/photo-1632266484284-a11d9e3a460a?auto=format&fit=crop&w=500&q=60',
        title: 'Pot of Hair',
    },
    {
        desc: 'A long drawn out story of some people fighting over some space. Cuz there isn\'t enough of it.',
        id: 4,
        icon: 'mdi mdi-rocket-launch',
        image: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=500&q=60',
        title: 'Area Fights',
    },
]
</script>
