import { Box, Grid, Typography } from "@mui/material";
import { CategoriesWrapper } from "./styled";
import { Carousel } from "react-responsive-carousel";
import { BaseButton } from "../../component/button/styled";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { retrieveAllCategoryService } from "../../util/category/retrieveAllCategory";

export const Categories = () => {
	const maxCategoriesPerSet = 5;

	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const [categories, setCategories] = useState<Record<string, any>[]>([]);

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

	const sets = useMemo(() => {
		if (!categories.length) return [];
		const result = [];
		for (let i = 0; i < categories.length; i += maxCategoriesPerSet) {
			result.push(categories.slice(i, i + maxCategoriesPerSet));
		}
		return result;
	}, [categories]);

	return (
		<CategoriesWrapper>
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
					Categories
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
					Shop Categories
				</Typography>
			</Box>
			<Box>
				<Carousel
					autoPlay={true}
					autoFocus={true}
					infiniteLoop={false}
					interval={2000}
					showIndicators={false}
					showThumbs={false}
					showStatus={false}
					renderArrowPrev={(clickHandler, hasPrev, label) => {
						return (
							<Box
								component={"div"}
								className="carousel-arrow carousel-arrow-prev"
							>
								<BaseButton
									radius="64px"
									variant="outlined"
									onClick={clickHandler}
									startIcon={<ArrowBack />}
									colour="var(--primary-color)"
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
										Previous
									</Typography>
								</BaseButton>
							</Box>
						);
					}}
					renderArrowNext={(clickHandler, hasNext, label) => {
						return (
							<Box
								component={"div"}
								className="carousel-arrow carousel-arrow-next"
							>
								<BaseButton
									radius="64px"
									variant="outlined"
									onClick={clickHandler}
									endIcon={<ArrowForward />}
									colour="var(--primary-color)"
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
										Next
									</Typography>
								</BaseButton>
							</Box>
						);
					}}
				>
					{sets?.map((set, index) => {
						return (
							<Grid
								container
								key={`set-${index}`}
								component={"div"}
								spacing={"calc(var(--flex-gap)/4)"}
							>
								{set?.map(
									(category: Record<string, any> | null, index: number) => (
										<Grid
											key={category?.id}
											component={"div"}
											size={{ mobile: 12, miniTablet: 6, laptop: 2 }}
											sx={{
												flexGrow: {
													mobile:
														set?.length % 2 !== 0 && index === set.length - 1
															? 0
															: 1,
													laptop: 1,
												},
											}}
										>
											<Box component={"div"} className="category-thumbnail-box">
												<img src={category?.thumbnail} alt={category?.title} />
											</Box>
											<Box marginBlockStart={"calc(var(--basic-margin)/8)"}>
												<Typography
													variant="caption"
													fontFamily={"Inter"}
													fontWeight={500}
													fontSize={14}
													lineHeight={"normal"}
													textAlign={"center"}
													whiteSpace={"normal"}
													color={"var(--primary-color)"}
												>
													{category?.name}
												</Typography>
											</Box>
										</Grid>
									)
								)}
							</Grid>
						);
					})}
				</Carousel>
			</Box>
		</CategoriesWrapper>
	);
};
