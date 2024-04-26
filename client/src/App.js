import { BrowserRouter, Route, Routes } from "react-router-dom";
import StyleGuide from "./component/StyleGuide";
import Error from "./component/Error";
import Header from "./component/include/Header";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="wrap">
                <Header />
                <Routes>
                    <Route path="/" element={<div>HOME</div>} />
                    <Route path="/user" element={<div>USER</div>} />
                    <Route path="/market" element={<div>MARKET</div>} />
                    {/* STYLE GUIDE */}
                    <Route path="/styleguide" element={<StyleGuide />}></Route>
                    {/* Error */}
                    <Route path="*" element={<Error />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
