const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

export const retrieveAllProductService = async (queryParams?: {
	page?: string;
	perPage?: string;
	sortBy?: string;
	sortParam?: string;
	categories?: string[];
	availability?: string[];
	price?: {
		lowerLimit: number;
		upperLimit: number;
	};
}) => {
	const params = new URLSearchParams();
	if (queryParams?.page) {
		params.append("page", queryParams.page);
	}
	if (queryParams?.perPage) {
		params.append("perPage", queryParams.perPage);
	}
	if (queryParams?.sortParam) {
		params.append("sortParam", queryParams.sortParam);
	}
	if (queryParams?.sortBy) {
		params.append("sortBy", queryParams.sortBy);
	}
	if (queryParams?.categories?.length) {
		params.append("categories", queryParams.categories.join(","));
	}
	if (queryParams?.availability?.length) {
		params.append("availability", queryParams.availability?.join(","));
	}
	if (queryParams?.price) {
		const { lowerLimit, upperLimit } = queryParams.price;
		if (lowerLimit) {
			params.append("lowerLimit", String(lowerLimit));
		}
		if (upperLimit) {
			params.append("upperLimit", String(upperLimit));
		}
	}
	const filter = params.toString();
	try {
		const response = await fetch(
			`${BASE_ENDPOINT}/api/v1/customer-interface/product/all?${filter}`,
			{
				method: "GET",
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
