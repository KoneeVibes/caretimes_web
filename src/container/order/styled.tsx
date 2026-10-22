import { Stack, styled } from "@mui/material";

export const OrderWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		justifyContent: "space-between",
		padding:
			"calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) calc(var(--basic-padding)/1.5)",
		"& .main-area": {
			gap: "calc(var(--flex-gap)/3)",
			paddingBottom: "calc(var(--basic-padding)/4)",
			"& .title-area": {
				borderRadius: "8px",
				gap: "calc(var(--flex-gap)/3)",
				padding: "calc(var(--basic-padding)/4)",
				border: "1px solid var(--subtitle-gray-color)",
				overflow: "hidden",
				"& .description": {
					gap: "calc(var(--flex-gap)/9)",
				},
			},
			"& .order-items-area": {
				borderRadius: "8px",
				gap: "calc(var(--flex-gap)/3)",
				padding: "calc(var(--basic-padding)/4)",
				border: "1px solid var(--subtitle-gray-color)",
				overflow: "hidden",
				"& .header": {
					flexDirection: "column-reverse",
					gap: "calc(var(--flex-gap)/3)",
					alignItems: "flex-start",
					justifyContent: "space-between",
					"& .title": {
						gap: "calc(var(--flex-gap)/9)",
					},
				},
				"& .items": {
					gap: "calc(var(--flex-gap)/3)",
					"& .order-item": {
						gap: "calc(var(--flex-gap)/3)",
						justifyContent: "space-between",
						"& .product-thumbnail-box": {
							height: "11.25rem",
							display: "flex",
							overflow: "hidden",
							borderRadius: "10px",
							flex: 1,
							maxWidth: "200px",
							"& img": {
								width: "100%",
								height: "100%",
								borderRadius: "inherit",
							},
						},
					},
				},
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
		[theme.breakpoints.up("tablet")]: {
			padding:
				"calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding)/1.5)",
			"& .main-area": {
				"& .order-items-area": {
					"& .header": {
						flexDirection: "row",
					},
					"& .items": {
						"& .order-item": {
							flexDirection: "row",
						},
					},
				},
			},
		},
	};
});
