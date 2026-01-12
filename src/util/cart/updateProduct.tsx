const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

export const updateProductService = async (
	token: string,
	productId: string,
	payload: any
) => {
	try {
		const response = await fetch(
			`${BASE_ENDPOINT}/api/v1/customer-interface/cart/${productId}/update-product`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}
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
