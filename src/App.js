import { useState, useEffect, useCallback } from "react";
import Nav from "./components/nav/Nav";
import "./app.css";
import Hero from "./components/hero/Hero";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import useFetch from "./hooks/use-fetch";
import ErrorPage from "./components/error/ErrorPage";
import PaginationNav from "./components/paginationNav/PaginationNav.jsx";

function App() {
	const [filterAmount, setFilterAmount] = useState(10);

	const [searchText, setSearchText] = useState("happy");
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState([]);

	const url = `https://api.pexels.com/v1/search?query=${searchText}&page=${currentPage}&per_page=${filterAmount}`;

	const { fetchRequest, loading, error } = useFetch();

	const handldeSearchText = (e) => {
		if (e.target.value.trim() < 0) {
			return;
		}
		setSearchText(e.target.value.trim());
	};

	const handleDataRequest = useCallback((data) => {
		let photos = data.photos;

		setData(photos);
	}, []);

	useEffect(() => {
		fetchRequest(url, handleDataRequest);
	}, [fetchRequest, url, handleDataRequest]);

	const changeSearchKeyword = useCallback((keyword) => {
		setSearchText(keyword);
	}, []);
	const changeFIlteredAmount = useCallback((e) => {
		setFilterAmount(e.target.value);
	}, []);

	const changeCurrentPage = useCallback((page) => {
		setCurrentPage(page);
	}, []);

	if (error) return <ErrorPage />;

	return (
		<div>
			<Nav
				handleChange={changeSearchKeyword}
				searchText={searchText}
				handldeSearchText={handldeSearchText}
			/>
			<Hero />
			<Main
				resultPhotos={data}
				isLoading={loading}
				error={error}
				filterAmount={filterAmount}
				changeFIlteredAmount={changeFIlteredAmount}
				searchText={searchText}
			/>
			<PaginationNav
				handleCurrentPage={changeCurrentPage}
				pageNumber={currentPage}
			/>
			<Footer />
		</div>
	);
}

export default App;
