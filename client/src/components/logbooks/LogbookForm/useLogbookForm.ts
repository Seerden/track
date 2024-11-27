import type { NewLogbook } from "@t/data/logbook.new.types";
import { useState } from "react";

export default function useLogbookForm() {
	const { mutate } = useMutateNewLogbook();
	const [logbook, setLogbook] = useState<NewLogbook>({
		description: null,
		name: "",
		user_id: -1
	});

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLogbook((current) => ({
			...current,
			[e.target.name]: e.target.value
		}));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {}
}
