import { Stack, styled } from "@mui/material";

export const CartWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		justifyContent: "space-between",
		padding:
			"calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) calc(var(--basic-padding)/1.5)",
		"& .main-area": {
			gap: "calc(var(--flex-gap)/3)",
			paddingBottom: "calc(var(--basic-padding)/4)",
			"& .main-area-LHS": {
				flex: 0.65,
				overflow: "hidden",
				gap: "calc(var(--flex-gap)/3)",
				"& .main-area-LHS-body": {
					borderRadius: "12px",
					gap: "calc(var(--flex-gap)/3)",
					justifyContent: "space-between",
					padding: "calc(var(--basic-padding)/4)",
					border: "1px solid var(--border-faint-primary-color)",
					"& .cart-product-description": {
						gap: "calc(var(--flex-gap)/3)",
						"& .product-thumbnail-box": {
							height: "11.25rem",
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
					"& .cart-product-call-to-action": {
						gap: "calc(var(--flex-gap)/4)",
					},
				},
			},
			"& .main-area-RHS": {
				flex: 0.35,
				overflow: "hidden",
				borderRadius: "4px",
				height: "fit-content",
				gap: "calc(var(--flex-gap)/3)",
				padding: "calc(var(--basic-padding)/4)",
				border: "1px solid var(--icon-button-border-color)",
			},
		},
		"& .featured-products": {
			gap: "calc(var(--flex-gap)/3)",
			padding: "calc(var(--basic-padding)/4) 0 0",
			"& .featured-product-grid-item": {
				flexGrow: "1 !important",
				overflow: "hidden",
				"& .featured-product-grid-item-body": {
					justifyContent: "space-between",
					height: "-webkit-fill-available",
					padding: "calc(var(--basic-padding)/4)",
					borderRadius: "12px",
					gap: "calc(var(--flex-gap)/8)",
					border: "1px solid var(--border-faint-primary-color)",
					"& .featured-product-thumbnail-box": {
						cursor: "pointer",
						height: "11.25rem",
						"& img": {
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: "10px",
						},
					},
				},
			},
		},
		"& .featured-products-browse-products-button-box": {
			display: "flex",
			justifyContent: "center",
			overflow: "hidden",
		},
		[theme.breakpoints.up("miniTablet")]: {
			"& .main-area": {
				"& .main-area-LHS": {
					"& .main-area-LHS-body": {
						"& .cart-product-description": {
							flexDirection: "row",
						},
					},
				},
			},
		},
		[theme.breakpoints.up("tablet")]: {
			padding:
				"calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding)/1.5)",
			"& .main-area": {
				"& .main-area-LHS": {
					"& .main-area-LHS-body": {
						flexDirection: "row",
					},
				},
			},
		},
		[theme.breakpoints.up("laptop")]: {
			"& .main-area": {
				flexDirection: "row",
				gap: "calc(var(--flex-gap))",
			},
		},
	};
});
