import { Stack, styled } from "@mui/material";

export const WhatWeDoWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/4)",
		padding: "0 calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
		"& .offerings": {
			overflow: "hidden",
			gap: "calc(var(--flex-gap)/4)",
			"& .offering-stack": {
				borderRadius: "11px",
				gap: "calc(var(--flex-gap)/4)",
				padding: "calc(var(--basic-padding)/4)",
				backgroundColor: "var(--page-title-bg-color)",
				"& .checkbox-icon": {
					overflow: "hidden",
					"& img": {
						width: "100%",
						height: "auto",
					},
				},
			},
		},
		"& .call-to-action-box": {
			display: "flex",
			justifyContent: "center",
			overflow: "hidden",
			padding: "calc(var(--basic-padding)/1.5) 0 0",
		},
		[theme.breakpoints.up(180)]: {
			"& .offerings": {
				"& .offering-stack": {
					"& .checkbox-icon": {
						"& img": {
							width: "auto",
						},
					},
				},
			},
		},
		[theme.breakpoints.up("tablet")]: {
			padding: "calc(var(--basic-padding)/2) var(--basic-padding)",
			"& .offerings": {
				flexDirection: "row",
				gap: "calc(var(--flex-gap)/2)",
			},
		},
	};
});
