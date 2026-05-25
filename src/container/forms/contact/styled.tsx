import { Stack, styled } from "@mui/material";

export const ContactFormWrapper = styled(Stack)(({ theme }) => {
	return {
		flex: 1,
		overflow: "hidden",
		gap: "calc(var(--flex-gap))",
		backgroundColor: "var(--light-color)",
		borderRadius: "12px",
		padding: "calc(var(--basic-padding)/2)",
		"& .call-to-action-cards": {
			gap: "calc(var(--flex-gap)/3)",
			overflow: "hidden",
			"& .call-to-action-card": {
				borderRadius: "12px",
				backgroundColor: "var(--dull-light-color)",
				padding: "calc(var(--basic-padding)/4)",
				gap: "calc(var(--flex-gap))",
				cursor: "pointer",
				flex: 1,
				overflow: "hidden",
				"&.active": {
					backgroundColor: "var(--cream-blend-inverse-color)",
				},
			},
		},
		"& .fieldset-area": {
			gap: "calc(var(--flex-gap)/4)",
			"& fieldset": {
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				"& .MuiInputBase-root": {
					backgroundColor: "var(--bg-gray-color)",
				},
			},
			"& .MuiFormLabel-root": {
				marginBlockStart: 0,
				"&.required::after": {
					content: '" *"',
					color: "var(--error-red-color)",
				},
			},
			"& .confirm-terms-and-conditions": {
				flexDirection: "row",
				alignItems: "center",
				gap: "calc(var(--flex-gap)/8)",
			},
		},
		"& .call-to-action": {
			overflow: "hidden",
			"& button": {
				marginBlockStart: "var(--basic-margin)",
			},
		},
		[theme.breakpoints.up("tablet")]: {
			"& .call-to-action-cards": {
				flexDirection: "row",
			},
		},
	};
});
