import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export const RouteProtector: React.FC = () => {
	const cookies = new Cookies();
	const { TOKEN } = cookies.getAll();
	if (TOKEN) {
		return <Outlet />;
	} else {
		return <Navigate to="/" />;
	}
};
