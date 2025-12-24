import { useTheme } from "@emotion/react";
import type { MainTheme } from "@/lib/style/theme";
import S from "./Logo.style";

export function LogoSvg() {
	const theme = useTheme() as MainTheme;

	return (
		<S.Svg
			xmlns="http://www.w3.org/2000/svg"
			width="36"
			height="36"
			viewBox="0 0 512 512"
		>
			<defs>
				<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="darkviolet" />
					<stop offset="100%" stop-color="royalblue" />
				</linearGradient>

				<mask id="cut-hole">
					<rect width="100%" height="100%" fill="white" />
					<circle cx="256" cy="256" r="48" fill="black" />
				</mask>
			</defs>

			<circle
				cx="256"
				cy="256"
				r="196"
				fill="url(#grad)"
				mask="url(#cut-hole)"
			/>

			<circle
				cx="256"
				cy="256"
				r="196"
				fill="none"
				stroke={theme.colors.background.main[3]}
				stroke-width="8"
			/>

			<circle
				cx="256"
				cy="256"
				r="48"
				fill="none"
				stroke={theme.colors.background.main[3]}
				stroke-width="8"
			/>
		</S.Svg>
	);
}
