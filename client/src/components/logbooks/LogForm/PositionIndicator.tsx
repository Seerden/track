import type { PropsWithChildren } from "react";
import S from "../LogTemplateForm/style/LogTemplateForm.style"; // TODO: do not forget to extract this whole thing as a badge

// TODO: add this as a new shared badge component
export default function PositionIndicator({ children }: PropsWithChildren) {
	return <S.Badge>{children}</S.Badge>;
}
