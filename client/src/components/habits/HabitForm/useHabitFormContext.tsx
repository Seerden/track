import { createContext, type PropsWithChildren, use } from "react";
import useNewHabit, {
	type UseNewHabitArgs,
} from "@/components/habits/HabitForm/useNewHabit";

export const HabitFormContext = createContext<ReturnType<
	typeof useNewHabit
> | null>(null);

export function HabitFormProvider({
	children,
	editing,
	habit,
}: PropsWithChildren<UseNewHabitArgs>) {
	const context = useNewHabit({ editing, habit } as UseNewHabitArgs);

	return <HabitFormContext value={context}>{children}</HabitFormContext>;
}

export function useHabitFormContext() {
	const context = use(HabitFormContext);

	if (context === null) {
		throw new Error("HabitFormContext is null");
	}

	return context;
}
