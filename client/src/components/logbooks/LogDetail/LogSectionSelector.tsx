import type { ItemTemplate } from "@t/data/logbook.types";
import type { ID } from "@t/data/utility.types";

type LogSectionSelectorProps = {
	itemTemplates: ItemTemplate[];
	onChange(item_template_id: ID): void;
};

// TODO: finish this component
export default function LogSectionSelector({
	itemTemplates,
	onChange
}: LogSectionSelectorProps) {
	return (
		<div>
			{itemTemplates.map((template) => (
				// TODO: make these share the same style as the buttons in
				// ItemSelector.
				<button
					type="button"
					onClick={() => onChange(template.item_template_id)}
					key={template.item_template_id}
				>
					{template.name}
				</button>
			))}
		</div>
	);
}
