// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import fs from "fs-extra";
import path from "path";

import help from "./tasks/help";
import util from "./util";

if (require.main === module) {
    process.on("unhandledRejection", function(err) {
        console.log(err.stack);
        process.exit(1);
    });

    // Display help/usage text if no tasks were specified
    if (process.argv.length < 3) {
        const tasks = fs.readdirSync(path.resolve(__dirname, "tasks"))
                        .map((val, idx) => val.replace(".js", ""))
                        .sort();

        help().then();
    }

    // Consider all arguments after "do" to be tasks. Tasks can accept "flags",
    // which can be used to modify their behavior. Flags are are provided as
    // a `+` delimited list of strings after a `:`.
    // Examples:
    //     - do build
    //     - do build:minify
    //     - do serve:hot+minify
    let result = Promise.resolve();
    for (const fullName of process.argv.slice(2)) {
        const nameParts = fullName.split(":");
        const taskName = nameParts[0];
        const flags = (nameParts.length > 1) ? nameParts[1].split("+") : [];
        let module_;
        try {
            module_ = require(path.resolve(__dirname, "tasks", taskName));
        } catch (err) {
            console.error(err.stack);
            process.exit(1);
        }

        result = result.then(() => {
            if (flags.length) {
                util.print({ task: taskName, msg: `Flags: ${flags.join(", ")}` });
            }

            const task = typeof module_.default === "undefined"
                       ? module_
                       : module_.default;
            if (typeof task !== "function") {
                console.error(`Module "${taskName}" does not export a default function`);
                process.exit(1);
            }

            return task(...flags);
        }).catch(reason => {
            console.error(reason.stack);
            process.exit(1);
        });
    }
}
