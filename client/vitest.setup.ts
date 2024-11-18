/**
 * I've adapted this slightly from my old jest setup file, so I don't know what
 * does and doesn't _have_ to be in here to work properly. As long as nothing
 * breaks, don't worry about it. Same goes for render-utils.
 */

import { setupServer } from "msw/node";
import "whatwg-fetch";
import { handlers } from "./src/mocks/handlers";

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

expect.extend(matchers);

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

const server = setupServer(...handlers);

global.beforeAll(() => {
	server.listen();
});

global.afterAll(() => {
	server.close();
});

afterEach(() => {
	cleanup();
});

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);