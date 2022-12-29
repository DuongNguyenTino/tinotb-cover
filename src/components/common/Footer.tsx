import React from "react";
import { Stack, Typography } from '@mui/material'
import Logo from "./Logo";
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <>
            <Stack direction={'row'} spacing={1}
                padding={2}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '10vh',
                    backgroundColor: 'backgroundCard',
                    boxShadow: '0 -5px 5px -5px #333'
                }}
            >
                <Link to={'/'} style={{
                    textDecoration: 'none'
                }}>
                    <Logo />
                </Link>
                <Typography color='primaryText'
                    sx={{
                        userSelect: 'none'
                    }}
                >
                    chúc bạn xem video vui vẻ !
                </Typography>
            </Stack>
        </>
    )
}

export default Footer