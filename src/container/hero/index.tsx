import { HeroWrapper } from "./styled";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { heroInfo } from "../../config/static";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { BaseButton } from "../../component/button/styled";
import { Fragment } from "react/jsx-runtime";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const Hero = () => {
    return (
        <HeroWrapper>
            <Carousel
                autoPlay={true}
                autoFocus={true}
                infiniteLoop={true}
                interval={2000}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={(clickHandler, hasPrev, label) => {
                    return (
                        <Box
                            component={"div"}
                            className="carousel-arrow carousel-arrow-prev"
                        >
                            <IconButton
                                size="large"
                                color="inherit"
                                sx={{
                                    color: "var(--primary-color)",
                                    padding: 0
                                }}
                                onClick={clickHandler}
                            >
                                <ArrowBack />
                            </IconButton>
                        </Box>
                    )
                }}
                renderArrowNext={(clickHandler, hasNext, label) => {
                    return (
                        <Box
                            component={"div"}
                            className="carousel-arrow carousel-arrow-next"
                        >
                            <IconButton
                                size="large"
                                color="inherit"
                                sx={{
                                    color: "var(--primary-color)",
                                    padding: 0
                                }}
                                onClick={clickHandler}
                            >
                                <ArrowForward />
                            </IconButton>
                        </Box>
                    )
                }}
            >
                {heroInfo.map((item, index) => {
                    return (
                        <Stack
                            key={index}
                            className="hero-stack"
                        >
                            <Box
                                component={"div"}
                                className="hero-stack-LHS"
                            >
                                <Stack
                                    className="hero-stack-LHS-content"
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
                                            color={"var(--primary-color)"}
                                        >
                                            {item.subtitle}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h1"
                                            fontFamily={"Cormorant"}
                                            fontWeight={500}
                                            fontSize={{ mobile: 45, miniTablet: 60, desktop: 72 }}
                                            lineHeight={"normal"}
                                            textAlign={"left"}
                                            whiteSpace={"normal"}
                                            color={"var(--primary-color)"}
                                        >
                                            {(() => {
                                                const words = item.title.split(" ");
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
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="body1"
                                            fontFamily={"Inter"}
                                            fontWeight={400}
                                            fontSize={14}
                                            lineHeight={"normal"}
                                            textAlign={"left"}
                                            whiteSpace={"normal"}
                                            color={"var(--text-gray-color)"}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{ display: "flex", overflow: "hidden" }}
                                    >
                                        <BaseButton
                                            variant="contained"
                                        >
                                            {item.callToActionText}
                                        </BaseButton>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box
                                component={"div"}
                                className="hero-stack-RHS"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                />
                            </Box>
                        </Stack>
                    )
                })}
            </Carousel >
        </HeroWrapper >
    )
}