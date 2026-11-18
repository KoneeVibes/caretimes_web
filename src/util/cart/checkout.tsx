const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

export const checkoutService = async (
	token: string,
	payload: any,
	queryParams?: { paymentOption: "instant" | "on-delivery" },
) => {
	const params = new URLSearchParams();
	if (queryParams?.paymentOption) {
		params.append("option", queryParams.paymentOption);
	}
	const query = params.toString();
	try {
		const response = await fetch(
			`${BASE_ENDPOINT}/api/v1/customer-interface/cart/checkout?${query}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
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
