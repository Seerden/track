import { useEffect, useState } from "react";

// @note this is from the dnd-kit example
export default function useMountStatus() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500);

		return () => clearTimeout(timeout);
	}, []);

	return isMounted;
}