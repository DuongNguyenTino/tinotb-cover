import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { themeMode: String } = {
    themeMode: localStorage.getItem('theme') || 'light'
}

const themeSlice = createSlice({
    name: 'themeMode',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<String>) => {
            state.themeMode = action.payload
        }
    }
})

export const {
    setThemeMode
} = themeSlice.actions
export default themeSlice.reducer