import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./page/home";
import { Product } from "./page/product";
import { About } from "./page/about";
import { Contact } from "./page/contact";
import { Checkout } from "./page/checkout";
import { ProductDetail } from "./page/productdetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product" element={<Product />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/product/:id" element={<ProductDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
