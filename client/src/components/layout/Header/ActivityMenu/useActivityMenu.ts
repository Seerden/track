import useFloatingProps from "@/lib/hooks/useFloatingProps";

export default function useActivityMenu() {
	const float = useFloatingProps({ click: {}, hover: {} });

	return {
		float
	};
}
