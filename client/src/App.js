import { BrowserRouter } from "react-router-dom";
import Container from "./component/Container";
import Footer from "./component/include/Footer";
import Header from "./component/include/Header";
import Nav from "./component/include/Nav";



function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="wrap">
                <Header />
                <Nav />   
                <Container />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
