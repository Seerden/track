import type { Nullable } from "@shared/types/data/utility.types";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** extract an attribute value from a tag string using regex.
 * @example: getAttr('<circle cx="12" ...>', 'cx') -> 12. */
function getAttr(tagString: string, attr: string): number {
	const regex = new RegExp(`${attr}="([^"]*)"`);
	const match = tagString.match(regex);
	return match ? +match[1] : 0;
}

/** convert relative 'm' to absolute 'M' to fix issue where the morph animation
 * would fail with certain lucide icons (e.g. FilterX). */
function fixMoveCommand(d: string): string {
	const match = d.match(
		/^m\s*([-+]?(?:\d*\.\d+|\d+))\s*[,]?\s*([-+]?(?:\d*\.\d+|\d+))\s*(.*)/i
	);
	if (!match) return d;
	const [_, x, y, rest] = match;
	const firstCharOfRest = rest.trim()[0];
	const hasImplicitLineto = firstCharOfRest && /^[-\d.]/.test(firstCharOfRest);
	return `M ${x} ${y} ${hasImplicitLineto ? "l" : ""} ${rest}`;
}

export function getPathFromIcon(Icon: ReactElement): string {
	const svgString = renderToStaticMarkup(<>{Icon}</>);

	// 2. find all shape tags (path, circle, line, etc.)
	// group 1: tag name
	// group 2: rest of the tag string (attributes)
	const tagRegex = /<(path|circle|line|rect|polyline|polygon)([^>]*)>/g;

	const paths: string[] = [];
	let match: Nullable<RegExpExecArray>;

	while ((match = tagRegex.exec(svgString)) !== null) {
		const [_, tagName, attrs, ..._rest] = match;

		switch (tagName) {
			case "path": {
				// get 'd' attribute directly
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
						const lineParts = coords
							.slice(1)
							.map(([px, py]) => `L ${px},${py}`)
							.join(" ");
						const linePath = `M ${startX},${startY} ${lineParts}`;

						paths.push(tagName === "polygon" ? `${linePath} Z` : linePath);
					}
				}
				break;
			}
		}
	}

	return paths.join(" ");
}
