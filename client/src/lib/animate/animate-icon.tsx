import styled from "@emotion/styled";
import { interpolate } from "flubber";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Icon, type IconNode, type LucideIcon } from "lucide-react";
import { isValidElement, useEffect, useState } from "react";
import Buttons from "@/lib/theme/components/buttons";
import { getPathFromIcon } from "./icon-to-path";

const duration: number = 0.1;

const StyledButton = styled(Buttons.Unstyled)`
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  width: max-content;
  height: max-content;
  
  transition: background-color ${duration} ease, color ${duration} ease;

  color: red;
  .lucide {
      color: orange;
  }
`;

export const AnimatedIcon = ({
	one: IconOne,
	two: IconTwo,
}: {
	one: LucideIcon | IconNode;
	two: LucideIcon | IconNode;
}) => {
	console.log({ IconOne, IconTwo });
	const [two, setTwo] = useState(false);

	const iconOneElement = isValidElement(IconOne) ? (
		IconOne
	) : (
		<Icon iconNode={IconOne as IconNode} />
	);
	const iconTwoElement = isValidElement(IconTwo) ? (
		IconTwo
	) : (
		<Icon iconNode={IconTwo as IconNode} />
	);

	// 1. Get paths (No 'any', these are strictly typed from our utility)
	const pathOne = getPathFromIcon(iconOneElement);
	const pathTwo = getPathFromIcon(iconTwoElement);

	// 2. Motion Values
	const progress = useMotionValue(0);

	// 3. Interpolate using Flubber
	const path = useTransform(progress, [0, 1], [pathOne, pathTwo], {
		mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.5 }),
	});

	// 4. Animation Logic
	useEffect(() => {
		const controls = animate(progress, two ? 1 : 0, {
			duration,
			ease: "easeInOut",
		});
		return () => controls.stop();
	}, [two, progress]);

	return (
		<StyledButton onClick={() => setTwo(!two)}>
			<motion.svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				transition={{ duration, ease: "easeIn" }}
			>
				<motion.path d={path} />
			</motion.svg>
		</StyledButton>
	);
};
