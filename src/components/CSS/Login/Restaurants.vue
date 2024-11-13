<template>
    <MenuSection
        id="restaurants-section"
        icon="mdi mdi-food"
        title="Get it delivered!"
    >
        <div
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            class="restaurant-card background-image"
            :style="{ backgroundImage: `url(${restaurant.image})` }"
        >
            <div class="restaurant-card-content">
                <div class="restaurant-card-content-items">
                    <span class="restaurant-card-title">{{ restaurant.title }}</span>
                    <span class="restaurant-card-desc">{{ restaurant.desc }}</span>
                </div>
            </div>
        </div>
    </MenuSection>
</template>

<script setup lang="ts">
const restaurants = [
    {
        desc: 'The best burgers in town',
        id: 1,
        image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?auto=format&fit=crop&w=500&q=60',
        title: 'Burgers',
    },
    {
        desc: 'The worst ice-cream around',
        id: 2,
        image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=500&q=60',
        title: 'Ice Cream',
    },
    {
        desc: 'This \'Za be gettin down',
        id: 3,
        image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=500&q=60',
        title: 'Pizza',
    },
    {
        desc: 'BBQ ain\'t need no rhyme',
        id: 4,
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=60',
        title: 'BBQ',
    },
]
</script>
