import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item({ id }: { id: UniqueIdentifier }) {
	return (
		<div
			style={{
				width: "100%",
				height: 50,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "1px solid black",
				margin: "10px 0",
				background: "white"
			}}
		>
			{id}
		</div>
	);
}

export default function SortableItem({ id }: { id: UniqueIdentifier }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Item id={id} />
		</div>
	);
}
