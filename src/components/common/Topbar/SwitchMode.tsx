import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import IconButton from '@mui/material/IconButton';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { themeModes } from '../../../configs/themeMode.config';
import { setThemeMode } from '../../../store/features/themeSlice';

const SwitchMode = () => {
    const { themeMode } = useAppSelector((state) => state.themeMode)
    const dispatch = useAppDispatch()

    const switchTheme = () => {
        themeMode === themeModes.dark ?
            dispatch(setThemeMode(themeModes.light))
            && localStorage.setItem('theme', 'light')
            : dispatch(setThemeMode(themeModes.dark)) && localStorage.setItem('theme', 'dark')
    }

    return (
        <IconButton
            sx={{ color: "primaryText" }}
            onClick={switchTheme}
        >
            {themeMode === themeModes.dark && <DarkModeIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
        </IconButton>
    )
}

export default SwitchMode