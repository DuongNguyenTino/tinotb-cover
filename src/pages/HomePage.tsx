import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Subtopbar from '../components/common/Subtopbar'
import HomeApi from '../api/home.api';
import { setGlobalLoading } from '../store/features/globalLoading';
import ListVideoGrid from '../components/common/ListVideoGrid';

const HomePage = (props: any) => {
    const [nextPage, setNextPage] = useState('')
    const [page, setPage] = useState('')
    const [dataPopular, setDataPopular] = useState([])
    const [hasMore, setHasMore] = useState<boolean>(true)

    const dispatch = useAppDispatch()
    const { categoryState } = useAppSelector((state) => state.categoryState)

    useEffect(() => {
        if (dataPopular.length === 0) {
            dispatch(setGlobalLoading(true))
        } else {
            dispatch(setGlobalLoading(false))
        }
    }, [dataPopular, dispatch])

    useEffect(() => {
        setDataPopular([]);
        (async () => {
            let data: any
            if (categoryState === '0') {
                data = await HomeApi.getPopular({ pageToken: '' })
            } else {
                data = await HomeApi.getListVideoCategory({ pageToken: '', videoCategoryId: categoryState })
            }

            if (data.items) {
                setDataPopular(data.items)
            }

            if (data.nextPageToken) {
                setNextPage(data.nextPageToken)
            } else {
                setHasMore(false)
            }
        })()
    }, [categoryState])

    const fetchMorePopular = () => {
        setPage(nextPage);
        if (page !== '') {
            (async () => {
                let data: any
                if (categoryState === '0') {
                    data = await HomeApi.getPopular({ pageToken: page })
                } else {
                    data = await HomeApi.getListVideoCategory({ pageToken: page, videoCategoryId: categoryState })
                }
                if (dataPopular) {
                    if (data.items) {
                        const customDataPopular = dataPopular.concat(data.items)
                        setDataPopular(customDataPopular)
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
            <Subtopbar {...props} />
            <Box sx={{
                flexGrow: 1,
                backgroundColor: 'background',
                mt: 20,
                mb: 4,
                mx: 4,
            }}>
                {dataPopular.length !== 0 && <ListVideoGrid
                    data={dataPopular}
                    fetchMoreData={fetchMorePopular}
                    hasMore={hasMore}
                    loader={<></>}
                    lg={3} md={4} xs={12} sm={6}
                />
                }
            </Box>
        </>
    )
}

export default HomePage;