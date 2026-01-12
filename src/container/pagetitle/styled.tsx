import { Box, styled } from "@mui/material";

export const PageTitleWrapper = styled(Box)(({ theme }) => {
	return {
		padding: "calc(var(--basic-padding)/2)",
		backgroundColor: "var(--page-title-bg-color)",
		[theme.breakpoints.up("tablet")]: {
			padding: "calc(var(--basic-padding)/2) var(--basic-padding)",
		},
	};
});
