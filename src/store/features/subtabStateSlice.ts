import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { subtabState: Number } = {
    subtabState: 0
}

const SubtabStateSlice = createSlice({
    name: 'subtabState',
    initialState,
    reducers: {
        setSubtabState: (state, action: PayloadAction<Number>) => {
            state.subtabState = action.payload
        }
    }
})

export const {
    setSubtabState
} = SubtabStateSlice.actions
export default SubtabStateSlice.reducer