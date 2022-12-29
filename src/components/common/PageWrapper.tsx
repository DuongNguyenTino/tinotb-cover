import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setAppState } from "../../store/features/appStateSlice";

const PageWrapper = ({ state, children }: { state: String, children: any }) => {
    const dispatch = useAppDispatch()
    const { appState } = useAppSelector((state) => state.appState)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [appState, children])

    useEffect(() => {
        dispatch(setAppState(state))
    }, [dispatch, state])

    return (
        children
    )
}

export default PageWrapper