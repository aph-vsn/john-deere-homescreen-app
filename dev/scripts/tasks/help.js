// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import chalk from "chalk";
import fs from "fs-extra";

import util from "../util";

function help(...flags) {
    return new Promise((resolve, reject) => {
        const tasks = fs.readdirSync(__dirname)
                        .map((val, idx) => val.replace(".js", ""))
                        .sort();

        console.log(`\
Run a series of tasks in the order specified.

Usage: yarn do [tasks]

${chalk.bold("Tasks")}

  - ${tasks.join("\n  - ")}

Tasks can accept "flags", which can be used to modify their behavior. Flags
are provided as a plus-delimited (${chalk.bold("+")}) list of strings after a colon (${chalk.bold(":")}).

Examples:

  - yarn do clean
  - yarn do clean build
  - yarn do build:minify
  - yarn do serve:hot+minify

Run \`${chalk.bold("yarn do help TASK")}\`for more information on specific tasks.
`);
        // LEFT OFF

        resolve();
    });
}

export default help;
