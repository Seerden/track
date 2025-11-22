import type { LucideIcon } from "lucide-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

/**
 * 1. Fix Move Command Logic
 * Ensures relative moves (m) followed by implicit lines are converted correctly.
 */
function fixMoveCommand(d: string): string {
	const match = d.match(
		/^m\s*([-+]?(?:\d*\.\d+|\d+))\s*[,]?\s*([-+]?(?:\d*\.\d+|\d+))\s*(.*)/i
	);
	if (!match) return d;

	const [_, x, y, rest] = match;
	const firstCharOfRest = rest.trim()[0];
	// Check for implicit linetos (numbers or signs)
	const hasImplicitLineto = firstCharOfRest && /^[-\d.]/.test(firstCharOfRest);

	return hasImplicitLineto ? `M ${x} ${y} l ${rest}` : `M ${x} ${y} ${rest}`;
}

/**
 * 2. The Main Extractor
 * Renders the component to a string, then parses the DOM nodes.
 */
export function getPathFromIcon(Icon: LucideIcon): string {
	// SSR Check: DOMParser is not available on the server.
	if (typeof window === "undefined") return "";

	// A. Render the icon to a static SVG string
	// We wrap it in a fragment or just call renderToStaticMarkup on the element
	const svgString = renderToStaticMarkup(React.createElement(Icon));

	// B. Parse the string into a real DOM tree
	const parser = new DOMParser();
	const doc = parser.parseFromString(svgString, "image/svg+xml");
	const root = doc.documentElement; // This is the <svg> element

	// C. Iterate over the DOM elements (Element is a standard TS DOM type)
	const pathStrings: string[] = [];

	// root.children is an HTMLCollection, convert to array to map over it
	Array.from(root.children).forEach((element) => {
		const tag = element.tagName;

		// Helper to safely get number attributes
		const getNum = (attr: string) => Number(element.getAttribute(attr) || 0);

		switch (tag) {
			case "path": {
				const d = element.getAttribute("d");
				if (d) pathStrings.push(fixMoveCommand(d));
				break;
			}

			case "circle": {
				const cx = getNum("cx");
				const cy = getNum("cy");
				const r = getNum("r");
				// Convert circle to two arcs
				pathStrings.push(
					`M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
				);
				break;
			}

			case "line": {
				const x1 = getNum("x1");
				const y1 = getNum("y1");
				const x2 = getNum("x2");
				const y2 = getNum("y2");
				pathStrings.push(`M ${x1},${y1} L ${x2},${y2}`);
				break;
			}

			case "rect": {
				const x = getNum("x");
				const y = getNum("y");
				const w = getNum("width");
				const h = getNum("height");
				pathStrings.push(`M ${x},${y} h ${w} v ${h} h -${w} Z`);
				break;
			}

			case "polyline":
			case "polygon": {
				const points = element.getAttribute("points");
				if (!points) break;

				const coords = points.split(" ").map((p) => p.split(","));
				if (!coords[0]) break;

				const [startX, startY] = coords[0];
				const linePath =
					`M ${startX},${startY} ` +
					coords
						.slice(1)
						.map(([px, py]) => `L ${px},${py}`)
						.join(" ");

				pathStrings.push(tag === "polygon" ? `${linePath} Z` : linePath);
				break;
			}
		}
	});

	return pathStrings.join(" ");
}
