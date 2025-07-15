import { Box, CircularProgress, DialogActions, DialogContent, Typography } from "@mui/material";
import { BaseNotificationModalWrapper } from "./styled";
import { NotificationModalPropsType } from "../../../type/component.type";
import { BaseButton } from "../../button/styled";

export const BaseNotificationModal: React.FC<NotificationModalPropsType> = ({ open, className, headerBg, handleClose, title, body, isLoading, callToActionI, callToActionII, callToActionIII, handleCallToAction }) => {
    return (
        <BaseNotificationModalWrapper
            open={open}
            onClose={handleClose}
            className={className}
        >
            <DialogContent>
                <Box
                    component={"div"}
                    className="modal-header-img-box"
                >
                    {headerBg}
                </Box>
                <Box
                    component={"div"}
                    className="modal-title-box"
                >
                    <Typography
                        variant="subtitle1"
                        fontFamily={"Cormorant"}
                        fontWeight={400}
                        fontSize={30}
                        lineHeight={"normal"}
                        color="var(--dark-color)"
                        textAlign={"center"}
                        whiteSpace={"normal"}
                    >
                        {title}
                    </Typography>
                </Box>
                {body}
            </DialogContent>
            <DialogActions>
                <Box
                    flex={1}
                    width={"100%"}
                    overflow={"hidden"}
                >
                    <BaseButton
                        variant="contained"
                        sx={{ width: "100%" }}
                        padding="calc(var(--basic-padding)/5)"
                        radius="5px"
                        disableElevation
                        onClick={(e) => handleCallToAction?.(e, "callToActionI")}
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
                                {callToActionI}
                            </Typography>
                        )}
                    </BaseButton>
                </Box>
                <Box
                    flex={1}
                    width={"100%"}
                    marginLeft={"0 !important"}
                    overflow={"hidden"}
                >
                    <BaseButton
                        variant="outlined"
                        sx={{ width: "100%" }}
                        radius="5px"
                        padding="calc(var(--basic-padding)/5)"
                        onClick={(e) => handleCallToAction?.(e, "callToActionII")}
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
                                color={"var(--primary-color)"}
                                textTransform={"inherit"}
                            >
                                {callToActionII}
                            </Typography>
                        )}
                    </BaseButton>
                </Box>
                {callToActionIII && (
                    <Box
                        flex={1}
                        width={"100%"}
                        marginLeft={"0 !important"}
                        overflow={"hidden"}
                    >
                        <BaseButton
                            variant="text"
                            sx={{ width: "100%" }}
                            border="none"
                            radius="5px"
                            padding="calc(var(--basic-padding)/5)"
                            onClick={(e) => handleCallToAction?.(e, "callToActionIII")}
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
                                    color={"var(--off-dark-color)"}
                                    textTransform={"inherit"}
                                >
                                    {callToActionIII}
                                </Typography>
                            )}
                        </BaseButton>
                    </Box>
                )}
            </DialogActions>
        </BaseNotificationModalWrapper>
    )
}
