import axios from '../utils/axios'

const getDetailsChannel = async ({ channelId }: any) => {
    try {
        const response = await axios.get(
            `channel/${channelId}?part=snippet,contentDetails,statistics`
        )
        return response
    } catch (e) {
        return e
    }
}

const getListChannel = async ({ channelId, pageToken }: any) => {
    try {
        if (pageToken !== undefined && pageToken !== '') {
            const response = await axios.get(
                `playlist?channelId=${channelId}&part=snippet,contentDetails&pageToken=${pageToken}`
            )
            return response
        } else {
            const response = await axios.get(
                `playlist?channelId=${channelId}&part=snippet,contentDetails`
            )
            return response
        }
    } catch (e) {
        return e
    }
}

const getListItemsChannel = async ({ playlistId, pageToken }: any) => {
    try {
        if (pageToken !== undefined && pageToken !== '') {
            const response = await axios.get(
                `playlistItems?playlistId=${playlistId}&part=snippet,contentDetails&pageToken=${pageToken}`
            )
            return response
        } else {
            const response = await axios.get(
                `playlistItems?playlistId=${playlistId}&part=snippet,contentDetails`
            )
            return response
        }
    } catch (e) {
        return e
    }
}

const SearchApi = { getDetailsChannel, getListChannel, getListItemsChannel }

export default SearchApi