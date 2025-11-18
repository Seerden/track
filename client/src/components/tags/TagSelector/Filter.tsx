import { LucideX } from "lucide-react";
import type { FocusEvent, MouseEvent } from "react";
import Input from "@/lib/theme/input";
import S from "./style/TagSelector.style";

export function Filter({
	filter,
	updateFilter,
	clearFilter,
	onFocus,
	hasAutoFocus,
}: {
	filter: string;
	updateFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
	clearFilter: (e: MouseEvent<HTMLButtonElement>) => void;
	onFocus?: <T>(e?: FocusEvent<T>) => void;
	hasAutoFocus?: boolean;
}) {
	return (
		<S.FilterWrapper>
			<Input.Filter
				onFocus={(e) => onFocus?.(e)}
				autoFocus={hasAutoFocus}
				type="text"
				placeholder="search tags"
				value={filter}
				onChange={updateFilter}
			/>
			<S.ClearFilter
				type="button"
				onClick={clearFilter}
				$color="orangered"
				$interactionColor="tomato"
			>
				<LucideX size={15} />
			</S.ClearFilter>
		</S.FilterWrapper>
	);
}
