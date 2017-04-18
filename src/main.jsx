/**
 * App entry point
 */

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { hashHistory, Router } from "react-router";

import Routes from "./components/core/routes";


ReactDOM.render((
    <Router history={hashHistory}>
        {Routes}
    </Router>
), document.getElementById("app"));
