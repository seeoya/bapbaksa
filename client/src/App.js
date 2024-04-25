import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import MarketList from "./component/market/MarketList";

function App() {
    return (
        <BrowserRouter>
            <div className="wrap">
                <Link to='market/list'>list</Link>
                <Routes>
                    <Route path="/" element={<div>HOME</div>} />
                    <Route path="/user" element={<div>USER</div>} />
                    <Route path="/market" element={<div><Outlet/></div>} >
                        <Route path="" element={<div>Market</div>}></Route>
                        <Route path="list" element={<MarketList/>}></Route>
                        <Route path="view/:no" element={<div>view</div>}></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
