import { Box, Stack, Typography } from "@mui/material";
import { WhatWeDoWrapper } from "./styled";
import { offerings } from "../../config/static";
import checkboxIcon from "../../asset/icon/checked-sticker-icon.svg";
import { BaseButton } from "../../component/button/styled";

export const WhatWeDo = () => {
	return (
		<WhatWeDoWrapper>
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
					What We Offer
				</Typography>
			</Box>
			<Stack className="offerings">
				{offerings.map((offering, index) => {
					return (
						<Stack key={index} className="offering-stack">
							<Box component={"div"} className="checkbox-icon">
								<img src={checkboxIcon} alt="Offering Checkbox Icon" />
							</Box>
							<Box>
								<Typography
									variant="h3"
									fontFamily={"Inter"}
									fontWeight={600}
									fontSize={16}
									lineHeight={"normal"}
									whiteSpace={"normal"}
									color={"var(--off-dark-color)"}
								>
									{offering.title}
								</Typography>
							</Box>
							<Box>
								<Typography
									variant="body1"
									fontFamily={"Inter"}
									fontWeight={400}
									fontSize={16}
									lineHeight={"normal"}
									whiteSpace={"normal"}
									color={"var(--off-dark-color)"}
								>
									{offering.description}
								</Typography>
							</Box>
						</Stack>
					);
				})}
			</Stack>
			<Box component={"div"} className="call-to-action-box">
				<BaseButton variant="contained">
					<Typography
						variant={"button"}
						fontFamily={"inherit"}
						fontWeight={"inherit"}
						fontSize={"inherit"}
						lineHeight={"inherit"}
						color={"inherit"}
						textTransform={"inherit"}
					>
						View Store Locations
					</Typography>
				</BaseButton>
			</Box>
		</WhatWeDoWrapper>
	);
};
