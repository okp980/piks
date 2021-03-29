import React, { useState, useCallback } from "react";
import Header from "./component/Header/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Search from "./component/Search/Search";
import Main from "./component/Main/Main";

function App() {
	const [amount, setAmount] = useState("");
	const [text, setText] = useState("");
	const [images, setImages] = useState([]);

	const amountChangeHandler = (input) => setAmount(input);
	const textChangeHandler = (input) => setText(input);
	const filteredImagesHandler = useCallback(
		(filteredImages) => setImages(filteredImages),
		[]
	);

	return (
		<div style={{ minWidth: "320px" }}>
			<CssBaseline />

			<Header />
			<Search
				onLoadImages={filteredImagesHandler}
				amountInputChange={amountChangeHandler}
				textInputChange={textChangeHandler}
			/>
			<Main photos={images} amount={amount} inputText={text} />
		</div>
	);
}

export default App;
