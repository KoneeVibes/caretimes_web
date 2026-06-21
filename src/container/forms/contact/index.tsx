import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ContactFormWrapper } from "./styled";
import { BaseLegend } from "../../../component/form/legend/styled";
import { BaseFieldSet } from "../../../component/form/fieldset/styled";
import { BaseLabel } from "../../../component/form/label/styled";
import { BaseInput } from "../../../component/form/input/styled";
import { useEffect, useState } from "react";
import { BaseButton } from "../../../component/button/styled";
import { useParams } from "react-router-dom";

export const ContactForm = () => {
	type FormDetails = typeof initialFormDetails;
	type FormType = "sales" | "support";

	const initialFormDetails = {
		fullName: "",
		businessName: "",
		phone: "",
		businessAddress: "",
		nearestLandmark: "",
		informationSource: "",
		additionalInfo: "",
		reasonForContact: "",
	};

	const { id } = useParams();

	const [activeFormType, setActiveFormType] = useState<FormType>(
		id === "sales" || id === "support" ? id : "support",
	);

	const [isLoading] = useState(false);
	const [error] = useState<string | null>(null);
	const [formDetails, setFormDetails] =
		useState<Partial<FormDetails>>(initialFormDetails);

	const handleToggleActiveCard = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		formType: FormType,
	) => {
		const container = e.currentTarget.parentElement;
		if (container) {
			const cards = container.querySelectorAll(".call-to-action-card");
			cards.forEach((card) => card.classList.remove("active"));
			e.currentTarget.classList.add("active");
		}
		setActiveFormType(formType);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		setActiveFormType(id === "sales" ? "sales" : "support");
	}, [id]);

	// const getPayload = () => {
	// 	if (activeFormType === "sales") {
	// 		return formDetails;
	// 	}
	// 	return {
	// 		fullName: formDetails.fullName,
	// 		phone: formDetails.phone,
	// 		additionalInfo: formDetails.additionalInfo,
	// 		reasonForContact: formDetails.reasonForContact,
	// 	};
	// };

	return (
		<ContactFormWrapper>
			<Box>
				<BaseLegend fontweight={400} fontsize={"26px"}>
					I’m interested in
				</BaseLegend>
			</Box>
			<Stack className="call-to-action-cards">
				<Stack
					className={`call-to-action-card ${activeFormType === "support" && "active"}`}
					onClick={(e) => handleToggleActiveCard(e, "support")}
				>
					<Box>
						<Typography
							variant="subtitle1"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={16}
							lineHeight={"normal"}
							textAlign={"left"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							Issues
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="body1"
							fontFamily={"Inter"}
							fontWeight={500}
							fontSize={20}
							lineHeight={"normal"}
							textAlign={"left"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							Reach out to us with your issues
						</Typography>
					</Box>
				</Stack>
				<Stack
					className={`call-to-action-card ${activeFormType === "sales" && "active"}`}
					onClick={(e) => handleToggleActiveCard(e, "sales")}
				>
					<Box>
						<Typography
							variant="subtitle1"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={16}
							lineHeight={"normal"}
							textAlign={"left"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							Join Us
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="body1"
							fontFamily={"Inter"}
							fontWeight={500}
							fontSize={20}
							lineHeight={"normal"}
							textAlign={"left"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							Become a Distributor with us
						</Typography>
					</Box>
				</Stack>
			</Stack>
			<Stack className="fieldset-area">
				<Box>
					<Typography
						variant="h4"
						fontFamily={"Inter"}
						fontWeight={600}
						fontSize={20}
						lineHeight={"normal"}
						textAlign={"left"}
						whiteSpace={"normal"}
						color={"var(--dark-color)"}
					>
						Your Details
					</Typography>
				</Box>
				<BaseFieldSet>
					<BaseLabel className="required">Full Name</BaseLabel>
					<BaseInput
						required
						name="fullName"
						value={formDetails.fullName}
						placeholder="Enter your full name"
						onChange={(e) => handleChange(e)}
					/>
				</BaseFieldSet>
				{activeFormType === "sales" && (
					<BaseFieldSet>
						<BaseLabel>Business Name</BaseLabel>
						<BaseInput
							required
							name="businessName"
							value={formDetails.businessName}
							placeholder="Enter your business name"
							onChange={(e) => handleChange(e)}
						/>
					</BaseFieldSet>
				)}
				<BaseFieldSet>
					<BaseLabel className="required">Phone Number</BaseLabel>
					<BaseInput
						required
						name="phone"
						value={formDetails.phone}
						placeholder="Enter your phone number"
						onChange={(e) => handleChange(e)}
					/>
				</BaseFieldSet>
				{activeFormType === "sales" && (
					<BaseFieldSet>
						<BaseLabel className="required">Business Address</BaseLabel>
						<BaseInput
							required
							name="businessAddress"
							value={formDetails.businessAddress}
							placeholder="Enter your business address"
							onChange={(e) => handleChange(e)}
						/>
					</BaseFieldSet>
				)}
				{activeFormType === "sales" && (
					<BaseFieldSet>
						<BaseLabel>Nearest Landmark</BaseLabel>
						<BaseInput
							name="nearestLandmark"
							value={formDetails.nearestLandmark}
							placeholder="Enter your nearest landmark"
							onChange={(e) => handleChange(e)}
						/>
					</BaseFieldSet>
				)}
				{activeFormType === "sales" && (
					<BaseFieldSet>
						<BaseLabel className="required">
							How did you hear about us
						</BaseLabel>
						<BaseInput
							required
							name="informationSource"
							value={formDetails.informationSource}
							placeholder="Enter how you heard about us"
							onChange={(e) => handleChange(e)}
						/>
					</BaseFieldSet>
				)}
				<BaseFieldSet>
					<BaseLabel
						fontweight={600}
						fontsize="20px"
						colour="var(--dark-color)"
					>
						Any additional note
					</BaseLabel>
					<BaseInput
						multiline
						minRows={16}
						name="additionalInfo"
						value={formDetails.additionalInfo}
						onChange={(e) => handleChange(e)}
					/>
				</BaseFieldSet>
				<Stack className="confirm-terms-and-conditions">
					<BaseFieldSet>
						<BaseInput
							type="checkbox"
							name="informationSource"
							value={formDetails.informationSource}
							placeholder="Enter how you heard about us"
							onChange={(e) => handleChange(e)}
							sx={{
								padding: 0,
								cursor: "pointer",
								border: "none",
								borderRadius: "0px",
								"& .MuiInputBase-input": {
									height: "unset",
								},
							}}
						/>
					</BaseFieldSet>
					<Box>
						<Typography
							variant="subtitle2"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={16}
							lineHeight={"normal"}
							textAlign={"left"}
							whiteSpace={"normal"}
							color={"var(--dark-color)"}
						>
							I agree to the Terms of Service and Privacy Policy.
						</Typography>
					</Box>
				</Stack>
			</Stack>
			{error && (
				<Box>
					<Typography
						fontFamily={"Inter"}
						fontWeight={"600"}
						fontSize={14}
						lineHeight={"normal"}
						color={"var(--text-salmon-pink-color)"}
						whiteSpace={"normal"}
					>
						{error}
					</Typography>
				</Box>
			)}
			<Box component={"div"}>
				<BaseButton
					type="submit"
					variant="contained"
					disabled={isLoading}
					sx={{
						width: { mobile: "100%", miniTablet: "auto" },
					}}
					fontsize={"17px"}
					fontweight={400}
					padding="calc(var(--basic-padding)/4) calc(var(--basic-padding)/3)"
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
							Contact Us
						</Typography>
					)}
				</BaseButton>
			</Box>
		</ContactFormWrapper>
	);
};
