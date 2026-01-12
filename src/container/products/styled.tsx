import { Stack, styled } from "@mui/material";
import checkedIcon from "../../asset/icon/checked-icon.svg";

export const ProductsWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		padding: "calc(var(--basic-padding)/2)",
		"& fieldset": {
			overflow: "hidden",
			"&.filter-fieldset": {
				"& .MuiInputBase-input": {
					width: "10px",
					height: "10px",
					appearance: "none",
					borderRadius: "0px",
					"&:checked": {
						backgroundImage: `url(${checkedIcon})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					},
					"&:not(:checked)": {
						borderRadius: "2px",
						border: "1px solid var(--text-gray-color)",
					},
				},
			},
			"&.price-range-filter-fieldset": {
				flex: 1,
				"& .price-range-filter": {
					width: "100%",
					"& .MuiInputBase-input": {
						height: "max-height",
						appearance: "none",
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						"&::-webkit-slider-thumb": {
							appearance: "none",
							height: "8px",
							width: "8px",
							borderRadius: "50%",
							backgroundColor: "var(--primary-color)",
							marginTop: "-3px",
						},
						"&::-webkit-slider-runnable-track": {
							height: "2px",
							backgroundColor: "var(--primary-color)",
						},
					},
				},
			},
		},
		"& .product-grid-item": {
			overflow: "hidden",
			"& .product-grid-item-body": {
				justifyContent: "space-between",
				height: "-webkit-fill-available",
				padding: "calc(var(--basic-padding)/4)",
				borderRadius: "12px",
				gap: "calc(var(--flex-gap)/8)",
				border: "1px solid var(--border-faint-primary-color)",
				"& .product-thumbnail-box": {
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
