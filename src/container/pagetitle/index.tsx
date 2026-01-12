import { Typography } from "@mui/material";
import { PageTitleWrapper } from "./styled";
import { PageTitlePropsType } from "../../type/container.type";

export const PageTitle: React.FC<PageTitlePropsType> = ({ title }) => {
	return (
		<PageTitleWrapper>
			<Typography
				variant="h1"
				fontFamily={"Cormorant"}
				fontWeight={500}
				fontSize={{ mobile: 45, miniTablet: 60, desktop: 72 }}
				lineHeight={"normal"}
				textAlign={"center"}
				whiteSpace={"normal"}
				color={"var(--primary-color)"}
			>
				{title}
			</Typography>
		</PageTitleWrapper>
	);
};
