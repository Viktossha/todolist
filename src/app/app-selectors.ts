import type {RootState} from "./store";

export const selectThemeMode = (state: RootState) => state.app.themeMode
