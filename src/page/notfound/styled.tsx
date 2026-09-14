import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

export const NotFoundErrorWrapper = styled(Container)(({ theme }) => {
	return {
		overflow: "hidden",
		"& .rfm-marquee-container, & .rfm-marquee": {
			gap: "calc(var(--flex-gap)/8)",
		},
		"& .not-found-error-body": {
			gap: "calc(var(--basic-padding)/3) calc(var(--flex-gap)/9)",
			padding: "calc(var(--basic-padding)/3)",
			"& .animation-area": {
				height: "300px",
				"& img": {
					width: "100%",
					height: "100%",
					objectFit: "contain",
				},
			},
			[theme.breakpoints.up("tablet")]: {
				padding: "calc(var(--basic-padding)/2)",
			},
		},
	};
});
