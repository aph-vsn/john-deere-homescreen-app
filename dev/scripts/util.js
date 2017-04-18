// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import chalk from "chalk";
import EasyTable from "easy-table";

// --- Private Members ---------------------------------------------------------

function fmtTable(tableData, prefix = "") {
    const table = new EasyTable();
    const headerRow = tableData ? tableData[0] : [];
    for (const txt of headerRow) {
        table.cell(txt, chalk.bold(txt));
    }
    table.newRow();

    if (tableData && tableData.length) {
        // [0] is the header row, so start at [1].
        for (let i = 1; i < tableData.length; i++) {
            const row = tableData[i];
            for (let j = 0; j < row.length; j++) {
                table.cell(headerRow[j], row[j]);
            }
            table.newRow();
        }
    }
    const tableRows = table.print().split("\n");
    const prefixedRows = [];
    for (const row of tableRows) {
        if (!row) { continue; }
        prefixedRows.push(prefix + row);
    }

    return prefixedRows.join("\n");
}

// --- Public Members ----------------------------------------------------------

function dedent(text) {
    const re = /^([ \t]*)(.*)\n/gm;
    let l, m, i;

    while ((m = re.exec(text)) !== null) {
        if (!m[2]) { continue; }

        if (l = m[1].length) {
            i = (i !== undefined) ? Math.min(i, l) : l;
        } else {
            break;
        }
    }

    if (i) {
        text = text.replace(new RegExp("^[ \t]{" + i + "}(.*\n)", "gm"), "$1");
    }

    return text;
}

function print({ task, tool, msg, table } = {}, writer = process.stdout) {
    const prefixParts = [`[${chalk.dim(new Date().toTimeString().split(" ")[0])}]`];
    if (task) { prefixParts.push(`[${chalk.cyan(task)}]`); }
    if (tool) { prefixParts.push(`[${chalk.yellow(tool)}]`); }
    let prefix = prefixParts.join(" ");
    prefix = prefix ? prefix + " " : prefix;

    const strParts = [];
    if (msg) { strParts.push(prefix + msg); }
    if (table) { strParts.push(fmtTable(table, prefix)); }
    writer.write(strParts.join(" ") + "\n");
}


export default { dedent, print };
