import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {Provider, legacy_createStore as createStore} from 'react-redux';
import {reducer} from './redux/reducer/reducer';
import LayoutRouter from "./component/LayoutRouter";
import axios from "axios";


const store = createStore(reducer);

function App() {

    useEffect(() => {
        console.log('useEffect()');
        callingAxios();
    });

    const callingAxios = () => {
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
        <Provider store={store}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="wrap">
                    <LayoutRouter />               
                </div>
            </BrowserRouter>
        </Provider>    
    );
}

export default App;
