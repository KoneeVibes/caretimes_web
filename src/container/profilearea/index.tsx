import Cookies from "universal-cookie";
import { Fragment, useState } from "react";
import { ProfileAreaWrapper } from "./styled";
import { useQuery } from "@tanstack/react-query";
import avatar from "../../asset/image/demo-avatar.svg";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { retrieveLoggedInUserService } from "../../util/usermanagement/retrieveLoggedInUser";
import { ProfileFormModal } from "../forms/profile";
import { useNavigate } from "react-router-dom";
import { signOutUserService } from "../../util/authentication/signOut";

export const ProfileArea = () => {
	const tabKeys = ["User Profile", "Transactions", "Log Out"];

	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState(tabKeys[0]);
	const [activeForm, setActiveForm] = useState<string | null>(null);
	const [user, setUser] = useState<Record<string, any> | null>(null);

	const fetchLoggedInUser = async () => {
		const loggedInUser = await retrieveLoggedInUserService(TOKEN);
		return loggedInUser;
	};

	const { data: profile } = useQuery({
		queryKey: ["profile", TOKEN, user],
		queryFn: () => fetchLoggedInUser(),
	});

	const handleLogOutUser = async () => {
		try {
			const response = await signOutUserService(TOKEN);
			if (response.status === "success") {
				cookies.remove("TOKEN", { path: "/" });
				navigate("/", { replace: true });
			} else {
				console.error("Logout failed. Try again");
			}
		} catch (error: any) {
			console.error("Logout failed, Contact Admin:", error);
		}
	};

	const handleTabClick = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		tabKey: string,
	) => {
		e.preventDefault();
		if (activeTab === tabKey || tabKey === "Log Out") return handleLogOutUser();
		setActiveTab(tabKey);
	};

	const handleOpenFormModal = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		id: string,
	) => {
		e.preventDefault();
		switch (id) {
			case "profile-photo":
				setUser({ avatar: profile?.avatar || null });
				break;
			case "personal-information":
				setUser({
					firstName: profile?.firstName || "",
					lastName: profile?.lastName || "",
					email: profile?.email || "",
					phone: profile?.phone || "",
				});
				break;
			case "delivery-address":
				setUser({
					country: profile?.country || "Nigeria",
					state: profile?.location || "",
					street: profile?.street || "",
					landmark: profile?.landmark || "",
					houseNumber: profile?.houseNumber || "",
				});
				break;
			default:
				setUser(null);
				break;
		}
		return setActiveForm(id);
	};

	const handleCloseFormModal = () => {
		setActiveForm(null);
		return setUser(null);
	};

	return (
		<ProfileAreaWrapper>
			{!!activeForm && (
				<ProfileFormModal
					user={user}
					open={!!activeForm}
					id={activeForm || ""}
					handleClose={handleCloseFormModal}
				/>
			)}
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
											src={profile?.avatar || avatar}
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
												{`${profile?.firstName || "NA"} ${profile?.lastName || ""}`}
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
										onClick={(e) => handleOpenFormModal(e, "profile-photo")}
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
										{/* <Grid
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
										</Grid> */}
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
														{profile?.firstName || "NA"}
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
														{profile?.lastName || "NA"}
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
														{profile?.email || "NA"}
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
														{profile?.phone || "NA"}
													</Typography>
												</Box>
											</Stack>
										</Grid>
									</Grid>
								</Stack>
								<Box component={"div"} className="profile-card-call-to-action">
									<Typography
										component={"h6"}
										variant="subtitle2"
										fontFamily={"Inter"}
										fontWeight={600}
										fontSize={16}
										lineHeight={"normal"}
										textAlign={"left"}
										whiteSpace={"normal"}
										sx={{ cursor: "pointer" }}
										color={"var(--primary-color)"}
										onClick={(e) =>
											handleOpenFormModal(e, "personal-information")
										}
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
														{profile?.location || "NA"}
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
														{profile?.houseNumber || "NA"}
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
														{profile?.street || "NA"}
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
														{profile?.landmark || "NA"}
													</Typography>
												</Box>
											</Stack>
										</Grid>
									</Grid>
								</Stack>
								<Box component={"div"} className="profile-card-call-to-action">
									<Typography
										component={"h6"}
										variant="subtitle2"
										fontFamily={"Inter"}
										fontWeight={600}
										fontSize={16}
										lineHeight={"normal"}
										textAlign={"left"}
										whiteSpace={"normal"}
										sx={{ cursor: "pointer" }}
										color={"var(--primary-color)"}
										onClick={(e) => handleOpenFormModal(e, "delivery-address")}
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
