import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Box, Container } from '@mui/material'
import convert from '../../utils/convert';

const BlockVideo = ({ item, id, index }: any) => {
    const navigate = useNavigate()
    return (
        <Container component={Link}
            to={`${id ? `/playlist?id=${id}&index=${index + 1}` : `/watch?v=${item.id.videoId ? item.id.videoId : item.id}`}`}
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'backgroundCard',
                borderRadius: '1em',
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                textDecoration: 'none',
                color: 'primaryText',
                "&:hover": {
                    backgroundColor: 'backgroundInput'
                },
            }}
        >
            <Box
                component="img"
                sx={{
                    width: '50%',
                    aspectRatio: 16 / 9,
                    maxWidth: item.snippet.thumbnails.medium.width,
                    borderRadius: '0.5em'
                }}
                alt={item.etag}
                src={item.snippet.thumbnails.medium.url}
            />
            <Box>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9em',
                    textAlign: 'justify',
                    px: '1em',
                    mt: '1em',
                    mb: '0.5em',

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
                        navigate(`/channel/${item.snippet.channelId}`)
                    }}
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
                        fontSize: '0.7em',
                        color: 'secondText',
                    }}>
                        {item.statistics ? convert.countContact(item.statistics.viewCount) + ' lượt xem - ' + convert.TimeoutVideo(item.snippet.publishedAt) + ' trước' : convert.TimeoutVideo(item.snippet.publishedAt) + ' trước'}
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default BlockVideo