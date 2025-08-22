import { createFileRoute } from "@tanstack/react-router";
import Today from "@/components/Today/Today";

export const Route = createFileRoute("/")({
	component: Today
});
