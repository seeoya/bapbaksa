import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LayoutRouter from "./component/LayoutRouter";


function App() {

    useEffect(() => {
        console.log('useEffect()');
    });

    const callingAxios = () => {
        axios.get(process.env.REACT_APP_REST_SERVER_URL)
            .then((result) => {
                console.log("result", result.data);
            }).catch(error => {
                console.log("error", error)
            })
    }

    const callingAxios1 = () => {
        axios.get(process.env.REACT_APP_SERVER_URL)
            .then((result) => {
                console.log("result", result.data);
            }).catch(error => {
                console.log("error", error)
            })
    }

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
