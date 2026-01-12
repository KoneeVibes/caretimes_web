import { Container, styled } from "@mui/material";

export const ContactWrapper = styled(Container)(({ theme }) => {
	return {
		overflow: "hidden",
		"& .rfm-marquee-container, & .rfm-marquee": {
			gap: "calc(var(--flex-gap)/8)",
		},
	};
});
