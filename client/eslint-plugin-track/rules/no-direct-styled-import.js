module.exports = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Disallow named exports in .style.ts files",
			category: "Best Practices",
			recommended: false
		},
		messages: {
			noNamedExports:
				"Named exports of styled components are not allowed in .style.ts files. Use a single default export for styled components instead."
		}
	},
	create(context) {
		return {
			ExportNamedDeclaration(node) {
				// Check if the file has a .style.ts extension
				const filename = context.getFilename();

				if (!filename.endsWith(".style.ts")) {
					return;
				}

				// Check if the named export is a styled component
				node.declaration.declarations.forEach((declaration, index) => {
					if (declaration?.init?.tag?.object?.name === "styled") {
						context.report({
							node,
							messageId: "noNamedExports"
						});
					}
				});
			}
		};
	}
};
