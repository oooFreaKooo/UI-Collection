<template>
    <MenuSection
        id="weather-section"
        :icon="'mdi mdi-weather-sunny'"
        :scrollable="true"
        title="How's it look out there?"
    >
        <div
            v-for="day in days"
            :key="day.id"
            class="day-card"
        >
            <div class="day-card-content">
                <span class="day-weather-temperature">
                    {{ day.temperature }}<span class="day-weather-temperature-unit">°F</span>
                </span>
                <i :class="['day-weather-icon', day.weatherIcon, day.weather.toLowerCase()]" />
                <span class="day-name">{{ day.name }}</span>
            </div>
        </div>
    </MenuSection>
</template>

<script setup lang="ts">
const days = ref([
    {
        id: 1,
        name: 'Mon',
        temperature: N.rand(60, 80),
        weather: WeatherType.Sunny,
        weatherIcon: 'mdi mdi-weather-sunny',
    },
    {
        id: 2,
        name: 'Tues',
        temperature: N.rand(60, 80),
        weather: WeatherType.Sunny,
        weatherIcon: 'mdi mdi-weather-sunny',
    },
    {
        id: 3,
        name: 'Wed',
        temperature: N.rand(60, 80),
        weather: WeatherType.Cloudy,
        weatherIcon: 'mdi mdi-weather-cloudy',
    },
    {
        id: 4,
        name: 'Thurs',
        temperature: N.rand(60, 80),
        weather: WeatherType.Rainy,
        weatherIcon: 'mdi mdi-weather-rainy',
    },
    {
        id: 5,
        name: 'Fri',
        temperature: N.rand(60, 80),
        weather: WeatherType.Stormy,
        weatherIcon: 'mdi mdi-weather-lightning',
    },
    {
        id: 6,
        name: 'Sat',
        temperature: N.rand(60, 80),
        weather: WeatherType.Sunny,
        weatherIcon: 'mdi mdi-weather-sunny',
    },
    {
        id: 7,
        name: 'Sun',
        temperature: N.rand(60, 80),
        weather: WeatherType.Cloudy,
        weatherIcon: 'mdi mdi-weather-cloudy',
    },
])
</script>

<style scoped lang="scss">

</style>
