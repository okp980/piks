import { useCallback, useState } from "react";

export default function useFetch() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const fetchRequest = useCallback(async (url, callbackFunc) => {
		try {
			setLoading(true);
			const response = await fetch(url, {
				headers: {
					Authorization: `${process.env.REACT_APP_API_KEY}`, // **input your own api key here
				},
			});
			if (!response.ok) {
				throw new Error("Error from Server");
			}

			const data = await response.json();
			callbackFunc(data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}, []);

	return {
		fetchRequest,
		loading,
		error,
	};
}
