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

	const { fetchRequest, loading, error } = useFetch(); //custom hook

	//** responsible for setting the search text
	// ** prevents react from creating new handleSearch function as it is passed as a prop
	//** to nav component, a new fuction created will imply useEffect to called and
	// ** searchText is reset to 'happy'
	// *****remove the useCallback to see this effect*****
	const handleSearchText = useCallback((word) => {
		if (word.length === 0) {
			setSearchText("happy");
			return;
		}
		setSearchText(word);
	}, []);

	//** responsible for storing the data received from respponse received from api fetch
	const handleDataRequest = useCallback((data) => {
		let photos = data.photos;

		setData(photos);
	}, []);

	//** useEffect used to make api call after the app(component) renders
	useEffect(() => {
		fetchRequest(url, handleDataRequest); //** fetchRequest which was distructured from useFetch custom hook receives 2 args
	}, [fetchRequest, url, handleDataRequest]);

	//** this function is responsible for changing searchText state based on inputed keywords
	const changeSearchKeyword = useCallback((keyword) => {
		setSearchText(keyword);
	}, []);

	//  ** sets the filteredAmount of images to fetch
	const changeFIlteredAmount = useCallback((e) => {
		setFilterAmount(e.target.value);
	}, []);

	//  ** sets the currentPage number for pagination
	const changeCurrentPage = useCallback((page) => {
		setCurrentPage(page);
	}, []);

	if (error) return <ErrorPage />; // ** handles error state

	return (
		<div>
			<Nav
				handleChange={changeSearchKeyword}
				onHandleSearch={handleSearchText}
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
