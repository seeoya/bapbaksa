import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Copy from './Copy';
import Error from './Error';
import Home from './Home';
import MainLayout from './MainLayout';
import MartketMainLayout from './MarketMainLayout';
import StyleGuide from './StyleGuide';
import AdminMain from './admin/AdminMain';
import AdminMarket from './admin/AdminMarket';
import AdminMarketRefund from './admin/AdminMarketRefund';
import AdminMarketView from './admin/AdminMarketView';
import AdminUser from './admin/AdminUser';
import AdminUserView from './admin/AdminUserView';
import ListView from './market/ListView';
import MartketLayout from './market/MarketLayout';
import MarketList from './market/MarketList';
import Market from './market/Market';
import Payment from './market/Payment';
import PaymentHistory from './market/PaymentHistory';
import ShoppingCart from './market/ShoppingCart';
import MyFridge from './recipe/MyFridge';
import RecipeLayout from './recipe/RecipeLayout';
import RecipeList from './recipe/RecipeList';
import RecipeView from './recipe/RecipeView';
import Delete from './user/Delete';
import Modify from './user/Modify';
import SignIn from './user/SignIn';
import SignOut from './user/SignOut';
import SignUp from './user/SignUp';
import UserLayout from './user/UserLayout';

const LayoutRouter = () => {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserLayout />}>
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="signin" element={<SignIn />}></Route>
                    <Route path="modify" element={<Modify />}></Route>
                    <Route path="signout" element={<SignOut />}></Route>
                    <Route path="delete" element={<Delete />}></Route>
                </Route>

                <Route path="/mypage" element={<Outlet />}>
                    <Route path="myfridge" element={<MyFridge />}></Route>
                </Route>

                <Route path="/recipe" element={<RecipeLayout />}>
                    <Route path="list" element={<RecipeList />}></Route>
                    <Route path="view/:no" element={<RecipeView />}></Route>
                </Route>

                {/* STYLE GUIDE */}
                <Route path="/styleguide" element={<StyleGuide />}></Route>
                {/* Error */}
                <Route path="*" element={<Error />}></Route>
                {/* Sample Page */}
                <Route path="/copy" element={<Copy />}></Route>
            </Route>

            <Route element={<MartketMainLayout />}>
                <Route path="/market" element={<MartketLayout />}>
                    <Route path="" element={<Market />}></Route>
                    <Route path="list" element={<MarketList />}></Route>
                    <Route path="view/:no" element={<ListView />}></Route>
                    <Route path="payment" element={<Payment />}></Route>
                    <Route path="cart" element={<ShoppingCart />}></Route>
                    <Route path="pay-history" element={<PaymentHistory />}></Route>
                </Route>
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<AdminMain />}></Route>

                <Route path="user" element={<Outlet />}>
                    <Route path="" element={<AdminUser />}></Route>
                    <Route path=":no" element={<AdminUserView />}></Route>
                </Route>

                <Route path="market" element={<Outlet />}>
                    <Route path="" element={<AdminMarket />}></Route>
                    <Route path=":no" element={<AdminMarketView />}></Route>
                    <Route path="refund" element={<AdminMarketRefund />}></Route>
                </Route>

            </Route>
        </Routes>
    );
};

export default LayoutRouter;