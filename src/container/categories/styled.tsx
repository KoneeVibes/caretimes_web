import { Stack, styled } from "@mui/material";

export const CategoriesWrapper = styled(Stack)(({ theme }) => {
    return {
        gap: "calc(var(--flex-gap)/3)",
        borderBottom: "1px solid var(--border-off-primary-color)",
        padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
        "& .carousel-arrow": {
            position: "absolute",
            top: 0,
            cursor: "pointer",
            zIndex: 1,
        },
        "& .carousel-arrow-next": {
            marginLeft: "calc(var(--flex-gap) * 1.7)",
        },
        "& .slider-wrapper": {
            padding: "calc(var(--basic-padding)) 0 0"
        },
        "& .category-thumbnail-box": {
            "& img": {
                width: "100%",
                height: "auto",
                borderRadius: "10px",
            },
        },
        [theme.breakpoints.up("tablet")]: {
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
            "& .carousel-arrow": {
                right: 0,
            },
            "& .carousel-arrow-prev": {
                marginRight: "calc(var(--flex-gap) * 1.4)",
            },
            "& .carousel-arrow-next": {
                marginLeft: "unset",
            },
        }
    }
})