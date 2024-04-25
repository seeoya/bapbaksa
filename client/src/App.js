import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="wrap">
                1234
                <Routes>
                    <Route path="/" element={<div>HOME</div>} />
                    <Route path="/user" element={<div>USER</div>} />
                    <Route path="/market" element={<div>MARKET</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
