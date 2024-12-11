import { Item } from "@/components/logbooks/LogForm/drag/DragItem";
import useMountStatus from "@/components/logbooks/LogForm/drag/useMountStatus";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

interface SortableItemProps {
	containerId: UniqueIdentifier;
	id: UniqueIdentifier;
	index: number;
	style: React.CSSProperties;
	getIndex(id: UniqueIdentifier): number;
	wrapperStyle: React.CSSProperties;
}

export default function SortableItem({ id, index, wrapperStyle }: SortableItemProps) {
	const { setNodeRef, listeners, isDragging, isSorting, transform, transition } =
		useSortable({
			id
		});
	const mounted = useMountStatus();
	const mountedWhileDragging = isDragging && !mounted;

	return (
		<Item
			ref={setNodeRef}
			value={id}
			dragging={isDragging}
			sorting={isSorting}
			index={index}
			wrapperStyle={wrapperStyle}
			color={"deepskyblue"}
			transition={transition}
			transform={transform}
			fadeIn={mountedWhileDragging}
			listeners={listeners}
		/>
	);
}
