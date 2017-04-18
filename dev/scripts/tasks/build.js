// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import chalk from "chalk";
import filesize from "filesize";
import fs from "fs-extra";
import sass from "node-sass";
import webpack from "webpack";
import { create as createWebpackConfig } from "../../webpack.config";

import util from "../util";
import {
    CONFIG_FILE_PATH,
    DIST_CONFIG_FILE_PATH,
    SASS_APP_FILE_PATH,
    SASS_OUT_DIR_PATH,
    SASS_OUT_FILE_NAME,
    SASS_OUT_FILE_PATH,
    SASS_OUT_MIN_FILE_NAME,
    SASS_OUT_MIN_FILE_PATH
} from "../consts";

const WEBPACK_TXT = `[${chalk.yellow("webpack")}]`;

// --- Private Members ---------------------------------------------------------

function buildSass(flags) {
    return new Promise((resolve, reject) => {
        const minify = (flags || []).includes("minify");
        const outFileName = minify ? SASS_OUT_MIN_FILE_NAME : SASS_OUT_FILE_NAME;
        const outFilePath = minify ? SASS_OUT_MIN_FILE_PATH : SASS_OUT_FILE_PATH;

        util.print({ task: "build", msg: "Build start: sass" });
        const startTime = new Date();
        sass.render({
            file: SASS_APP_FILE_PATH,
            outFile: outFilePath,
            outputStyle: minify ? "compressed" : "nested"
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Specifying `outFile` in the options does not cause the file to
                // be written to disk.
                // See: https://github.com/sass/node-sass#user-content-outfile
                fs.ensureDirSync(SASS_OUT_DIR_PATH);
                fs.writeFileSync(outFilePath, result.css, {flag: "w"});
                const fstat = fs.statSync(outFilePath);
                const assetSize = filesize(fstat.size, {standard: "iec"});
                util.print({
                    task: "build", tool: "sass", table: [
                        ["Asset", "Size"],
                        [chalk.green(outFileName), assetSize]
                    ]
                });

                const runTimeMs = new Date() - startTime;
                util.print({task: "build", tool: "sass", msg: `Done (${runTimeMs}ms)`});
                resolve();
            }
        });
    });
}

function buildWebpack(flags) {
    return new Promise((resolve, reject) => {
        const minify = (flags || []).includes("minify");
        const config = createWebpackConfig({ minify });

        util.print({ task: "build", msg: "Build start: webpack" });
        const startTime = new Date();
        webpack(config).run((err, stats) => {
            if (err) {
                reject(err);
            } else {
                const statsJson = stats.toJson({version: true});
                util.print({
                    task: "build", tool: "webpack", table: [
                        ["Asset", "Size"],
                        ...statsJson.assets.map(asset => [
                            chalk.green(asset.name),
                            filesize(asset.size, {standard: "iec"})
                        ])
                    ]
                });

                const runTimeSec = ((new Date() - startTime) / 1000).toFixed(2);
                util.print({task: "build", tool: "webpack", msg: `Done (${runTimeSec}s)`});
                resolve();
            }
        });
    });
}

function copyConfig() {
    return new Promise((resolve, reject) => {
        util.print({ task: "build", msg: "Copying config file to build output directory" });
        fs.copySync(CONFIG_FILE_PATH, DIST_CONFIG_FILE_PATH);
        resolve();
    });
}


// --- Public Members ----------------------------------------------------------

function build(...flags) {
    return copyConfig()
            .then(() => buildWebpack(flags))
            .then(() => buildSass(flags));
}

export default build;
