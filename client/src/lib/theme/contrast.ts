import { isLightColor, luminance } from "@mantine/core";
import convert from "color-convert";
import { type ColorKey, colors } from "@/lib/theme/colors";

export function contrastColor(color: string) {
	let converted: string;
	if (color.startsWith("#")) {
		converted = color;
	} else {
		try {
			converted = convert.keyword.hex(color);
		} catch (_) {
			converted = color;
		}
	}

	return isLightColor(converted) ? colors.dark[0] : colors.light[0];
}

export function determineContrast(one: ColorKey, two: ColorKey) {
	return (luminance(one) + 0.05) / (luminance(two) + 0.05);
}
