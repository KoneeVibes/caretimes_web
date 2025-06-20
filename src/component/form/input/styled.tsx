import { InputBase, styled } from "@mui/material";
import { BaseInputPropsType } from "../../../type/component.type";

export const BaseInput = styled(InputBase)<BaseInputPropsType>(({
    colour, bgcolor, fontweight, fontsize, border, radius, padding
}) => {
    return {
        fontFamily: "Inter",
        fontWeight: fontweight || 400,
        fontSize: fontsize || "14px",
        lineHeight: "normal",
        border: border || "1px solid var(--input-field-border-color)",
        borderRadius: radius || "6px",
        color: colour || "var(--input-field-text-color)",
        backgroundColor: bgcolor || "transparent",
        padding: padding || "calc(var(--basic-padding)/7.6) calc(var(--basic-padding)/5)",
        outline: "none",
        "& .MuiInputBase-input": {
            textOverflow: "ellipsis",
            padding: 0,
        }
    }
})
