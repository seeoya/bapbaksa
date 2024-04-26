import React from "react";
import MarketList from "./MarketList";
import { Outlet } from "react-router-dom";

const MartketLayout = () => {
    return(
        <div><Outlet/></div>
    )
}

export default MartketLayout;