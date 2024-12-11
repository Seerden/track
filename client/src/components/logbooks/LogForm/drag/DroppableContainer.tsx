import { Container } from "@/components/logbooks/LogForm/drag/DragContainer";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { AnimateLayoutChanges } from "@dnd-kit/sortable";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ContainerProps = {
	children: React.ReactNode;
	columns?: number;
	label?: string;
	style?: React.CSSProperties;
	horizontal?: boolean;
	hover?: boolean;
	shadow?: boolean;
	onClick?(): void;
};

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export default function DroppableContainer({
	children,
	columns = 1,
	id,
	items,
	style,
	...props
}: ContainerProps & {
	id: UniqueIdentifier;
	items: UniqueIdentifier[];
	style?: React.CSSProperties;
}) {
	const { active, isDragging, over, setNodeRef, transition, transform } = useSortable({
		id,
		animateLayoutChanges
	});
	const isOverContainer = over
		? (id === over.id && active?.data.current?.type !== "container") ||
			items.includes(over.id)
		: false;

	return (
		<Container
			ref={setNodeRef}
			style={{
				...style,
				transition,
				transform: CSS.Translate.toString(transform),
				opacity: isDragging ? 0.5 : undefined
			}}
			hover={isOverContainer}
			columns={columns}
			{...props}
		>
			{children}
		</Container>
	);
}
