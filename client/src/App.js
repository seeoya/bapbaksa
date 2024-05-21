import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LayoutRouter from "./component/LayoutRouter";
import Loading from "./component/include/Loading";
import { set_loading } from "./redux/actions/common_action";
import { loadFridgeAction } from "./redux/actions/fridge_action";
import { adminCheck, loginCheck } from "./util/check";

const queryClient = new QueryClient();

function App() {
    const dispatch = useDispatch();

    const [isScrolled, setIsScrolled] = useState(false);
    const isLoading = useSelector((state) => state.common.isLoading);

    useEffect(() => {
        console.log("App.js");
        initBapbaksa();
    }, []);

    const initBapbaksa = async () => {
        initScrollEvent();
        initAllFridge();
        initLoading();

        console.log("user: ", await loginCheck());
        console.log("admin: ", await adminCheck());
    };

    const initScrollEvent = () => {
        // 스크롤 이벤트
        document.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        });
    };

    const initAllFridge = async () => {
        // 냉장고 전체 재료 세팅
        console.log("initAllFridge");
        dispatch(await loadFridgeAction());
    };

    const initLoading = () => {
        // 로딩 스피너
        dispatch(set_loading(false));
    };

    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <QueryClientProvider client={queryClient}>
                    <div className={isScrolled ? "wrap scrolled" : "wrap"}>
                        {isLoading ? <Loading /> : null}
                        <LayoutRouter />
                    </div>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
