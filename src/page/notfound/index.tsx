import { Box, Stack, Typography } from "@mui/material";
import { Footer } from "../../container/footer";
import { Navigation } from "../../container/navigation";
import { NotFoundErrorWrapper } from "./styled";
import notfound from "../../asset/animation/404 Animation.svg";
import { BaseMarquee } from "../../component/marquee";
import { Location } from "../../container/location";

export const NotFoundError = () => {
	return (
		<NotFoundErrorWrapper
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
			<Stack className="not-found-error-body">
				<Box component={"div"} className="animation-area">
					<img src={notfound} alt="404 Animation" />
				</Box>
				<Box>
					<Typography
						variant="h2"
						sx={{
							fontFamily: "Inter",
							fontWeight: 700,
							fontSize: {
								mobile: 25,
								miniTablet: 35,
								tablet: 40,
								laptop: 50,
								desktop: 60,
							},
							textAlign: "center",
							lineHeight: "normal",
							whiteSpace: "normal",
							color: "var(--dark-color)",
						}}
					>
						Ooops, Page Not Found.
					</Typography>
				</Box>
			</Stack>
			<Footer />
		</NotFoundErrorWrapper>
	);
};
