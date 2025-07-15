import { Stack, styled } from "@mui/material";

export const AuthenticationFormModalWrapper = styled(Stack)(() => {
    return {
        overflow: "hidden",
        "& .modal-navigation-panel": {
            flexDirection: "row",
            gap: "calc(var(--flex-gap)/4)",
            justifyContent: "space-between",
            padding: "calc(var(--basic-padding)/4) calc(var(--basic-padding)/2)",
            "& .modal-nav-panel-action-button-box": {
                flex: "0 1 auto",
                overflow: "hidden"
            }
        },
        "& .modal-header-img-box": {
            height: "200px",
            overflow: "hidden",
        },
        "& .modal-form-fields": {
            gap: "calc(var(--flex-gap)/4)",
            padding: "calc(var(--basic-padding)/2)",
            "& fieldset": {
                display: "flex",
                flexDirection: "column",
                gap: "calc(var(--flex-gap)/6)",
                overflow: "hidden",
                "& label": {
                    marginBlock: 0
                }
            },
        },
        "& .modal-call-to-action": {
            overflow: "hidden",
            padding: "0 calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
        },
        "& .modal-form-description": {
            gap: "calc(var(--flex-gap)/8)",
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) 0",

        },
        "& .modal-footer-note": {
            padding: "0 calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
        },
    }
})