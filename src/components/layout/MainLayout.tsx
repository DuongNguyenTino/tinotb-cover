import React from "react";
import Box from "@mui/material/Box";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar/index";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import { useAppSelector } from "../../hooks/redux";
import { themeModes } from "../../configs/themeMode.config";

const MainLayout = (props: any) => {
    const { themeMode } = useAppSelector((state) => state.themeMode)

    return (
        <>
            {/* GlobalLoading */}
            <GlobalLoading />
            {/* GlobalLoading */}

            <Box sx={{
                color: "primaryText",
                backgroundColor: themeMode === themeModes.dark ? '#18191a' : '#f0f2f5'
            }}>
                {/* Topbar */}
                <Topbar {...props} />
                {/* Topbar */}

                {/* Main */}
                <Box
                    component='main'
                    flexGrow={1}
                    minHeight='90vh'
                    overflow='hidden'
                >
                    <Outlet />
                </Box>
                {/* Main */}

            </Box>
            {/* Footer */}
            <Footer />
            {/* Footer */}
        </>
    )
}

export default MainLayout