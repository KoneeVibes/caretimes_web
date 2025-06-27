import { Fragment, useState } from "react";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { BestSellersWrapper } from "./styled";
import { BaseButton } from "../../component/button/styled";
import { ArrowForward } from "@mui/icons-material";
import { bestSellers } from "../../config/static";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";

export const BestSellers = () => {
    const tabs = ["Hair Care Products", "Body Care Products", "Perfumery Products", "Home Care Products"];

    const matches = useMediaQuery('(max-width:250px)');
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const handleShowAllClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
    };

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        return setActiveTabIndex(index);
    };

    return (
        <BestSellersWrapper>
            <Stack
                className="best-sellers-LHS"
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
                        Browse
                    </Typography>
                    <Typography
                        variant="h2"
                        fontFamily={"Cormorant"}
                        fontWeight={500}
                        fontSize={36}
                        lineHeight={"normal"}
                        textAlign={"left"}
                        whiteSpace={"normal"}
                        color={"var(--primary-color)"}
                    >
                        Best Sellers
                    </Typography>
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
                        Explore our array of best selling products
                    </Typography>
                </Box>
                <Stack
                    gap={"calc(var(--flex-gap)/4)"}
                    justifyContent={"space-between"}
                >
                    {tabs?.map((tab, index) => {
                        return (
                            <Box
                                key={index}
                            >
                                <BaseButton
                                    radius="0"
                                    variant="outlined"
                                    onClick={(e) => handleTabClick(e, index)}
                                    endIcon={<ArrowForward />}
                                    colour={activeTabIndex === index ? "var(--primary-color)" : "var(--subtitle-gray-color)"}
                                    border={"none"}
                                    padding="calc(var(--basic-padding)/9.5) 0"
                                    sx={{
                                        borderBottom: activeTabIndex === index ? "1px solid var(--primary-color)" : "none",
                                        width: { mobile: matches ? "100%" : "11rem", laptop: "11rem" },
                                        justifyContent: "space-between"
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
                                        {tab}
                                    </Typography>
                                </BaseButton>
                            </Box>
                        )
                    })}
                </Stack>
            </Stack>
            <Stack
                className="best-sellers-RHS"
            >
                <Box
                    component={"div"}
                    className="best-sellers-show-all-button-box"
                >
                    <BaseButton
                        radius="64px"
                        variant="outlined"
                        onClick={handleShowAllClick}
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
                            See all
                        </Typography>
                    </BaseButton>
                </Box>
                <Grid
                    container
                    component={"div"}
                    spacing={"calc(var(--flex-gap)/4)"}
                    justifyContent={"space-between"}
                >
                    {bestSellers?.slice(0, 4).map((bestSeller, index) => {
                        return (
                            <Grid
                                key={index}
                                component={"div"}
                                className="best-seller-grid-item"
                                size={{ mobile: 12, miniTablet: 6, laptop: 2 }}
                            >
                                <Stack
                                    className="best-seller-grid-item-body"
                                >
                                    <Box
                                        component={"div"}
                                        className="best-seller-thumbnail-box"
                                    >
                                        <img
                                            src={bestSeller?.thumbnail}
                                            alt={bestSeller?.name}
                                        />
                                    </Box>
                                    <Stack
                                        gap={"calc(var(--flex-gap)/8)"}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                fontFamily={"Inter"}
                                                fontWeight={600}
                                                fontSize={12}
                                                lineHeight={"normal"}
                                                whiteSpace={"normal"}
                                                color={"var(--subtitle-gray-color)"}
                                                display={"inline-block"}
                                                width={"100%"}
                                            >
                                                {bestSeller?.category}
                                            </Typography>
                                            <Typography
                                                variant="h3"
                                                fontFamily={"Inter"}
                                                fontWeight={600}
                                                fontSize={16}
                                                lineHeight={"normal"}
                                                whiteSpace={"normal"}
                                                color={"var(--off-primary-color)"}
                                            >
                                                {bestSeller?.name}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Stack
                                                direction="row"
                                                gap={"calc(var(--flex-gap)/32)"}
                                                marginBlockEnd={"calc(var(--basic-margin)/16)"}
                                                overflow={"hidden"}
                                            >
                                                {[...Array(5)].map((_, i) => (
                                                    <Fragment key={i}>
                                                        {i < bestSeller?.rating ? (
                                                            <StarIcon
                                                                sx={{ color: "var(--active-rating-color)", fontSize: 20 }}
                                                            />
                                                        ) : (
                                                            <StarBorderIcon
                                                                sx={{ color: "var(--subtitle-gray-color)", fontSize: 20 }}
                                                            />
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </Stack>
                                            <Typography
                                                variant="caption"
                                                fontFamily={"Inter"}
                                                fontWeight={600}
                                                fontSize={16}
                                                lineHeight={"normal"}
                                                whiteSpace={"normal"}
                                                color={"var(--off-primary-color)"}
                                                display={"inline-block"}
                                                width={"100%"}
                                            >
                                                {`₦${formatAmountDisplay(bestSeller?.price)}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{ display: "flex", overflow: "hidden" }}
                                        >
                                            <BaseButton
                                                disableElevation
                                                variant="contained"
                                                sx={{ width: "100%" }}
                                            >
                                                Add to Cart
                                            </BaseButton>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Grid>
                        )
                    })}
                </Grid>
            </Stack>
        </BestSellersWrapper >
    )
}