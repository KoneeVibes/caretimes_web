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
				padding: "calc(var(--basic-padding)/4)",
				borderRadius: "12px",
				gap: "calc(var(--flex-gap)/8)",
				border: "1px solid var(--border-faint-primary-color)",
				"& .saved-product-thumbnail-box": {
					"& img": {
						width: "100%",
						height: "auto",
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
