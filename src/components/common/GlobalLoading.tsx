import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import Logo from "./Logo";

const GlobalLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { globalLoading } = useAppSelector((state) => state.globalLoading)

    useEffect(() => {
        globalLoading ? setIsLoading(true) : setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [globalLoading])

    return (
        <>
            <Paper sx={{
                opacity: isLoading ? 1 : 0,
                backgroundColor: 'background',
                transition: 'all 0.3s ease-in-out',
                pointerEvents: 'none',
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 999
            }}>
                <Toolbar />
                <LinearProgress color="inherit" />
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Logo />
                </Box>
            </Paper>
        </>
    )
}

export default GlobalLoading