import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LayoutRouter from "./component/LayoutRouter";
import { loadFridgeAction } from "./redux/actions/fridge_action";

function App() {
    const dispatch = useDispatch();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        console.log("App.js");
        initBapbaksa();
    }, []);

    const initBapbaksa = async () => {
        // 스크롤 이벤트
        initScrollEvent();
        initAllFridge();
    };

    const initScrollEvent = () => {
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

    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className={isScrolled ? "wrap scrolled" : "wrap"}>
                    <LayoutRouter />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
