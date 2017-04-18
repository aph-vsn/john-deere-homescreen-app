// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import fs from "fs-extra";

import util from "../util";
import { DIST_DIR_PATH } from "../consts";

function clean(...flags) {
    return new Promise((resolve, reject) => {
        util.print({ task: "clean", msg: "Cleaning build output directory" });
        fs.removeSync(DIST_DIR_PATH);
        resolve();
    });
}

export default clean;
