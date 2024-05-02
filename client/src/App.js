import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LayoutRouter from "./component/LayoutRouter";
import axios from "axios";


function App() {

    useEffect(() => {
        console.log('useEffect()');
        
    });

    

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setScrollClass();
        scrollEvent();
    }, []);

    const scrollEvent = () => {
        document.addEventListener("scroll", () => {
            setScrollClass();
        });
    };

    const setScrollClass = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="wrap">
                    <LayoutRouter />               
                </div>
            </BrowserRouter>
        </> 
    );
}

export default App;
