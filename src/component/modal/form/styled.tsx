import { Dialog, styled } from "@mui/material";

export const BaseFormModalWrapper = styled(Dialog)(() => {
    return {
        "& .MuiDialogContent-root": {
            padding: 0
        },
        "& .MuiDialogTitle-root": {
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "normal",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "calc(var(--basic-padding)/2)",
        }
    }
})
