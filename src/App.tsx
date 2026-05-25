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

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product" element={<Product />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact/:id?" element={<Contact />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
}

export default App;
