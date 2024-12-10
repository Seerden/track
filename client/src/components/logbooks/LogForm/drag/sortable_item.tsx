import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import type { Transform } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

const initialStyles = {
	x: 0,
	y: 0,
	scale: 1
};

export function Item({
	id,
	isOverlay,
	isDragging,
	transform
}: {
	id: UniqueIdentifier;
	isDragging?: boolean;
	isOverlay?: boolean;
	transform: Transform | null;
}) {
	return (
		<motion.div
			style={{
				opacity: isDragging ? "0.5" : "1",
				width: "200px",
				minHeight: "50px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: isDragging ? "none" : "1px solid black",
				margin: "10px 0",
				background: "white",
				...initialStyles
			}}
			layoutId={String(id)}
			animate={
				transform
					? {
							x: transform.x,
							y: transform.y,
							scale: isDragging ? 1.05 : 1,
							zIndex: isDragging ? 2 : isOverlay ? 1 : 0,
							boxShadow: isDragging
								? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
								: undefined
						}
					: initialStyles
			}
			transition={{
				duration: !isDragging ? 0.25 : 0,
				easings: {
					type: "spring"
				},
				scale: {
					duration: 0.25
				},
				zIndex: {
					delay: isDragging ? 0 : 0.25
				}
			}}
		>
			{id}
		</motion.div>
	);
}

export default function SortableItem({ id }: { id: UniqueIdentifier }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
		id,
		transition: null
	});

	return (
		<div ref={setNodeRef} {...attributes} {...listeners}>
			<Item id={id} isDragging={isDragging} transform={transform} />
		</div>
	);
}
