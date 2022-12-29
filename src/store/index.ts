import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import appStateReducer from './features/appStateSlice'
import GlobalReducer from './features/globalLoading'
import categoryStateReducer from './features/categoryStateSlice'
import subtabStateReducer from './features/subtabStateSlice'
import valueSearchReducer from './features/valueSearchSlice'

const store = configureStore({
    reducer: {
        themeMode: themeReducer,
        appState: appStateReducer,
        globalLoading: GlobalReducer,
        categoryState: categoryStateReducer,
        subtabState: subtabStateReducer,
        valueSearch: valueSearchReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store