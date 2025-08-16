import { useState } from "react";

/** Small wrappen for boolean states that returns a toggle function, too. */
export function useToggle(initial: boolean) {
	const [value, setValue] = useState<boolean>(initial);

	function toggle() {
		setValue((cur) => !cur);
	}

	return [[value, setValue], toggle] as const;
}
