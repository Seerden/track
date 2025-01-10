import S from "./style/CircularProgress.style";

type CircularProgressProps = {
	percentage: number;
	size: number;
	thickness?: number;
};

export default function CircularProgress({
	percentage,
	size,
	thickness = 1.5
}: CircularProgressProps) {
	const offset = thickness; // size increase of progress bar compared to the circle itself
	const radius = size / 2 - thickness / 2;
	const circumference = 2 * Math.PI * radius;

	return (
		<S.Svg $size={size} $offset={offset}>
			<S.Circle
				$offset={offset}
				$done={percentage >= 100}
				cx="50%"
				cy="50%"
				r={radius}
				$circumference={circumference}
				$thickness={thickness}
				$percentage={percentage}
			/>
		</S.Svg>
	);
}
