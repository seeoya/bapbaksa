import { BrowserRouter} from "react-router-dom";
import Error from "./component/Error";
import Header from "./component/include/Header";
import Footer from "./component/include/Footer";
import Nav from './component/include/Nav';
import Container from "./component/Container";

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
