import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: ["./test/index.test.ts"],
		globals: true,
	},
});
