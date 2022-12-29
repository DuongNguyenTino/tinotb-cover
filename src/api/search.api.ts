import axios from '../utils/axios'

const getVideoSearch = async ({ query, pageToken }: any) => {
    try {
        if (pageToken !== undefined && pageToken !== '') {
            const response = await axios.get(
                `search?q=${query}&pageToken=${pageToken}&part=snippet`
            )
            return response
        } else {
            const response = await axios.get(
                `search?q=${query}&part=snippet`
            )
            return response
        }
    } catch (e) {
        return e
    }
}

const SearchApi = { getVideoSearch }

export default SearchApi