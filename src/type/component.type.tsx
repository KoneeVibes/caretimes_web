import { FormLabelProps, InputBaseProps } from "@mui/material";

export type BaseTypographyType = {
    fontsize?: string,
    fontweight?: number,
    colour?: string,
};

export type BaseButtonPropsType = BaseTypographyType & {
    radius?: string,
    padding?: string,
    bgcolor?: string,
    border?: string,
};

export type BaseLabelPropsType = BaseTypographyType & FormLabelProps;

export type BaseInputPropsType = BaseTypographyType & {
    border?: string,
    bgcolor?: string,
    radius?: string,
    padding?: string
} & InputBaseProps;

export type BaseMarqueePropsType = {
    background: string,
    items: React.ReactNode[];
};

export type BaseAlertModalPropsType = {
    open: boolean,
    icon: React.ReactNode,
    handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined,
    handleCallToAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    title?: string,
    message?: string,
    callToAction?: string,
    className?: string
};

export type NotificationModalPropsType = Omit<BaseAlertModalPropsType, "icon" | "message" | "callToAction" | "handleCallToAction"> & {
    isLoading: boolean,
    headerBg: React.ReactNode,
    body?: React.ReactNode,
    callToActionI?: string,
    callToActionII?: string,
    callToActionIII?: string,
    handleCallToAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void,
};

export type FormModalPropsType = {
    open: boolean,
    handleClickOutside: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    title?: string,
    children: React.ReactNode,
    className?: string,
};
