import ActionButtons from "@/lib/theme/components/buttons/Action";
import CellButtons from "@/lib/theme/components/buttons/Cell";
import { default as _UnstyledButton } from "@/lib/theme/components/buttons/Unstyled";
import Submit from "./buttons/Submit";

const Buttons = {
	Action: ActionButtons,
	Cell: CellButtons,
	Submit,
	Unstyled: _UnstyledButton
};

export default Buttons;
