import {
	Box,
	CircularProgress,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { SavedItemsWrapper } from "./styled";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { BaseButton } from "../../component/button/styled";
import { ArrowForward } from "@mui/icons-material";
import Cookies from "universal-cookie";
import { retrieveCategoryByIdService } from "../../util/category/retrieveCategoryById";
import { retrieveAllProductInCartService } from "../../util/cart/retrieveAllProduct";
import { retrieveProductByIdService } from "../../util/product/retrieveProductById";
import { useQuery } from "@tanstack/react-query";
import { deleteProductService } from "../../util/cart/deleteProduct";
import { useEffect, useState } from "react";

export const SavedItems = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

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
					const product = await retrieveProductByIdService(
						TOKEN,
						cart?.productId
					);
					const category = await retrieveCategoryByIdService(
						TOKEN,
						product.category
					);
					return {
						...product,
						cartId: cart?.id ?? null,
						quantity: cart?.quantity ?? 0,
						category: category?.name ?? null,
					};
				} catch (error) {
					console.error(`Error fetching category`, error);
				}
			})
		);
		return productsWithCategoryNames;
	};

	const { data: allProduct, refetch } = useQuery({
		queryKey: ["products-in-cart-with-categories", TOKEN],
		queryFn: () => fetchProductsInCartWithCategories(TOKEN),
	});

	useEffect(() => {
		refetch();
	}, [lastClicked, refetch]);

	const handleNavigateToCheckout = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
	};

	const handleRemoveFromCart = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		cartItemId: string
	) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		setlastClicked(cartItemId);
		try {
			const response = await deleteProductService(TOKEN, cartItemId);
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
		<SavedItemsWrapper>
			<Stack
				direction={{ miniTablet: "row" }}
				gap={"calc(var(--flex-gap)/4)"}
				justifyContent={"space-between"}
				className="saved-products-header"
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
						Saved Items
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
				<Box component={"div"} className="saved-products-check-out-button-box">
					<BaseButton
						radius="64px"
						variant="outlined"
						onClick={handleNavigateToCheckout}
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
							Checkout Items
						</Typography>
					</BaseButton>
				</Box>
			</Stack>
			<Grid
				container
				component={"div"}
				justifyContent={"space-between"}
				spacing={"calc(var(--flex-gap)/4)"}
			>
				{allProduct?.map((product, index) => {
					return (
						<Grid
							key={index}
							component={"div"}
							className="saved-product-grid-item"
							size={{ mobile: 12, miniTablet: 6, laptop: 2.5 }}
						>
							<Stack className="saved-product-grid-item-body">
								<Box component={"div"} className="saved-product-thumbnail-box">
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
											fontFamily={"Inter"}
											fontWeight={600}
											fontSize={16}
											lineHeight={"normal"}
											whiteSpace={"normal"}
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
											{`₦${formatAmountDisplay(product?.price)}`}
										</Typography>
									</Box>
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
						</Grid>
					);
				})}
			</Grid>
		</SavedItemsWrapper>
	);
};
