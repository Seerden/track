import { useEffect } from "react";
import useNotesQuery from "../../lib/use-notes-query";

export default function useNotes() {
	const { data } = useNotesQuery();

	useEffect(() => {
		console.log({ data });
	}, [data]);

	return {
		data,
	};
}
