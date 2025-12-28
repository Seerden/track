import styled from "@emotion/styled";

const Svg = styled.svg`
   border-radius: 50%;
   &:hover {
      transform: scale(1.15);
      box-shadow: 0 0 0.3rem 0 var(--bg-4-2);
   }

   transition: all 35ms ease-out;
`;

export default {
	Svg,
};
