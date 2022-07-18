import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SearchField from 'terra-search-field';
import { IntlProvider } from 'react-intl'

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <IntlProvider>
            <App />
        </IntlProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
