import { theme } from "@/lib/style/theme";
import { ThemeProvider } from "@emotion/react";
import "@testing-library/jest-dom/vitest";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

// TODO: this does not contain router provider or query client provider. I'm
// still working on figuring out the best way to set that up.
const WithProviders = ({ children }: { children: ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
	ui: ReactElement<unknown>,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithProviders, ...{ ...(options ?? {}) } });

export * from "@testing-library/react";
export { customRender as render };
