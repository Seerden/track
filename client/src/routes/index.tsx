import { DefaultSkeleton } from "@/components/layout/Skeleton";
import Today from "@/components/Today/Today";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Today,
	pendingComponent: () => {
		return (
			<>
				<div
					style={{
						padding: "3rem",
						width: "100%"
					}}
				>
					<DefaultSkeleton />
				</div>
			</>
		);
	}
});
