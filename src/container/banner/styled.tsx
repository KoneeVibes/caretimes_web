import { Stack, styled } from "@mui/material";

export const BannerWrapper = styled(Stack)(({ theme }) => {
    return {
        flexDirection: "column-reverse",
        "& .banner-LHS": {
            flex: 0.55,
            overflow: "hidden",
            "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }
        },
        "& .banner-RHS": {
            flex: 0.45,
            background: "linear-gradient(90deg, var(--cream-blend-variant-color) 0%, var(--off-primary-color) 100%)",
            justifyContent: "center",
            alignContent: "center",
            padding: "calc(var(--basic-padding)/2)",
            overflow: "hidden",
        },
        [theme.breakpoints.up("tablet")]: {
            flexDirection: "row"
        }
    }
})