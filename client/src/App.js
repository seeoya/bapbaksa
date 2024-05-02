import { BrowserRouter } from "react-router-dom";
import {Provider, legacy_createStore as createStore} from 'react-redux';
import {reducer} from './redux/reducer/reducer';
import LayoutRouter from "./component/LayoutRouter";



const store = createStore(reducer);

function App() {
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
