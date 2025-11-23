const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

export const retrieveAllProductService = async (
	token: string,
	queryParams?: {
		perPage?: string;
		sortBy?: string;
		categories?: string[];
		availability?: string[];
		price?: {
			lowerLimit: number;
			upperLimit: number;
		};
	}
) => {
	const params = new URLSearchParams();
	if (queryParams?.perPage) {
		params.append("perPage", queryParams.perPage);
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
				credentials: "include",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		const res = await response.json();
		if (!response.ok) {
			console.error("Error:", res);
			throw new Error(res.message);
		}
		return res.data;
	} catch (error) {
		console.error("API fetch error:", error);
		throw error;
	}
};
