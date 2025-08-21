import { Skeleton } from "@mantine/core";

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
