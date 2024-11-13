<template>
    <div id="app-pin-wrapper">
        <input
            id="app-pin-hidden-input"
            ref="refInput"
            :disabled="userStatus !== UserStatus.LoggingIn && userStatus !== UserStatus.LogInError"
            maxlength="4"
            type="number"
            :value="pin"
            @input="handleOnChange"
        >
        <div
            id="app-pin"
            @click="handleOnClick"
        >
            <PinDigit
                :focused="pin.length === 0"
                :value="pin[0] || ''"
            />
            <PinDigit
                :focused="pin.length === 1"
                :value="pin[1] || ''"
            />
            <PinDigit
                :focused="pin.length === 2"
                :value="pin[2] || ''"
            />
            <PinDigit
                :focused="pin.length === 3"
                :value="pin[3] || ''"
            />
        </div>
        <h3 id="app-pin-label">
            Enter PIN (1234)
            <span
                v-if="userStatus === UserStatus.LogInError"
                id="app-pin-error-text"
            >Invalid</span>
            <span
                id="app-pin-cancel-text"
                @click="handleOnCancel"
            >Cancel</span>
        </h3>
    </div>
</template>

<script setup lang="ts">
// Setup user status and PIN states
const { userStatus, setUserStatusTo } = useUserStatus()
const pin = ref<string>('')
const refInput = ref<HTMLInputElement | null>(null)

// Focus the input if user status requires it on mount
onMounted(() => {
    if (userStatus.value === UserStatus.LoggingIn || userStatus.value === UserStatus.LogInError) {
        refInput.value?.focus()
    }
})

// Watch for changes in user status to reset PIN or focus input
watch(
    () => userStatus.value,
    (newStatus) => {
        if (newStatus === UserStatus.LoggingIn || newStatus === UserStatus.LogInError) {
            refInput.value?.focus()
        } else {
            pin.value = ''
        }
    },
)

// Watch PIN value and verify login if it reaches 4 characters
watch(pin, async (newPin) => {
    if (newPin.length === 4) {
        try {
            setUserStatusTo(UserStatus.VerifyingLogIn)
            const result = await LogInUtility.verify(newPin)
            if (result) {
                setUserStatusTo(UserStatus.LoggedIn)
            }
        } catch (err) {
            console.error(err)
            setUserStatusTo(UserStatus.LogInError)
        }
    }

    if (userStatus.value === UserStatus.LogInError) {
        setUserStatusTo(UserStatus.LoggingIn)
    }
})

// Event handlers
const handleOnClick = () => {
    refInput.value?.focus()
}

const handleOnCancel = () => {
    setUserStatusTo(UserStatus.LoggedOut)
}

const handleOnChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.value.length <= 4) {
        pin.value = target.value.toString()
    }
}
</script>
