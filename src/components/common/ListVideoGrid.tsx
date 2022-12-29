import InfiniteScroll from "react-infinite-scroll-component"
import { Grid } from '@mui/material';
import ItemsListVideo from "./ItemListVideo";

const ListVideoGrid = ({ data, fetchMoreData, loader, hasMore, xl, lg, md, xs, sm }: any) => {
    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={loader}
        >
            <Grid container spacing={4} paddingBottom={2}>
                {
                    data && data.map((item: any, index: any) => {
                        return (
                            <Grid item={true} xl={xl} lg={lg} md={md} xs={xs} sm={sm} key={index}

                            >
                                <ItemsListVideo item={item} />
                            </Grid>
                        )
                    })
                }

            </Grid>
        </InfiniteScroll>
    )
}

export default ListVideoGrid