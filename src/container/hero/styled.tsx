import { Box, styled } from "@mui/material";

export const HeroWrapper = styled(Box)(({ theme }) => {
    return {
        borderBottom: "1px solid var(--border-off-primary-color)",
        "& .hero-stack": {
            "& .hero-stack-LHS": {
                flex: 1,
                overflow: "hidden",
                "& .hero-stack-LHS-content": {
                    gap: "calc(var(--flex-gap)/3)",
                    padding: "calc(var(--basic-padding) * 1.5) calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)"
                },
            },
            "& .hero-stack-RHS": {
                flex: 1,
                overflow: "hidden",
                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                }
            },
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
            "& .hero-stack": {
                "& .hero-stack-LHS": {
                    "& .hero-stack-LHS-content": {
                        padding: "calc(var(--basic-padding) * 1.5) calc(var(--basic-padding)) calc(var(--basic-padding)/2)"
                    },
                },
            },
            "& .carousel-arrow": {
                left: "calc(var(--basic-padding))",
            },
        },
        [theme.breakpoints.up("laptop")]: {
            "& .hero-stack": {
                flexDirection: "row",
                "& .hero-stack-LHS": {
                    display: "flex",
                    alignItems: "center",
                    "& .hero-stack-LHS-content": {
                        padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding) * 1.5)"
                    },
                },
            },
            "& .carousel-arrow": {
                top: "unset",
                bottom: "calc(var(--basic-padding)/2)",
            },
        },
    }
})