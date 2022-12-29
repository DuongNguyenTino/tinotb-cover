import React from 'react';
import { Typography } from '@mui/material';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';

const Logo = () => {
    return (
        <>
            <Typography sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primaryText',
                fontWeight: 'bold',
                fontSize: '1.5em',
                cursor: 'pointer',
            }}>
                <SlowMotionVideoIcon color='action' fontSize='large' />
                Tino<span style={{ color: '#1b74e4' }}>Tube</span>
            </Typography>
        </>
    )
}

export default Logo