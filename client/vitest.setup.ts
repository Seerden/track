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
