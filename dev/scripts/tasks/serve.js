// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import chokidar from "chokidar";
import fs from "fs-extra";

import { DevConfig, DevServer } from "lynx-rufus-dev";
import clean from "./clean";
import build from "./build";
import util from "../util";
import { DIST_DIR_PATH, SRC_DIR_PATH } from "../consts";

const BUILD_DELAY_MS = 500;

function serve(...flags) {
    return clean().then(build).then(() => {
        // Programs may modify several files in succession, or multiple programs
        // may be modifying files at one time. Use a timeout to create a small
        // post-change delay before re-executing the build procedure.
        let timeout;

        // Multiple build executions should not be running simultaneously. Use
        // a boolean flag to indicate whether a build is currently in progress.
        let building = false;

        const config = DevConfig.loadFromFile("./dev/rufus/rufus-config.yaml");
        const server = new DevServer(config);

        const ready = () => {
            util.print({ task: "serve", msg: "Watching for changes to project files..." });
        };
        const rebuild = (event, path) => {
            if (building) { return; } // Build is "locked"; exit early.
            if (timeout) { clearTimeout(timeout); }
            timeout = setTimeout(() => {
                building = true; // Acquire the build lock
                util.print({ task: "serve", msg: "Changes detected; rebuilding..." });
                build().then(() => {
                    building = false; // Release the build lock
                    ready();
                });
            }, BUILD_DELAY_MS);
        };

        // Watch the source directory for changes and rebuild. Chokidar will
        // continue watching until SIGINT is received (Ctrl+C).
        chokidar.watch(SRC_DIR_PATH, { ignoreInitial: true })
                .on("ready", ready)
                .on("all", rebuild);

        util.print({ task: "serve", msg: "Starting Rufus development server" });
        server.start();
    });
}

serve.__doc__ = `\
FOO!
`;

export default serve;
