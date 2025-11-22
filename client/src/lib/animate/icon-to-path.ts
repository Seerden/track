// src/utils/iconToPath.ts
import type { IconNode } from "lucide";

/**
 * Fixes SVG path strings that start with "m" (relative move)
 * by converting them to "M" (absolute move) while preserving
 * the relative nature of subsequent implicit lineto commands.
 */
function fixMoveCommand(d: string): string {
	// Regex to capture:
	// 1. The 'm' at start
	// 2. First coordinate pair (x, y)
	// 3. The rest of the string
	// Regex logic: ^m \s* (number) [separator] (number) \s* (rest)
	const match = d.match(
		/^m\s*([-+]?(?:\d*\.\d+|\d+))\s*[,]?\s*([-+]?(?:\d*\.\d+|\d+))\s*(.*)/i
	);

	if (!match) return d; // If it doesn't start with m or parse correctly, return as is

	const [, x, y, rest] = match;

	// If 'rest' starts with a number (or sign), it implies implicit relative linetos.
	// We must inject an explicit 'l' to keep them relative after changing 'm' to 'M'.
	const firstCharOfRest = rest.trim()[0];
	const hasImplicitLineto = firstCharOfRest && /^[-\d.]/.test(firstCharOfRest);

	if (hasImplicitLineto) {
		return `M ${x} ${y} l ${rest}`;
	}

	// Otherwise (if rest is empty or starts with a letter like 'z' or 'l'), just swap m to M
	return `M ${x} ${y} ${rest}`;
}

/**
 * Converts a Lucide IconNode to an SVG path string.
 */
export function iconToPath(iconNode: IconNode): string {
	return iconNode
		.map((childNode) => {
			const [tag, attrs] = childNode;

			switch (tag) {
				case "path": {
					const d = String(attrs["d"] || "");

					// FIX: Force the path to start with an Absolute Move (M)
					// instead of a Relative Move (m).
					// This ensures that when we join strings, this shape
					// starts at the correct coordinate, regardless of where the last shape ended.
					return fixMoveCommand(d);
				}

				case "circle": {
					const cx = Number(attrs["cx"] || 0);
					const cy = Number(attrs["cy"] || 0);
					const r = Number(attrs["r"] || 0);
					return `M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
				}

				case "line": {
					const x1 = Number(attrs["x1"] || 0);
					const y1 = Number(attrs["y1"] || 0);
					const x2 = Number(attrs["x2"] || 0);
					const y2 = Number(attrs["y2"] || 0);
					return `M ${x1},${y1} L ${x2},${y2}`;
				}

				case "rect": {
					const x = Number(attrs["x"] || 0);
					const y = Number(attrs["y"] || 0);
					const w = Number(attrs["width"] || 0);
					const h = Number(attrs["height"] || 0);
					return `M ${x},${y} h ${w} v ${h} h -${w} Z`;
				}

				case "polyline":
				case "polygon": {
					const points = String(attrs["points"] || "");
					if (!points) return "";
					const coords = points.split(" ").map((p) => p.split(","));
					if (coords.length === 0 || !coords[0]) return "";

					const [startX, startY] = coords[0];
					const path =
						`M ${startX},${startY} ` +
						coords
							.slice(1)
							.map(([px, py]) => `L ${px},${py}`)
							.join(" ");

					return tag === "polygon" ? `${path} Z` : path;
				}

				default:
					return "";
			}
		})
		.join(" "); // The space here separates the commands
}
