import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { appState: String } = {
    appState: 'home'
}

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setAppState: (state, action: PayloadAction<String>) => {
            state.appState = action.payload
        }
    }
})

export const {
    setAppState
} = appStateSlice.actions
export default appStateSlice.reducer