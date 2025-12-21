import { isNullish } from "@shared/lib/is-nullish";
import { createContext, type PropsWithChildren, use } from "react";
import useNewHabit from "@/components/habits/HabitForm/useNewHabit";

const HabitFormContext = createContext<ReturnType<typeof useNewHabit> | null>(
	null
);

export function HabitFormProvider({ children }: PropsWithChildren) {
	const context = useNewHabit();

	return <HabitFormContext value={context}>{children}</HabitFormContext>;
}

export function useHabitFormContext() {
	const context = use(HabitFormContext);

	if (isNullish(context)) {
		throw new Error("ProductFormContext is null");
	}

	return context;
}
