import { execFile } from "node:child_process";
import { join } from "node:path";

interface Window {
	name?: string;
	ownerName: string;
	[key: string]: any;
}

interface GetWindowsOptions {
	onScreenOnly?: boolean;
	showAllWindows?: boolean;
}

function getWindows(onScreenOnly: boolean = true): Promise<string> {
	const dir = __dirname;
	const app = join(dir, "../scripts/MacWindows");
	return new Promise((resolve) => {
		execFile(app, [onScreenOnly.toString()], (err, stdout) => {
			if (err) {
				resolve(String(err));
			} else {
				resolve(stdout);
			}
		});
	});
}

function activateWindow(windowName: string): Promise<void> {
	const dir = __dirname;
	const app = join(dir, "../scripts/ActivateWindow");
	return new Promise((resolve, reject) => {
		execFile(app, [windowName], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

export const getWindowsList = (
	opts: GetWindowsOptions = {},
): Promise<Window[]> => {
	return getWindows(opts.onScreenOnly ?? true)
		.then((data) => JSON.parse(data))
		.then((windows: Window[] = []) => {
			if (opts.showAllWindows) {
				return windows;
			}

			return windows.filter((win, index) => {
				const firstWithName = windows.findIndex(
					(w) => w.name && w.ownerName === win.ownerName,
				);
				return firstWithName === -1
					? windows.findIndex((w) => w.ownerName === win.ownerName) === index
					: firstWithName === index;
			});
		})
		.catch(() => []);
};

export { activateWindow };
