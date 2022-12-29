import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { valueSearch: String } = {
    valueSearch: localStorage.getItem('valueSearch') || ''
}

const valueSearchSlice = createSlice({
    name: 'valueSearch',
    initialState,
    reducers: {
        setValueSearch: (state, action: PayloadAction<String>) => {
            state.valueSearch = action.payload
        }
    }
})

export const {
    setValueSearch
} = valueSearchSlice.actions
export default valueSearchSlice.reducer