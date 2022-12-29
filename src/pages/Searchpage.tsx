import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import SearchApi from '../api/search.api';
import ListVideoGrid from '../components/common/ListVideoGrid';
import { setGlobalLoading } from '../store/features/globalLoading'
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';

const SearchPage = () => {
    const [value, setValue] = useState<any>('')
    const [page, setPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [dataSearch, setDataSearch] = useState([])

    const [searchParam, setSearchParam] = useSearchParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const data: any = await SearchApi.getVideoSearch({ pageToken: '', query: searchParam.get('q') })
            if (data.items) {
                setDataSearch(data.items)
            }
            if (data.nextPageToken) {
                setNextPage(data.nextPageToken)
            } else {
                setHasMore(false)
            }
        })()
    }, [searchParam])

    const getDatabyQuery = async () => {
        setSearchParam({ q: value })
        if (searchParam.get('q')) {
            setDataSearch([])
            const data: any = await SearchApi.getVideoSearch({ pageToken: '', query: searchParam.get('q') })
            if (data.items) {
                setDataSearch(data.items)
            }
            if (data.nextPageToken) {
                setNextPage(data.nextPageToken)
            } else {
                setHasMore(false)
            }
        }
    }

    useEffect(() => {
        if (dataSearch.length === 0) {
            dispatch(setGlobalLoading(true))
        } else {
            dispatch(setGlobalLoading(false))
        }
    }, [dataSearch, dispatch])

    document.onkeydown = (e) => {
        if (e.keyCode === 13) {
            getDatabyQuery()
        }
    }

    const fetchMoreVideoSearch = () => {
        setPage(nextPage);
        if (page !== '') {
            (async () => {
                const data: any = await SearchApi.getVideoSearch({ pageToken: page, query: value })
                if (dataSearch) {
                    if (data.items) {
                        const customDataPopular = dataSearch.concat(data.items)
                        setDataSearch(customDataPopular)
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

    const handleChangeTextSearch = (e: any) => {
        setValue(e.target.value)
    }

    return (
        <>
            <Box sx={{
                mt: 14,
                mb: 4,
                maxWidth: '60vw',
                minWidth: '16em',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc'
            }}>
                <TextField label="Search" variant="filled" sx={{
                    flexGrow: 1,
                    color: 'primaryText',
                }}
                    value={value}
                    onChange={handleChangeTextSearch}
                />
                <Button variant='text'
                    sx={{
                        color: 'secondText',
                        minHeight: '4em'
                    }}
                    onClick={getDatabyQuery}
                >
                    <SearchOutlinedIcon color='inherit' fontSize='large' />
                </Button>
            </Box>
            <Box sx={{
                mx: 4,
                mt: 10,
            }}>
                {
                    dataSearch && <ListVideoGrid
                        data={dataSearch}
                        fetchMoreData={fetchMoreVideoSearch} hasMore={hasMore}
                        loader={<></>}
                        lg={3} md={4} xs={12} sm={6}
                    />
                }
            </Box>
        </>
    )
}

export default SearchPage;