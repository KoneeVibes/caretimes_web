import { Box, Grid, Stack, Typography } from "@mui/material";
import { ProfileAreaWrapper } from "./styled";
import avatar from "../../asset/image/demo-avatar.svg";
import { Fragment, useState } from "react";

export const ProfileArea = () => {
	const tabKeys = ["User Profile", "Passwords", "Log Out"];

	const [activeTab, setActiveTab] = useState(tabKeys[0]);

	const handleTabClick = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		tabKey: string,
	) => {
		e.preventDefault();
		if (activeTab === tabKey || tabKey === "Log Out") return;
		setActiveTab(tabKey);
	};

	return (
		<ProfileAreaWrapper>
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
					Account
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
					Account Settings
				</Typography>
			</Box>
			<Stack className="tab-area">
				<Stack className="tab-keys">
					{tabKeys.map((tabKey, index) => (
						<Box key={index} className="tab-key">
							<Typography
								variant="subtitle2"
								fontFamily={"Inter"}
								fontWeight={600}
								fontSize={16}
								lineHeight={"normal"}
								textAlign={"left"}
								whiteSpace={"normal"}
								color={
									activeTab === tabKey
										? "var(--primary-color)"
										: "var(--subtitle-gray-color)"
								}
								sx={{
									cursor: activeTab === tabKey ? "none" : "pointer",
								}}
								onClick={(e) => handleTabClick(e, tabKey)}
							>
								{tabKey}
							</Typography>
						</Box>
					))}
				</Stack>
				<Stack className="tab-content">
					{activeTab === tabKeys[0] && (
						<Fragment>
							<Stack className="content-area">
								<Stack className="user-info">
									<Box component={"div"} className="user-avatar-box">
										<img
											src={avatar}
											alt="user-avatar"
											className="user-avatar"
										/>
									</Box>
									<Stack className="user-name-box">
										<Box>
											<Typography
												variant="subtitle1"
												fontFamily={"Inter"}
												fontWeight={500}
												fontSize={20}
												lineHeight={"normal"}
												color={"var(--profile-header-color)"}
												maxWidth={"150px"}
												marginBlockEnd={"calc(var(--basic-margin)/8)"}
											>
												John Doe
											</Typography>
										</Box>
										<Box>
											<Typography
												variant="subtitle2"
												fontFamily={"Inter"}
												fontWeight={400}
												fontSize={20}
												lineHeight={"normal"}
												maxWidth={"90px"}
												color={"var(--profile-text-color)"}
											>
												User
											</Typography>
										</Box>
									</Stack>
								</Stack>
								<Box component={"div"} className="profile-card-call-to-action">
									<Typography
										variant="subtitle2"
										fontFamily={"Inter"}
										fontWeight={600}
										fontSize={16}
										lineHeight={"normal"}
										textAlign={"left"}
										whiteSpace={"normal"}
										sx={{ cursor: "pointer" }}
										color={"var(--primary-color)"}
									>
										Edit Profile Photo
									</Typography>
								</Box>
							</Stack>
							<Stack className="content-area">
								<Stack className="personal-information">
									<Box>
										<Typography
											variant="subtitle1"
											fontFamily={"Inter"}
											fontWeight={500}
											fontSize={20}
											lineHeight={"normal"}
											color={"var(--profile-header-color)"}
										>
											Personal Information
										</Typography>
									</Box>
									<Grid
										container
										component={"div"}
										spacing={"calc(var(--flex-gap)/4)"}
										justifyContent={"space-between"}
									>
										<Grid
											component={"div"}
											className="personal-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="personal-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Designation
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														Mr
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="personal-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="personal-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														First Name
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														John
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="personal-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="personal-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Last Name
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														Doe
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="personal-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="personal-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Email Address
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														johndoe@gmail.com
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="personal-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="personal-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Phone
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														+234 810 000 1111
													</Typography>
												</Box>
											</Stack>
										</Grid>
									</Grid>
								</Stack>
								<Box component={"div"} className="profile-card-call-to-action">
									<Typography
										variant="subtitle2"
										fontFamily={"Inter"}
										fontWeight={600}
										fontSize={16}
										lineHeight={"normal"}
										textAlign={"left"}
										whiteSpace={"normal"}
										sx={{ cursor: "pointer" }}
										color={"var(--primary-color)"}
									>
										Edit Personal Information
									</Typography>
								</Box>
							</Stack>
							<Stack className="content-area">
								<Stack className="delivery-information">
									<Box>
										<Typography
											variant="subtitle1"
											fontFamily={"Inter"}
											fontWeight={500}
											fontSize={20}
											lineHeight={"normal"}
											color={"var(--profile-header-color)"}
										>
											Delivery Address
										</Typography>
									</Box>
									<Grid
										container
										component={"div"}
										spacing={"calc(var(--flex-gap)/4)"}
										justifyContent={"space-between"}
									>
										<Grid
											component={"div"}
											className="delivery-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="delivery-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Country
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														Nigeria
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="delivery-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="delivery-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														City/State
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														Mainland, Lagos
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="delivery-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="delivery-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														House Number
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														10B
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="delivery-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="delivery-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Street Name
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														Michael Ososipe Street, Ago Palace Way
													</Typography>
												</Box>
											</Stack>
										</Grid>
										<Grid
											component={"div"}
											className="delivery-information-grid-item"
											size={{ mobile: 12, tablet: 6 }}
										>
											<Stack className="delivery-information-grid-item-body">
												<Box>
													<Typography
														variant="subtitle2"
														fontFamily={"Inter"}
														fontWeight={500}
														fontSize={18}
														lineHeight={"normal"}
														color={"var(--profile-subtitle-color)"}
													>
														Nearest Landmark
													</Typography>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontFamily={"Inter"}
														fontWeight={600}
														fontSize={20}
														lineHeight={"normal"}
														color={"var(--profile-text-color)"}
													>
														Okota Roundabout
													</Typography>
												</Box>
											</Stack>
										</Grid>
									</Grid>
								</Stack>
								<Box component={"div"} className="profile-card-call-to-action">
									<Typography
										variant="subtitle2"
										fontFamily={"Inter"}
										fontWeight={600}
										fontSize={16}
										lineHeight={"normal"}
										textAlign={"left"}
										whiteSpace={"normal"}
										sx={{ cursor: "pointer" }}
										color={"var(--primary-color)"}
									>
										Edit Delivery Address
									</Typography>
								</Box>
							</Stack>
						</Fragment>
					)}
				</Stack>
			</Stack>
		</ProfileAreaWrapper>
	);
};
