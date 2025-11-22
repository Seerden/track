import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/**
 * Helper: Extracts an attribute value from a tag string using Regex.
 * Example: getAttr('<circle cx="12" ...>', 'cx') -> 12
 */
function getAttr(tagString: string, attr: string): number {
	// regex parser for `attr`, where attr are the
	const regex = new RegExp(`${attr}="([^"]*)"`);
	const match = tagString.match(regex);
	return match ? Number(match[1]) : 0;
}

/**
 * Helper: Convert relative 'm' to absolute 'M' to fix the FunnelX issue.
 */
function fixMoveCommand(d: string): string {
	const match = d.match(
		/^m\s*([-+]?(?:\d*\.\d+|\d+))\s*[,]?\s*([-+]?(?:\d*\.\d+|\d+))\s*(.*)/i
	);
	if (!match) return d;
	const [, x, y, rest] = match;
	const firstCharOfRest = rest.trim()[0];
	const hasImplicitLineto = firstCharOfRest && /^[-\d.]/.test(firstCharOfRest);
	return hasImplicitLineto ? `M ${x} ${y} l ${rest}` : `M ${x} ${y} ${rest}`;
}

export function getPathFromIcon(Icon: ReactNode): string {
	// 1. Render the icon to a simple string
	const svgString = renderToStaticMarkup(<>{Icon}</>);

	// 2. Find all shape tags (path, circle, line, etc.)
	// Group 1: Tag Name
	// Group 2: The rest of the tag string (attributes)
	const tagRegex = /<(path|circle|line|rect|polyline|polygon)([^>]*)>/g;

	const paths: string[] = [];
	let match;

	// 3. Loop through every tag found in the string
	while ((match = tagRegex.exec(svgString)) !== null) {
		const [_, tagName, attrs, ..._rest] = match;

		console.log({ attrs });
		switch (tagName) {
			case "path": {
				// Extract 'd' attribute directly
				const dMatch = attrs.match(/d="([^"]*)"/);
				if (dMatch) {
					paths.push(fixMoveCommand(dMatch[1]));
				}
				break;
			}

			case "circle": {
				const cx = getAttr(attrs, "cx");
				const cy = getAttr(attrs, "cy");
				const r = getAttr(attrs, "r");
				paths.push(
					`M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
				);
				break;
			}

			case "line": {
				const x1 = getAttr(attrs, "x1");
				const y1 = getAttr(attrs, "y1");
				const x2 = getAttr(attrs, "x2");
				const y2 = getAttr(attrs, "y2");
				paths.push(`M ${x1},${y1} L ${x2},${y2}`);
				break;
			}

			case "rect": {
				const x = getAttr(attrs, "x");
				const y = getAttr(attrs, "y");
				const w = getAttr(attrs, "width");
				const h = getAttr(attrs, "height");
				paths.push(`M ${x},${y} h ${w} v ${h} h -${w} Z`);
				break;
			}

			case "polyline":
			case "polygon": {
				const pointsMatch = attrs.match(/points="([^"]*)"/);
				if (pointsMatch) {
					const coords = pointsMatch[1].split(" ").map((p) => p.split(","));
					if (coords[0]) {
						const [startX, startY] = coords[0];
						const linePath =
							`M ${startX},${startY} ` +
							coords
								.slice(1)
								.map(([px, py]) => `L ${px},${py}`)
								.join(" ");
						paths.push(tagName === "polygon" ? `${linePath} Z` : linePath);
					}
				}
				break;
			}
		}
	}

	return paths.join(" ");
}
