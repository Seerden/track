import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import Page from "@/lib/framer/components/Page";
import { DefaultSkeleton } from "../layout/Skeleton";

/**
 * Simple wrapper that provides a default fallback to components that we want
 * to suspend. Don't use this if we want to use a more fine-tuned fallback.
 */
export default function Suspended(props: PropsWithChildren) {
	return (
		<Suspense
			fallback={
				<Page>
					<DefaultSkeleton />
				</Page>
			}>
			{props.children}
		</Suspense>
	);
}
