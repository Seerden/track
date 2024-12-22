import type { Field, ItemTemplate } from "@t/data/logbook.types";
import { LucideSquare, LucideSquareStack } from "lucide-react";
import S from "./style/MiniItemTemplate.style";

type ItemTemplateWithFields = ItemTemplate & { fields: Field[] };

type MiniItemTemplateProps = {
	itemTemplate: ItemTemplateWithFields;
};

export default function MiniItemTemplate({
	itemTemplate,
	variant
}: MiniItemTemplateProps & { variant: "collapsed" | "expanded" }) {
	return (
		<S.Wrapper>
			<S.Header>
				<S.Title>{itemTemplate.name}</S.Title>
				<S.Standalone
					title={
						itemTemplate.standalone
							? "Each log can only have one of this item"
							: "Each log can have more than one of this item"
					}
				>
					{itemTemplate.standalone ? <LucideSquare /> : <LucideSquareStack />}{" "}
				</S.Standalone>
			</S.Header>
			{variant === "expanded" && (
				<S.Description>{itemTemplate.description}</S.Description>
			)}
			<S.ChipList>
				{itemTemplate.fields.map((field) => (
					<ItemFieldChip
						key={field.field_template_id}
						field={field}
						variant={variant}
					/>
				))}
			</S.ChipList>
		</S.Wrapper>
	);
}

type ItemFieldChipProps = {
	field: Field;
	variant: "collapsed" | "expanded";
};

function ItemFieldChip({ field, variant }: ItemFieldChipProps) {
	const expanded = variant !== "collapsed";

	return (
		<S.Chip>
			<span>
				{field.name}
				{!expanded && field.unit && ` (${field.unit})`}
			</span>
			{expanded && (
				<S.FieldMeta>
					{field.unit && <span>unit: {field.unit}</span>}
					<span>type: {field.value_type}</span>
				</S.FieldMeta>
			)}
		</S.Chip>
	);
}
