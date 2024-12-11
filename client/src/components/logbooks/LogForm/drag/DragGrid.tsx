import { MultipleContainers } from "@/components/logbooks/LogForm/drag/MultipleContainers";
import { rectSortingStrategy } from "@dnd-kit/sortable";

export default function DragGrid() {
	return (
		<MultipleContainers
			columns={2}
			itemCount={5}
			strategy={rectSortingStrategy}
			vertical
		/>
	);
}
