import { Stack, styled } from "@mui/material";

export const ProfileAreaWrapper = styled(Stack)(({ theme }) => {
	return {
		gap: "calc(var(--flex-gap)/3)",
		justifyContent: "space-between",
		padding:
			"calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) calc(var(--basic-padding)/1.5)",
		"& .tab-area": {
			gap: "calc(var(--flex-gap)/3)",
			"& .tab-keys": {
				flex: 0.35,
				overflow: "hidden",
				flexDirection: "row",
				justifyContent: "space-between",
				gap: "calc(var(--flex-gap)/5)",
				"& .tab-key": {
					overflow: "hidden",
				},
			},
			"& .tab-content": {
				flex: 0.65,
				overflow: "hidden",
				gap: "calc(var(--flex-gap)/3)",
				"& .content-area": {
					flexDirection: "column-reverse",
					gap: "calc(var(--flex-gap)/8)",
					justifyContent: "space-between",
					border: "1px solid var(--profile-card-border-color)",
					borderRadius: "6px",
					padding: "calc(var(--basic-padding)/4)",
					"& .profile-card-call-to-action": {
						flex: 0.25,
						overflow: "hidden",
						display: "flex",
						justifyContent: "flex-start",
					},
					"& .user-info": {
						flex: 0.75,
						gap: "calc(var(--flex-gap)/3)",
					},
					"& .personal-information": {
						flex: 0.75,
						overflow: "hidden",
						gap: "calc(var(--flex-gap)/3)",
						"& .personal-information-grid-item": {
							flexGrow: "1 !important",
							overflow: "hidden",
							"& .personal-information-grid-item-body": {
								gap: "calc(var(--flex-gap)/8)",
							},
						},
					},
					"& .delivery-information": {
						flex: 0.75,
						overflow: "hidden",
						gap: "calc(var(--flex-gap)/3)",
						"& .delivery-information-grid-item": {
							flexGrow: "1 !important",
							overflow: "hidden",
							"& .delivery-information-grid-item-body": {
								gap: "calc(var(--flex-gap)/8)",
							},
						},
					},
				},
			},
		},
		[theme.breakpoints.up("miniTablet")]: {
			"& .tab-area": {
				"& .tab-content": {
					"& .content-area": {
						flexDirection: "row",
						gap: "calc(var(--flex-gap)/3)",
						"& .profile-card-call-to-action": {
							justifyContent: "flex-end",
						},
						"& .user-info": {
							flexDirection: "row",
							overflow: "hidden",
						},
					},
				},
			},
		},
		[theme.breakpoints.up("tablet")]: {
			padding:
				"calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding)/1.5)",
			"& .tab-area": {
				flexDirection: "row",
				"& .tab-keys": {
					flexDirection: "column",
					justifyContent: "flex-start",
				},
				"& .tab-content": {
					"& .content-area": {
						gap: "calc(var(--flex-gap)/8)",
						flexDirection: "column-reverse",
						"& .profile-card-call-to-action": {
							justifyContent: "flex-start",
						},
						"& .user-info": {
							flexDirection: "column",
							overflow: "visible",
						},
						"& .personal-information": {
							overflow: "visible",
						},
						"& .delivery-information": {
							overflow: "visible",
						},
					},
				},
			},
		},
		[theme.breakpoints.up("laptop")]: {
			"& .tab-area": {
				"& .tab-content": {
					"& .content-area": {
						flexDirection: "row",
						gap: "calc(var(--flex-gap)/3)",
						"& .profile-card-call-to-action": {
							justifyContent: "flex-end",
						},
						"& .user-info": {
							overflow: "hidden",
							flexDirection: "row",
						},
						"& .personal-information": {
							overflow: "hidden",
						},
						"& .delivery-information": {
							overflow: "hidden",
						},
					},
				},
			},
		},
	};
});
