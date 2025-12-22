import { createContext, type PropsWithChildren, use } from "react";
import useHabitForm, {
	type UseHabitFormArgs,
} from "@/components/habits/HabitForm/useHabitForm";

export const HabitFormContext = createContext<ReturnType<
	typeof useHabitForm
> | null>(null);

export function HabitFormProvider({
	children,
	editing,
	habit,
}: PropsWithChildren<UseHabitFormArgs>) {
	const context = useHabitForm({ editing, habit } as UseHabitFormArgs);

	return <HabitFormContext value={context}>{children}</HabitFormContext>;
}

export function useHabitFormContext() {
	const context = use(HabitFormContext);

	if (context === null) {
		throw new Error("HabitFormContext is null");
	}

	return context;
}
