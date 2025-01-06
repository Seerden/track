import Buttons from "@/lib/theme/components/buttons/buttons";
import { LucidePlus } from "lucide-react";
import type { PropsWithChildren } from "react";
import S from "./style/Empty.style";

type EmptyProps = {
	action?: () => void;
};

export default function Empty({ children, action }: PropsWithChildren<EmptyProps>) {
	return (
		<S.Empty>
			{children}
			{!!action && (
				<Buttons.Action.Default $color="themeInverted" onClick={action}>
					<LucidePlus />
				</Buttons.Action.Default>
			)}
		</S.Empty>
	);
}
