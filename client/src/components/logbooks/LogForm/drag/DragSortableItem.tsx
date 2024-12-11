import DragItem from "@/components/logbooks/LogForm/drag/DragItem";
import useMountStatus from "@/components/logbooks/LogForm/drag/useMountStatus";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import type { PropsWithChildren } from "react";

interface SortableItemProps {
	containerId: UniqueIdentifier;
	id: UniqueIdentifier;
	index: number;
	style: React.CSSProperties;
	getIndex: (id: UniqueIdentifier) => number;
	wrapperStyle: React.CSSProperties;
}

export default function SortableItem({
	id,
	index,
	wrapperStyle,
	children
}: PropsWithChildren<SortableItemProps>) {
	const { setNodeRef, listeners, isDragging, transform, transition } = useSortable({
		id
	});
	const mounted = useMountStatus();
	const mountedWhileDragging = isDragging && !mounted;

	return (
		<DragItem
			ref={setNodeRef}
			value={id}
			dragging={isDragging}
			index={index}
			wrapperStyle={wrapperStyle}
			color={"deepskyblue"}
			transition={transition}
			transform={transform}
			fadeIn={mountedWhileDragging}
			listeners={listeners}
		>
			{children ? children : null}
		</DragItem>
	);
}
