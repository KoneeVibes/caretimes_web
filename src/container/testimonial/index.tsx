import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { TestimonialWrapper } from "./styled";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { testimonial } from "../../config/static";
import { BaseButton } from "../../component/button/styled";

export const Testimonial = () => {
    const sets = [];
    const maxCategoriesPerSet = 3;

    for (let i = 0; i < testimonial.length; i += maxCategoriesPerSet) {
        sets.push(testimonial.slice(i, i + maxCategoriesPerSet));
    };

    const matches = useMediaQuery('(max-width:280px)');

    const handleLeaveAReview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <TestimonialWrapper>
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
                {sets?.map((set, index) => {
                    return (
                        <Stack
                            key={index}
                            className="testimony-box"
                        >
                            <Box
                                width={{ laptop: "75%", desktop: "60%" }}
                                marginLeft={matches ? "unset" : "auto"}
                                marginRight={matches ? "unset" : "auto"}
                                className="testimony-box-lead-review"
                            >
                                <Typography
                                    variant="h2"
                                    fontFamily={"Cormorant"}
                                    fontWeight={400}
                                    fontSize={{ mobile: 32, miniTablet: 40, tablet: 45, desktop: 48 }}
                                    lineHeight={"normal"}
                                    textAlign={"center"}
                                    whiteSpace={"normal"}
                                    color={"var(--dark-variant-color)"}
                                >
                                    “Since I used Caretimes Products I have never felt so good...”
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily={"Inter"}
                                    fontWeight={400}
                                    fontSize={18}
                                    lineHeight={"normal"}
                                    textAlign={"center"}
                                    whiteSpace={"normal"}
                                    color={"var(--primary-color)"}
                                    marginBlockStart={"calc(var(--basic-margin)/8)"}
                                >
                                    Customer Reviews
                                </Typography>
                            </Box>
                            <Stack
                                key={index}
                                direction={{ laptop: "row" }}
                                className="reviews-stack"
                            >
                                {set?.map((detail, index) => (
                                    <Stack
                                        key={index}
                                        className="review-stack"
                                        padding={{
                                            mobile: "calc(var(--basic-padding)/3)",
                                            laptop: (index === 0) ? "calc(var(--basic-padding)/3) calc(var(--basic-padding)/3) calc(var(--basic-padding)/3) 0" : (index === set.length - 1) ? "calc(var(--basic-padding)/3) 0 calc(var(--basic-padding)/3) calc(var(--basic-padding)/3)" : "calc(var(--basic-padding)/3)"
                                        }}
                                        borderLeft={{ mobile: "2px solid var(--primary-color)", laptop: (index !== 0) ? "2px solid var(--primary-color)" : "none" }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="body1"
                                                fontFamily={"Inter"}
                                                fontWeight={500}
                                                fontSize={{ mobile: 14 }}
                                                lineHeight={"normal"}
                                                whiteSpace={"normal"}
                                                textAlign={"left"}
                                                color={"var(--text-gray-color)"}
                                            >
                                                {detail.review}
                                            </Typography>
                                        </Box>
                                        <Stack
                                            direction={{ mobile: "column-reverse", miniTablet: "row" }}
                                            gap={"calc(var(--flex-gap)/4)"}
                                            alignItems={{ mobile: "center" }}
                                            justifyContent={"space-between"}
                                        >
                                            <Stack
                                                gap={"calc(var(--flex-gap)/16)"}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    fontFamily={"Inter"}
                                                    fontWeight={600}
                                                    fontSize={{ mobile: 18 }}
                                                    lineHeight={"normal"}
                                                    whiteSpace={"normal"}
                                                    textAlign={{ mobile: "center", miniTablet: "left" }}
                                                    color={"var(--primary-color)"}
                                                >
                                                    {detail.customer}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    fontFamily={"Inter"}
                                                    fontWeight={400}
                                                    fontSize={{ mobile: 12 }}
                                                    lineHeight={"normal"}
                                                    whiteSpace={"normal"}
                                                    textAlign={{ mobile: "center", miniTablet: "left" }}
                                                    color={"var(--off-dark-color)"}
                                                >
                                                    {detail.title}
                                                </Typography>
                                            </Stack>
                                            <Box>
                                                <img
                                                    src={detail.headshot}
                                                    alt="reviewer headshot"
                                                    style={{ width: "80px", height: "80px", borderRadius: "100px" }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                            <Box
                                component={"div"}
                                className="leave-a-review-button-box"
                            >
                                <BaseButton
                                    radius="64px"
                                    variant="outlined"
                                    onClick={handleLeaveAReview}
                                    endIcon={<ArrowForward />}
                                    colour="var(--primary-color)"
                                    sx={{
                                        width: matches ? "100%" : "auto",
                                    }}
                                >
                                    <Typography
                                        variant={"button"}
                                        fontFamily={"inherit"}
                                        fontWeight={"inherit"}
                                        fontSize={"inherit"}
                                        lineHeight={"inherit"}
                                        color={"inherit"}
                                        textTransform={"inherit"}
                                    >
                                        Leave a review
                                    </Typography>
                                </BaseButton>
                            </Box>
                        </Stack>
                    )
                })}
            </Carousel>
        </TestimonialWrapper>
    )
}