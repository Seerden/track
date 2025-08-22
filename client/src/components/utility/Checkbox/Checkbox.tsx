import { colors } from "@/lib/theme/colors";
import Input from "@/lib/theme/input";
import {
	LucideCheckSquare,
	LucideCircle,
	LucideCircleCheckBig,
	LucideSquare,
} from "lucide-react";
import S from "./style/Checkbox.style";

type CheckboxIconProps = {
	size?: number;
};

function CheckboxOn({ size = 27 }: CheckboxIconProps) {
	return (
		<S.Checked>
			<LucideCircleCheckBig className="on" size={size} />
		</S.Checked>
	);
}

function CheckboxOff({ size = 27 }: CheckboxIconProps) {
	return (
		<S.Unchecked>
			<LucideCircle className="off" size={size} />
		</S.Unchecked>
	);
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
	const Icon = props.checked ? CheckboxOn : CheckboxOff;

	return (
		<S.Wrapper>
			<Input.Hidden type="checkbox" {...props} />
			<Icon size={props.size ?? 27} />
		</S.Wrapper>
	);
}

// TODO: get rid of this? This is actually used in NewHabit, for example.
export function CheckboxIcon({
	checked,
	size = 20,
}: {
	checked: boolean;
	size?: number;
}) {
	return checked ? (
		<LucideCheckSquare size={size} color={colors.green.main} />
	) : (
		<LucideSquare size={size} color={colors.yellow.secondary} />
	);
}
