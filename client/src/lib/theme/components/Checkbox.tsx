import { colors } from "@/lib/theme/colors";
import {
	MdCheckBox,
	MdCheckBoxOutlineBlank,
	MdRadioButtonChecked,
	MdRadioButtonUnchecked
} from "react-icons/md";
import S from "./Checkbox.style";

type CheckboxIconProps = {
	size?: number;
};

function CheckboxOn({ size = 27 }: CheckboxIconProps) {
	return (
		<S.Checked>
			<MdRadioButtonChecked className="on" size={size} />
		</S.Checked>
	);
}

function CheckboxOff({ size = 27 }: CheckboxIconProps) {
	return (
		<S.Unchecked>
			<MdRadioButtonUnchecked className="off" size={size} />
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
