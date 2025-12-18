import { luminance } from "@mantine/core";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { type ColorKey, colors } from "@/lib/theme/colors";

extend([namesPlugin]);

export function contrastColor(color: string) {
	let converted: string;
	if (color.startsWith("#")) {
		converted = color;
	} else {
		try {
			converted = colord(color).toHex();
		} catch (_) {
			converted = color;
		}
	}

	return colord(converted).isLight() ? colors.dark[0] : colors.light[0];
}

export function determineContrast(one: ColorKey, two: ColorKey) {
	return (luminance(one) + 0.05) / (luminance(two) + 0.05);
}
