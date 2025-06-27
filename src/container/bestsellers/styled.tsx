import { Stack, styled } from "@mui/material";

export const BestSellersWrapper = styled(Stack)(({ theme }) => {
    return {
        gap: "calc(var(--flex-gap)/3)",
        justifyContent: "space-between",
        padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)/2) calc(var(--basic-padding)/1.5)",
        "& .best-sellers-LHS": {
            gap: "calc(var(--flex-gap)/4)"
        },
        "& .best-sellers-RHS": {
            gap: "calc(var(--flex-gap)/2)",
            flexGrow: 1,
            "& .best-sellers-show-all-button-box": {
                overflow: "hidden",
            },
            "& .best-seller-grid-item": {
                flexGrow: "1 !important",
                overflow: "hidden",
                "& .best-seller-grid-item-body": {
                    padding: "calc(var(--basic-padding)/4)",
                    borderRadius: "12px",
                    gap: "calc(var(--flex-gap)/8)",
                    border: "1px solid var(--border-faint-primary-color)",
                    "& .best-seller-thumbnail-box": {
                        "& img": {
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                        }
                    },
                },
            }
        },
        [theme.breakpoints.up("tablet")]: {
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding)) calc(var(--basic-padding)/1.5)",
        },
        [theme.breakpoints.up("laptop")]: {
            flexDirection: "row",
            "& .best-sellers-LHS": {
                gap: "calc(var(--flex-gap)/2)"
            },
            "& .best-sellers-RHS": {
                "& .best-sellers-show-all-button-box": {
                    "& button": {
                        float: "right",
                    },
                },
            },
        },
        [theme.breakpoints.up("xl")]: {
            "& .best-sellers-LHS": {
                gap: "calc(var(--flex-gap))"
            },
        }
    }
})