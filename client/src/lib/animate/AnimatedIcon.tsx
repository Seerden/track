import { interpolate } from "flubber";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { LucideInfinity } from "lucide-react";
import { type JSX, useEffect } from "react";
import { getPathFromIcon } from "./icon-to-path";
import S from "./style/AnimatedIcon.style";

type AnimatedIconProps = {
	off: JSX.Element;
	on: JSX.Element;
	/** Optionally transition to an intermediate icon between `one` and `two`. */
	intermediate?: JSX.Element | null;
	/** when truthy, `two` is rendered, when falsy, `one */
	state: boolean;
	/** icon size in pixels. */
	size?: number;
	/** icon morph duration */
	duration?: number;
};

export const AnimatedIcon = ({
	off,
	on,
	intermediate = <LucideInfinity />,
	state,
	size,
	duration = 0.25,
}: AnimatedIconProps) => {
	const progress = useMotionValue(0);

	const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1]);

	const path = useTransform(
		progress,
		intermediate ? [0, 0.5, 1] : [0, 1],
		intermediate
			? [
					getPathFromIcon(off),
					getPathFromIcon(intermediate),
					getPathFromIcon(on),
				]
			: [getPathFromIcon(<>{off}</>), getPathFromIcon(<>{on}</>)],
		{
			mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.2 }),
		}
	);

	useEffect(() => {
		const controls = animate(progress, state ? 1 : 0, {
			duration,
			ease: "easeOut",
		});
		return () => controls.stop();
	}, [state, progress]);

	return (
		<S.Wrapper transition={{ duration, ease: "easeInOut" }}>
			<S.Svg
				width={size}
				height={size}
				// note: this viewbox is what lucide uses by default to render svgs.
				// Don't mess with it, instead, set `width` and `height` to scale
				// the svg to the desired size.
				viewBox={`0 0 24 24`}
				style={{ scale }}
				transition={{ duration, ease: "easeInOut" }}
			>
				<motion.path d={path} />
			</S.Svg>
		</S.Wrapper>
	);
};
