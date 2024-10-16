module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "eslint-plugin-react-compiler"],
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			alias: {
				map: [
					["components", "src/components"],
					["hooks", "src/hooks"],
				],
			},
		},
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react-compiler/react-compiler": "error",
		"@typescript-eslint/consistent-type-imports": "error",
	},
	overrides: [
		{
			files: ["**/*.js?(x)", "**/*.ts?(x)"],
			rules: {
				"react-hooks/exhaustive-deps": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"no-unused-vars": "off",
				"react/display-name": "off",
				"react/no-unescaped-entities": "off",
				"react/prop-types": "off",
			},
		},
	],
};
