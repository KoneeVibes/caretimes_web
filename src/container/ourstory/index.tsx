import { Box, Stack, Typography } from "@mui/material";
import { OurStoryWrapper } from "./styled";
import ourStoryThumbnailOne from "../../asset/image/about-us-thumbnail-one.svg";
import ourStoryThumbnailTwo from "../../asset/image/about-us-thumbnail-two.svg";
import ourStoryThumbnailThree from "../../asset/image/about-us-thumbnail-three.svg";

export const OurStory = () => {
	return (
		<OurStoryWrapper>
			<Stack className="top-rank">
				<Box component={"div"} className="thumbnail-box">
					<img src={ourStoryThumbnailOne} alt="Our Story Thumbnail One" />
				</Box>
				<Box component={"div"} className="content-box">
					<Typography
						variant="body1"
						fontFamily={"Inter"}
						fontWeight={400}
						fontSize={18}
						lineHeight={"normal"}
						whiteSpace={"normal"}
						color={"var(--dark-color)"}
					>
						Welcome to [Your Store Name], your go-to destination for
						high-quality products and a seamless shopping experience. Founded in
						[Year], we started with a simple mission: to make everyday
						essentials more accessible, stylish, and affordable. Whether you're
						searching for the latest fashion trends, home must-haves, or unique
						gifts, we've got you covered with a curated selection of items
						you'll love. At [Your Store Name], customer satisfaction is at the
						heart of everything we do. From easy browsing and secure checkout to
						fast delivery and dedicated support, we’re here to make your
						shopping journey smooth and enjoyable. We’re more than just a
						store—we’re a community of passionate people who believe in quality,
						creativity, and exceptional service. Thank you for choosing us.
						We’re excited to be part of your lifestyle!
					</Typography>
				</Box>
			</Stack>
			<Stack className="bottom-rank">
				<Stack className="content-stack">
					<Box>
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
							Our Story
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="body1"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={18}
							lineHeight={"normal"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							What started as a small idea among friends/family/passionate
							founders has grown into a thriving online community of loyal
							customers and quality products. We launched [Your Store Name] with
							a vision—to challenge the traditional retail experience and bring
							something better to the table. Something more thoughtful. More
							customer-first. More fun. Today, we're proud to serve thousands of
							happy shoppers across [countries/regions], and we're just getting
							started.
						</Typography>
					</Box>
				</Stack>
				<Stack className="thumbnail-stack">
					<Box component={"div"} className="thumbnail-box">
						<img src={ourStoryThumbnailTwo} alt="Our Story Thumbnail Two" />
					</Box>
					<Box component={"div"} className="thumbnail-box">
						<img src={ourStoryThumbnailThree} alt="Our Story Thumbnail Three" />
					</Box>
				</Stack>
			</Stack>
		</OurStoryWrapper>
	);
};
