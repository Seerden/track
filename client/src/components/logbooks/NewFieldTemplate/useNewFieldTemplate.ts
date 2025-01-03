import type { NewFieldTemplate } from "@shared/types/data/logbook.new.types";
import type { ID } from "@shared/types/data/utility.types";
import { useState } from "react";

export default function useNewFieldTemplate({
	position,
	logbook_id
}: {
	position: number;
	logbook_id: ID;
}) {
	const [fieldTemplate, setFieldTemplate] = useState<NewFieldTemplate>({
		name: "",
		description: null,
		unit: null,
		value_type: "text",
		logbook_id,
		position,
		required: true
	});

	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) {
		setFieldTemplate((current) => {
			return {
				...current,
				[e.target.name]:
					e.target.type === "checkbox" ? e.target.checked : e.target.value
			};
		});
	}

	return {
		fieldTemplate,
		handleInputChange
	};
}
