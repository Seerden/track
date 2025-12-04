import { useMediaQuery } from "@mantine/hooks";

export function useBreakpoints() {
	const isMobileWidth = useMediaQuery("(width < 880px)");

	return {
		isMobileWidth,
	} as const;
}
