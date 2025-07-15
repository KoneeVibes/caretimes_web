import { Dialog, styled } from "@mui/material";

export const BaseNotificationModalWrapper = styled(Dialog)(({ theme }) => {
    return {
        "& .MuiDialogContent-root": {
            overflow: "unset",
            display: "flex",
            flexDirection: "column",
            padding: "0",
            "& .modal-header-img-box": {
                height: "200px",
                overflow: "hidden",
            },
            "& .modal-title-box": {
                padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) 0",
            }
        },
        "& .MuiDialogActions-root": {
            flexDirection: "column",
            gap: "calc(var(--flex-gap)/8)",
            justifyContent: "space-between",
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
            "& .MuiButton-root:last-of-type": {
                margin: 0
            }
        },
    }
})