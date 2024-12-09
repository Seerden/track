import { colors } from "@/lib/theme/colors";
import {
	LucideCheckSquare,
	LucideCircle,
	LucideCircleCheckBig,
	LucideSquare
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
			<input
				type="checkbox"
				{...props}
				style={{
					width: 0,
					opacity: 0,
					...props.style
				}}
			/>
			<Icon size={props.size ?? 27} />
		</S.Wrapper>
	);
}

// TODO: get rid of this? This is actually used in NewHabit, for example.
export function CheckboxIcon({
	checked,
	size = 20
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
