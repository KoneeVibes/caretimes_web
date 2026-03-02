const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

export const updateProfileService = async (token: string, payload: any) => {
	try {
		const response = await fetch(
			`${BASE_ENDPOINT}/api/v1/customer-interface/user-management/update-profile`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: payload,
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
