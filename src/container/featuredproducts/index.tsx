import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { FeaturedProductsWrapper } from "./styled";
import { BaseButton } from "../../component/button/styled";
import { ArrowForward } from "@mui/icons-material";
import { bestSellers, featuredProducts } from "../../config/static";
import { Fragment } from "react/jsx-runtime";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const FeaturedProducts = () => {
    const matches = useMediaQuery('(max-width:250px)');

    const handleBrowseProducts = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <FeaturedProductsWrapper>
            <Stack
                direction={{ miniTablet: "row" }}
                gap={"calc(var(--flex-gap)/4)"}
                justifyContent={"space-between"}
                className="featured-products-header"
            >
                <Box
                    component={"div"}
                >
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
                        Featured Products
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
                        Explore our new selling products
                    </Typography>
                </Box>
                <Box
                    component={"div"}
                    className="featured-products-header-browse-products-button-box"
                >
                    <BaseButton
                        radius="64px"
                        variant="outlined"
                        onClick={handleBrowseProducts}
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
                            Browse Products
                        </Typography>
                    </BaseButton>
                </Box>
            </Stack>
            <Box
                component="div"
                className="featured-products-category"
                sx={{
                    display: "grid",
                    gridTemplateAreas: {
                        mobile: `"one" "two" "three" "four"`,
                        miniTablet: `"one two" "three four"`,
                        laptop: `"one two two" "one three four"`,
                    },
                    gridTemplateColumns: {
                        mobile: "1fr",
                        miniTablet: "1fr 1fr",
                        laptop: "2fr 1fr 1fr",
                    },
                    gap: "calc(var(--flex-gap)/4)",
                }}
            >
                {featuredProducts?.slice(0, 4).map((product, index) => {
                    return (
                        <Box
                            key={index}
                            component={"div"}
                            className="featured-products-category-grid-item"
                            sx={{
                                gridArea: product.position,
                                backgroundImage: `url(${product?.thumbnail})`,
                                minHeight: { mobile: "20rem" }
                            }}
                        >
                            <Stack
                                className="featured-products-category-grid-item-body"
                            >
                                <Box
                                    component={"div"}
                                >
                                    <Typography
                                        variant="caption"
                                        fontFamily={"Inter"}
                                        fontWeight={600}
                                        fontSize={20}
                                        lineHeight={"normal"}
                                        whiteSpace={"normal"}
                                        color={"var(--off-light-color)"}
                                        display={"inline-block"}
                                        width={"100%"}
                                    >
                                        {product?.name}
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontFamily={"Inter"}
                                        fontWeight={500}
                                        fontSize={14}
                                        lineHeight={"normal"}
                                        whiteSpace={"normal"}
                                        color={"var(--off-light-color)"}
                                    >
                                        {product?.description}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{ display: "flex", overflow: "hidden" }}
                                >
                                    <BaseButton
                                        radius="0"
                                        variant="contained"
                                        bgcolor="transparent"
                                        padding="calc(var(--basic-padding)/9.5) 0"
                                        sx={{ borderBottom: "1px solid var(--light-color)" }}
                                    >
                                        Shop Now
                                    </BaseButton>
                                </Box>
                            </Stack>
                        </Box>
                    )
                })}
            </Box>
            <Stack
                className="featured-products"
            >
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
                                className="featured-product-grid-item"
                                size={{ mobile: 12, miniTablet: 6, laptop: 2 }}
                            >
                                <Stack
                                    className="featured-product-grid-item-body"
                                >
                                    <Box
                                        component={"div"}
                                        className="featured-product-thumbnail-box"
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
                <Box
                    component={"div"}
                    className="featured-products-browse-products-button-box"
                >
                    <BaseButton
                        radius="64px"
                        variant="outlined"
                        onClick={handleBrowseProducts}
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
                            Browse Products
                        </Typography>
                    </BaseButton>
                </Box>
            </Stack>
        </FeaturedProductsWrapper >
    )
}