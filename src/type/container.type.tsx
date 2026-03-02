export type PageTitlePropsType = {
	title: string;
};

export type CategoryRef = {
	categoryRef: React.RefObject<HTMLDivElement | null>;
};

export type ProfileFormModalPropsType = {
	id: string;
	open: boolean;
	handleClose: () => void;
	user: Record<string, any> | null;
};
