export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE-THEME':
            return {...state, themeMode: action.payload.theme}
        default:
            return state
    }
}

export const ChangeThemeAC = (theme: ThemeMode) => {
    return {
        type: 'CHANGE-THEME',
        payload: {
            theme
        }
    } as const
}

type ChangeThemeActionType = ReturnType<typeof ChangeThemeAC>

// Action types
type ActionsType = ChangeThemeActionType

