import { Stack, styled } from "@mui/material";

export const TestimonialWrapper = styled(Stack)(({ theme }) => {
    return {
        padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) calc(var(--basic-padding))",
        "& .slider-wrapper": {
            borderRadius: "34px",
        },
        "& .testimony-box": {
            borderRadius: "34px",
            gap: "calc(var(--flex-gap)/2)",
            padding: "calc(var(--basic-padding) * 1.5) calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
            background: "var(--marquee-bg-color)",
            "& .reviews-stack": {
                overflow: "hidden",
                "& .review-stack": {
                    gap: "calc(var(--flex-gap)/2)",
                },
            },
            "& .leave-a-review-button-box": {
                overflow: "hidden",
                "& button": {
                    float: "left"
                }
            }
        },
        "& .carousel-arrow": {
            position: "absolute",
            top: "calc(var(--basic-padding)/2)",
            left: "calc(var(--basic-padding)/2)",
            cursor: "pointer",
            zIndex: 1,
            "& button": {
                border: "1px solid var(--border-primary-color)",
                borderRadius: "50%",
                padding: "calc(var(--basic-padding)/8)",
            }
        },
        "& .carousel-arrow-next": {
            marginLeft: "calc(var(--flex-gap)/1.3)",
        },
        [theme.breakpoints.up("tablet")]: {
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding))",
            "& .testimony-box": {
                padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
                "& .leave-a-review-button-box": {
                    "& button": {
                        float: "right"
                    }
                }
            },
            "& .carousel-arrow": {
                top: "unset",
                bottom: "calc(var(--basic-padding)/2)",
            },
        },
    }
});