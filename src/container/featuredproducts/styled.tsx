import { Stack, styled } from "@mui/material";

export const FeaturedProductsWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
		borderBottom: "1px solid var(--border-off-primary-color)",
		"& .featured-products-header": {
			"& .featured-products-header-browse-products-button-box": {
				overflow: "hidden",
			},
		},
		"& .featured-products-category": {
			"& .featured-products-category-grid-item": {
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "bottom center",
				width: "100%",
				overflow: "hidden",
				display: "flex",
				"& .featured-products-category-grid-item-body": {
					padding: "calc(var(--basic-padding)/3)",
					gap: "calc(var(--flex-gap)/4)",
					justifyContent: "flex-end",
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
			padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
		},
	};
});
