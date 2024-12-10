import type { UniqueIdentifier } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./sortable_item";

type ContainerProps = {
	id: string;
	items: UniqueIdentifier[];
};

export default function Container({ id, items }: ContainerProps) {
	const { setNodeRef } = useDroppable({
		id
	});

	return (
		<SortableContext id={id} items={items} strategy={rectSortingStrategy}>
			<div
				ref={setNodeRef}
				style={{
					backgroundColor: "#dadada",
					padding: "1rem",
					margin: "1rem",
					display: "flex",
					flexDirection: "row",
					minHeight: "calc(50px + 4rem)",
					gap: "1rem"
				}}
			>
				{items.map((id) => (
					<SortableItem key={id} id={id} />
				))}
			</div>
		</SortableContext>
	);
}
