import { useContext } from "react";
import { AppContext } from "../context";

export const useRequireAuth = () => {
	const { setIsAuthenticationFormModalOpen } = useContext(AppContext);
	const requireAuth = (token?: string): boolean => {
		if (!token) {
			setIsAuthenticationFormModalOpen({ status: true, index: 1 });
			return false;
		}
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const now = Date.now() / 1000;
			if (payload.exp < now) {
				setIsAuthenticationFormModalOpen({ status: true, index: 1 });
				return false;
			}
			return true;
		} catch {
			setIsAuthenticationFormModalOpen({ status: true, index: 1 });
			return false;
		}
	};
	return { requireAuth };
};
