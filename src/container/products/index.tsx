import { Fragment, useState } from "react";
import { ProductsWrapper } from "./styled";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { BaseSelect } from "../../component/form/select/styled";
import { BaseOption } from "../../component/form/option/styled";
import { BaseFieldSet } from "../../component/form/fieldset/styled";
import { ArrowDownward } from "@mui/icons-material";
import { allProduct, productCategories } from "../../config/static";
import { BaseLabel } from "../../component/form/label/styled";
import { BaseInput } from "../../component/form/input/styled";
import { formatAmountDisplay } from "../../helper/formatAmountDisplay";
import { BaseButton } from "../../component/button/styled";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const Products = () => {
	const resourceCount = [1, 10, 20];
	const sortOptions = ["Alphabetically", "Most Recent"];

	// convert this to a state and manage update for price/categories field
	const isMobile = useMediaQuery("(max-width:426px)");
	const isTablet = useMediaQuery("(min-width:769px) and (max-width:1024px)");
	const isLaptop = useMediaQuery("(min-width:1025px) and (max-width:1280px)");
	const isMiniTablet = useMediaQuery("(min-width:426px) and (max-width:768px)");

	const gridView = isMobile
		? 12
		: isMiniTablet
		? 12
		: isTablet
		? 6
		: isLaptop
		? 4
		: 3;

	// the price filter will be re-initialized from a useEffect to return
	// and average range (lowerLimit - upperLimit), so this effect will
	// trigger an update on both setFilters and setFormDetails price items.

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [filters, setFilters] = useState([
		{
			name: "Categories",
			fields: productCategories.map((category) => category.title),
		},
		{ name: "Availability", fields: ["In Stock", "Out of Stock"] },
		{ name: "Price", fields: { lowerLimit: 100, upperLimit: 10000 } },
	]);
	const [formDetails, setFormDetails] = useState<Record<string, any>>({
		perPage: "10",
		sortedBy: "Alphabetically",
		categories: [],
		availability: [],
		price: filters?.find((filter) => filter.name === "Price")?.fields,
	});

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| React.ChangeEvent<HTMLInputElement>
			| (Event & {})
	) => {
		const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
		setFormDetails((prev) => {
			if (name === "price-upper-limit") {
				return {
					...prev,
					price: {
						...prev.price,
						upperLimit: value,
					},
				};
			} else if (name === "price-lower-limit") {
				return {
					...prev,
					price: {
						...prev.price,
						lowerLimit: value,
					},
				};
			} else {
				return {
					...prev,
					[name]: value,
				};
			}
		});
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormDetails((prev) => ({
			...prev,
			[name]: prev[name].includes(value)
				? prev[name].filter((v: string) => v !== value)
				: [...prev[name], value],
		}));
	};

	return (
		<ProductsWrapper>
			<Stack
				direction={{ tablet: "row" }}
				gap={"calc(var(--flex-gap)/4)"}
				justifyContent={"space-between"}
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
						Products
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
						All Categories
					</Typography>
				</Box>
				<Stack
					gap={"calc(var(--flex-gap)/4)"}
					direction={{ miniTablet: "row" }}
				>
					<BaseFieldSet>
						<BaseSelect
							radius="64px"
							name="perPage"
							fullWidth={isMobile}
							value={formDetails.perPage}
							colour="var(--primary-color)"
							onChange={(e) => handleChange(e)}
							border="1px solid var(--primary-color)"
							sx={{
								maxWidth: "10.4rem",
								"& .MuiSelect-icon": {
									display: "none",
								},
								"& .MuiOutlinedInput-input": {
									display: "flex",
									alignItems: "center",
									gap: "calc(var(--flex-gap)/8)",
									paddingRight: "0 !important",
								},
							}}
						>
							{resourceCount?.map((count: number, index: number) => (
								<BaseOption
									key={index}
									value={count}
									sx={{
										display: "flex",
										maxWidth: "10.4rem",
										alignItems: "center",
										gap: "calc(var(--flex-gap)/8)",
										justifyContent: "space-between",
									}}
								>
									<Typography
										component={"span"}
										fontFamily={"inherit"}
										fontWeight={"inherit"}
										fontSize={"inherit"}
										lineHeight={"inherit"}
										color={"inherit"}
										textTransform={"inherit"}
										flex={0.8}
									>
										{count} Entrie(s) Per Page{" "}
									</Typography>
									<Typography
										component={"span"}
										fontFamily={"inherit"}
										fontWeight={"inherit"}
										fontSize={"inherit"}
										lineHeight={"inherit"}
										color={"inherit"}
										textTransform={"inherit"}
										flex={0.2}
									>
										<ArrowDownward />
									</Typography>
								</BaseOption>
							))}
						</BaseSelect>
					</BaseFieldSet>
					<BaseFieldSet>
						<BaseSelect
							radius="64px"
							name="sortedBy"
							fullWidth={isMobile}
							value={formDetails.sortedBy}
							colour="var(--primary-color)"
							onChange={(e) => handleChange(e)}
							border="1px solid var(--primary-color)"
							sx={{
								maxWidth: "10.4rem",
								"& .MuiSelect-icon": {
									display: "none",
								},
								"& .MuiOutlinedInput-input": {
									display: "flex",
									alignItems: "center",
									gap: "calc(var(--flex-gap)/8)",
									paddingRight: "0 !important",
								},
							}}
						>
							{sortOptions?.map((option: string, index: number) => (
								<BaseOption
									key={index}
									value={option}
									sx={{
										display: "flex",
										maxWidth: "10.4rem",
										alignItems: "center",
										gap: "calc(var(--flex-gap)/8)",
										justifyContent: "space-between",
									}}
								>
									<Typography
										component={"span"}
										fontFamily={"inherit"}
										fontWeight={"inherit"}
										fontSize={"inherit"}
										lineHeight={"inherit"}
										color={"inherit"}
										textTransform={"inherit"}
										flex={0.8}
									>
										Sorting {option}{" "}
									</Typography>
									<Typography
										component={"span"}
										fontFamily={"inherit"}
										fontWeight={"inherit"}
										fontSize={"inherit"}
										lineHeight={"inherit"}
										color={"inherit"}
										textTransform={"inherit"}
										flex={0.2}
									>
										<ArrowDownward />
									</Typography>
								</BaseOption>
							))}
						</BaseSelect>
					</BaseFieldSet>
				</Stack>
			</Stack>
			<Stack
				justifyContent={"space-between"}
				direction={{ miniTablet: "row" }}
				gap={{
					tablet: "var(--flex-gap)",
					mobile: "calc(var(--flex-gap)/4)",
				}}
			>
				<Stack
					gap={"calc(var(--flex-gap)/4)"}
					minWidth={{ miniTablet: "200px" }}
				>
					{filters.map((filter, index) => {
						return (
							<Stack key={index} gap={"calc(var(--flex-gap)/4)"}>
								<Box
									paddingBottom={"calc(var(--basic-padding)/8)"}
									borderBottom={"1px solid var(--primary-color)"}
								>
									<Typography
										variant="subtitle1"
										fontFamily={"Inter"}
										fontWeight={400}
										fontSize={16}
										lineHeight={"normal"}
										color={"var(--primary-color)"}
									>
										{filter.name}
									</Typography>
								</Box>
								<Stack gap={"calc(var(--flex-gap)/8)"}>
									{filter.name === "Price" && (
										<Stack>
											<Stack direction={"row"}>
												<BaseFieldSet className="price-range-filter-fieldset">
													<BaseInput
														type="range"
														onChange={handleChange}
														name={`price-lower-limit`}
														inputProps={{
															min: 0,
															max:
																typeof filter.fields === "object" &&
																"lowerLimit" in filter.fields
																	? filter.fields["lowerLimit"]
																	: 0,
														}}
														value={formDetails.price.lowerLimit}
														sx={{
															padding: 0,
															border: "none",
															borderRadius: "unset",
															cursor: "pointer",
														}}
														className="price-range-filter"
													/>
												</BaseFieldSet>
												<BaseFieldSet className="price-range-filter-fieldset">
													<BaseInput
														type="range"
														onChange={handleChange}
														name={`price-upper-limit`}
														inputProps={{
															min:
																typeof filter.fields === "object" &&
																"lowerLimit" in filter.fields
																	? filter.fields["lowerLimit"]
																	: 0,
															max:
																typeof filter.fields === "object" &&
																"upperLimit" in filter.fields
																	? filter.fields["upperLimit"]
																	: 0,
														}}
														value={formDetails.price.upperLimit}
														sx={{
															padding: 0,
															border: "none",
															borderRadius: "unset",
															cursor: "pointer",
														}}
														className="price-range-filter"
													/>
												</BaseFieldSet>
											</Stack>
											<Stack
												direction={"row"}
												alignItems={"center"}
												gap={"calc(var(--flex-gap)/8)"}
												justifyContent={"space-between"}
											>
												<BaseFieldSet>
													<BaseInput
														readOnly
														radius="64px"
														fontsize="10px"
														colour="var(--text-gray-color)"
														value={`₦${formDetails.price.lowerLimit}`}
														border="1px solid var(--subtitle-gray-color)"
													/>
												</BaseFieldSet>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={400}
														fontSize={14}
														lineHeight={"normal"}
														color={"var(--text-gray-color)"}
													>
														to
													</Typography>
												</Box>
												<BaseFieldSet>
													<BaseInput
														readOnly
														radius="64px"
														fontsize="10px"
														colour="var(--text-gray-color)"
														value={`₦${formDetails.price.upperLimit}`}
														border="1px solid var(--subtitle-gray-color)"
													/>
												</BaseFieldSet>
											</Stack>
										</Stack>
									)}
									{filter.name !== "Price" &&
										Array.isArray(filter.fields) &&
										filter.fields.map((field: string, index: number) => {
											return (
												<BaseFieldSet key={index} className="filter-fieldset">
													<BaseLabel
														sx={{
															display: "flex",
															gap: "calc(var(--flex-gap)/4)",
															alignItems: "center",
															justifyContent: "space-between",
															marginBlock: "0",
															overflow: "hidden",
															cursor: "pointer",
														}}
													>
														<BaseInput
															type="checkbox"
															name={filter.name.toLowerCase()}
															inputProps={{
																checked:
																	formDetails[
																		filter.name.toLowerCase()
																	].includes(field),
															}}
															onChange={handleCheckboxChange}
															value={field}
															sx={{
																padding: 0,
																border: "none",
																borderRadius: "unset",
																cursor: "pointer",
															}}
														/>
														<Typography
															component={"span"}
															variant="subtitle1"
															fontFamily={"inherit"}
															fontWeight={400}
															fontSize={"inherit"}
															lineHeight={"normal"}
															color={"var(--text-gray-color)"}
															flex={1}
														>
															{field}
														</Typography>
													</BaseLabel>
												</BaseFieldSet>
											);
										})}
								</Stack>
							</Stack>
						);
					})}
				</Stack>
				<Grid container component={"div"} spacing={"calc(var(--flex-gap)/4)"}>
					{allProduct?.map((product, index) => {
						return (
							<Grid
								key={index}
								size={gridView}
								component={"div"}
								className="product-grid-item"
								sx={{
									flexGrow:
										allProduct.length % (12 / gridView) !== 0 &&
										index >=
											allProduct.length - (allProduct.length % (12 / gridView))
											? "0 !important"
											: "1 !important",
								}}
							>
								<Stack className="product-grid-item-body">
									<Box component={"div"} className="product-thumbnail-box">
										<img src={product?.thumbnail} alt={product?.name} />
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
											<Stack
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
												{`₦${formatAmountDisplay(product?.price)}`}
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
			</Stack>
			<Stack
				gap={"calc(var(--flex-gap)/4)"}
				direction={{ miniTablet: "row" }}
				justifyContent={{ miniTablet: "flex-end" }}
			>
				<BaseFieldSet>
					<BaseSelect
						radius="64px"
						name="perPage"
						fullWidth={isMobile}
						value={formDetails.perPage}
						colour="var(--primary-color)"
						onChange={(e) => handleChange(e)}
						border="1px solid var(--primary-color)"
						sx={{
							maxWidth: "10.4rem",
							"& .MuiSelect-icon": {
								display: "none",
							},
							"& .MuiOutlinedInput-input": {
								display: "flex",
								alignItems: "center",
								gap: "calc(var(--flex-gap)/8)",
								paddingRight: "0 !important",
							},
						}}
					>
						{resourceCount?.map((count: number, index: number) => (
							<BaseOption
								key={index}
								value={count}
								sx={{
									display: "flex",
									maxWidth: "10.4rem",
									alignItems: "center",
									gap: "calc(var(--flex-gap)/8)",
									justifyContent: "space-between",
								}}
							>
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"inherit"}
									textTransform={"inherit"}
									flex={0.8}
								>
									{count} Entrie(s) Per Page{" "}
								</Typography>
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"inherit"}
									textTransform={"inherit"}
									flex={0.2}
								>
									<ArrowDownward />
								</Typography>
							</BaseOption>
						))}
					</BaseSelect>
				</BaseFieldSet>
				<BaseFieldSet>
					<BaseSelect
						radius="64px"
						name="sortedBy"
						fullWidth={isMobile}
						value={formDetails.sortedBy}
						colour="var(--primary-color)"
						onChange={(e) => handleChange(e)}
						border="1px solid var(--primary-color)"
						sx={{
							maxWidth: "10.4rem",
							"& .MuiSelect-icon": {
								display: "none",
							},
							"& .MuiOutlinedInput-input": {
								display: "flex",
								alignItems: "center",
								gap: "calc(var(--flex-gap)/8)",
								paddingRight: "0 !important",
							},
						}}
					>
						{sortOptions?.map((option: string, index: number) => (
							<BaseOption
								key={index}
								value={option}
								sx={{
									display: "flex",
									maxWidth: "10.4rem",
									alignItems: "center",
									gap: "calc(var(--flex-gap)/8)",
									justifyContent: "space-between",
								}}
							>
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"inherit"}
									textTransform={"inherit"}
									flex={0.8}
								>
									Sorting {option}{" "}
								</Typography>
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"inherit"}
									textTransform={"inherit"}
									flex={0.2}
								>
									<ArrowDownward />
								</Typography>
							</BaseOption>
						))}
					</BaseSelect>
				</BaseFieldSet>
			</Stack>
		</ProductsWrapper>
	);
};
