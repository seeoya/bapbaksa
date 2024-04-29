import { BrowserRouter } from "react-router-dom";
import LayoutRouter from "./component/LayoutRouter";


function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="wrap">
                <LayoutRouter />               
            </div>
        </BrowserRouter>
    );
}

export default App;
