import { useLayoutEffect } from "react";

export default function useInitialRenderDuration() {
	useLayoutEffect(() => {
		const startTime = new Date();
		return () => {
			const endTime = new Date();
			const timeRenderedMs = endTime.valueOf() - startTime.valueOf();
			console.log({ timeRenderedMs });
		};
	}, []);
}
