import day from "@/lib/dayjs";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { FloatingArrow } from "@floating-ui/react";
import { useState } from "react";
import S from "./style/shared.style";

export default function DayOfWeekSelector() {
	const [isOpen, setIsOpen] = useState(false);
	const float = useFloatingProps({
		click: {},
		open: isOpen,
		setOpen: setIsOpen
	});

	const weekdayLabels = day.weekdays().map((day) => day[0]);

	return (
		<>
			<S.Trigger ref={float.refs.setReference} {...float.getReferenceProps()}>
				pick days of week
			</S.Trigger>

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
						<div style={{ display: "flex", flexDirection: "row" }}>
							{weekdayLabels.map((label) => (
								<div
									key={label}
									style={{ display: "flex", flexDirection: "row" }}
								>
									<S.Cell key={label}>{label}</S.Cell>
								</div>
							))}
						</div>
					</S.FloatingWrapper>
				</>
			)}
		</>
	);
}
