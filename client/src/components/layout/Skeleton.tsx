import { Skeleton } from "@mantine/core";

/** Default Skeleton component.
 * @todo expand this and make it a bit more versatile. */
export function DefaultSkeleton() {
	return (
		<>
			<Skeleton width={"40%"} height={25} mb="md" />
			<Skeleton width={"40%"} height={25} mb="md" />
			<Skeleton width={"30%"} height={25} mb="md" />
			<Skeleton width={"60%"} height={25} mb="md" />
			<Skeleton width={"30%"} height={25} mb="md" />
		</>
	);
}
