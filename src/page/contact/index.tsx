import { Navigation } from "../../container/navigation";
import { BaseMarquee } from "../../component/marquee";
import { Location } from "../../container/location";
import { ContactWrapper } from "./styled";
import { Footer } from "../../container/footer";
import { Box, Stack, Typography } from "@mui/material";
import { ContactForm } from "../../container/forms/contact";

export const Contact = () => {
	return (
		<ContactWrapper
			maxWidth={false}
			sx={{
				padding: "0 !important",
			}}
		>
			<BaseMarquee
				items={[<Location />]}
				background="var(--marquee-bg-color)"
			/>
			<Navigation />
			<Box component={"div"} className="header">
				<Typography
					variant="h2"
					fontFamily={"Cormorant"}
					fontWeight={500}
					fontSize={{
						mobile: 45,
						miniTablet: 60,
						desktop: 72,
					}}
					lineHeight={"normal"}
					textAlign={"center"}
					whiteSpace={"normal"}
					color={"var(--text-gray-color)"}
				>
					Contact Us
				</Typography>
			</Box>
			<Stack className="contact-form-area">
				<Stack className="text-area">
					<Box>
						<Typography
							variant="h3"
							fontFamily={"Cormorant"}
							fontWeight={400}
							fontSize={{
								mobile: 36,
								miniTablet: 45,
								desktop: 60,
							}}
							lineHeight={"normal"}
							textAlign={"left"}
							whiteSpace={"normal"}
							color={"var(--light-color)"}
						>
							Contact our team
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
							color={"var(--light-color)"}
						>
							Fill out the form and a member of our team will reach out to you
							to discuss how we can help.
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
							color={"var(--light-color)"}
						>
							For more technical info, email us at olitemanufacturing@gmail.com
						</Typography>
					</Box>
				</Stack>
				<ContactForm />
			</Stack>
			<Footer />
		</ContactWrapper>
	);
};
