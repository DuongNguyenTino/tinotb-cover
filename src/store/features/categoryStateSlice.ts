import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { categoryState: String } = {
    categoryState: '0'
}

const categorySlice = createSlice({
    name: 'categoryState',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<String>) => {
            state.categoryState = action.payload
        }
    }
})

export const {
    setCategory
} = categorySlice.actions
export default categorySlice.reducer