import styled from "@emotion/styled";

// I have some business logic related to disabling the slider, but mantine wants
// to force certain styles on disabled sliders, so I need this wrapper to
// overwrite them.
const SliderWrapper = styled.div<{ sliderColor: string }>`
	&:has([data-disabled="true"]) {
		* {
			cursor: help;
		}

		.mantine-Slider-bar {
			&[data-disabled="true"] {
				background-color: ${(p) => p.sliderColor};
			}
		}
		.mantine-Slider-thumb {
			background-color: ${(p) => p.theme.colors.green.main};
			display: inherit;
		}
	}
`;

export default {
	SliderWrapper
};
