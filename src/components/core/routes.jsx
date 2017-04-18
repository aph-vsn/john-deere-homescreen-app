import React from "react";
import { IndexRoute, Route } from "react-router";

import App from "./app";
import HomeView from "../views/home";
import ProductsView from "../views/products";


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeView} />
        <Route path="products" component={ProductsView} />
        {/* <Route path="home" component={HomePage} /> */}
    </Route>
);
