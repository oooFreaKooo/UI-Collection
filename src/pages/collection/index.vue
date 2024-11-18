<template>
    <v-container class="py-10">
        <v-row>
            <v-col
                v-for="(collection, index) in collections"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                class="d-flex"
            >
                <v-card
                    class="mx-auto"
                    max-width="344"
                    elevation="2"
                >
                    <v-card-title class="text-h6 font-weight-bold">
                        {{ collection.title }}
                    </v-card-title>
                    <v-card-subtitle class="text-subtitle-2">
                        {{ collection.subtitle }}
                    </v-card-subtitle>
                    <v-card-actions class="justify-space-between">
                        <NuxtLink
                            class=" text-decoration-none"
                            :href="`/collection/${collection.cssLink}`"
                        >
                            <v-btn
                                block
                                color="secondary"
                                class="css-option"
                            >
                                CSS Only
                            </v-btn>
                        </NuxtLink>
                        <NuxtLink
                            class=" text-decoration-none"
                            :href="`/collection/${collection.vuetifyLink}`"
                        >
                            <v-btn
                                block
                                color="primary"
                                class="vuetify-option"
                            >
                                Vuetify
                            </v-btn>
                        </NuxtLink>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
const collections = ref([
    {
        title: 'Pages',
        subtitle: 'A collection of full pages for your UI Collection',
        cssLink: 'pages',
        vuetifyLink: 'v-pages',
    },
    {
        title: 'Cards',
        subtitle: 'A variety of cards for your UI Collection',
        cssLink: 'cards',
        vuetifyLink: 'v-cards',
    },
    {
        title: 'Sliders',
        subtitle: 'CSS-only and Vuetify sliders for seamless UI',
        cssLink: 'sliders',
        vuetifyLink: 'v-sliders',
    },
    {
        title: 'Grids',
        subtitle: 'CSS-only and Vuetify grids for responsive layouts',
        cssLink: 'grids',
        vuetifyLink: 'v-grids',
    },
    {
        title: 'Text',
        subtitle: 'CSS-only and Vuetify text styles for consistent typography',
        cssLink: 'text',
        vuetifyLink: 'v-text',
    },
    {
        title: 'Buttons',
        subtitle: 'CSS-only and Vuetify buttons for consistent UI',
        cssLink: 'buttons',
        vuetifyLink: 'v-buttons',
    },
    {
        title: 'Backgrounds',
        subtitle: 'CSS-only and Vuetify backgrounds for consistent UI',
        cssLink: 'background',
        vuetifyLink: 'v-background',
    },
    {
        title: 'Forms',
        subtitle: 'CSS-only and Vuetify forms for consistent UI',
        cssLink: 'forms',
        vuetifyLink: 'v-forms',
    },
    {
        title: 'Timelines',
        subtitle: 'CSS-only and Vuetify timelines for consistent UI',
        cssLink: 'timelines',
        vuetifyLink: 'v-timelines',
    },
    {
        title: 'Cursor',
        subtitle: 'CSS-only and Vuetify cursor effects',
        cssLink: 'cursor',
        vuetifyLink: 'v-cursor',
    },
    {
        title: 'Misc',
        subtitle: 'CSS-only and Vuetify misc elements',
        cssLink: 'misc',
        vuetifyLink: 'v-misc',
    },
])
</script>

<style scoped>
.v-container {
  max-width: 900px;
}

.v-card-actions {
  display: flex;
}
</style>
