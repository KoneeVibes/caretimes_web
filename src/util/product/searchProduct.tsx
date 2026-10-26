const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

export const searchProductService = async (
	queryParams?: {
		q?: string;
		page?: string;
		limit?: string;
		sortBy?: string;
		order?: string;
		category?: string;
		status?: string;
		minPrice?: string;
		maxPrice?: string;
		inStock?: string;
	},
	signal?: any,
) => {
	const params = new URLSearchParams();
	if (queryParams?.q) {
		params.append("q", queryParams.q);
	}
	if (queryParams?.page) {
		params.append("page", queryParams.page);
	}
	if (queryParams?.limit) {
		params.append("limit", queryParams.limit);
	}
	if (queryParams?.order) {
		params.append("order", queryParams.order);
	}
	if (queryParams?.sortBy) {
		params.append("sortBy", queryParams.sortBy);
	}
	if (queryParams?.category) {
		params.append("category", queryParams.category);
	}
	if (queryParams?.status) {
		params.append("status", queryParams.status);
	}
	if (queryParams?.minPrice) {
		params.append("minPrice", queryParams.minPrice);
	}
	if (queryParams?.maxPrice) {
		params.append("maxPrice", queryParams.maxPrice);
	}
	if (queryParams?.inStock) {
		params.append("inStock", queryParams.inStock);
	}
	const filter = params.toString();
	try {
		const response = await fetch(
			`${BASE_ENDPOINT}/api/v1/customer-interface/product/search?${filter}`,
			{
				method: "GET",
				signal: signal,
			},
		);
		const res = await response.json();
		if (!response.ok) {
			console.error("Error:", res);
			throw new Error(res.message);
		}
		return res;
	} catch (error) {
		console.error("API fetch error:", error);
		throw error;
	}
};
