import React, { useState } from 'react';
import { Box, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';
import convert from '../../utils/convert';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const ItemsListVideo = ({ item }: any) => {
    const navigate = useNavigate()
    const { themeMode } = useAppSelector((state) => state.themeMode)
    const [isHover, setIsHover] = useState(false)

    return (
        <Box component={Link}
            to={`${item.id.channelId ? `/channel/${item.id.channelId}` : `/watch?v=${item.id.videoId ? item.id.videoId : item.id}`}`}
            sx={{
                position: 'relative',
                display: 'block',
                backgroundColor: themeMode === 'dark' ? '#242526' : '#fff',
                borderRadius: '1em',
                overflow: 'hidden',
                cursor: 'pointer',
                width: '100%',
                maxWidth: 320,
                margin: '0 auto',
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                textDecoration: 'none',
                color: 'primaryText',
                "&:hover": {

                },
            }}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
        >
            <Box
                component="img"
                sx={{
                    width: '100%',
                    // borderRadius: item.id.kind === 'youtube#channel' ? '50%' : '',
                    maxWidth: 320,
                    height: 'max-content',
                }}
                alt={item.etag}
                src={item.snippet.thumbnails.medium.url}
            />
            {item.id.channelId ? <></> : <Typography sx={{
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
            </Typography>}
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
            {item.id.channelId ? <></> : <Box sx={{
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
                    {item.statistics ? convert.countContact(item.statistics.viewCount) + ' lượt xem - ' + convert.TimeoutVideo(item.snippet.publishedAt) + ' trước' : convert.TimeoutVideo(item.snippet.publishedAt) + ' trước'}
                </Typography>
            </Box>}
            {/* </Paper> */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'primaryText',
                    backgroundColor: themeMode === 'dark' ? '#3a3b3c' : '#f0f2f5',
                    zIndex: 1,
                    borderRadius: '1em',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease-in-out',
                    opacity: isHover ? 0.2 : 0,
                    pointerEvents: 'none'
                }}
            >
                <PlayCircleFilledWhiteOutlinedIcon fontSize='large' color='action' />
            </Box>
        </Box>
    )
}

export default ItemsListVideo

