import { colors } from "@/lib/theme/colors";
import {
	MdCheckBox,
	MdCheckBoxOutlineBlank,
	MdRadioButtonChecked,
	MdRadioButtonUnchecked
} from "react-icons/md";

function CheckboxOn() {
	return <MdRadioButtonChecked className="on" size={27} />;
}

function CheckboxOff() {
	return <MdRadioButtonUnchecked className="off" size={27} />;
}

type CheckboxProps = {
	checked?: boolean;
};

export function Checkbox({ checked }: CheckboxProps) {
	return checked ? <CheckboxOn /> : <CheckboxOff />;
}

export function CheckboxIcon({
	checked,
	size = 20
}: {
	checked: boolean;
	size?: number;
}) {
	return checked ? (
		<MdCheckBox size={size} color={colors.green.main} />
	) : (
		<MdCheckBoxOutlineBlank size={size} color={colors.yellow.secondary} />
	);
}
