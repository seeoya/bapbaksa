import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./component/include/Header";
import ListView from "./component/market/ListView";
import MarketList from "./component/market/MarketList";
import Payment from "./component/market/Payment";
import ShoppingCart from "./component/market/ShoppingCart";
import RecipeLayout from "./component/recipe/RecipeLayout";
import RecipeList from "./component/recipe/RecipeList";
import RecipeView from "./component/recipe/RecipeView";

function App() {
    return (
        <BrowserRouter>
            <div className="wrap">
                <Header />
                <Routes>
                    <Route path="/" element={<div>HOME</div>} />
                    <Route path="/user" element={<div>USER</div>} />
                    <Route
                        path="/market"
                        element={
                            <div>
                                <Outlet />
                            </div>
                        }
                    >
                        <Route path="" element={<div>Market</div>}></Route>
                        <Route path="list" element={<MarketList />}></Route>
                        <Route path="view/:no" element={<ListView />}></Route>
                        <Route path="payment" element={<Payment />}></Route>
                        <Route path="cart" element={<ShoppingCart />}></Route>
                    </Route>
                    <Route path="/recipe" element={<RecipeLayout />}>
                        <Route path={"list"} element={<RecipeList />}></Route>
                        {/* <Route path="list" element={<RecipeList />}></Route> */}
                        <Route path="view/:no" element={<RecipeView />}></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
