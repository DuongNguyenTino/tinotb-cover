import axios from '../utils/axios'

const getPopular = async ({ pageToken }: any) => {
    try {
        if (pageToken !== undefined && pageToken !== '') {
            const response = await axios.get(
                `popular?chart=mostPopular&part=snippet,contentDetails,statistics&pageToken=${pageToken}`
            )
            return response
        } else {
            const response = await axios.get(
                `popular?chart=mostPopular&part=snippet,contentDetails,statistics`
            )
            return response
        }
    } catch (e) {
        return e
    }
}

const getListCategory = async () => {
    try {
        const response = await axios.get(
            `videoCategory?part=snippet`
        )
        return response
    } catch (e) {
        return e
    }
}

const getListVideoCategory = async ({ pageToken, videoCategoryId }: any) => {
    try {
        if (pageToken !== undefined && pageToken !== '') {
            const response = await axios.get(
                `videoCategory/${videoCategoryId}?chart=mostPopular&part=snippet,contentDetails,statistics&pageToken=${pageToken}`
            )
            return response
        } else {
            const response = await axios.get(
                `videoCategory/${videoCategoryId}?chart=mostPopular&part=snippet,contentDetails,statistics`
            )
            return response
        }
    } catch (e) {
        return e
    }
}

const getDetailsVideo = async ({ videoId }: any) => {
    try {
        const response = await axios.get(
            `video/${videoId}?part=snippet,contentDetails,statistics`
        )
        return response
    } catch (e) {
        return e
    }
}


const HomeApi = { getPopular, getListCategory, getListVideoCategory, getDetailsVideo }

export default HomeApi