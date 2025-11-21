import { useEffect, useState } from "react";
import type { ActivityFilterProps } from "@/components/activities/ActivityFilter/ActivityFilter";
import type {
	ActivityFilterTabs,
	ActivityFilterWithValues,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultFilter } from "@/components/activities/ActivityFilter/lib/constants";
import useActivityFilterActions from "@/components/activities/ActivityFilter/useActivityFilterActions";

export default function useActivityFilter({ onChange }: ActivityFilterProps) {
	const [filter, setFilter] = useState<ActivityFilterWithValues>(defaultFilter);
	const [activeTab, setActiveTab] = useState<`${ActivityFilterTabs}`>("name");

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
