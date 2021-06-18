import { useCallback, useState } from "react";

export default function useFetch() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const fetchRequest = useCallback(async (url, callbackFunc) => {
		try {
			setLoading(true);
			const response = await fetch(url, {
				headers: {
					Authorization:
						"563492ad6f917000010000015443aafbf5ad4197a4ca82be5b699ad4",
				},
			});
			if (!response.ok) {
				throw new Error("errors everywhere");
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
