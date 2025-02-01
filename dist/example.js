"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function main() {
    const windows = await (0, index_1.getWindowsList)();
    console.log(windows);
    await (0, index_1.activateWindow)("Finder");
    console.log("Activated");
}
main().catch(console.error);
