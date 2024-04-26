import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import MarketList from "./component/market/MarketList";
import ListView from "./component/market/ListView";
import Payment from "./component/market/Payment";
import ShoppingCart from "./component/market/ShoppingCart";
import PostCode from "./component/market/PostCode";
import Header from "./component/include/Header";


function App() {
    return (
        <BrowserRouter>
            <div className="wrap">
                &nbsp;&nbsp;&nbsp;&nbsp;<Link to='market/list'>list</Link>&nbsp;&nbsp;&nbsp;&nbsp;|
                &nbsp;&nbsp;&nbsp;&nbsp;<Link to='market/payment'>Payment</Link>&nbsp;&nbsp;&nbsp;&nbsp;|
                &nbsp;&nbsp;&nbsp;&nbsp;<Link to='market/view/:no'>view</Link>&nbsp;&nbsp;&nbsp;&nbsp;|
                &nbsp;&nbsp;&nbsp;&nbsp;<Link to='market/cart'>Shopping Cart</Link>&nbsp;&nbsp;&nbsp;&nbsp;|

                <Header />
                <Routes>
                    <Route path="/" element={<div>HOME</div>} />
                    <Route path="/user" element={<div>USER</div>} />
                    <Route path="/market" element={<div><Outlet/></div>} >
                        <Route path="" element={<div>Market</div>}></Route>
                        <Route path="list" element={<MarketList/>}></Route>
                        <Route path="view/:no" element={<ListView/>}></Route>
                        <Route path="payment" element={<Payment/>}></Route>
                        <Route path="cart" element={<ShoppingCart/>}></Route>
                    </Route>
                </Routes>


            </div>
        </BrowserRouter>
    );
}

export default App;
