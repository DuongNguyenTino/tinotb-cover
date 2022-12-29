import React, { useEffect, useState } from 'react';
import { Slide, useScrollTrigger, AppBar, Tabs, Tab, Typography } from '@mui/material';
import { tabsClasses } from '@mui/material/Tabs'
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import HomeApi from '../../api/home.api';
import { setCategory } from '../../store/features/categoryStateSlice';
import { setGlobalLoading } from '../../store/features/globalLoading';
import { setSubtabState } from '../../store/features/subtabStateSlice';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ScrollAppbar(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide timeout={500} appear={false} direction="right" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Subtopbar(props: Props) {
    const dispatch = useAppDispatch()
    const [listCategory, setListCategory] = useState([])
    const { categoryState } = useAppSelector((state) => state.categoryState)
    const { subtabState } = useAppSelector((state) => state.subtabState)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(setSubtabState(newValue))
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryState]);

    useEffect(() => {
        (async () => {
            const list: any = await HomeApi.getListCategory()
            setListCategory(list.items)
        })()
    }, [])

    useEffect(() => {
        if (listCategory.length <= 1) {
            dispatch(setGlobalLoading(true))
        } else {
            setTimeout(() => {
                dispatch(setGlobalLoading(false))
            }, 1000)
        }
    }, [listCategory, dispatch])

    return (
        <>
            <ScrollAppbar {...props}>
                <AppBar sx={{
                    marginTop: '67px',
                    paddingX: '10px',
                    height: '3em',
                    backgroundColor: 'background'
                }}>
                    <Tabs
                        value={subtabState}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons={true}
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                                color: 'primaryText',
                            },
                        }}
                    >
                        <Tab sx={{
                            borderRadius: '0.5em',
                            height: '100%',
                        }}
                            value={0}
                            onClick={() => {
                                if (categoryState !== '0') {
                                    dispatch(setCategory('0'))
                                }
                            }}
                            label={
                                <Typography
                                    sx={{
                                        color: categoryState === '0' ? 'buttonBlue' : 'primaryText',
                                        fontSize: '0.8em',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    All
                                </Typography>}
                        />

                        {listCategory && listCategory.map((item: any, i) => {
                            let render = false
                            switch (item.id) {
                                case "1":
                                case "2":
                                case "10":
                                case "15":
                                case "17":
                                case "20":
                                case "22":
                                case "23":
                                case "24":
                                case "25":
                                case "26":
                                case "28":
                                    render = true;
                                    break;

                                default:
                                    render = false;
                                    break;
                            }
                            return (
                                render &&
                                <Tab key={item.id} sx={{
                                    borderRadius: '0.5em',
                                    height: '100%',
                                }}
                                    onClick={() => {
                                        if (categoryState !== item.id) {
                                            dispatch(setCategory(item.id))
                                        }
                                    }}
                                    value={i + 1}
                                    label={
                                        <Typography
                                            sx={{
                                                color: categoryState === item.id ? 'buttonBlue' : 'primaryText',
                                                fontSize: '0.8em',
                                                minWidth: 'max-content',
                                            }}
                                        >
                                            {item.snippet.title}
                                        </Typography>
                                    }
                                />

                            )
                        })}
                    </Tabs>
                </AppBar>
            </ScrollAppbar>
        </>
    );
}