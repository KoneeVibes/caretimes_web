import {
	Box,
	CircularProgress,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { OrderWrapper } from "./styled";
import { BaseButton } from "../../component/button/styled";
import { ArrowForward } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { retrieveAllProductService } from "../../util/product/retrieveAllProduct";
import { retrieveCategoryByIdService } from "../../util/category/retrieveCategoryById";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { useRequireAuth } from "../../helper/requireAuthentication";
import { useState } from "react";
import { addProductService } from "../../util/cart/addProduct";
import { toast } from "react-toastify";
import { retrieveOrderByIdService } from "../../util/order/retrieveOrderById";
import { formatDate } from "../../helper/formatDate";
import { downloadTransactionReceiptService } from "../../util/transaction/downloadTransactionReceipt";

export const Order = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const navigate = useNavigate();
	const { id = "" } = useParams();
	const queryClient = useQueryClient();
	const { requireAuth } = useRequireAuth();
	const matches = useMediaQuery("(max-width:250px)");

	const [isLoading, setIsLoading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [lastClicked, setlastClicked] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);

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

	const { data: foundOrder } = useQuery({
		queryKey: ["found-order", TOKEN],
		queryFn: async () => {
			const response = await retrieveOrderByIdService(TOKEN, id);
			return response;
		},
		enabled: Boolean(id.trim()),
	});

	const addToCartMutation = useMutation({
		mutationFn: (product: Record<string, any>) =>
			addProductService(TOKEN, product),
		onSuccess: () => {
			setIsLoading(false);
			queryClient.invalidateQueries({
				queryKey: ["products-in-cart-with-categories", TOKEN],
			});
			toast.success("Product added to cart successfully!");
		},
		onError: (error: any) => {
			setIsLoading(false);
			setError(`Add to cart failed. ${error.message}`);
			toast.error(`Add to cart failed. ${error.message}`);
		},
	});

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

	const handleBrowseProducts = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		navigate(`/product`);
	};

	const handleDownloadReceipt = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string,
	) => {
		e.preventDefault();
		if (!id.trim() || isDownloading) return;
		setIsDownloading(true);
		try {
			const blob = await downloadTransactionReceiptService(TOKEN, id);
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "transaction_receipt.pdf";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error: any) {
			console.error("Transaction receipt failed:", error);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<OrderWrapper>
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
					My Order
				</Typography>
			</Box>
			<Stack className="main-area">
				<Stack className="title-area">
					<Stack className="header">
						<Box>
							<Typography
								variant="h3"
								component={"h3"}
								fontFamily={"Inter"}
								fontWeight={600}
								fontSize={20}
								lineHeight={"normal"}
								whiteSpace={"normal"}
								color={"var(--off-dark-color)"}
							>
								Order No. {foundOrder?.transactionReference}
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={500}
								fontSize={18}
								lineHeight={"normal"}
								whiteSpace={"normal"}
								color={"var(--text-gray-color)"}
							>
								{foundOrder?.cartItems?.length} items
							</Typography>
						</Box>
					</Stack>
					<Stack className="description">
						<Box>
							<Typography
								variant="body1"
								fontFamily={"Inter"}
								fontWeight={500}
								fontSize={18}
								lineHeight={"normal"}
								whiteSpace={"normal"}
								color={"var(--text-gray-color)"}
							>
								Placed on: {formatDate(foundOrder?.createdAt, true)}
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="body1"
								fontFamily={"Inter"}
								fontWeight={500}
								fontSize={18}
								lineHeight={"normal"}
								whiteSpace={"normal"}
								color={"var(--text-gray-color)"}
							>
								Total:{" "}
								{`₦${formatAmountDisplay(foundOrder?.totalPayable || 0)}`}
							</Typography>
						</Box>
					</Stack>
				</Stack>
				<Stack className="order-items-area">
					<Stack className="header">
						<Stack className="title">
							<Box>
								<Typography
									variant="h3"
									component={"h3"}
									fontFamily={"Inter"}
									fontWeight={600}
									fontSize={20}
									lineHeight={"normal"}
									whiteSpace={"normal"}
									textTransform={"capitalize"}
									color={"var(--off-dark-color)"}
								>
									Items in your order
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									overflow: "hidden",
									justifyContent: "center",
									padding:
										"calc(var(--basic-padding)/9.5) calc(var(--basic-padding)/5.5)",
									borderRadius: "8px",
									width: matches ? "auto" : "fit-content",
									background:
										foundOrder?.status === "fulfilled"
											? "var(--in-stock-green-color)"
											: foundOrder?.status === "paid"
												? "var(--active-rating-color)"
												: "var(--error-red-color)",
								}}
							>
								<Typography
									variant="caption"
									fontFamily={"Inter"}
									fontWeight={500}
									fontSize={14}
									textAlign={"center"}
									lineHeight={"normal"}
									whiteSpace={"normal"}
									textTransform={"capitalize"}
									color={"var(--light-color)"}
								>
									{foundOrder?.status}
								</Typography>
							</Box>
						</Stack>
						<Box sx={{ display: "flex", overflow: "hidden" }}>
							<BaseButton
								disableElevation
								colour="var(--in-stock-green-color)"
								onClick={(e) =>
									handleDownloadReceipt(e, foundOrder?.transactionReference)
								}
								sx={{
									padding: "0 !important",
									border: "none",
									"&:hover": { border: "none" },
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
									sx={{ textDecoration: "underline" }}
								>
									Download Receipt
								</Typography>
							</BaseButton>
						</Box>
					</Stack>
					<Stack className="items">
						{foundOrder?.cartItems?.map(
							(item: Record<string, any>, index: number) => (
								<Stack key={index} className="order-item">
									<Box component={"div"} className="product-thumbnail-box">
										<img
											src={item?.productImages?.[0]}
											alt={item?.productName}
										/>
									</Box>
									<Stack
										flex={1}
										overflow={"hidden"}
										gap={"calc(var(--flex-gap)/8)"}
									>
										<Box>
											<Typography
												variant="h3"
												component={"h3"}
												fontFamily={"Inter"}
												fontWeight={600}
												fontSize={20}
												lineHeight={"normal"}
												whiteSpace={"normal"}
												sx={{ cursor: "pointer" }}
												color={"var(--off-primary-color)"}
											>
												{item?.productName}
											</Typography>
										</Box>
										<Box>
											<Typography
												variant="body1"
												fontFamily={"Inter"}
												fontWeight={500}
												fontSize={18}
												lineHeight={"normal"}
												whiteSpace={"normal"}
												color={"var(--text-gray-color)"}
											>
												{item?.productDescription}
											</Typography>
										</Box>
										<Box>
											<Typography
												variant="body1"
												fontFamily={"Inter"}
												fontWeight={500}
												fontSize={18}
												lineHeight={"normal"}
												whiteSpace={"normal"}
												color={"var(--text-gray-color)"}
											>
												QTY: {item?.quantity}
											</Typography>
										</Box>
										<Box>
											<Typography
												variant="body1"
												fontFamily={"Inter"}
												fontWeight={600}
												fontSize={20}
												lineHeight={"normal"}
												whiteSpace={"normal"}
												color={"var(--off-dark-color)"}
											>
												{`₦${formatAmountDisplay(item?.unitPrice || 0)}`}
											</Typography>
										</Box>
									</Stack>
								</Stack>
							),
						)}
					</Stack>
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
		</OrderWrapper>
	);
};
