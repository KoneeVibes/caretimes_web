import { Stack, styled } from "@mui/material";

export const ProductDescriptionWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		justifyContent: "space-between",
		padding:
			"calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) calc(var(--basic-padding)/1.5)",
		borderBottom: "1px solid var(--border-off-primary-color)",
		"& .product-detail": {
			gap: "calc(var(--flex-gap)/3)",
			"& .product-detail-LHS": {
				flex: 1,
				overflow: "hidden",
				"& .product-thumbnail": {
					height: "100%",
					display: "flex",
					overflow: "hidden",
					borderRadius: "10px",
					"& img": {
						width: "100%",
						height: "100%",
						borderRadius: "inherit",
					},
				},
			},
			"& .product-detail-RHS": {
				flex: 1,
				overflow: "hidden",
				gap: "calc(var(--flex-gap)/3)",
			},
		},
		[theme.breakpoints.up("tablet")]: {
			padding:
				"calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding)/1.5)",
		},
		[theme.breakpoints.up("laptop")]: {
			"& .product-detail": {
				flexDirection: "row",
				gap: "calc(var(--flex-gap))",
			},
		},
	};
});
