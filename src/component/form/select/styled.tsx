import { Select, styled } from "@mui/material";
import { BaseInputPropsType } from "../../../type/component.type";

export const BaseSelect = styled(Select)<BaseInputPropsType>(({ colour, bgcolor, fontweight, fontsize, border }) => {
    return {
        fontFamily: "Inter",
        fontWeight: fontweight || 400,
        fontSize: fontsize || "14px",
        lineHeight: "normal",
        border: border || "1px solid var(--input-field-border-color)",
        borderRadius: "6px",
        color: colour || "var(--input-field-text-color)",
        backgroundColor: bgcolor || "transparent",
        padding: "calc(var(--basic-padding)/7.6) calc(var(--basic-padding)/5)",
        outline: "none",
        "& .MuiInputBase-input": {
            textOverflow: "ellipsis",
            padding: 0,
        },
        "& fieldset": {
            border: "none",
        }
    }
})