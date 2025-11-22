import { useEffect, useState } from "react";
import type { ActivityFilterProps } from "@/components/activities/ActivityFilter/ActivityFilter";
import type {
	ActivityFilterState,
	Tabs,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultActivityFilter } from "@/components/activities/ActivityFilter/lib/constants";
import useActivityFilterActions from "@/components/activities/ActivityFilter/useActivityFilterActions";

export default function useActivityFilter({ onChange }: ActivityFilterProps) {
	const [filter, setFilter] = useState<ActivityFilterState>(
		defaultActivityFilter
	);
	const [activeTab, setActiveTab] = useState<`${Tabs}`>("name");

	// TODO: fix this up after finishing the new tag filter.
	const isProbablySuspended = false;

	useEffect(() => {
		onChange(filter);
	}, [filter, onChange]);

	const actions = useActivityFilterActions({
		setFilter,
	});

	if (isProbablySuspended) return { isProbablySuspended };

	return {
		isProbablySuspended,
		filter,
		actions,
		activeTab,
		setActiveTab,
	};
}
