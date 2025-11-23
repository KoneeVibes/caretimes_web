import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./page/home";
import { Product } from "./page/product";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Product />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
