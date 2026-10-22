import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./page/home";
import { Product } from "./page/product";
import { About } from "./page/about";
import { Contact } from "./page/contact";
import { Checkout } from "./page/checkout";
import { ProductDetail } from "./page/productdetail";
import ScrollToTop from "./ScrollToTop";
import { Profile } from "./page/profile";
import { NotFoundError } from "./page/notfound";
import { ToastContainer } from "react-toastify";
import { OrderDetail } from "./page/orderdetail";
import { RouteProtector } from "./config/routeProtector";

function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<ScrollToTop>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/product" element={<Product />} />
					<Route path="/contact/:id?" element={<Contact />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route element={<RouteProtector />}>
						<Route path="/profile/:tabIndex?" element={<Profile />} />
						<Route path="/order/:id" element={<OrderDetail />} />
						<Route path="/checkout" element={<Checkout />} />
					</Route>
					<Route path="*" element={<NotFoundError />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
}

export default App;
