import {
	Box,
	CircularProgress,
	IconButton,
	SelectChangeEvent,
	Stack,
	Typography,
} from "@mui/material";
import { NavigationWrapper } from "./styled";
import logo from "../../asset/logo.png";
import emptyState from "../../asset/image/empty-search-state.svg";
import { useNavigate } from "react-router-dom";
import { navCallToActions, navLinks } from "../../config/static";
import { HashLink } from "react-router-hash-link";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { BaseFieldSet } from "../../component/form/fieldset/styled";
import { BaseInput } from "../../component/form/input/styled";
import { SearchIcon } from "../../asset";
import { BaseNotificationModal } from "../../component/modal/notification";
import authMethodSelectionThumbnail from "../../asset/image/auth-method-selection-thumbnail.png";
import { AuthenticationFormModal } from "../forms/authentication";
import { useRequireAuth } from "../../helper/requireAuthentication";
import Cookies from "universal-cookie";
import { BaseContentModal } from "../../component/modal/content";
import { useDebounce } from "use-debounce";
import { searchProductService } from "../../util/product/searchProduct";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { BaseButton } from "../../component/button/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductService } from "../../util/cart/addProduct";
import { toast } from "react-toastify";

export const Navigation = () => {
	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { requireAuth } = useRequireAuth();
	const {
		openMenu,
		setOpenMenu,
		isContentModalOpen,
		setIsContentModalOpen,
		setIsAuthenticationMethodSelectionModalOpen,
		setIsAuthenticationFormModalOpen,
	} = useContext(AppContext);

	const [searchResult, setSearchResult] = useState<{
		data: Record<string, any>[];
		pagination: Record<string, any>;
	} | null>(null);
	const [formDetails, setFormDetails] = useState({
		productName: "",
	});
	const [paginationIndex, setPaginationIndex] = useState({
		page: "1",
		limit: "5",
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [isSearchResultLoading, setIsSearchResultLoading] = useState(false);
	const [lastClicked, setlastClicked] = useState<Record<string, any> | null>(
		null,
	);
	const [debouncedQueryRef] = useDebounce(formDetails.productName, 500);

	useEffect(() => {
		if (openMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	}, [openMenu]);

	useEffect(() => {
		if (!debouncedQueryRef) return setSearchResult(null);
		const controller = new AbortController();
		let isActive = true;
		const searchProduct = async () => {
			try {
				setIsSearchResultLoading(true);
				setSearchResult(null);
				const result = await searchProductService(
					{
						q: debouncedQueryRef,
						...paginationIndex,
					},
					controller.signal,
				);
				if (!isActive) return;
				setSearchResult(result);
			} catch (err: any) {
				if (err.name !== "AbortError") {
					console.error("Failed to fetch customer:", err);
					setSearchResult(null);
				}
			} finally {
				if (isActive) setIsSearchResultLoading(false);
			}
		};
		searchProduct();
		return () => {
			isActive = false;
			controller.abort();
		};
	}, [TOKEN, debouncedQueryRef, paginationIndex]);

	const addToCartMutation = useMutation({
		mutationFn: (product: Record<string, any>) =>
			addProductService(TOKEN, product),
		onSuccess: () => {
			setIsAddingToCart(false);
			queryClient.invalidateQueries({
				queryKey: [
					"products-in-cart-with-categories-from-search-result",
					TOKEN,
				],
			});
			toast.success("Product added to cart successfully!");
		},
		onError: (error: any) => {
			setIsAddingToCart(false);
			setError(`Add to cart failed. ${error.message}`);
			toast.error(`Add to cart failed. ${error.message}`);
		},
	});

	const handleLogoClick = () => {
		setOpenMenu(false);
		navigate("/");
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<unknown>,
	) => {
		const { name, value } = e.target;
		setFormDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAuthenticationMethodSelectionModalClose = () => {
		return setIsAuthenticationMethodSelectionModalOpen(false);
	};

	const keepMenuOpen = (e: React.SyntheticEvent) => {
		e.stopPropagation();
	};

	const handleSearchResultContentModalOpen = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<SVGSVGElement, MouseEvent>,
	) => {
		e.preventDefault();
		e.stopPropagation();
		return setIsContentModalOpen(true);
	};

	const handleSearchResultContentModalClose = () => {
		setPaginationIndex((prev) => {
			const newPage = 1;
			return {
				...prev,
				page: newPage.toString(),
			};
		});
		return setIsContentModalOpen(false);
	};

	const handleAuthenticationMethodSelection = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string,
	) => {
		e.stopPropagation();
		e.preventDefault();
		setIsAuthenticationMethodSelectionModalOpen(false);
		switch (id) {
			case "callToActionI":
				setIsAuthenticationFormModalOpen({ status: true, index: 0 });
				break;
			case "callToActionII":
				setIsAuthenticationFormModalOpen({ status: true, index: 1 });
				break;
			case "callToActionIII":
			default:
				break;
		}
		return;
	};

	const handleAddToCart = (
		e: React.MouseEvent<HTMLButtonElement>,
		product: Record<string, any>,
	) => {
		e.preventDefault();
		if (!requireAuth(TOKEN)) return;
		setIsAddingToCart(true);
		setlastClicked(product);
		addToCartMutation.mutate(product);
	};

	const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setPaginationIndex((prev) => {
			const currentPage = parseInt(prev.page, 10);
			const newPage = Math.min(
				parseInt(searchResult?.pagination?.totalPages, 10),
				currentPage + 1,
			);
			return {
				...prev,
				page: newPage.toString(),
			};
		});
	};

	const handleNavigateToAllProducts = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		setIsContentModalOpen(false);
		return navigate("/product");
	};

	const handleSearchResultModalCallToActionClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		debouncedQueryRef && searchResult && searchResult?.data?.length >= 1
			? handleNext(e)
			: handleNavigateToAllProducts(e);
		return;
	};

	const handleCallToActionClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: string,
	) => {
		e.stopPropagation();
		switch (id) {
			case "Login":
				setIsAuthenticationFormModalOpen({ status: true, index: 1 });
				break;
			case "Profile":
				if (!requireAuth(TOKEN)) return;
				navigate("/profile");
				break;
			case "Cart":
				if (!requireAuth(TOKEN)) return;
				navigate("/checkout");
				break;
			default:
				break;
		}
	};

	const authMethodSelectionBody = (
		<Box
			component={"div"}
			padding={"0 calc(var(--basic-padding)/2)"}
			marginBlockStart={"calc(var(--basic-margin)/8)"}
		>
			<Typography
				variant="body1"
				fontFamily={"Inter"}
				fontWeight={400}
				fontSize={14}
				lineHeight={"normal"}
				color="var(--dark-color)"
				textAlign={"center"}
				whiteSpace={"normal"}
			>
				Create an account or Log in to continue.
			</Typography>
		</Box>
	);

	const searchResultBody = (
		<Stack
			gap={"calc(var(--flex-gap)/3)"}
			padding={"0 calc(var(--basic-padding)/4)"}
		>
			{debouncedQueryRef && searchResult && searchResult?.data?.length >= 1 ? (
				searchResult?.data?.map((product, index) => (
					<Stack
						key={index}
						sx={{
							borderRadius: "12px",
							gap: "calc(var(--flex-gap)/3)",
							padding: "calc(var(--basic-padding)/4)",
							border: "1px solid var(--border-faint-primary-color)",
						}}
					>
						<Stack
							sx={{
								overflow: "hidden",
								flexDirection: "row",
								gap: "calc(var(--flex-gap)/3)",
								"& .product-thumbnail-box": {
									height: "11.25rem",
									display: "flex",
									overflow: "hidden",
									borderRadius: "10px",
									flex: 1,
									"& img": {
										width: "100%",
										height: "100%",
										borderRadius: "inherit",
									},
								},
							}}
						>
							<Box component={"div"} className="product-thumbnail-box">
								<img src={product?.images?.[0]} alt={product?.name} />
							</Box>
							<Stack
								flex={1}
								overflow={"hidden"}
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
						<Box sx={{ display: "flex", overflow: "hidden" }}>
							<BaseButton
								disableElevation
								variant="contained"
								sx={{ width: "100%" }}
								onClick={(e) =>
									handleAddToCart(e, {
										product: product?.id,
										quantity: 1,
										price: product?.price,
									})
								}
							>
								{isAddingToCart && lastClicked?.product === product?.id ? (
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
										Add to Cart
									</Typography>
								)}
							</BaseButton>
						</Box>
					</Stack>
				))
			) : (
				<Stack overflow={"hidden"} gap={"calc(var(--flex-gap)/8)"}>
					<Box
						sx={{
							display: "flex",
							overflow: "hidden",
							justifyContent: "center",
							padding: "calc(var(--basic-padding)/4)",
						}}
					>
						<img src={emptyState} alt="empty state" />
					</Box>
					<Box>
						<Typography
							variant="body1"
							fontFamily={"Inter"}
							fontWeight={500}
							fontSize={14}
							lineHeight={"normal"}
							whiteSpace={"normal"}
							color={"var(--text-gray-color)"}
							textAlign={"center"}
						>
							No Results, try again
						</Typography>
					</Box>
				</Stack>
			)}
		</Stack>
	);

	return (
		<NavigationWrapper>
			{/* Modals below */}
			<BaseNotificationModal
				className="authentication-method-selection-notification-modal"
				title="Get started buying today"
				open={false} //taken out based on customer request
				isLoading={false}
				headerBg={
					<img
						src={authMethodSelectionThumbnail}
						alt="Authentication Method Selection Modal Thumbnail"
						style={{
							objectFit: "fill",
							width: "100%",
							height: "100%",
							aspectRatio: "1/1",
						}}
					/>
				}
				body={authMethodSelectionBody}
				callToActionI="Create an account"
				callToActionII="Log in to an account"
				callToActionIII="Continue as guest"
				handleClose={handleAuthenticationMethodSelectionModalClose}
				handleCallToAction={handleAuthenticationMethodSelection}
			/>
			<BaseContentModal
				body={searchResultBody}
				title={"Search Results"}
				open={isContentModalOpen}
				subtitle={debouncedQueryRef}
				isLoading={isSearchResultLoading}
				className="search-result-content-modal"
				handleClose={handleSearchResultContentModalClose}
				handleCallToAction={handleSearchResultModalCallToActionClick}
				callToAction={
					debouncedQueryRef && searchResult && searchResult?.data?.length >= 1
						? `View More Results (${searchResult?.pagination?.page ?? 0}/${searchResult?.pagination?.totalPages ?? 0})`
						: "View All Products"
				}
			/>
			<AuthenticationFormModal />
			{/* Modals above */}

			<Box component={"div"} className="favicon-box">
				<img src={logo} alt="logo" onClick={handleLogoClick} />
			</Box>
			<Stack className="nav-items">
				<Stack className="nav-links">
					{navLinks.map((navLink, index) => {
						return (
							<HashLink
								key={index}
								to={navLink.url}
								smooth={true}
								onClick={() => setOpenMenu(false)}
							>
								<Typography
									variant="subtitle1"
									fontFamily={"Inter"}
									fontWeight={400}
									fontSize={14}
									lineHeight={"normal"}
									color={"var(--light-color)"}
									sx={{
										cursor: "pointer",
									}}
								>
									{navLink.name}
								</Typography>
							</HashLink>
						);
					})}
				</Stack>
				<Box
					component={"div"}
					onClick={keepMenuOpen}
					onMouseDown={keepMenuOpen}
					onTouchStart={keepMenuOpen}
					className="nav-search-field-box"
				>
					<form onSubmit={handleSearchResultContentModalOpen}>
						<BaseFieldSet>
							<BaseInput
								radius="0"
								border="none"
								name="productName"
								placeholder="Search Products"
								value={formDetails.productName}
								onChange={(e) => handleChange(e)}
								padding="calc(var(--basic-padding)/7.6) 0"
								endAdornment={
									<SearchIcon
										type="submit"
										cursor={"pointer"}
										onClick={handleSearchResultContentModalOpen}
									/>
								}
								sx={{
									gap: "calc(var(--flex-gap)/8)",
									borderBottom: "1px solid var(--input-field-border-color)",
								}}
							/>
						</BaseFieldSet>
					</form>
				</Box>
				<Stack className="mobile-nav-call-to-actions">
					{navCallToActions.map((callToAction, index) => (
						<Box
							key={index}
							component={"div"}
							overflow={"hidden"}
							onClick={(e) => handleCallToActionClick(e, callToAction.name)}
						>
							<IconButton>{callToAction.icon}</IconButton>
						</Box>
					))}
				</Stack>
			</Stack>
			<Stack className="desktop-nav-call-to-actions">
				{navCallToActions.map((callToAction, index) => (
					<Box
						key={index}
						component={"div"}
						overflow={"hidden"}
						onClick={(e) => handleCallToActionClick(e, callToAction.name)}
					>
						<IconButton>{callToAction.icon}</IconButton>
					</Box>
				))}
			</Stack>
			<Box component={"div"} className="menu-button-box">
				<IconButton
					size="large"
					color="inherit"
					aria-label="menu"
					sx={{
						color: "var(--light-color)",
						padding: 0,
					}}
					onClick={() => setOpenMenu(!openMenu)}
				>
					<MenuIcon />
				</IconButton>
			</Box>
		</NavigationWrapper>
	);
};
