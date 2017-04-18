// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import fs from "fs-extra";
import path from "path";

import util from "../util";
import { DIST_APP_DIR_PATH, STATIC_DIR_PATH } from "../consts";

function copyStatic(...flags) {
    return new Promise((resolve, reject) => {
        util.print({
            task: "copy-static",
            msg: "Copying static files to build output directory"
        });
        fs.copySync(STATIC_DIR_PATH, DIST_APP_DIR_PATH);
        resolve();
    });
}

export default copyStatic;
