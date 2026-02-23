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
						OLITE Manufacturing Company Limited is a trusted manufacturer of
						cosmetic and personal care products, committed to enhancing everyday
						beauty, confidence, and wellness. We produce a diverse portfolio of
						high-quality products designed to meet the evolving needs of modern
						consumers. Our formulations are created using carefully selected
						active ingredients and are produced under strict quality control
						systems that comply with both local and international safety
						standards. Every product reflects our dedication to effectiveness,
						safety, and consistency. At OLITE, consumer satisfaction is central
						to everything we do. Through continuous research, innovation, and
						improvement, we deliver products that support healthy skin, personal
						hygiene, and self-confidence, while offering exceptional value for
						money.
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
							OLITE Manufacturing Company Limited was founded with a clear
							purpose: to make quality beauty and personal care products
							accessible, reliable, and responsibly made. Driven by a passion
							for beauty, wellness, and innovation, we built our operations on
							strong manufacturing principles such as - hygiene, quality assurance, and
							sustainability. From the very beginning, our focus has been on
							creating products that consumers can trust and feel confident
							using every day. Over time, our commitment to excellence has
							enabled us to build strong, long-lasting relationships with
							distributors, retailers, and consumers. As we continue to grow,
							our vision remains unchanged: to become a household name known for
							quality, reliability, and consistent performance across every
							product we offer.
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
