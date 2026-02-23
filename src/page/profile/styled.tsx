import { Container, styled } from "@mui/material";

export const ProfileWrapper = styled(Container)(({ theme }) => {
	return {
		overflow: "hidden",
		"& .rfm-marquee-container, & .rfm-marquee": {
			gap: "calc(var(--flex-gap)/8)",
		},
	};
});
