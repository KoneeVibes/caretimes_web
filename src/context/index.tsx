import { createContext, useState } from "react";
import { ContextProviderPropsType, ContextType } from "../type/context.type";

export const AppContext = createContext({} as ContextType);

export const AppContextProvider: React.FC<ContextProviderPropsType> = ({
	children,
}) => {
	const [openMenu, setOpenMenu] = useState(false);
	const [
		isAuthenticationMethodSelectionModalOpen,
		setIsAuthenticationMethodSelectionModalOpen,
	] = useState(true);
	const [isAuthenticationFormModalOpen, setIsAuthenticationFormModalOpen] =
		useState({ status: false, index: 0 });
	const [isContentModalOpen, setIsContentModalOpen] = useState(false);

	return (
		<AppContext.Provider
			value={{
				openMenu,
				setOpenMenu,
				isAuthenticationMethodSelectionModalOpen,
				setIsAuthenticationMethodSelectionModalOpen,
				isAuthenticationFormModalOpen,
				setIsAuthenticationFormModalOpen,
				isContentModalOpen,
				setIsContentModalOpen,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
