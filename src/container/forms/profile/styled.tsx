import { Stack, styled } from "@mui/material";

export const ProfileFormModalWrapper = styled(Stack)(({ theme }) => {
	return {
		overflow: "hidden",
		gap: "calc(var(--flex-gap)/3)",
		padding: "calc(var(--basic-padding)/2)",
		"& fieldset": {
			display: "flex",
			flexDirection: "column",
			overflow: "hidden",
		},
		"& .MuiFormLabel-root": {
			marginBlock: "0 calc(var(--basic-margin)/6)",
		},
		"& .form-error-box, & .form-call-to-action": {
			overflow: "hidden",
		},
		"& .profile-photo-box": {
			width: "100%",
			height: "auto",
			borderRadius: "50%",
			objectFit: "cover",
			"& img": {
				width: "100%",
				height: "100%",
				borderRadius: "inherit",
			},
		},
		[theme.breakpoints.up(200)]: {
			"& .profile-photo-box": {
				width: "50px",
				height: "50px",
			},
		},
	};
});
