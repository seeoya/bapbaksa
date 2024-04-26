import React from "react";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "./StyleGuide";
import Error from "./Error";
import Home from "./Home";
import Copy from "./Copy";

const Container = () => {
    return(
            <div className="container">
                <Routes>
                    <Route path="/" element={<div><Home/></div>} />
                    <Route path="/user" element={<div>USER</div>} />
                    <Route path="/market" element={<div>MARKET</div>} />
                    {/* STYLE GUIDE */}
                    <Route path="/styleguide" element={<StyleGuide />}></Route>
                    {/* Error */}
                    <Route path="*" element={<Error />}></Route>
                    <Route path="/copy" element={<Copy />}></Route>
                </Routes>
            </div>


    );

}
export default Container;