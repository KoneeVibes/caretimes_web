import { Stack, styled } from "@mui/material";

export const OurStoryWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/2)",
		padding: "calc(var(--basic-padding)/2) 0",
		"& .top-rank": {
			padding: "0 calc(var(--basic-padding)/2)",
			gap: "calc(var(--flex-gap)/2)",
			"& .thumbnail-box": {
				flex: 1,
				overflow: "hidden",
				borderRadius: "50px",
				"& img": {
					width: "100%",
					height: "100%",
					objectFit: "cover",
					borderRadius: "inherit",
				},
			},
			"& .content-box": {
				flex: 1,
				overflow: "hidden",
			},
		},
		"& .bottom-rank": {
			padding: "0 calc(var(--basic-padding)/2)",
			gap: "calc(var(--flex-gap)/2)",
			"& .thumbnail-stack": {
				flex: 2,
				gap: "calc(var(--flex-gap)/2)",
				"& .thumbnail-box": {
					flex: 1,
					overflow: "hidden",
					borderRadius: "50px",
					"& img": {
						width: "100%",
						height: "100%",
						objectFit: "cover",
						borderRadius: "inherit",
					},
				},
			},
			"& .content-stack": {
				flex: 1,
				overflow: "hidden",
				gap: "calc(var(--flex-gap)/8)",
			},
		},
		[theme.breakpoints.up("tablet")]: {
			gap: "var(--flex-gap)",
			"& .top-rank": {
				flexDirection: "row",
				padding: "0 var(--basic-padding)",
			},
			"& .bottom-rank": {
				flexDirection: "row",
				padding: "0 0 0 var(--basic-padding)",
				"& .thumbnail-stack": {
					flexDirection: "row",
				},
				"& .content-stack": {
					gap: "calc(var(--flex-gap)/2)",
				},
			},
		},
	};
});
