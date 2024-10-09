import { FiCheckCircle } from "react-icons/fi";
import { MdRadioButtonUnchecked } from "react-icons/md";

function CheckboxOn() {
	return <FiCheckCircle className="on" size={25} />;
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
