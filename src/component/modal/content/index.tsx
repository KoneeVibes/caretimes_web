import {
	Box,
	CircularProgress,
	DialogActions,
	DialogContent,
	Typography,
} from "@mui/material";
import { BaseContentModalWrapper } from "./styled";
import { ContentModalPropsType } from "../../../type/component.type";
import { BaseButton } from "../../button/styled";
import { ArrowDownward } from "@mui/icons-material";

export const BaseContentModal: React.FC<ContentModalPropsType> = ({
	open,
	className,
	handleClose,
	subtitle,
	title,
	body,
	isLoading,
	callToAction,
	handleCallToAction,
}) => {
	return (
		<BaseContentModalWrapper
			open={open}
			onClose={handleClose}
			className={className}
		>
			<DialogContent>
				{subtitle && (
					<Box component={"div"} className="modal-subtitle-box">
						<Typography
							variant="subtitle2"
							fontFamily={"Inter"}
							fontWeight={400}
							fontSize={18}
							lineHeight={"normal"}
							color="var(--off-primary-color)"
							whiteSpace={"normal"}
						>
							{subtitle}
						</Typography>
					</Box>
				)}
				{title && (
					<Box component={"div"} className="modal-title-box">
						<Typography
							variant="subtitle1"
							fontFamily={"Cormorant"}
							fontWeight={500}
							fontSize={36}
							lineHeight={"normal"}
							color="var(--off-primary-color)"
							whiteSpace={"normal"}
						>
							{title}
						</Typography>
					</Box>
				)}
				{body}
			</DialogContent>
			<DialogActions>
				{callToAction && (
					<Box
						overflow={"hidden"}
						width={{ mobile: "100%", miniTablet: "auto" }}
					>
						<BaseButton
							radius={"64px"}
							variant={"outlined"}
							onClick={handleCallToAction}
							padding="calc(var(--basic-padding)/5)"
							border={"1px solid var(--border-primary-color)"}
							sx={{ width: { mobile: "100%", miniTablet: "auto" } }}
							endIcon={
								<ArrowDownward sx={{ color: "var(--off-primary-color)" }} />
							}
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
									textTransform={"inherit"}
									color={"var(--off-primary-color)"}
								>
									{callToAction}
								</Typography>
							)}
						</BaseButton>
					</Box>
				)}
			</DialogActions>
		</BaseContentModalWrapper>
	);
};
