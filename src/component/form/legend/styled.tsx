import { styled } from "@mui/material";
import { BaseTypographyType } from "../../../type/component.type";

export const BaseLegend = styled("legend")<BaseTypographyType>(({ fontweight, fontsize, colour }) => {
    return {
        fontFamily: "Inter",
        fontWeight: fontweight || 600,
        fontSize: fontsize || "20px",
        lineHeight: "normal",
        color: colour || "var(--dark-color)",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
})
