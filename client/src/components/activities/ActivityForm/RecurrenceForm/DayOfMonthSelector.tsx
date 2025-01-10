/*
   TODO
   - by default, select the start date of the activity
   - if the activity is multiday, there has to be a gap between possible
     selected days at least equal to the length of the activity in days.
*/

import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { FloatingArrow } from "@floating-ui/react";
import { useState } from "react";
import S from "./style/shared.style";

export default function DayOfMonthSelector() {
	const [isOpen, setIsOpen] = useState(false);

	const float = useFloatingProps({
		click: {},
		open: isOpen,
		setOpen: setIsOpen
	});

	// Cells for 31 days of the month. 1 row per 7 days.
	const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1).reduce((acc, day) => {
		if (!((day - 1) % 7)) {
			acc.push([day]);
		} else {
			acc.at(-1)?.push(day);
		}
		return acc;
	}, [] as number[][]);

	return (
		<>
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				pick days of month
			</S.Trigger>

			{/* TODO: 
            - implement each cell as a button
            - pass handler to each button */}
			{isOpen && (
				<>
					<S.FloatingWrapper
						ref={float.refs.setFloating}
						style={{
							...float.floatingStyles
						}}
						{...float.getFloatingProps()}
					>
						<FloatingArrow
							ref={float.arrowRef}
							context={float.context}
							fill="#ccc"
							width={15}
							height={5}
							style={{
								marginBottom: "2px"
							}}
						/>
						{daysOfMonth.map((week, i) => (
							<div key={i} style={{ display: "flex", flexDirection: "row" }}>
								{week.map((day) => (
									<S.Cell key={day}>{day}</S.Cell>
								))}
							</div>
						))}
					</S.FloatingWrapper>
				</>
			)}
		</>
	);
}
