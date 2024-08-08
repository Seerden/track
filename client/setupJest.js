/* eslint-disable @typescript-eslint/no-var-requires */
const { setupServer } = require("msw/node");
const { handlers } = require("./src/mocks/handlers.ts");

require("whatwg-fetch");

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

const server = setupServer(...handlers);

global.beforeAll(() => {
	server.listen();
});

global.afterAll(() => {
	server.close();
});
