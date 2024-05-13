import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";
import "./css/reset.css";
import "./css/style.css";

import { reducer } from "./redux/reducers/reducer";
import reportWebVitals from "./reportWebVitals";

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>

    <Provider store={store}>
        <App />
    </Provider>

    //</React.StrictMode>
);

reportWebVitals();
