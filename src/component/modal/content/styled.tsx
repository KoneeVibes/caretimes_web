import { Dialog, styled } from "@mui/material";

export const BaseContentModalWrapper = styled(Dialog)(({ theme }) => {
	return {
		"& .MuiDialogContent-root": {
			display: "flex",
			flexDirection: "column",
			padding: "0",
			"& .modal-header-img-box": {
				height: "200px",
				overflow: "hidden",
			},
			"& .modal-title-box": {
				padding:
					"calc(var(--basic-padding)/8) calc(var(--basic-padding)/4) calc(var(--basic-padding)/4)",
			},
			"& .modal-subtitle-box": {
				padding: "calc(var(--basic-padding)/4) calc(var(--basic-padding)/4) 0",
			},
		},
		"& .MuiDialogActions-root": {
			flexDirection: "column",
			gap: "calc(var(--flex-gap)/8)",
			justifyContent: "space-between",
			padding: "calc(var(--basic-padding)/4) calc(var(--basic-padding)/4)",
			"& .MuiButton-root:last-of-type": {
				margin: 0,
			},
		},
	};
});
