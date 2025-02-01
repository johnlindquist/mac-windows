import { getWindowsList, activateWindow } from "./index";

async function main() {
	const windows = await getWindowsList();
	console.log(windows);

	await activateWindow("Finder");
	console.log("Activated");
}

main().catch(console.error);
