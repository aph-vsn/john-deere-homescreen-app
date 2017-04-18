// Copyright 2016 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import React, { Component } from "react";
import { Link } from "react-router";
import vslynx from "vslynx";

console.log(vslynx);

class HomeView extends Component {
    constructor() {
        super();

        this.state = {
            apps: [],
            selectedAppByUuid: ""
        };
    }

    redirectToApp() {
        // for (let app of this.state.apps) {
        //     let selectedAppByUuid = app.uuid;
        //     this.setState({selectedAppByUuid});
        // }

        // User selected app
        this.setState({ selectedAppByUuid: this.state.apps[1].uuid })

        let selected = this.state.selectedAppByUuid.split('-').join('');

        // will not work because app is looking for id not uuid
        // window.location.pathname = `/v1/app/${selected}/index.html`;

        // Find app by uuid
        new Promise((resolve, reject) => {
            vslynx.apps
               .find(this.state.selectedAppByUuid)
               .done(appByUuid => {
                   resolve(console.log(appByUuid));
               })
               .fail(reject);
           });
    }

    getApps() {
        // Find all apps
        new Promise((resolve, reject) => {
            vslynx.apps
               .all()
               .done(apps => {
                   resolve(this.setState({apps}));
                   this.redirectToApp(this.state.apps);
               })
               .fail(reject);
        });
    }

    render() {
        console.log(this.state.apps)
        return (
            <div>
                <a>Catalog/Walkaround</a>
                <button onClick={this.getApps.bind(this)}>Get Apps</button>
            </div>
        );
    }
}

export default HomeView;
