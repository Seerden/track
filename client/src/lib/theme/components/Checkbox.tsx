import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

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
