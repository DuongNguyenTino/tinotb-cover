import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import HomeApi from '../api/home.api';
import SearchApi from '../api/search.api';
import ChannelApi from '../api/channel.api';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setGlobalLoading } from '../store/features/globalLoading';
import InfiniteScroll from "react-infinite-scroll-component"
import BlockVideo from '../components/common/BlockVideo';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import convert from '../utils/convert';
import { Link } from 'react-router-dom'

const VideoWatching = () => {
    const [queryUrl] = useSearchParams()
    const [query, setQuery] = useState('')
    const [dataVideo, setDataVideo] = useState<any>({})
    const [listSearch, setListSearch] = useState([])
    const [nextPage, setNextPage] = useState('')
    const [page, setPage] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [isLoadMoredescription, setIsLoadMoredescription] = useState(false)

    const { themeMode } = useAppSelector((state) => state.themeMode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [queryUrl])

    useEffect(() => {
        if (queryUrl.get('v')) {
            (async () => {
                const data: any = await HomeApi.getDetailsVideo({ videoId: queryUrl.get('v') })
                if (data) {
                    setDataVideo(data.items[0]);
                    setQuery(data.items[0].snippet.title.slice(0, (data.items[0].snippet.title.length) / 3))
                    const dataSearch: any = await SearchApi.getVideoSearch({ pageToken: '', query: data.items[0].snippet.title.slice(0, (data.items[0].snippet.title.length) / 3) })
                    if (dataSearch) {
                        setListSearch(dataSearch.items)
                    }

                    if (dataSearch.nextPageToken) {
                        setNextPage(dataSearch.nextPageToken)
                    } else {
                        setHasMore(false)
                    }
                }
            })()
        }

        if (queryUrl.get('id')) {
            (async () => {
                const data: any = await ChannelApi.getListItemsChannel({ playlistId: queryUrl.get('id'), pageToken: '' })
                if (data) {
                    setListSearch(data.items)
                    const detailVideo: any = await HomeApi.getDetailsVideo({ videoId: data.items[Number(queryUrl.get('index')) - 1].snippet.resourceId.videoId || data.items[Number(queryUrl.get('index')) - 1].contentDetails.videoId })
                    if (detailVideo) {
                        setDataVideo(detailVideo.items[0])
                    }
                }

                if (data.nextPageToken) {
                    setNextPage(data.nextPageToken)
                } else {
                    setHasMore(false)
                }
            })()
        }


    }, [queryUrl, query])

    useEffect(() => {
        if (listSearch.length === 0 || (dataVideo && !dataVideo.snippet)) {
            dispatch(setGlobalLoading(true))
        } else {
            dispatch(setGlobalLoading(false))
        }
    }, [listSearch, dispatch, dataVideo])

    const fetchMoreVideo = () => {
        setPage(nextPage);
        if (page !== '') {

            if (nextPage !== undefined && nextPage !== '') {
                if (queryUrl.get('v')) {
                    (async () => {
                        const data: any = await SearchApi.getVideoSearch({ pageToken: page, query: query })
                        if (listSearch) {
                            if (data.items) {
                                const customlistSearch = listSearch.concat(data.items)
                                setListSearch(customlistSearch)
                            }
                            if (data.nextPageToken) {
                                setNextPage(data.nextPageToken)
                            } else {
                                setHasMore(false)
                            }
                        }
                    })()
                }

                if (queryUrl.get('id')) {
                    (async () => {
                        const data: any = await ChannelApi.getListItemsChannel({ playlistId: queryUrl.get('id'), pageToken: page })
                        if (listSearch) {
                            if (data.items) {
                                const customlistSearch = listSearch.concat(data.items)
                                setListSearch(customlistSearch)
                            }
                            if (data.nextPageToken) {
                                setNextPage(data.nextPageToken)
                            } else {
                                setHasMore(false)
                            }
                        }
                    })()
                }
            }
        } else {
            setHasMore(false)
        }
    }
    return (
        <>
            <Box sx={{
                mt: 12,
                mx: 4,
            }}
            >
                {listSearch && listSearch.length !== 0 && dataVideo && dataVideo.snippet &&
                    <InfiniteScroll
                        dataLength={listSearch.length}
                        next={fetchMoreVideo}
                        hasMore={hasMore}
                        loader={<Box sx={{
                            position: 'absolute',
                        }}>
                            <CircularProgress />
                        </Box>}
                    >
                        <Grid container spacing={4} sx={{
                            overflowX: 'hidden',
                        }}>
                            <Grid item={true} xs={12} sm={12} md={8} lg={8} sx={{
                                mb: {
                                    md: 8,
                                    xs: 0
                                },
                                maxWidth: '100%',
                            }}
                            >
                                <Box>
                                    <iframe
                                        id={`${queryUrl.get('v')}`}
                                        width="100%"
                                        style={{
                                            aspectRatio: 16 / 9,
                                            borderRadius: '1em',
                                            maxHeight: '80vh'
                                        }} src={`https://www.youtube.com/embed/${queryUrl.get('v') ? queryUrl.get('v') : dataVideo.id}?autoplay=1`} title="YouTube video player" frameBorder={'0'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </Box>
                                <Box>
                                    <Typography sx={{
                                        my: 2,
                                        fontSize: '1.2em',
                                        maxWidth: '100%',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {dataVideo.snippet.title}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: {
                                            sm: 'row',
                                            xs: 'column',
                                        },
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography sx={{
                                            fontSize: {
                                                md: '1.1em',
                                                xs: '0.9em'
                                            },
                                            mb: {
                                                md: 0,
                                                xs: 2
                                            },
                                            color: 'primaryText',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease-in-out',
                                            "&:hover": {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                            component={Link}
                                            to={`/channel/${dataVideo.snippet.channelId}`}
                                        >
                                            {dataVideo.snippet.channelTitle}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <Typography sx={{
                                                fontSize: '0.9em',
                                                color: 'secondText',
                                                display: 'flex',
                                                alignItems: 'center',
                                                mr: {
                                                    lg: 4,
                                                    xs: 1
                                                },
                                                backgroundColor: 'backgroundInput',
                                                padding: 1,
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease-in-out',
                                                "&:hover": {
                                                    opacity: 0.8
                                                },
                                            }}>
                                                <ThumbUpOutlinedIcon fontSize='small' sx={{
                                                    mr: 1
                                                }} /> {dataVideo.statistics.likeCount && convert.countContact(dataVideo.statistics.likeCount)}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: '0.9em',
                                                color: 'secondText',
                                                display: 'flex',
                                                alignItems: 'center',
                                                mr: {
                                                    lg: 4,
                                                    xs: 1
                                                },
                                                backgroundColor: 'backgroundInput',
                                                padding: 1,
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease-in-out',
                                                "&:hover": {
                                                    opacity: 0.8
                                                },
                                            }}>
                                                <ThumbDownOutlinedIcon fontSize='small' sx={{
                                                    mr: 1
                                                }} /> {convert.countContact(dataVideo.statistics.favoriteCount)}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: '0.9em',
                                                color: 'secondText',
                                                backgroundColor: 'backgroundInput',
                                                padding: 1,
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                transition: 'all 0.2s ease-in-out',
                                                "&:hover": {
                                                    opacity: 0.8
                                                },
                                            }}>
                                                Chia sẻ <ReplyOutlinedIcon fontSize='small' sx={{
                                                    ml: 1
                                                }} />
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        position: 'relative',
                                        mt: 4,
                                        backgroundColor: themeMode === 'dark' ? '#3a3b3c' : '#ffffff',
                                        padding: '1em',
                                        pb: 3,
                                        borderRadius: '10px',
                                        display: {
                                            sm: 'inline-block',
                                            xs: 'none'
                                        },
                                    }}>
                                        <Typography sx={{
                                            fontSize: '0.9em',
                                            color: 'secondText',

                                        }}>
                                            {convert.countContact(dataVideo.statistics.viewCount) + ' lượt xem - ' + convert.TimeoutVideo(dataVideo.snippet.publishedAt) + ' trước'}
                                        </Typography>
                                        <Typography sx={{
                                            color: 'secondText',
                                            maxWidth: '100%',
                                            display: {
                                                sm: isLoadMoredescription ? 'block' : '-webkit-box',
                                                xs: 'none'
                                            },
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            {convert.descriptionFc(dataVideo.snippet.description).map((item: any, i: any) => (
                                                <Typography sx={{
                                                    fontSize: '0.9em',
                                                    mt: 1
                                                }} key={i}>{item[0]}   <a style={{ color: `${themeMode === 'dark' ? '#2374E1' : '#1b74e4'}`, textDecoration: 'none' }} href={item[1]}>{item[1]}</a></Typography>
                                            ))}
                                        </Typography>
                                        <Typography sx={{
                                            color: 'primaryText',
                                            position: 'absolute',
                                            bottom: '0.3em',
                                            right: '1em',
                                            fontSize: '0.9em',
                                            cursor: 'pointer',
                                            display: {
                                                sm: 'inline-block',
                                                xs: 'none'
                                            },
                                            "&:hover": {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                            onClick={() => {
                                                setIsLoadMoredescription(!isLoadMoredescription)
                                                isLoadMoredescription && window.scrollTo(0, 0)
                                            }}
                                        >
                                            {isLoadMoredescription ? 'Ẩn bớt' : 'Hiện thêm'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item={true} xs={12} sm={12} md={4} lg={4} sx={{
                            }}>
                                {
                                    listSearch.map((item: any, i: any) => (
                                        <Box key={i} sx={{
                                            mb: 3,
                                            mx: 0
                                        }}>
                                            <BlockVideo item={item} id={queryUrl.get('id')} index={i} />
                                        </Box>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </InfiniteScroll>}
            </Box>
        </>
    )
}
export default VideoWatching;