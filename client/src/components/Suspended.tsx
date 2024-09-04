import { PropsWithChildren, Suspense } from "react";
import Page from "../lib/framer/components/Page";

/**
 * Simple wrapper that provides a default fallback to components that we want
 * to suspend. Don't use this if we want to use a more fine-tuned fallback.
 */
export default function Suspended(props: PropsWithChildren) {
	return <Suspense fallback={<Page>Loading...</Page>}>{props.children}</Suspense>;
}
