import { colors } from "@/lib/theme/colors";
import {
	MdCheckBox,
	MdCheckBoxOutlineBlank,
	MdRadioButtonChecked,
	MdRadioButtonUnchecked
} from "react-icons/md";
import S from "./Checkbox.style";

function CheckboxOn() {
	return (
		<S.Checked>
			<MdRadioButtonChecked className="on" size={27} />
		</S.Checked>
	);
}

function CheckboxOff() {
	return (
		<S.Unchecked>
			<MdRadioButtonUnchecked className="off" size={27} />
		</S.Unchecked>
	);
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
	const Icon = props.checked ? CheckboxOn : CheckboxOff;

	return (
		<S.Wrapper>
			<input
				type="checkbox"
				{...props}
				style={{
					width: 0,
					opacity: 0,
					...props.style
				}}
			/>
			<Icon />
		</S.Wrapper>
	);
}

// TODO: get rid of this
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
