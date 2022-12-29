import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material'
import { useParams } from 'react-router-dom';
import ChannelApi from '../api/channel.api'
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import convert from '../utils/convert';
import { setGlobalLoading } from '../store/features/globalLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListVideo from '../components/common/ListVideo';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Channel = () => {
    const params = useParams()
    const [dataChannel, setDataChannel] = useState<any>({})
    const [dataList, setDataList] = useState<any>([])
    const [hasMore, setHasMore] = useState(true)
    const [nextPage, setNextPage] = useState('')
    const [page, setPage] = useState('')
    const [isMoreDes, setIsMoreDes] = useState(false)

    const { themeMode } = useAppSelector((state) => state.themeMode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const dataChannels: any = await ChannelApi.getDetailsChannel({ channelId: params.channelId })
            if (dataChannels) {
                setDataChannel(dataChannels.items[0])
            }
            const dataLists: any = await ChannelApi.getListChannel({ channelId: params.channelId, pageToken: '' })
            if (dataLists) {
                setDataList(dataLists.items)
            }
            if (dataLists.nextPageToken) {
                setNextPage(dataLists.nextPageToken)
            } else {
                setHasMore(false)
            }
        })()
    }, [params.channelId])

    useEffect(() => {
        if (!dataChannel || dataList.length === 0) {
            dispatch(setGlobalLoading(true))
        } else {
            dispatch(setGlobalLoading(false))
        }
    }, [dataChannel, dispatch, dataList])

    const fetchMoreList = () => {
        setPage(nextPage);
        if (page !== '') {
            (async () => {
                const data: any = await ChannelApi.getListChannel({ channelId: params.channelId, pageToken: page })
                if (dataList) {
                    if (data.items) {
                        const customDataList = dataList.concat(data.items)
                        setDataList(customDataList)
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

    return (
        <>
            <Box sx={{
                mt: 12,
                mx: {
                    md: 14,
                    sm: 8,
                    xs: 2
                },
            }}
            >
                {dataChannel.snippet &&
                    <Box sx={{
                        pb: 3,
                        borderBottom: themeMode === 'dark' ? '1px solid #B0B3B8' : '1px solid #65676B'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box
                                    component='img'
                                    src={dataChannel.snippet.thumbnails.default.url}
                                    alt={dataChannel.snippet.title}
                                    sx={{
                                        width: dataChannel.snippet.thumbnails.default.width,
                                        height: dataChannel.snippet.thumbnails.default.height,
                                        borderRadius: '50%',
                                        mr: 3,
                                        display: {
                                            md: 'inline-block',
                                            xs: 'none'
                                        }
                                    }}
                                />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'left'
                                }}>
                                    <Typography sx={{
                                        color: 'primaryText',
                                        fontSize: {
                                            md: '1.4em',
                                            sm: '1.2em',
                                            xs: '1em'
                                        },
                                        width: {
                                            sm: 'auto',
                                            xs: '50vw',
                                        },
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>{dataChannel.snippet.title}</Typography>
                                    <Typography sx={{
                                        color: 'secondText',
                                        fontSize: '0.9em',
                                        width: {
                                            sm: 'auto',
                                            xs: '50vw',
                                        },
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>{dataChannel.snippet.customUrl}</Typography>
                                    <Typography sx={{
                                        color: 'secondText',
                                        fontSize: '0.9em'
                                    }}>{convert.countContact(dataChannel.statistics.subscriberCount) + ' người đăng ký'}</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{
                                background: themeMode === 'dark' ? '#fff' : '#000',
                                color: themeMode === 'dark' ? '#000' : '#fff',
                                padding: '0.6em 1em',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                "&:hover": {
                                    opacity: 0.8
                                }
                            }}>
                                Đăng ký
                            </Typography>
                        </Box>
                        <Typography sx={{
                            mt: 3,
                            maxWidth: '100%',
                            display: {
                                md: isMoreDes ? 'block' : '-webkit-box',
                                xs: 'none'
                            },
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {convert.descriptionFc(dataChannel.snippet.description).map((item: any, i: any) => (
                                <Typography sx={{
                                    fontSize: '0.9em',
                                    mt: 1,
                                    color: 'secondText',
                                }} key={i}>{item[0]}   <a style={{ color: `${themeMode === 'dark' ? '#2374E1' : '#1b74e4'}`, textDecoration: 'none' }} href={item[1]}>{item[1]}</a></Typography>
                            ))}
                        </Typography>
                        <Typography sx={{
                            display: {
                                md: 'inline-block',
                                xs: 'none'
                            },
                            color: 'primaryText',
                            fontSize: '0.9em',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            }
                        }}
                            onClick={() => setIsMoreDes(!isMoreDes)}
                        >{isMoreDes ? 'Ẩn bớt' : 'Hiện thêm'}</Typography>
                    </Box>
                }
                {dataList &&
                    <Box>
                        <Typography sx={{
                            color: 'primaryText',
                            textTransform: 'uppercase',
                            fontSize: '1.5em',
                            mb: 8,
                            mt: 4,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            playlist <KeyboardArrowRightIcon fontSize='large' />
                        </Typography>
                        <InfiniteScroll
                            dataLength={dataList.length}
                            next={fetchMoreList}
                            hasMore={hasMore}
                            loader={<></>}
                        >
                            <Grid container spacing={3}>
                                {
                                    dataList.map((item: any, i: any) => (
                                        <Grid item={true} key={i} xs={12} sm={6} md={4} lg={3}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    mb: 4
                                                }}
                                            >
                                                <ListVideo item={item} />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </InfiniteScroll>
                    </Box>
                }
            </Box>
        </>
    )
}

export default Channel;