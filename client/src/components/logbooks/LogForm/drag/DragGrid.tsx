import { MultipleContainers } from "@/components/logbooks/LogForm/drag/MultipleContainers";
import { rectSortingStrategy } from "@dnd-kit/sortable";

export default function DragGrid() {
	// TODO: set `columns` in the "templates" container to the number of item
	// templates the user has? might look nice, or maybe do a flex:1 with some
	// max width on the container.
	return <MultipleContainers columns={10} strategy={rectSortingStrategy} vertical />;
}
