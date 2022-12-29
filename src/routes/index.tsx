import HomePage from "../pages/HomePage";
import SearchPage from "../pages/Searchpage";
import Channel from "../pages/Channel";
import VideoWatching from "../pages/VideoWatching";

const routes = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },
    {
        path: "/search",
        element: <SearchPage />,
        state: "search"
    },
    {
        path: "/channel/:channelId",
        element: <Channel />,
    },
    {
        path: "/watch",
        element: <VideoWatching />,
    },
    {
        path: "/playlist",
        element: <VideoWatching />,
    },
];

export default routes;