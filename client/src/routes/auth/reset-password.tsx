import { createFileRoute } from "@tanstack/react-router";

// TODO: implementation

export const Route = createFileRoute("/auth/reset-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/auth/reset-password"!</div>;
}
