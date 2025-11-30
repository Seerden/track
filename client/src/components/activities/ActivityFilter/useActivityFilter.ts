import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { ActivityFilterProps } from "@/components/activities/ActivityFilter/ActivityFilter";
import type {
	ActivityFilterState,
	Tabs,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultActivityFilter } from "@/components/activities/ActivityFilter/lib/constants";
import useActivityFilterActions from "@/components/activities/ActivityFilter/useActivityFilterActions";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { trpc } from "@/lib/trpc";

export default function useActivityFilter({ onChange }: ActivityFilterProps) {
	const [filter, setFilter] = useState<ActivityFilterState>(
		defaultActivityFilter
	);
	const [activeTab, setActiveTab] = useState<`${Tabs}`>("name");

	// TODO: these are the queries we use in useTagFilter. Since we refactored
	// the tag filter out of this hook, we check here for suspension state. Won't
	// be a thing anymore if we ever switch to Start.
	const { isPending: tagsQueryPending } = useQueryTags();
	const { isPending: tagsTreeQueryPending } = useQuery(
		trpc.tags.tree.queryOptions()
	);
	const isProbablySuspended = tagsQueryPending || tagsTreeQueryPending;

	useEffect(() => {
		onChange(filter);
	}, [onChange, filter]);

	const actions = useActivityFilterActions(setFilter);

	if (isProbablySuspended) return { isProbablySuspended };

	return {
		isProbablySuspended,
		filter,
		actions,
		activeTab,
		setActiveTab,
	};
}
