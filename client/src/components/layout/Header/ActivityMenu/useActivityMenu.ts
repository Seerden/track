import useFloatingProps from "@/lib/hooks/useFloatingProps";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function useActivityMenu() {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		// reset menu state after location change
		// TODO: ideally we'd only close the menu state if the route actually
		// changes, but that logic is a bit more complex and it's not a priority
		// yet.
		setOpen(false);
	}, [location]);
	const float = useFloatingProps({ click: {}, hover: {}, open, setOpen });

	return {
		float,
	};
}
