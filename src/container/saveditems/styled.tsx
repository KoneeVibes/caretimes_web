import { Stack, styled } from "@mui/material";

export const SavedItemsWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		padding: "calc(var(--basic-padding)/2)",
		"& .saved-products-header": {
			"& .saved-products-check-out-button-box": {
				overflow: "hidden",
			},
		},
		"& .saved-product-grid-item": {
			flexGrow: "1 !important",
			overflow: "hidden",
			"& .saved-product-grid-item-body": {
				justifyContent: "space-between",
				height: "-webkit-fill-available",
				padding: "calc(var(--basic-padding)/4)",
				borderRadius: "12px",
				gap: "calc(var(--flex-gap)/8)",
				border: "1px solid var(--border-faint-primary-color)",
				"& .saved-product-thumbnail-box": {
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
		[theme.breakpoints.up("tablet")]: {
			padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
		},
	};
});
