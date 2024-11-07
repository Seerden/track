import type { PropsWithChildren } from "react";
import E from "./style/Empty.style";

export default function Empty({ children }: PropsWithChildren) {
	return <E.Empty>{children}</E.Empty>;
}
