import { useContext, useMemo, useState } from "react";
import { BaseFormModal } from "../../../component/modal/form";
import { AuthenticationFormModalWrapper } from "./styled";
import {
	Box,
	CircularProgress,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import authFormModalHeaderThumbnail from "../../../asset/image/auth-method-selection-thumbnail.png";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppContext } from "../../../context";
import { BaseFieldSet } from "../../../component/form/fieldset/styled";
import { BaseLabel } from "../../../component/form/label/styled";
import { BaseInput } from "../../../component/form/input/styled";
import { BaseSelect } from "../../../component/form/select/styled";
import { BaseOption } from "../../../component/form/option/styled";
import { BaseButton } from "../../../component/button/styled";
import { signUpUserService } from "../../../util/authentication/signUp";
import { signInUserService } from "../../../util/authentication/signIn";
import { forgotPasswordService } from "../../../util/authentication/forgotPassword";
import { authVerificationService } from "../../../util/authentication/authVerification";
import { resetPasswordService } from "../../../util/authentication/resetPassword";
import Cookies from "universal-cookie";

export const AuthenticationFormModal = () => {
	const areas = ["Port-Harcourt", "Lagos", "Abuja"];

	const cookies = new Cookies();

	const { isAuthenticationFormModalOpen, setIsAuthenticationFormModalOpen } =
		useContext(AppContext);

	const initialFormDetails = useMemo(() => {
		const index = isAuthenticationFormModalOpen.index;
		return {
			...([0, 1, 2].includes(index) && { email: "" }),
			...([0, 1].includes(index) && { password: "" }),
			...([0].includes(index) && { location: " " }),
			...([3].includes(index) && { otp: "" }),
			...([4].includes(index) && { newPassword: "" }),
			...([4].includes(index) && { confirmNewPassword: "" }),
		};
	}, [isAuthenticationFormModalOpen.index]);

	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formDetails, setFormDetails] = useState(initialFormDetails);

	const handleNavigateToPreviousIndex = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		setIsAuthenticationFormModalOpen((prev) => ({
			status: true,
			index: prev.index - 1,
		}));
	};

	const handleCloseAuthenticationFormModal = () => {
		setError(null);
		setFormDetails(initialFormDetails);
		return setIsAuthenticationFormModalOpen({ status: false, index: 0 });
	};

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

	const handleAlternativeCTAClick = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		index: number,
	) => {
		e.stopPropagation();
		setError(null);
		switch (index) {
			// login cta from sign up screen
			case 0.0:
				setIsAuthenticationFormModalOpen({ status: true, index: 1 });
				break;
			case 0.1:
				// assist user to retrieve location
				break;
			// create account cta from login/recovery email screen
			case 1.0:
			case 2.0:
				setIsAuthenticationFormModalOpen({ status: true, index: 0 });
				break;
			// recover password cta from login screen
			case 1.1:
				setIsAuthenticationFormModalOpen({ status: true, index: 2 });
				break;
			case 3.0:
				// resend OTP
				break;
			// create account cta from enter OTP/reset password screens
			case 3.1:
				setIsAuthenticationFormModalOpen({ status: true, index: 0 });
				break;
			case 4.1:
				setIsAuthenticationFormModalOpen({ status: true, index: 0 });
				break;
			default:
				break;
		}
	};

	const handleSignUpUser = async (payload: Record<string, any>) => {
		try {
			const response = await signUpUserService(payload);
			if (response.status === "success") {
				setIsLoading(false);
				setIsAuthenticationFormModalOpen((prev) => ({ ...prev, index: 1 }));
			} else {
				setIsLoading(false);
				setError(
					"Sign-up failed. Please check your credentials and try again.",
				);
			}
		} catch (error: any) {
			setIsLoading(false);
			setError(`Sign-up failed. ${error.message}`);
			console.error("Sign-up failed:", error);
		}
	};

	const handleSignInUser = async (payload: Record<string, any>) => {
		try {
			const response = await signInUserService(payload);
			if (response.status === "success") {
				setIsLoading(false);
				cookies.set("TOKEN", response.token, {
					path: "/",
				});
				setIsAuthenticationFormModalOpen((prev) => ({
					...prev,
					status: false,
				}));
				setFormDetails(initialFormDetails);
			} else {
				setIsLoading(false);
				setError(
					"Sign-in failed. Please check your credentials and try again.",
				);
			}
		} catch (error: any) {
			setIsLoading(false);
			setError(`Sign-in failed. ${error.message}`);
			console.error("Sign-in failed:", error);
		}
	};

	const handleForgotPassword = async (payload: Record<string, any>) => {
		try {
			const response = await forgotPasswordService(payload);
			if (response.status === "success") {
				setIsLoading(false);
				setIsAuthenticationFormModalOpen((prev) => ({ ...prev, index: 3 }));
			} else {
				setIsLoading(false);
				setError(
					"Password verification OTP sending failed. Please check your credentials and try again.",
				);
			}
		} catch (error: any) {
			setIsLoading(false);
			setError(`Password verification OTP sending failed. ${error.message}`);
			console.error("Password verification OTP sending failed:", error);
		}
	};

	const handleVerifyAuthOTP = async (payload: Record<string, any>) => {
		try {
			const response = await authVerificationService(payload);
			if (response.status === "success") {
				setIsLoading(false);
				setIsAuthenticationFormModalOpen((prev) => ({ ...prev, index: 4 }));
			} else {
				setIsLoading(false);
				setError("OTP verification failed. Please try again.");
			}
		} catch (error: any) {
			setIsLoading(false);
			setError(`OTP verification failed. ${error.message}`);
			console.error("OTP verification failed:", error);
		}
	};

	const handleResetPassword = async (payload: Record<string, any>) => {
		try {
			const response = await resetPasswordService(payload);
			if (response.status === "success") {
				setIsLoading(false);
				setIsAuthenticationFormModalOpen((prev) => ({ ...prev, index: 1 }));
			} else {
				setIsLoading(false);
				setError(
					"Password reset failed. Please check your credentials and try again.",
				);
			}
		} catch (error: any) {
			setIsLoading(false);
			setError(`Password reset failed. ${error.message}`);
			console.error("Password reset failed:", error);
		}
	};

	const handleAuthenticationFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		let payload = null;
		setError(null);
		setIsLoading(true);
		switch (isAuthenticationFormModalOpen.index) {
			case 0:
				payload = {
					email: formDetails.email,
					password: formDetails.password,
					location: formDetails.location,
				};
				await handleSignUpUser(payload);
				break;
			case 1:
				payload = {
					email: formDetails.email,
					password: formDetails.password,
				};
				await handleSignInUser(payload);
				break;
			case 2:
				payload = { email: formDetails.email };
				await handleForgotPassword(payload);
				break;
			case 3:
				payload = { email: formDetails.email, otp: formDetails.otp };
				await handleVerifyAuthOTP(payload);
				break;
			case 4:
				payload = {
					email: formDetails.email,
					newPassword: formDetails.newPassword,
					confirmNewPassword: formDetails.confirmNewPassword,
				};
				await handleResetPassword(payload);
				break;
			default:
				payload = null;
				setIsLoading(false);
				break;
		}
	};

	return (
		<BaseFormModal
			open={isAuthenticationFormModalOpen.status}
			handleClickOutside={handleCloseAuthenticationFormModal}
			handleSubmit={handleAuthenticationFormSubmit}
			className="authentication-form-modal"
		>
			<AuthenticationFormModalWrapper>
				<Stack className="modal-navigation-panel">
					<Box component={"div"} className="modal-nav-panel-action-button-box">
						<IconButton
							onClick={handleNavigateToPreviousIndex}
							sx={{
								border: "1px solid var(--close-icon-orange-color)",
								display: [0, 1].includes(isAuthenticationFormModalOpen.index)
									? "none"
									: "inline-flex",
							}}
						>
							<ArrowBackIcon
								sx={{
									color: "var(--close-icon-orange-color)",
									display: "inline-flex",
								}}
							/>
						</IconButton>
					</Box>
					<Box component={"div"} className="modal-nav-panel-action-button-box">
						<IconButton
							onClick={handleCloseAuthenticationFormModal}
							sx={{ border: "1px solid var(--close-icon-orange-color)" }}
						>
							<CloseIcon
								sx={{
									color: "var(--close-icon-orange-color)",
									display: "inline-flex",
								}}
							/>
						</IconButton>
					</Box>
				</Stack>
				<Box component={"div"} className="modal-header-img-box">
					<img
						src={authFormModalHeaderThumbnail}
						alt="Authentication Form Modal Header Thumbnail"
						style={{
							objectFit: "fill",
							width: "100%",
							height: "100%",
							aspectRatio: "1/1",
						}}
					/>
				</Box>
				<Stack className="modal-form-description">
					<Typography
						variant="h3"
						fontFamily={"Inter"}
						fontWeight={600}
						fontSize={20}
						lineHeight={"normal"}
						textAlign={"center"}
						whiteSpace={"normal"}
						color={"var(--dark-color)"}
					>
						{isAuthenticationFormModalOpen.index === 0
							? "Create your Caretimes Account"
							: isAuthenticationFormModalOpen.index === 1
								? "Welcome back!"
								: isAuthenticationFormModalOpen.index === 2
									? "Recover Account"
									: isAuthenticationFormModalOpen.index === 3
										? "Enter OTP"
										: "Create New Password"}
					</Typography>
					{isAuthenticationFormModalOpen.index !== 4 && (
						<Typography
							variant="subtitle1"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={14}
							lineHeight={"normal"}
							textAlign={"center"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							{isAuthenticationFormModalOpen.index === 0
								? "Already have an account?"
								: isAuthenticationFormModalOpen.index === 1 ||
									  isAuthenticationFormModalOpen.index === 2
									? "Don’t have an account?"
									: `Enter 4-digit pin that has been sent to your email.`}
							<Typography
								component={"span"}
								fontFamily={"inherit"}
								fontWeight={"inherit"}
								fontSize={"inherit"}
								lineHeight={"inherit"}
								color={"var(--primary-color)"}
								sx={{ cursor: "pointer" }}
								onClick={(e) =>
									handleAlternativeCTAClick(
										e,
										parseFloat(isAuthenticationFormModalOpen.index + ".0"),
									)
								}
							>
								{isAuthenticationFormModalOpen.index === 0
									? " Log In"
									: isAuthenticationFormModalOpen.index === 1 ||
										  isAuthenticationFormModalOpen.index === 2
										? " Create Account"
										: " Click here "}
							</Typography>
							{isAuthenticationFormModalOpen.index === 3 && (
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"inherit"}
								>
									to resend
								</Typography>
							)}
						</Typography>
					)}
				</Stack>
				<Stack className="modal-form-fields">
					{[0, 1, 2].includes(isAuthenticationFormModalOpen.index) && (
						<BaseFieldSet>
							<BaseLabel>Email</BaseLabel>
							<BaseInput
								required
								name="email"
								value={formDetails.email}
								placeholder="Enter email"
								onChange={(e) => handleChange(e)}
							/>
						</BaseFieldSet>
					)}
					{[0, 1].includes(isAuthenticationFormModalOpen.index) && (
						<BaseFieldSet>
							<BaseLabel>Password</BaseLabel>
							<BaseInput
								required
								type="password"
								name="password"
								value={formDetails.password}
								placeholder="Enter password"
								onChange={(e) => handleChange(e)}
							/>
						</BaseFieldSet>
					)}
					{[0].includes(isAuthenticationFormModalOpen.index) && (
						<BaseFieldSet>
							<BaseLabel>Location Area</BaseLabel>
							<BaseSelect
								name="location"
								value={formDetails.location}
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
					)}
					{[3].includes(isAuthenticationFormModalOpen.index) && (
						<BaseFieldSet>
							<BaseLabel>OTP</BaseLabel>
							<BaseInput
								required
								name="otp"
								value={formDetails.otp}
								placeholder="Enter OTP"
								onChange={(e) => handleChange(e)}
							/>
						</BaseFieldSet>
					)}
					{[4].includes(isAuthenticationFormModalOpen.index) && (
						<BaseFieldSet>
							<BaseLabel>New Password</BaseLabel>
							<BaseInput
								required
								type="password"
								name="newPassword"
								value={formDetails.newPassword}
								placeholder="Enter new password"
								onChange={(e) => handleChange(e)}
							/>
						</BaseFieldSet>
					)}
					{[4].includes(isAuthenticationFormModalOpen.index) && (
						<BaseFieldSet>
							<BaseLabel>Confirm New Password</BaseLabel>
							<BaseInput
								required
								type="password"
								name="confirmNewPassword"
								value={formDetails.confirmNewPassword}
								placeholder="Confirm new password"
								onChange={(e) => handleChange(e)}
							/>
						</BaseFieldSet>
					)}
					{[1].includes(isAuthenticationFormModalOpen.index) && (
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={14}
								lineHeight={"normal"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Forgot Password?
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"var(--primary-color)"}
									sx={{ cursor: "pointer" }}
									onClick={(e) =>
										handleAlternativeCTAClick(
											e,
											parseFloat(isAuthenticationFormModalOpen.index + ".1"),
										)
									}
								>
									{" Click Here."}
								</Typography>
							</Typography>
						</Box>
					)}
					{[0].includes(isAuthenticationFormModalOpen.index) && (
						<Box>
							<Typography
								variant="subtitle1"
								fontFamily={"Inter"}
								fontWeight={400}
								fontSize={14}
								lineHeight={"normal"}
								whiteSpace={"normal"}
								color={"var(--dark-color)"}
							>
								Can’t find your location?
								<Typography
									component={"span"}
									fontFamily={"inherit"}
									fontWeight={"inherit"}
									fontSize={"inherit"}
									lineHeight={"inherit"}
									color={"var(--primary-color)"}
									sx={{ cursor: "pointer" }}
									onClick={(e) =>
										handleAlternativeCTAClick(
											e,
											parseFloat(isAuthenticationFormModalOpen.index + ".1"),
										)
									}
								>
									{" Click Here."}
								</Typography>
							</Typography>
						</Box>
					)}
				</Stack>
				{[0].includes(isAuthenticationFormModalOpen.index) && (
					<Box component={"div"} className="modal-footer-note">
						<Typography
							variant="subtitle1"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={14}
							lineHeight={"normal"}
							textAlign={"center"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							We need your location so we can show you the service we offer in
							your region.
						</Typography>
					</Box>
				)}
				{error && (
					<Box className="modal-footer-note">
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
				<Box component={"div"} className="modal-call-to-action">
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
								{isAuthenticationFormModalOpen.index === 0
									? "Create an account "
									: isAuthenticationFormModalOpen.index === 1
										? "Login"
										: isAuthenticationFormModalOpen.index === 2 ||
											  isAuthenticationFormModalOpen.index === 3
											? "Proceed"
											: "Done"}
							</Typography>
						)}
					</BaseButton>
				</Box>
				{[3, 4].includes(isAuthenticationFormModalOpen.index) && (
					<Box component={"div"} className="modal-footer-note">
						<Typography
							variant="subtitle1"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={14}
							lineHeight={"normal"}
							textAlign={"center"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							Don’t have an account?
							<Typography
								component={"span"}
								fontFamily={"inherit"}
								fontWeight={"inherit"}
								fontSize={"inherit"}
								lineHeight={"inherit"}
								color={"var(--primary-color)"}
								sx={{ cursor: "pointer" }}
								onClick={(e) =>
									handleAlternativeCTAClick(
										e,
										parseFloat(isAuthenticationFormModalOpen.index + ".1"),
									)
								}
							>
								{" Create Account."}
							</Typography>
						</Typography>
					</Box>
				)}
			</AuthenticationFormModalWrapper>
		</BaseFormModal>
	);
};
