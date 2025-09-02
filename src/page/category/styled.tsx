import { Container, styled } from "@mui/material";

export const CategoryWrapper = styled(Container)(({ theme }) => {
    return {
        overflow: "hidden",
        "& .rfm-marquee-container, & .rfm-marquee": {
            gap: "calc(var(--flex-gap)/8)",
        },
    }
})
