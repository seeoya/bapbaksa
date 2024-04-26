import { BrowserRouter} from "react-router-dom";
import Error from "./component/Error";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import MarketList from "./component/market/MarketList";
import ListView from "./component/market/ListView";
import Payment from "./component/market/Payment";
import ShoppingCart from "./component/market/ShoppingCart";
import PostCode from "./component/market/PostCode";
import Header from "./component/include/Header";
import Footer from "./component/include/Footer";
import Nav from './component/include/Nav';
import Container from "./component/Container";


function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="wrap">
   

                <Header />
                <Nav />
                <Container />
                <Footer />
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
