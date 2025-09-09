import {
	LucideCheckSquare,
	LucideCircle,
	LucideCircleCheckBig,
	type LucideIcon,
	LucideSquare,
} from "lucide-react";
import { colors } from "@/lib/theme/colors";
import Input from "@/lib/theme/input";
import S from "./style/Checkbox.style";

type CheckboxIconProps = {
	size?: number;
	Icon?: LucideIcon;
};

function CheckboxOn({
	size = 27,
	Icon = LucideCircleCheckBig,
}: CheckboxIconProps) {
	return (
		<S.Checked>
			<Icon className="on" size={size} />
		</S.Checked>
	);
}

function CheckboxOff({ size = 27, Icon = LucideCircle }: CheckboxIconProps) {
	return (
		<S.Unchecked>
			<Icon className="off" size={size} />
		</S.Unchecked>
	);
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
	IconOn,
	IconOff,
	...props
}: CheckboxProps & {
	IconOn?: LucideIcon;
	IconOff?: LucideIcon;
}) {
	const Icon = props.checked ? CheckboxOn : CheckboxOff;

	return (
		<S.Wrapper>
			<Input.Hidden type="checkbox" {...props} />
			<Icon size={props.size ?? 27} Icon={props.checked ? IconOn : IconOff} />
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
