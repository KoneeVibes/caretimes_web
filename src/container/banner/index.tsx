import { Box, Stack, Typography } from "@mui/material";
import { BannerWrapper } from "./styled";
import bannerImg from "../../asset/image/banner-img.svg";
import { Fragment } from "react/jsx-runtime";
import { BaseButton } from "../../component/button/styled";

export const Banner = () => {
    const title = "Wholesale Deals Free Shipping";

    return (
        <BannerWrapper>
            <Box
                component={"div"}
                className="banner-LHS"
            >
                <img
                    src={bannerImg}
                    alt="caretimes-banner"
                />
            </Box>
            <Stack
                className="banner-RHS"
            >
                <Stack
                    gap={"calc(var(--flex-gap)/2)"}
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontFamily={"Inter"}
                            fontWeight={400}
                            fontSize={18}
                            lineHeight={"normal"}
                            textAlign={"left"}
                            whiteSpace={"normal"}
                            color={"var(--cream-blend-inverse-color)"}
                        >
                            Explore
                        </Typography>
                        <Typography
                            variant="h2"
                            fontFamily={"Cormorant"}
                            fontWeight={500}
                            fontSize={{ mobile: 45, miniTablet: 60, desktop: 72 }}
                            lineHeight={"normal"}
                            textAlign={"left"}
                            whiteSpace={"normal"}
                            color={"var(--cream-blend-inverse-color)"}
                            marginBlock={"calc(var(--basic-margin)/4)"}
                        >
                            {(() => {
                                const words = title.split(" ");
                                const lastWord = words.pop();
                                const firstPart = words.join(" ");
                                return (
                                    <Fragment>
                                        {firstPart}{" "}
                                        <Typography
                                            component={"span"}
                                            fontFamily={"inherit"}
                                            fontWeight={400}
                                            fontStyle={"italic"}
                                            fontSize={"inherit"}
                                            lineHeight={"inherit"}
                                            textAlign={"inherit"}
                                            whiteSpace={"inherit"}
                                            color={"inherit"}
                                        >
                                            {lastWord}
                                        </Typography>
                                    </Fragment>
                                );
                            })()}
                        </Typography>
                        <Typography
                            variant="body1"
                            fontFamily={"Inter"}
                            fontWeight={400}
                            fontSize={14}
                            lineHeight={"normal"}
                            textAlign={"left"}
                            whiteSpace={"normal"}
                            color={"var(--light-color)"}
                        >
                            Get the best of all our products in a full package tailored just for you alone at best prices and delivery to your doorstep or market place directly from our factory
                        </Typography>
                    </Box>
                    <Box
                        sx={{ display: "flex", overflow: "hidden" }}
                    >
                        <BaseButton
                            variant="contained"
                            border="none"
                            disableElevation
                            bgcolor="var(--active-rating-color)"
                        >
                            Shop Wholesale deals
                        </BaseButton>
                    </Box>
                </Stack>
            </Stack>
        </BannerWrapper>
    )
}