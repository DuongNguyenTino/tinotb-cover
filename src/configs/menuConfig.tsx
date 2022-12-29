import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeOutlinedIcon />,
        state: "home",
        disabled: false
    },
    {
        display: "search",
        path: "/search",
        icon: <SearchOutlinedIcon />,
        state: "search",
        disabled: false
    }
];

const menuConfigs = { main };

export default menuConfigs;