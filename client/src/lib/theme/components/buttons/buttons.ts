import ActionButtons from "@/lib/theme/components/buttons/Action";
import CellButtons from "@/lib/theme/components/buttons/Cell";
import LinkButtons from "@/lib/theme/components/buttons/Link";
import SubmitButtons from "@/lib/theme/components/buttons/Submit";
import UnstyledButton from "@/lib/theme/components/buttons/Unstyled";

// TODO: this will replace ./index.ts, I don't like barrel files

const Buttons = {
	Action: ActionButtons,
	Cell: CellButtons,
	Link: LinkButtons,
	Submit: SubmitButtons,
	Unstyled: UnstyledButton
};

export default Buttons;
