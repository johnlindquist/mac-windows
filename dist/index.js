"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowsList = void 0;
exports.activateWindow = activateWindow;
const node_child_process_1 = require("node:child_process");
const node_path_1 = require("node:path");
function getWindows(onScreenOnly = true) {
    const dir = __dirname;
    const app = (0, node_path_1.join)(dir, "../scripts/MacWindows");
    return new Promise((resolve) => {
        (0, node_child_process_1.execFile)(app, [onScreenOnly.toString()], (err, stdout) => {
            if (err) {
                resolve(String(err));
            }
            else {
                resolve(stdout);
            }
        });
    });
}
function activateWindow(windowName) {
    const dir = __dirname;
    const app = (0, node_path_1.join)(dir, "../scripts/ActivateWindow");
    return new Promise((resolve, reject) => {
        (0, node_child_process_1.execFile)(app, [windowName], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
const getWindowsList = (opts = {}) => {
    return getWindows(opts.onScreenOnly ?? true)
        .then((data) => JSON.parse(data))
        .then((windows = []) => {
        if (opts.showAllWindows) {
            return windows;
        }
        return windows.filter((win, index) => {
            const firstWithName = windows.findIndex((w) => w.name && w.ownerName === win.ownerName);
            return firstWithName === -1
                ? windows.findIndex((w) => w.ownerName === win.ownerName) === index
                : firstWithName === index;
        });
    })
        .catch(() => []);
};
exports.getWindowsList = getWindowsList;
