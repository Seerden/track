import type { ItemTemplate } from "@shared/types/data/logbook.types";
import type { ID } from "@shared/types/data/utility.types";
import S from "./style/_shared.style";

type LogSectionSelectorProps = {
	itemTemplates: ItemTemplate[];
	onChange(item_template_id: ID): void;
};

/** Renders buttons for all not-yet-displayed itemTemplates in the log. Clicking
 * one of the buttons adds the corresponding itemTemplate to the log's layout. */
export default function LogSectionSelector({
	itemTemplates,
	onChange
}: LogSectionSelectorProps) {
	if (!itemTemplates.length) return null;

	return (
		<S.SelectorWrapper>
			{itemTemplates.map((template) => (
				<S.SelectorButton
					key={template.item_template_id}
					onClick={() => onChange(template.item_template_id)}
				>
					{template.name}
				</S.SelectorButton>
			))}
		</S.SelectorWrapper>
	);
}
