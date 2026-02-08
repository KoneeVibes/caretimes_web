import {
	Box,
	CircularProgress,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { FeaturedProductsWrapper } from "./styled";
import { BaseButton } from "../../component/button/styled";
import { ArrowForward } from "@mui/icons-material";
import { featuredProducts } from "../../config/static";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { useNavigate } from "react-router-dom";
import { useRequireAuth } from "../../helper/requireAuthentication";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductService } from "../../util/cart/addProduct";
import { retrieveAllProductService } from "../../util/product/retrieveAllProduct";
import { retrieveCategoryByIdService } from "../../util/category/retrieveCategoryById";

export const FeaturedProducts = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { requireAuth } = useRequireAuth();
	const matches = useMediaQuery("(max-width:250px)");

	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);
	const [lastClicked, setlastClicked] = useState<Record<string, any> | null>(
		null,
	);

	const { data: bestSellers } = useQuery({
		queryKey: ["best-sellers", TOKEN],
		queryFn: async () => {
			const allProducts = await retrieveAllProductService();
			const productsWithCategoryNames = await Promise.all(
				allProducts?.data.map(async (prod: Record<string, any>) => {
					if (!prod.category) return prod;
					try {
						const response = await retrieveCategoryByIdService(prod.category);
						return {
							...prod,
							category: response?.name ?? null,
						};
					} catch (error) {
						console.error(`Error fetching category: ${prod.category}`, error);
						return {
							...prod,
							category: null,
						};
					}
				}),
			);
			return (
				productsWithCategoryNames
					// include field to check for the highest number of orders in the order table
					.slice(0, 4)
			);
		},
	});

	const addToCartMutation = useMutation({
		mutationFn: (product: Record<string, any>) =>
			addProductService(TOKEN, product),
		onSuccess: () => {
			setIsLoading(false);
			queryClient.invalidateQueries({
				queryKey: ["products-in-cart-with-categories", TOKEN],
			});
		},
		onError: (error: any) => {
			setIsLoading(false);
			setError(`Add to cart failed. ${error.message}`);
		},
	});

	const handleBrowseProducts = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		navigate(`/products`);
	};

	const handleShopNow = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		category: string[],
	) => {
		e.stopPropagation();
		navigate(`/products?category=${category.join(",")}`);
	};

	const handleAddToCart = (
		e: React.MouseEvent<HTMLButtonElement>,
		product: Record<string, any>,
	) => {
		e.preventDefault();
		if (!requireAuth(TOKEN)) return;
		setIsLoading(true);
		setlastClicked(product);
		addToCartMutation.mutate(product);
	};

	return (
		<FeaturedProductsWrapper>
			<Stack
				direction={{ miniTablet: "row" }}
				gap={"calc(var(--flex-gap)/4)"}
				justifyContent={"space-between"}
				className="featured-products-header"
			>
				<Box component={"div"}>
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
								minHeight: { mobile: "20rem" },
							}}
						>
							<Stack className="featured-products-category-grid-item-body">
								<Box component={"div"}>
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
								<Box sx={{ display: "flex", overflow: "hidden" }}>
									<BaseButton
										radius="0"
										variant="contained"
										bgcolor="transparent"
										onClick={(e) => handleShopNow(e, product.category)}
										padding="calc(var(--basic-padding)/9.5) 0"
										sx={{ borderBottom: "1px solid var(--light-color)" }}
									>
										Shop Now
									</BaseButton>
								</Box>
							</Stack>
						</Box>
					);
				})}
			</Box>
			<Stack className="featured-products">
				<Grid
					container
					component={"div"}
					spacing={"calc(var(--flex-gap)/4)"}
					justifyContent={"space-between"}
				>
					{bestSellers?.map(
						(bestSeller: Record<string, any>, index: number) => {
							return (
								<Grid
									key={index}
									component={"div"}
									className="featured-product-grid-item"
									size={{ mobile: 12, miniTablet: 6, laptop: 2 }}
								>
									<Stack className="featured-product-grid-item-body">
										<Box
											component={"div"}
											className="featured-product-thumbnail-box"
										>
											<img
												src={bestSeller?.images?.[0]}
												alt={bestSeller?.name}
											/>
										</Box>
										<Stack gap={"calc(var(--flex-gap)/8)"}>
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
											<Box sx={{ display: "flex", overflow: "hidden" }}>
												<BaseButton
													disableElevation
													variant="contained"
													sx={{ width: "100%" }}
													onClick={(e) =>
														handleAddToCart(e, {
															product: bestSeller?.id,
															quantity: 1,
															price: bestSeller?.price,
														})
													}
												>
													{isLoading &&
													lastClicked?.product === bestSeller?.id ? (
														<CircularProgress
															color="inherit"
															className="loader"
														/>
													) : (
														<Typography
															variant={"button"}
															fontFamily={"inherit"}
															fontWeight={"inherit"}
															fontSize={"inherit"}
															lineHeight={"inherit"}
															color={"inherit"}
															textTransform={"inherit"}
														>
															Add to Cart
														</Typography>
													)}
												</BaseButton>
											</Box>
										</Stack>
									</Stack>
								</Grid>
							);
						},
					)}
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
		</FeaturedProductsWrapper>
	);
};
