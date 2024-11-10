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
        title: 'Cards',
        subtitle: 'A variety of cards for your UI Collection',
        cssLink: 'cards',
        vuetifyLink: 'v-cards',
    },
    {
        title: 'Carousels',
        subtitle: 'CSS-only and Vuetify carousels for seamless UI',
        cssLink: 'carousels',
        vuetifyLink: 'v-carousels',
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
