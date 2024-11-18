import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { queryClient } from "../query-client";
import { theme } from "../theme/theme";

const WithProviders = ({ children }: { children: ReactNode }) => {
	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<MemoryRouter>
					<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
				</MemoryRouter>
			</ThemeProvider>
		</RecoilRoot>
	);
};

const customRender = (
	ui: ReactElement<unknown>,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithProviders, ...{ ...(options ?? {}) } });

export * from "@testing-library/react";
export { customRender as render };
