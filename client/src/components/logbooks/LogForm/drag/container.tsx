import type { UniqueIdentifier } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "./sortable_item";

const containerStyle = {
	background: "#dadada",
	padding: 10,
	margin: 10,
	flex: 1
};

type ContainerProps = {
	id: string;
	items: UniqueIdentifier[];
};

export default function Container({ id, items }: ContainerProps) {
	const { setNodeRef } = useDroppable({
		id
	});

	return (
		<SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
			<div ref={setNodeRef} style={containerStyle}>
				{items.map((id) => (
					<SortableItem key={id} id={id} />
				))}
			</div>
		</SortableContext>
	);
}
