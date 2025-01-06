import type { PropsWithChildren } from "react";
import S from "./style/Empty.style";

export default function Empty({ children }: PropsWithChildren) {
	return <S.Empty>{children}</S.Empty>;
}
