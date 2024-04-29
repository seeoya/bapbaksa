import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainLayout from './MainLayout';
import MartketMainLayout from './MarketMainLayout';
import Home from './Home';
import UserLayout from './user/UserLayout';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Modify from './user/Modify';
import RecipeLayout from './recipe/RecipeLayout';
import RecipeList from './recipe/RecipeList';
import RecipeView from './recipe/RecipeView';
import StyleGuide from './StyleGuide';
import Copy from './Copy';
import Error from './Error';
import MartketLayout from './market/MarketLayout';
import MarketList from './market/MarketList';
import ListView from './market/ListView';
import Payment from './market/Payment';
import ShoppingCart from './market/ShoppingCart';
import PaymentHistory from './market/PaymentHistory';


const LayoutRouter = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
                    
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserLayout />}>                
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="signin" element={<SignIn />}></Route>
                    <Route path="modify" element={<Modify />}></Route>                
                    <Route path="signout" element={<div>로그아웃</div>}></Route>
                    <Route path="delete" element={<div>회원탈퇴</div>}></Route>
                </Route>  

                <Route path="/recipe" element={<RecipeLayout />}>
                    <Route path="list" element={<RecipeList />}></Route>
                    <Route path="view/:no" element={<RecipeView />}></Route>
                </Route>

                {/* STYLE GUIDE */}
                <Route path="/styleguide" element={<StyleGuide/>}></Route>
                {/* Error */}                
                <Route path="*" element={<Error />}></Route>
                {/* Sample Page */}
                <Route path="/copy" element={<Copy />}></Route>            
         
        </Route>

        <Route element={<MartketMainLayout />}>
            <Route path="/market" element={<MartketLayout />}>
                <Route path="" element={<div>Market</div>}></Route>
                <Route path="list" element={<MarketList />}></Route>
                <Route path="view/:no" element={<ListView />}></Route>
                <Route path="payment" element={<Payment />}></Route>
                <Route path="cart" element={<ShoppingCart />}></Route>
                <Route path="pay-history" element={<PaymentHistory/>}></Route>
            </Route>        
        </Route>

    </Routes>
  );
};

export default LayoutRouter;