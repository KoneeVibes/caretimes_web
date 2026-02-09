import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { ProductDescriptionWrapper } from "./styled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { retrieveProductByIdService } from "../../util/product/retrieveProductById";
import { retrieveProductByIdService as retrieveProductFromCartById } from "../../util/cart/retrieveProductById";
import { retrieveCategoryByIdService } from "../../util/category/retrieveCategoryById";
import { Fragment } from "react/jsx-runtime";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { BaseButton } from "../../component/button/styled";
import { useRequireAuth } from "../../helper/requireAuthentication";
import Cookies from "universal-cookie";
import { updateProductService } from "../../util/cart/updateProduct";

export const ProductDescription = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const { id = "" } = useParams();
	const queryClient = useQueryClient();
	const { requireAuth } = useRequireAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formDetails, setFormDetails] = useState({
		quantity: "0",
	});

	useEffect(() => {
		const fetchProductInCart = async () => {
			if (!id.trim()) return;
			try {
				const product = await retrieveProductFromCartById(TOKEN, id);
				setFormDetails((prev) => ({
					...prev,
					quantity: product?.quantity ? product.quantity.toString() : "0",
				}));
			} catch (error) {
				console.error(`Error fetching product in cart`, error);
			}
		};
		fetchProductInCart();
	}, [TOKEN, id]);

	const fetchProductWithCategory = async (id: string) => {
		if (!id.trim()) return;
		try {
			const product = await retrieveProductByIdService(id);
			const category = await retrieveCategoryByIdService(product.category);
			return {
				...product,
				category: category?.name ?? null,
			};
		} catch (error) {
			console.error(
				`Error fetching Product - ${product?.name}, Category - ${product?.category}`,
				error,
			);
		}
	};

	const { data: product } = useQuery({
		queryKey: ["product-with-category", id],
		queryFn: () => fetchProductWithCategory(id),
	});

	const manageQuantity = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: "increment" | "decrement",
	) => {
		e.preventDefault();
		setFormDetails((prev) => {
			const currentQuantity = parseInt(prev.quantity, 10);
			let newQuantity = currentQuantity;
			if (action === "increment") {
				newQuantity = currentQuantity + 1;
			} else if (action === "decrement") {
				newQuantity = Math.max(0, currentQuantity - 1);
			}
			return {
				...prev,
				quantity: newQuantity.toString(),
			};
		});
	};

	const addToCartMutation = useMutation({
		mutationFn: (id: string) => updateProductService(TOKEN, id, formDetails),
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

	const handleAddToCart = (
		e: React.MouseEvent<HTMLButtonElement>,
		product: Record<string, any>,
	) => {
		e.preventDefault();
		if (!requireAuth(TOKEN) || !product.id.trim())
			return setError("User not authenticated or invalid product ID.");
		setError(null);
		setIsLoading(true);
		addToCartMutation.mutate(product.id);
	};

	return (
		<ProductDescriptionWrapper>
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
					Products/{product?.category}
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
					{product?.name}
				</Typography>
			</Box>
			<Stack className="product-detail">
				<Stack className="product-detail-LHS">
					<Grid container component={"div"} spacing={"calc(var(--flex-gap)/4)"}>
						{Array.from(
							{
								length: Math.ceil(product?.images?.length / 3),
							},
							(_, groupIndex) => {
								const startIndex = groupIndex * 3;
								const groupThumbnails = product?.images?.slice(
									startIndex,
									startIndex + 3,
								);
								const isFirstGroup = groupIndex === 0;
								const hasSideThumbnails =
									Boolean(groupThumbnails[1]) || Boolean(groupThumbnails[2]);
								const shouldRenderSideGrid = !isFirstGroup || hasSideThumbnails;
								return (
									<Fragment key={groupIndex}>
										{shouldRenderSideGrid && (
											<Grid size={{ mobile: 12, miniTablet: 6, laptop: 4 }}>
												<Stack gap={"calc(var(--flex-gap)/4)"}>
													{groupThumbnails[1] && (
														<Box component="div" className="product-thumbnail">
															<img
																src={groupThumbnails[1]}
																alt={`Product Thumbnail ${startIndex + 2}`}
															/>
														</Box>
													)}
													{groupThumbnails[2] && (
														<Box component="div" className="product-thumbnail">
															<img
																src={groupThumbnails[2]}
																alt={`Product Thumbnail ${startIndex + 3}`}
															/>
														</Box>
													)}
												</Stack>
											</Grid>
										)}
										<Grid size={{ mobile: 12, miniTablet: 6, laptop: 8 }}>
											<Box component={"div"} className="product-thumbnail">
												<img
													src={groupThumbnails[0]}
													alt={`Product Thumbnail ${startIndex + 1}`}
												/>
											</Box>
										</Grid>
									</Fragment>
								);
							},
						)}
					</Grid>
				</Stack>
				<Stack className="product-detail-RHS">
					<Box>
						<Typography
							variant="h2"
							fontFamily={"Inter"}
							fontWeight={600}
							fontSize={20}
							lineHeight={"normal"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							{product?.name}
						</Typography>
						<Typography
							variant="caption"
							fontFamily={"Inter"}
							fontWeight={500}
							fontSize={12}
							lineHeight={"normal"}
							whiteSpace={"normal"}
							color={
								product?.stock > 0
									? "var(--in-stock-green-color)"
									: "var(--error-red-color)"
							}
							display={"inline-block"}
							width={"100%"}
						>
							{product?.stock > 0 ? "In Stock" : "Out of Stock"}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="caption"
							fontFamily={"Inter"}
							fontWeight={700}
							fontSize={20}
							lineHeight={"normal"}
							whiteSpace={"normal"}
							color={"var(--off-primary-color)"}
							display={"inline-block"}
							width={"100%"}
						>
							{`₦${formatAmountDisplay(product?.price)}`}
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
							color={"var(--dark-color)"}
						>
							{product?.description
								?.split("\n")
								.map((line: any, index: number) => (
									<Fragment key={index}>
										{line}
										{index < product?.description.split("\n").length - 1 && (
											<br />
										)}
									</Fragment>
								))}
						</Typography>
					</Box>
					<Box borderBottom={"1px solid var(--border-off-primary-color)"} />
					<Stack
						overflow={"hidden"}
						gap={"calc(var(--flex-gap)/4)"}
						direction={{ miniTablet: "row" }}
					>
						<Stack direction="row" overflow={"hidden"}>
							<Box sx={{ display: "flex", overflow: "hidden" }}>
								<IconButton
									onClick={(e) => manageQuantity(e, "decrement")}
									sx={{
										borderRadius: "8px 0 0 8px",
										border: "1px solid var(--icon-button-border-color)",
										display: "inline-flex",
									}}
								>
									<RemoveIcon
										sx={{
											color: "var(--dark-color)",
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
									borderTop: "1px solid var(--icon-button-border-color)",
									borderBottom: "1px solid var(--icon-button-border-color)",
								}}
							>
								<Typography
									variant="caption"
									fontFamily={"Inter"}
									fontWeight={600}
									fontSize={12}
									lineHeight={"normal"}
									whiteSpace={"normal"}
									color={"var(--dark-color)"}
									display={"inline-block"}
									width={"100%"}
								>
									{formDetails.quantity}
								</Typography>
							</Box>
							<Box sx={{ display: "flex", overflow: "hidden" }}>
								<IconButton
									onClick={(e) => manageQuantity(e, "increment")}
									sx={{
										borderRadius: "0 8px 8px 0",
										border: "1px solid var(--icon-button-border-color)",
										backgroundColor: "var(--off-primary-color)",
										display: "inline-flex",
										"&:hover": {
											backgroundColor: "var(--off-primary-color)",
										},
									}}
								>
									<AddIcon
										sx={{
											color: "var(--light-color)",
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
								onClick={(e) =>
									handleAddToCart(e, {
										id: product?.id,
										quantity: formDetails.quantity,
										price: product?.price,
									})
								}
							>
								{isLoading && (
									<CircularProgress
										color="inherit"
										className="loader fixed-width"
									/>
								)}
								<Typography
									variant={"button"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"inherit"}
									textTransform={"inherit"}
									visibility={isLoading ? "hidden" : "visible"}
								>
									Add to Cart
								</Typography>
							</BaseButton>
						</Box>
					</Stack>
					{error && (
						<Box overflow={"hidden"}>
							<Typography
								fontFamily={"Inter"}
								fontWeight={"600"}
								fontSize={14}
								lineHeight={"normal"}
								color={"var(--error-red-color)"}
								whiteSpace={"normal"}
							>
								{error}
							</Typography>
						</Box>
					)}
				</Stack>
			</Stack>
		</ProductDescriptionWrapper>
	);
};
