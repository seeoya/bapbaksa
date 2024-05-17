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
import Market from './market/Market';
import MartketLayout from './market/MarketLayout';
import MarketList from './market/MarketList';
import Payment from './market/Payment';
import PaymentDetail from './market/PaymentDetail';
import PaymentHistory from './market/PaymentHistory';
import ShoppingCart from './market/ShoppingCart';
import { CheckoutPage } from './payment/Checkout';
import { FailPage } from './payment/Fail';
import { SuccessPage } from './payment/Success';
import MyFridge from './recipe/MyFridge';
import RecipeLayout from './recipe/RecipeLayout';
import RecipeList from './recipe/RecipeList';
import RecipeView from './recipe/RecipeView';
import Delete from './user/Delete';
import FindID from './user/FindID';
import FindPW from './user/FindPW';
import Google from './user/Google';
import Kakao from './user/Kakao';
import Modify from './user/Modify';
import Naver from './user/Naver';
import SignIn from './user/SignIn';
import SignOut from './user/SignOut';
import SignUp from './user/SignUp';
import UserLayout from './user/UserLayout';
import Questions from './user/Questions';
import AdminUserQuestions from './admin/AdminUserQuestions';
import AdminUserQuestionsWrite from './admin/AdminUserQuestionsWrite';



const LayoutRouter = () => {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/auth/google/callback" element={<Google />}></Route>
                <Route path="/oauth/kakao/callback" element={<Kakao />}></Route>
                <Route path="/oauth/naver/callback" element={<Naver />}></Route>
                <Route path="question" element={<Questions />}></Route>

                <Route path="/user" element={<UserLayout />}>
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="signin" element={<SignIn />}></Route>
                    <Route path="findid" element={<FindID />}></Route>
                    <Route path="findpw" element={<FindPW />}></Route>
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
                    <Route path="payment_detail/:oId" element={<PaymentDetail />}></Route>
                </Route>

                <Route path="/sandbox" element={<MartketLayout />}>
                    <Route path="" element={<CheckoutPage />}></Route>
                    <Route path="success" element={<SuccessPage />}></Route>
                    <Route path="fail" element={<FailPage />}></Route>
                </Route>
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<AdminMain />}></Route>

                <Route path="user" element={<Outlet />}>
                    <Route path="" element={<AdminUser />}></Route>
                    <Route path="question" element={<Outlet />}>
                        <Route path="" element={<AdminUserQuestions />}></Route>
                        <Route path=":no" element={<AdminUserQuestionsWrite />}></Route>
                    </Route>
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