/**
 * I've adapted this slightly from my old jest setup file, so I don't know what
 * does and doesn't _have_ to be in here to work properly. As long as nothing
 * breaks, don't worry about it. Same goes for render-utils.
 */

import { setupServer } from "msw/node";
import "whatwg-fetch";

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { handlers } from "./src/mocks/handlers";

expect.extend(matchers);

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

const server = setupServer(...handlers);

beforeAll(() => {
	server.listen();
});

afterAll(() => {
	server.close();
});

afterEach(() => {
	cleanup();
});
