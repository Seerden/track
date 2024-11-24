import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/lib/theme/theme";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "../src/index.scss";
import "../src/normalize.css";

const queryClient = new QueryClient();

// TODO: include msw: https://github.com/storybookjs/storybook/issues/12489#issuecomment-702958192

const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Story />
		</ThemeProvider>
	),
	(Story) => (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<Story />
		</QueryClientProvider>
	),
	(Story) => (
		<MantineProvider theme={createTheme(DEFAULT_THEME)}>
			<Story />
		</MantineProvider>
	),
	(Story) => (
		<RecoilRoot>
			<Story />
		</RecoilRoot>
	)
];

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators
};
export default preview;
