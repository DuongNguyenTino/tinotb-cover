import React from 'react';
import menuConfigs from '../../../configs/menuConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { Box, IconButton, Button } from '@mui/material';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';

export default function ChangePage() {
    const navigate = useNavigate()
    const { appState } = useAppSelector((state) => state.appState)

    return (
        <Box>
            <IconButton onClick={() => navigate(-1)}
                sx={{
                    mr: 2
                }}>
                <NavigateBeforeOutlinedIcon />
            </IconButton>
            {menuConfigs.main.map((item: any) => (
                <Button
                    key={item.display}
                    color="info"
                    sx={{
                        color: appState.includes(item.state) ? '#fff' : 'primaryText',
                        mr: 2
                    }}
                    variant={appState.includes(item.state) ? 'contained' : 'text'}
                    component={Link}
                    to={item.path}
                    disabled={item.disabled}
                >
                    {item.display}
                </Button>
            ))}
        </Box>
    );
}