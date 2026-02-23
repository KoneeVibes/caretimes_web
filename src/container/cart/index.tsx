import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { CartWrapper } from "./styled";
import { retrieveAllProductInCartService } from "../../util/cart/retrieveAllProduct";
import { retrieveProductByIdService } from "../../util/product/retrieveProductById";
import { retrieveCategoryByIdService } from "../../util/category/retrieveCategoryById";
import Cookies from "universal-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseButton } from "../../component/button/styled";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PriceIcon } from "../../asset";
import { useRequireAuth } from "../../helper/requireAuthentication";
import { updateProductService } from "../../util/cart/updateProduct";
import { deleteProductService } from "../../util/cart/deleteProduct";
import { retrieveAllProductService } from "../../util/product/retrieveAllProduct";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { addProductService } from "../../util/cart/addProduct";

export const Cart = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { requireAuth } = useRequireAuth();
	const matches = useMediaQuery("(max-width:250px)");

	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);
	const [lastClicked, setlastClicked] = useState<string | null>(null);

	const fetchProductsInCartWithCategories = async (TOKEN: string) => {
		const allCartItem = await retrieveAllProductInCartService(TOKEN);
		const productsWithCategoryNames = await Promise.all(
			allCartItem?.map(async (cart: Record<string, any>) => {
				try {
					const product = await retrieveProductByIdService(cart?.productId);
					const category = await retrieveCategoryByIdService(product.category);
					return {
						...product,
						cartId: cart?.id ?? null,
						quantity: cart?.quantity ?? 0,
						unitPrice: cart?.unitPrice ?? 0,
						category: category?.name ?? null,
					};
				} catch (error) {
					console.error(`Error fetching category`, error);
				}
			}),
		);
		return productsWithCategoryNames;
	};

	const { data: allProduct, refetch } = useQuery({
		queryKey: ["products-in-cart-with-categories", TOKEN],
		queryFn: () => {
			const products = fetchProductsInCartWithCategories(TOKEN);
			return products;
		},
	});

	useEffect(() => {
		refetch();
	}, [lastClicked, refetch]);

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

	const manageQuantityMutation = useMutation({
		mutationFn: ({
			productId,
			price,
			quantity,
		}: {
			productId: string;
			price: number;
			quantity: number;
		}) => {
			return updateProductService(TOKEN, productId, {
				price,
				quantity,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products-in-cart-with-categories", TOKEN],
			});
		},
		onError: (error: any) => {
			setError(`Cart update failed. ${error.message}`);
		},
	});

	const manageQuantity = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: "increment" | "decrement",
		cartItem: Record<string, any>,
	) => {
		e.preventDefault();
		if (!requireAuth(TOKEN)) return;
		let qty: number;
		switch (action) {
			case "increment":
				qty = cartItem.quantity + 1;
				break;
			case "decrement":
				qty = Math.max(0, cartItem.quantity - 1);
				break;
			default:
				return;
		}
		manageQuantityMutation.mutate({
			productId: cartItem.product,
			price: cartItem.price,
			quantity: qty,
		});
	};

	const totalCartPrice = useMemo(() => {
		if (!Array.isArray(allProduct)) return 0;
		return allProduct.reduce((sum, item) => {
			const quantity = Number(item.quantity) || 0;
			const price = Number(item.unitPrice) || 0;
			return sum + quantity * price;
		}, 0);
	}, [allProduct]);

	const handleBrowseProducts = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		navigate(`/product`);
	};

	const handleNavigateToProductDetail = (
		e:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.MouseEvent<HTMLHeadingElement, MouseEvent>,
		productId: string,
	) => {
		e.preventDefault();
		navigate(`/product/${productId}`);
	};

	const handleAddToCart = (
		e: React.MouseEvent<HTMLButtonElement>,
		product: Record<string, any>,
	) => {
		e.preventDefault();
		if (!requireAuth(TOKEN)) return;
		setIsLoading(true);
		setlastClicked(product?.product);
		addToCartMutation.mutate(product);
	};

	const handleRemoveFromCart = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		cartId: string,
	) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		setlastClicked(cartId);
		try {
			const response = await deleteProductService(TOKEN, cartId);
			if (response.status !== "success") {
				throw new Error("Action: Remove from cart failed. Please try again.");
			}
			// setIsAlertModalOpen(true);
		} catch (error: any) {
			setError(`Remove from cart failed. ${error.message}`);
			console.error("Remove from cart failed:", error);
		} finally {
			setIsLoading(false);
			setlastClicked(null);
		}
	};

	return (
		<CartWrapper>
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
					Account
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
					Cart
				</Typography>
			</Box>
			<Stack className="main-area">
				<Stack className="main-area-LHS">
					{allProduct?.map((product, index) => {
						return (
							<Stack key={index} className="main-area-LHS-body">
								<Stack className="cart-product-description">
									<Box component={"div"} className="product-thumbnail-box">
										<img src={product?.images?.[0]} alt={product?.name} />
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
												{product?.category}
											</Typography>
											<Typography
												variant="h3"
												component={"h3"}
												fontFamily={"Inter"}
												fontWeight={600}
												fontSize={16}
												lineHeight={"normal"}
												whiteSpace={"normal"}
												sx={{ cursor: "pointer" }}
												color={"var(--off-primary-color)"}
											>
												{product?.name}
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
												{`₦${formatAmountDisplay(product?.unitPrice)}`}
											</Typography>
										</Box>
									</Stack>
								</Stack>
								<Stack className="cart-product-call-to-action">
									<Stack direction="row" overflow={"hidden"}>
										<Box sx={{ display: "flex", overflow: "hidden" }}>
											<IconButton
												onClick={(e) =>
													manageQuantity(e, "decrement", {
														product: product?.id,
														quantity: product?.quantity,
														price: product?.unitPrice,
													})
												}
												sx={{
													border: "1px solid var(--border-primary-color)",
													display: "inline-flex",
												}}
											>
												<RemoveIcon
													sx={{
														color: "var(--off-primary-color)",
														display: "inline-flex",
													}}
												/>
											</IconButton>
										</Box>
										<Box
											sx={{
												display: "flex",
												overflow: "hidden",
												alignItems: "center",
												justifyContent: "center",
												height: "-webkit-fill-available",
												padding:
													"calc(var(--basic-padding)/9.5) calc(var(--basic-padding)/4.75)",
											}}
										>
											<Typography
												variant="caption"
												fontFamily={"Inter"}
												fontWeight={500}
												fontSize={14}
												lineHeight={"normal"}
												whiteSpace={"normal"}
												color={"var(--off-primary-color)"}
												display={"inline-block"}
												width={"100%"}
											>
												{product?.quantity}
											</Typography>
										</Box>
										<Box sx={{ display: "flex", overflow: "hidden" }}>
											<IconButton
												onClick={(e) =>
													manageQuantity(e, "increment", {
														product: product?.id,
														quantity: product?.quantity,
														price: product?.unitPrice,
													})
												}
												sx={{
													border: "1px solid var(--border-primary-color)",
													display: "inline-flex",
												}}
											>
												<AddIcon
													sx={{
														color: "var(--off-primary-color)",
														display: "inline-flex",
													}}
												/>
											</IconButton>
										</Box>
									</Stack>
									<Box sx={{ display: "flex", overflow: "hidden" }}>
										<BaseButton
											disableElevation
											variant="contained"
											sx={{ width: "100%" }}
											onClick={(e) => handleRemoveFromCart(e, product?.cartId)}
										>
											{isLoading && lastClicked === product?.cartId ? (
												<CircularProgress color="inherit" className="loader" />
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
													Remove from Cart ({product?.quantity})
												</Typography>
											)}
										</BaseButton>
									</Box>
								</Stack>
							</Stack>
						);
					})}
				</Stack>
				<Stack className="main-area-RHS">
					<Stack direction={"row"} gap={"calc(var(--flex-gap)/8)"}>
						<Box>
							<PriceIcon />
						</Box>
						<Box>
							<Typography
								variant="h4"
								fontFamily={"Inter"}
								fontWeight={600}
								fontSize={20}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Pricing Details
							</Typography>
						</Box>
					</Stack>
					<Stack
						direction={"row"}
						gap={"calc(var(--flex-gap)/8)"}
						justifyContent={"space-between"}
					>
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={16}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Subtotal
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="body1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={18}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--primary-color)"}
							>
								₦{totalCartPrice}
							</Typography>
						</Box>
					</Stack>
					<Stack
						direction={"row"}
						gap={"calc(var(--flex-gap)/8)"}
						justifyContent={"space-between"}
					>
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={16}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Delivery Charge
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="body1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={18}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--primary-color)"}
							></Typography>
						</Box>
					</Stack>
					<Stack
						direction={"row"}
						gap={"calc(var(--flex-gap)/8)"}
						justifyContent={"space-between"}
					>
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={16}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Delivery Period
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="body1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={18}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--primary-color)"}
							></Typography>
						</Box>
					</Stack>
					<Stack
						direction={"row"}
						gap={"calc(var(--flex-gap)/8)"}
						justifyContent={"space-between"}
					>
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={600}
								fontSize={18}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Total Cost
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="body1"
								fontFamily={"Inter"}
								fontWeight={600}
								fontSize={18}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={"var(--off-dark-color)"}
							>
								₦{totalCartPrice}
							</Typography>
						</Box>
					</Stack>
					<Box sx={{ display: "flex", overflow: "hidden" }}>
						<BaseButton
							disableElevation
							variant="contained"
							sx={{ width: "100%" }}
							// onClick={(e) => handleRemoveFromCart(e, product?.cartId)}
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
								Proceed to Payment
							</Typography>
						</BaseButton>
					</Box>
				</Stack>
			</Stack>
			<Box borderBottom={"1px solid var(--border-off-primary-color)"} />
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
											onClick={(e) =>
												handleNavigateToProductDetail(e, bestSeller?.id)
											}
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
													component={"h3"}
													fontFamily={"Inter"}
													fontWeight={600}
													fontSize={16}
													lineHeight={"normal"}
													whiteSpace={"normal"}
													sx={{ cursor: "pointer" }}
													color={"var(--off-primary-color)"}
													onClick={(e) =>
														handleNavigateToProductDetail(e, bestSeller?.id)
													}
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
													{isLoading && lastClicked === bestSeller?.id ? (
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
		</CartWrapper>
	);
};
