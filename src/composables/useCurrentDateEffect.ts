export function useCurrentDateEffect () {
    const date = ref<Date>(new Date())
    let interval: ReturnType<typeof setInterval>

    onMounted(() => {
        interval = setInterval(() => {
            const update = new Date()
            if (update.getSeconds() !== date.value.getSeconds()) {
                date.value = update
            }
        }, 100)
    })

    onUnmounted(() => {
        clearInterval(interval)
    })

    return date
}
