import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { globalLoading: boolean } = {
    globalLoading: false
}

const GlobalSlice = createSlice({
    name: 'globalLoading',
    initialState,
    reducers: {
        setGlobalLoading: (state, action: PayloadAction<boolean>) => {
            state.globalLoading = action.payload
        }
    }
})

export const {
    setGlobalLoading
} = GlobalSlice.actions
export default GlobalSlice.reducer