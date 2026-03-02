import { Fragment, useRef, useState } from "react";
import { ProfileFormModalWrapper } from "./styled";
import { BaseFormModal } from "../../../component/modal/form";
import { ProfileFormModalPropsType } from "../../../type/container.type";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { BaseFieldSet } from "../../../component/form/fieldset/styled";
import { BaseLabel } from "../../../component/form/label/styled";
import { BaseInput } from "../../../component/form/input/styled";
import { BaseButton } from "../../../component/button/styled";
import Cookies from "universal-cookie";
import { updateProfileService } from "../../../util/usermanagement/updateProfile";
import { BaseSelect } from "../../../component/form/select/styled";
import { BaseOption } from "../../../component/form/option/styled";
import demoAvatar from "../../../asset/image/demo-avatar.svg";

export const ProfileFormModal: React.FC<ProfileFormModalPropsType> = ({
	id,
	open,
	user,
	handleClose,
}) => {
	const areas = ["Port-Harcourt", "Lagos", "Abuja"];

	const cookies = new Cookies();
	const TOKEN = cookies.getAll().TOKEN;

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [error, setError] = useState<string | null>(null);
	const [formDetails, setFormDetails] = useState(user || {});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| React.ChangeEvent<HTMLInputElement>
			| (Event & {}),
	) => {
		const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
		setFormDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setImagePreview(e.target.result as string);
					setFormDetails((prev) => ({
						...prev,
						avatar: file,
					}));
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUploadClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// const handleDeleteClick = (
	// 	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	// ) => {
	// 	e.stopPropagation();
	// 	setImagePreview("");
	// 	setFormDetails((prev) => ({
	// 		...prev,
	// 		avatar: null,
	// 	}));
	// };

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		const formData = new FormData();
		const data = {
			avatar: formDetails.avatar,
			firstName: formDetails.firstName,
			lastName: formDetails.lastName,
			email: formDetails.email,
			phone: formDetails.phone,
			country: formDetails.country,
			state: formDetails.state,
			street: formDetails.street,
			landmark: formDetails.landmark,
			houseNumber: formDetails.houseNumber,
		};
		const isNonEmptyString = (value: unknown): value is string =>
			typeof value === "string" && value.trim().length > 0;
		Object.entries(data).forEach(([key, value]) => {
			if (value instanceof File) {
				formData.append(key, value);
				return;
			}
			if (isNonEmptyString(value)) {
				formData.append(key, value.trim());
				return;
			}
		});
		try {
			const response = await updateProfileService(TOKEN, formData);
			if (response.status === "success") {
				setIsLoading(false);
				handleClose();
			} else {
				setIsLoading(false);
				setError(
					`${id === "profile-photo" ? "Profile photo" : id === "personal-information" ? "Personal information" : "Delivery address"} update failed. Please check your credentials and try again.`,
				);
			}
		} catch (error: any) {
			setIsLoading(false);
			setError(
				`${id === "profile-photo" ? "Profile photo" : id === "personal-information" ? "Personal information" : "Delivery address"} update failed. ${error.message}`,
			);
			console.error(
				`${id === "profile-photo" ? "Profile photo" : id === "personal-information" ? "Personal information" : "Delivery address"} update failed`,
				error,
			);
		}
	};

	return (
		<BaseFormModal
			open={open}
			className="profile-form-modal"
			handleSubmit={handleFormSubmit}
			handleClickOutside={handleClose}
		>
			<ProfileFormModalWrapper>
				<Box>
					<Typography
						variant="h3"
						fontFamily={"Inter"}
						fontWeight={600}
						fontSize={20}
						lineHeight={"normal"}
						whiteSpace={"normal"}
						color={"var(--profile-header-color)"}
					>
						{id === "profile-photo"
							? "Profile Photo"
							: id === "personal-information"
								? "Personal Information"
								: id === "delivery-address"
									? "Delivery Address"
									: ""}
					</Typography>
				</Box>
				<Grid
					container
					component={"div"}
					spacing={"calc(var(--flex-gap)/4)"}
					justifyContent={"space-between"}
				>
					{id === "profile-photo" && (
						<Grid component={"div"} size={{ mobile: 12 }}>
							<Stack gap={"calc(var(--flex-gap)/3)"}>
								<Box component={"div"} className="profile-photo-box">
									{imagePreview ? (
										<img
											src={imagePreview}
											alt="Profile Preview"
											className="customer-avatar"
										/>
									) : (
										<img
											src={(formDetails?.avatar as string) || demoAvatar}
											alt="Headshot"
											className="customer-avatar"
										/>
									)}
								</Box>
								<Stack
									direction={"row"}
									overflow={"hidden"}
									alignItems={"center"}
									gap={"calc(var(--flex-gap)/6)"}
								>
									<Box
										overflow={"hidden"}
										flex={{ mobile: 1, miniTablet: "0 1 auto" }}
									>
										<BaseInput
											as={"input"}
											type="file"
											name="avatar"
											ref={fileInputRef}
											style={{ display: "none" }}
											inputProps={{ accept: "image/jpeg, image/png" }}
											onChange={handleFileChange}
										/>
										<BaseButton
											fullWidth
											radius="5px"
											disableElevation
											variant="outlined"
											border="1px solid var(--primary-color)"
											onClick={(e) => handleUploadClick(e)}
										>
											<Typography
												variant={"button"}
												fontFamily={"inherit"}
												fontWeight={"inherit"}
												fontSize={"inherit"}
												lineHeight={"inherit"}
												textTransform={"inherit"}
												color={"var(--primary-color)"}
											>
												Change Picture
											</Typography>
										</BaseButton>
									</Box>
									{/* <Box
										overflow={"hidden"}
										flex={{ mobile: 1, miniTablet: "0 1 auto" }}
									>
										<BaseButton
											fullWidth
											radius="5px"
											disableElevation
											variant="contained"
											bgcolor="var(--error-red-color)"
											onClick={(e) => handleDeleteClick(e)}
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
												Delete Picture
											</Typography>
										</BaseButton>
									</Box> */}
								</Stack>
							</Stack>
						</Grid>
					)}
					{id === "personal-information" && (
						<Fragment>
							<Grid component={"div"} size={{ mobile: 12, tablet: 6 }}>
								<BaseFieldSet>
									<BaseLabel>First Name</BaseLabel>
									<BaseInput
										required
										name="firstName"
										value={formDetails?.firstName}
										placeholder="Enter first name"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12, tablet: 6 }}>
								<BaseFieldSet>
									<BaseLabel>Last Name</BaseLabel>
									<BaseInput
										required
										name="lastName"
										value={formDetails?.lastName}
										placeholder="Enter last name"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12 }}>
								<BaseFieldSet>
									<BaseLabel>Email</BaseLabel>
									<BaseInput
										required
										disabled
										name="email"
										type="email"
										value={formDetails?.email}
										placeholder="Enter email"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12 }}>
								<BaseFieldSet>
									<BaseLabel>Phone</BaseLabel>
									<BaseInput
										required
										name="phone"
										value={formDetails?.phone}
										placeholder="Enter phone number"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
						</Fragment>
					)}
					{id === "delivery-address" && (
						<Fragment>
							<Grid component={"div"} size={{ mobile: 12 }}>
								<BaseFieldSet>
									<BaseLabel>Country</BaseLabel>
									<BaseInput
										required
										disabled
										name="country"
										value={formDetails?.country}
										placeholder="Enter country"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12, tablet: 6 }}>
								<BaseFieldSet>
									<BaseLabel>State</BaseLabel>
									<BaseSelect
										required
										name="state"
										value={formDetails?.state}
										placeholder="Enter state"
										onChange={(e) => handleChange(e)}
									>
										<BaseOption value=" ">Select</BaseOption>
										{areas?.map((area: string, index: number) => (
											<BaseOption key={index} value={area}>
												{area}
											</BaseOption>
										))}
									</BaseSelect>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12, tablet: 6 }}>
								<BaseFieldSet>
									<BaseLabel>House Number</BaseLabel>
									<BaseInput
										required
										name="houseNumber"
										value={formDetails?.houseNumber}
										placeholder="Enter house number"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12 }}>
								<BaseFieldSet>
									<BaseLabel>Street Name</BaseLabel>
									<BaseInput
										required
										name="street"
										value={formDetails?.street}
										placeholder="Enter street name"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
							<Grid component={"div"} size={{ mobile: 12 }}>
								<BaseFieldSet>
									<BaseLabel>Nearest Landmark</BaseLabel>
									<BaseInput
										required
										name="landmark"
										value={formDetails?.landmark}
										placeholder="Enter nearest landmark"
										onChange={(e) => handleChange(e)}
									/>
								</BaseFieldSet>
							</Grid>
						</Fragment>
					)}
				</Grid>
				{error && (
					<Box className="form-error-box">
						<Typography
							fontFamily={"Inter"}
							fontWeight={"600"}
							fontSize={14}
							lineHeight={"normal"}
							color={"var(--error-red-color)"}
							whiteSpace={"normal"}
						>
							{error}
						</Typography>
					</Box>
				)}
				<Box component={"div"} className="form-call-to-action">
					<BaseButton
						type="submit"
						variant="contained"
						sx={{ width: "100%" }}
						padding="calc(var(--basic-padding)/5)"
						radius="5px"
						disableElevation
					>
						{isLoading ? (
							<CircularProgress color="inherit" className="loader" />
						) : (
							<Typography
								variant={"button"}
								fontFamily={"inherit"}
								fontWeight={"inherit"}
								fontSize={"inherit"}
								lineHeight={"inherit"}
								color={"inherit"}
								textTransform={"inherit"}
							>
								Save Changes
							</Typography>
						)}
					</BaseButton>
				</Box>
			</ProfileFormModalWrapper>
		</BaseFormModal>
	);
};
