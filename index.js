const child_process = require("child_process")
const path = require("path")

function getWindows(onScreenOnly = true) {
  const dir = __dirname;
  const app = path.join(dir, 'scripts/MacWindows');
  return new Promise(resolve => {
    child_process.execFile(app, [ onScreenOnly ], (err, stdout, stderr) => {
      if (!err) {
        resolve(stdout);
      } else {
        console.error(err);
        resolve("{}");
      }
    });
  });
}

function activateWindow(windowName) {
  const dir = __dirname;
  const app = path.join(dir, 'scripts/ActivateWindow');
  return new Promise(resolve => {
    child_process.execFile(app, [ windowName ], (err, stdout, stderr) => {
      if (!err) {
        resolve();
      } else {
        console.error(err);
        resolve();
      }
    });
  })
}


exports.getWindows = function(opts = {}) {
  return getWindows(opts.onScreenOnly)
    .then(data => JSON.parse(data))
    .then((windows = []) => {
      if (opts.includeToolbarWindows) return windows;

      const menubarIndex = windows.findIndex(w => w.name === "Menubar");

      return windows.slice(menubarIndex + 1);
    })
    .then(windows => {
      if (opts.showAllWindows) return windows;

      return windows.filter((win, index) => {
        const firstWithName = windows.findIndex(w => !!w.name && w.ownerName === win.ownerName);
        return firstWithName !== -1 ? firstWithName === index : windows.findIndex(w => w.ownerName === win.ownerName) === index
      });
    })
    .catch(() => []);
}

exports.activateWindow = activateWindow;
