import Today from "@/components/Today/Today";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today")({
	component: Today
});
