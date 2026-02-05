import { useEffect, useMemo, useState } from "react";
import {
	Box,
	CircularProgress,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { BestSellersWrapper } from "./styled";
import { BaseButton } from "../../component/button/styled";
import { ArrowForward } from "@mui/icons-material";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { retrieveAllCategoryService } from "../../util/category/retrieveAllCategory";
import Cookies from "universal-cookie";
import { retrieveAllProductService } from "../../util/product/retrieveAllProduct";
import { retrieveCategoryByIdService } from "../../util/category/retrieveCategoryById";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addProductService } from "../../util/cart/addProduct";
import { useRequireAuth } from "../../helper/requireAuthentication";

export const BestSellers = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { requireAuth } = useRequireAuth();
	const matches = useMediaQuery("(max-width:250px)");

	const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
	const [categories, setCategories] = useState<Record<string, any>[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);
	const [lastClicked, setlastClicked] = useState<Record<string, any> | null>(
		null,
	);

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

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const response = await retrieveAllCategoryService();
				if (!mounted) return;
				setCategories(response);
			} catch (error) {
				console.error("Error fetching categories", error);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [TOKEN]);

	const fetchProductsWithCategories = async () => {
		const allProducts = await retrieveAllProductService();
		const productsWithCategoryNames = await Promise.all(
			allProducts.map(async (prod: Record<string, any>) => {
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
		return productsWithCategoryNames;
	};

	const { data: allProduct } = useQuery({
		queryKey: ["products-with-categories", TOKEN],
		queryFn: () => fetchProductsWithCategories(),
	});

	const bestSellers = useMemo(() => {
		if (!allProduct || !categories.length) return [];
		const activeCategory = categories[activeTabIndex];
		if (!activeCategory) return [];
		return (
			allProduct
				// include field to check for the highest number of orders in the order table
				.filter((product) => product.category === activeCategory.name)
				.slice(0, 4)
		);
	}, [allProduct, categories, activeTabIndex]);

	const handleShowAllClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		navigate(`/products?filter=best-seller`);
	};

	const handleTabClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		index: number,
	) => {
		e.stopPropagation();
		return setActiveTabIndex(index);
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
		<BestSellersWrapper>
			<Stack className="best-sellers-LHS">
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
				<Stack gap={"calc(var(--flex-gap)/4)"} justifyContent={"space-between"}>
					{categories?.map((category, index) => {
						return (
							<Box key={index}>
								<BaseButton
									radius="0"
									variant="outlined"
									onClick={(e) => handleTabClick(e, index)}
									endIcon={<ArrowForward />}
									colour={
										activeTabIndex === index
											? "var(--primary-color)"
											: "var(--subtitle-gray-color)"
									}
									border={"none"}
									padding="calc(var(--basic-padding)/9.5) 0"
									sx={{
										borderBottom:
											activeTabIndex === index
												? "1px solid var(--primary-color)"
												: "none",
										width: {
											mobile: matches ? "100%" : "11rem",
											laptop: "11rem",
										},
										justifyContent: "space-between",
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
										{category?.name}
									</Typography>
								</BaseButton>
							</Box>
						);
					})}
				</Stack>
			</Stack>
			<Stack className="best-sellers-RHS">
				<Box component={"div"} className="best-sellers-show-all-button-box">
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
								<Stack className="best-seller-grid-item-body">
									<Box component={"div"} className="best-seller-thumbnail-box">
										<img src={bestSeller?.images?.[0]} alt={bestSeller?.name} />
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
											{/* <Stack
												direction="row"
												gap={"calc(var(--flex-gap)/32)"}
												marginBlockEnd={"calc(var(--basic-margin)/16)"}
												overflow={"hidden"}
											>
												{[...Array(5)].map((_, i) => (
													<Fragment key={i}>
														{i < product?.rating ? (
															<StarIcon
																sx={{
																	color: "var(--active-rating-color)",
																	fontSize: 20,
																}}
															/>
														) : (
															<StarBorderIcon
																sx={{
																	color: "var(--subtitle-gray-color)",
																	fontSize: 20,
																}}
															/>
														)}
													</Fragment>
												))}
											</Stack> */}
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
					})}
				</Grid>
			</Stack>
		</BestSellersWrapper>
	);
};
