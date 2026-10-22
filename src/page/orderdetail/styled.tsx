import { Container, styled } from "@mui/material";

export const OrderDetailWrapper = styled(Container)(({ theme }) => {
	return {
		overflow: "hidden",
		"& .rfm-marquee-container, & .rfm-marquee": {
			gap: "calc(var(--flex-gap)/8)",
		},
	};
});
