import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { SavedItemsWrapper } from "./styled";
import { Fragment } from "react/jsx-runtime";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { BaseButton } from "../../component/button/styled";
import { savedItems } from "../../config/static";
import { ArrowForward } from "@mui/icons-material";

export const SavedItems = () => {
	const matches = useMediaQuery("(max-width:250px)");

	const handleNavigateToCheckout = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
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
				spacing={"calc(var(--flex-gap)/4)"}
				justifyContent={"space-between"}
			>
				{savedItems?.slice(0, 5).map((bestSeller, index) => {
					return (
						<Grid
							key={index}
							component={"div"}
							className="saved-product-grid-item"
							size={{ mobile: 12, miniTablet: 6, laptop: 2 }}
						>
							<Stack className="saved-product-grid-item-body">
								<Box component={"div"} className="saved-product-thumbnail-box">
									<img src={bestSeller?.thumbnail} alt={bestSeller?.name} />
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
									<Box sx={{ display: "flex", overflow: "hidden" }}>
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
					);
				})}
			</Grid>
		</SavedItemsWrapper>
	);
};
