import React, { useState } from 'react';
import {
    Toolbar, AppBar, useScrollTrigger, Box, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Divider, Typography
} from '@mui/material';
import SwitchMode from './SwitchMode';
import Logo from '../Logo';
import ChangePage from './ChangePage';
import { Link } from 'react-router-dom'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setThemeMode } from '../../../store/features/themeSlice'

import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import menuConfigs from '../../../configs/menuConfig';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ScrollAppbar(props: Props) {
    const { children, window } = props;
    useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        children
    );
}

export default function Topbar(props: Props) {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const dispatch = useAppDispatch()
    const { themeMode } = useAppSelector((state) => state.themeMode)
    const { appState } = useAppSelector((state) => state.appState)

    const switchTheme = () => {
        themeMode === 'dark' ?
            dispatch(setThemeMode('light'))
            && localStorage.setItem('theme', 'light')
            : dispatch(setThemeMode('dark')) && localStorage.setItem('theme', 'dark')
    }

    return (
        <>
            <ScrollAppbar {...props}>
                <AppBar sx={{
                    backgroundColor: 'backgroundCard'
                }}>
                    <Toolbar sx={{
                        justifyContent: 'space-between',
                    }}>
                        <Toolbar>
                            <Link to={'/'} style={{
                                textDecoration: 'none',
                                marginRight: '2em'
                            }}>
                                <Logo />
                            </Link>
                            <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
                                <ChangePage />
                            </Box>
                        </Toolbar>
                        <Box sx={{ display: { xs: "inline-block", sm: "none" } }}>
                            <IconButton onClick={() => setIsOpenSidebar(true)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                            <Drawer
                                anchor='right'
                                open={isOpenSidebar}
                                onClose={() => setIsOpenSidebar(false)}
                                sx={{
                                    backgroundColor: themeMode === 'dark' ? 'rgba(240, 242, 245, 0.4)' : 'rgba(24, 25, 26, 0.4)',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 250,
                                        height: '100%',
                                        backgroundColor: themeMode === 'dark' ? '#3a3b3c' : '#f0f2f5'
                                    }}
                                    role="presentation"
                                    onClick={() => setIsOpenSidebar(false)}
                                    onKeyDown={() => setIsOpenSidebar(false)}
                                >
                                    <List>
                                        <Typography sx={{
                                            width: '96%',
                                            display: 'flex',
                                            justifyContent: 'end',
                                            color: 'primaryText'
                                        }}>
                                            <MenuOutlinedIcon fontSize='large' color='action' />
                                        </Typography>
                                        <ListItem disablePadding onClick={switchTheme}>
                                            <ListItemButton>
                                                <ListItemIcon sx={{
                                                    color: 'primaryText'
                                                }}>
                                                    {themeMode === 'dark' && <DarkModeIcon />}
                                                    {themeMode === 'light' && <WbSunnyOutlinedIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'} />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                    <Divider />
                                    <List>
                                        {menuConfigs.main.map((item: any, i: any) => (
                                            <ListItem key={i} disablePadding
                                                color="info"
                                                sx={{
                                                    color: appState.includes(item.state) ? 'buttonBlue' : 'primaryText',
                                                    mr: 2,

                                                }}
                                                component={Link}
                                                to={item.path}
                                                disabled={item.disabled}
                                            >
                                                <ListItemButton>
                                                    <ListItemIcon sx={{
                                                        color: appState.includes(item.state) ? 'buttonBlue' : 'primaryText',
                                                    }}>
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography textTransform="uppercase" fontWeight='bold'>
                                                        {item.display}
                                                    </Typography>} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
                            <SwitchMode />
                        </Box>
                    </Toolbar>
                </AppBar>
            </ScrollAppbar>
        </>
    );
}