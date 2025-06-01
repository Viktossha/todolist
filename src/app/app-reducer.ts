export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME":
      return { ...state, themeMode: action.payload.theme }
    case "SET_STATUS":
      return { ...state, status: action.payload.status }
    default:
      return state
  }
}

export const ChangeThemeAC = (theme: ThemeMode) => {
  return {
    type: "CHANGE-THEME",
    payload: {
      theme,
    },
  } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: {
      status,
    },
  } as const
}

type ChangeThemeActionType = ReturnType<typeof ChangeThemeAC>
type setAppStatusActionType = ReturnType<typeof setAppStatusAC>

// Action types
type ActionsType = ChangeThemeActionType | setAppStatusActionType
