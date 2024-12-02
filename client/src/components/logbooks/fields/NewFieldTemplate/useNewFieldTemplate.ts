import type { NewFieldTemplate } from "@t/data/logbook.new.types";
import type { ID } from "@t/data/utility.types";
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

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, type, value, checked } = e.target;

		setFieldTemplate((current) => {
			return {
				...current,
				[name]: type === "checkbox" ? checked : value
			};
		});
	}

	return {
		fieldTemplate,
		handleInputChange
	};
}
