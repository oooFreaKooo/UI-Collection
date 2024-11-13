interface IUserStatusContext {
    userStatus: Ref<UserStatus>
    setUserStatusTo: (status: UserStatus) => void
}

const UserStatusSymbol: InjectionKey<IUserStatusContext> = Symbol('UserStatus')

export function provideUserStatus () {
    const userStatus = ref<UserStatus>(UserStatus.LoggedOut)

    const setUserStatusTo = (status: UserStatus) => {
        userStatus.value = status
    }

    provide(UserStatusSymbol, {
        userStatus,
        setUserStatusTo,
    })
}

export function useUserStatus () {
    const context = inject(UserStatusSymbol)
    if (!context) {
        throw new Error('useUserStatus must be used within provideUserStatus')
    }
    return context
}
