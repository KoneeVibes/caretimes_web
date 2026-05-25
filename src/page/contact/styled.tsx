import { Container, styled } from "@mui/material";

export const ContactWrapper = styled(Container)(({ theme }) => {
	return {
		overflow: "hidden",
		"& .rfm-marquee-container, & .rfm-marquee": {
			gap: "calc(var(--flex-gap)/8)",
		},
		"& .header": {
			padding: "calc(var(--basic-padding)/2)",
		},
		"& .contact-form-area": {
			background:
				"linear-gradient(90deg, var(--off-primary-color) 0%, var(--cream-blend-variant-color) 100%)",
			padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
			gap: "calc(var(--flex-gap)/3)",
			overflow: "hidden",
			"& .text-area": {
				gap: "calc(var(--flex-gap)/3)",
			},
		},
		[theme.breakpoints.up("laptop")]: {
			"& .header": {
				padding: "calc(var(--basic-padding)/1.5) calc(var(--basic-padding))",
			},
			"& .contact-form-area": {
				padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
				flexDirection: "row",
				gap: "calc(var(--flex-gap))",
				"& .text-area": {
					flex: 0.45,
					overflow: "hidden",
				},
			},
		},
	};
});
