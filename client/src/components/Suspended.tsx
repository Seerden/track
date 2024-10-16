import Page from "@lib/framer/components/Page";
import type { PropsWithChildren} from "react";
import { Suspense } from "react";

/**
 * Simple wrapper that provides a default fallback to components that we want
 * to suspend. Don't use this if we want to use a more fine-tuned fallback.
 */
export default function Suspended(props: PropsWithChildren) {
	return <Suspense fallback={<Page>Loading...</Page>}>{props.children}</Suspense>;
}
