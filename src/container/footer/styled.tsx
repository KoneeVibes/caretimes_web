import { Stack, styled } from "@mui/material";

export const FooterWrapper = styled(Stack)(({ theme }) => {
    return {
        "& .footer-layer-one": {
            gap: "calc(var(--flex-gap)/4)",
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
            background: "linear-gradient(90deg, var(--off-primary-color) 0%, var(--cream-blend-variant-color) 100%)",
            "& .footer-layer-one-RHS": {
                gap: "calc(var(--flex-gap)/4)",
                "& .registration-form": {
                    display: "flex",
                    gap: "calc(var(--flex-gap)/8)",
                }
            }
        },
        "& .footer-layer-two": {
            gap: "calc(var(--flex-gap)/4)",
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2)",
            background: "var(--marquee-bg-color)",
            "& .footer-layer-two-LHS": {
                flex: 1,
                overflow: "hidden",
                gap: "calc(var(--flex-gap))",
            },
            "& .footer-layer-two-RHS": {
                flex: 1,
                overflow: "hidden",
                gap: "calc(var(--flex-gap)/4)",
                "& .footer-layer-two-RHS-contact-area": {
                    padding: "calc(var(--basic-padding)/3)",
                    background: "var(--light-color)",
                    justifyContent: "space-between",
                    borderRadius: "9px",
                    gap: "calc(var(--flex-gap)/4)",
                },
            },
        },
        "& .footer-layer-three": {
            justifyContent: "center",
            alignItems: "center",
            padding: "calc(var(--basic-padding)/16) calc(var(--basic-padding)/2)",
        },
        [theme.breakpoints.up("miniTablet")]: {
            "& .footer-layer-two": {
                "& .footer-layer-two-RHS": {
                    "& .footer-layer-two-RHS-contact-area": {
                        flexDirection: "row",
                        alignItems: "center",
                    }
                },
            },
        },
        [theme.breakpoints.up("tablet")]: {
            "& .footer-layer-two": {
                "& .footer-layer-two-RHS": {
                    "& .footer-layer-two-RHS-contact-area": {
                        width: "fit-content",
                    }
                },
            },
        },
        [theme.breakpoints.up("desktop")]: {
            "& .footer-layer-one": {
                flexDirection: "row",
                gap: "calc(var(--flex-gap)/2)",
                padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
                background: "linear-gradient(90deg, var(--off-primary-color) 0%, var(--cream-blend-variant-color) 100%)",
                "& .footer-layer-one-LHS": {
                    flex: 1,
                    overflow: "hidden",
                },
                "& .footer-layer-one-RHS": {
                    flex: 1,
                    overflow: "hidden",
                }
            },
            "& .footer-layer-two": {
                flexDirection: "row",
                gap: "calc(var(--flex-gap))",
                padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
                "& .footer-layer-two-LHS": {
                    flexDirection: "row",
                },
                "& .footer-layer-two-RHS": {
                    "& .footer-layer-two-RHS-contact-area": {
                        width: "unset",
                    }
                },
            },
            "& .footer-layer-three": {
                padding: "calc(var(--basic-padding)/16) calc(var(--basic-padding))",
            },
        },
    }
});