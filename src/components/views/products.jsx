// Copyright 2016 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import React, { Component, Link } from "react";
import vslynx from "vslynx";

class ProductsView extends Component {
    render() {
        vslynx.apps.all().done(function(apps){
            console.log(apps);
        });
        return (
            <div>
                <a>Catalog/Walkaround</a>
            </div>
        );
    }
}

export default ProductsView;
