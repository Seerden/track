module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	testEnvironment: "jsdom",
	moduleDirectories: ["node_modules", "src"],
	setupFilesAfterEnv: ["./setupJest.js"],
	transform: {
		"node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
	},
	transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
