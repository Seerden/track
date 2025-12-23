import { createFileRoute } from "@tanstack/react-router";
import Today from "@/components/Today/Today";
import { Protected } from "@/components/wrappers";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<Protected>
			<Today />

			<svg
				width="512"
				height="512"
				viewBox="0 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="100%" height="100%" fill="#111" />

				<defs>
					<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stop-color="darkviolet" />
						<stop offset="100%" stop-color="royalblue" />
					</linearGradient>
				</defs>

				<circle
					cx="256"
					cy="256"
					r="128"
					fill="url(#grad)"
					stroke="#eee"
					stroke-width="8"
				/>

				<circle
					cx="256"
					cy="256"
					r="32"
					fill="#111"
					stroke="#eee"
					strokeWidth={6}
				/>
			</svg>
		</Protected>
	);
}
