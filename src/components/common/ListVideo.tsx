import React, { useState } from 'react';
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import convert from '../../utils/convert';
import { useAppSelector } from '../../hooks/redux';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Video = ({ item }: any) => {
    const navigate = useNavigate()
    const { themeMode } = useAppSelector((state) => state.themeMode)
    const [isHover, setIsHover] = useState(false)

    return (
        <>
            {item.snippet &&
                <Box component={Link}
                    to={`/playlist?id=${item.id}&index=1`}
                    sx={{
                        display: 'block',
                        position: 'relative',
                        backgroundColor: themeMode === 'dark' ? '#242526' : '#fff',
                        borderRadius: '1em',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        // height: '100%',
                        maxWidth: item.snippet.thumbnails.medium.width,
                        margin: '0 auto',
                        height: 'max-content',
                        transition: 'all 0.3s ease-in-out',
                        textDecoration: 'none',
                        color: 'primaryText',
                        "&:hover": {
                            backgroundColor: themeMode === 'dark' ? '#3a3b3c' : '#f0f2f5'
                        },
                    }}
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}
                >
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            aspectRatio: 16 / 9,
                            maxWidth: item.snippet.thumbnails.medium.width,
                        }}
                        alt={item.etag}
                        src={item.snippet.thumbnails.medium.url}
                    />
                    <Typography sx={{
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        textAlign: 'justify',
                        px: '1em',
                        mt: '1em',
                        mb: '0.5em',
                        color: 'secondText',

                        minHeight: '3em',
                        maxWidth: '100%',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {item.snippet.title}
                    </Typography>
                    <Typography sx={{
                        textDecoration: 'none',
                        color: 'secondText',
                        px: '1em',
                        fontSize: '0.9em',
                        "&:hover": {
                            textDecoration: "underline",
                        },
                        maxWidth: '100%',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/channel/${item.snippet.channelId}
                                        `)
                        }}
                    // component={Link}
                    // to={`/channel/${item.snippet.channelId}`}
                    >
                        {item.snippet.channelTitle}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: '1em',
                        pb: '1em',
                        mt: '0.5em',
                    }}>
                        <Typography sx={{
                            fontSize: '0.8em',
                            color: 'secondText'
                        }}>
                            {item.statistics && convert.countContact(item.statistics.viewCount) + ' lượt xem'}
                        </Typography>
                        <Typography sx={{
                            mx: '6px'
                        }}>
                            {item.statistics && '-'}
                        </Typography>
                        <Typography sx={{
                            fontSize: '0.8em',
                            color: 'secondText'
                        }}>
                            {convert.TimeoutVideo(item.snippet.publishedAt)} trước
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'primaryText',
                            backgroundColor: themeMode === 'dark' ? '#3a3b3c' : '#f0f2f5',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'end',
                            transition: 'all 0.2s ease-in-out',
                            opacity: isHover ? 0.1 : 0,
                            pointerEvents: 'none'
                        }}
                    >
                        <FormatListBulletedIcon fontSize='large' color='action' />
                    </Box>
                </Box>
            }

        </>
    )
}

export default Video

