import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
const useStyles = makeStyles({
	intro: {
		color: "#fff",
		marginBottom: 20,
		fontSize: "20px",
		textTransform: "capitalize",
	},
	section: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: "100px 0",
	},

	searchInput: {
		marginBottom: 10,
		width: "100%",

		" & .MuiInputBase-input": {
			color: "#666",
			backgroundColor: "#fff",
			height: 20,
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				border: "none",
			},
			"&:hover fieldset": {
				border: "#none",
			},
			"&.Mui-focused fieldset": {
				border: "none",
			},
		},
	},
	selectForm: {
		backgroundColor: "#fff",
		width: "50%",
		marginBottom: 10,
		"& .MuiSelect-select.MuiSelect-select": {
			textAlign: "center",
			padding: 0,
		},
	},

	selectInput: {
		height: 60,

		padding: 8,
	},
});
function Search({ onLoadImages, textInputChange, amountInputChange }) {
	const classes = useStyles();

	// states
	const [error, setError] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [amount, setAmount] = useState("15");
	const [backgroundImg, setBackgroundImg] = useState(null);
	const key = "563492ad6f917000010000015443aafbf5ad4197a4ca82be5b699ad4 ";

	// BACKGROUND STYLE
	const style = backgroundImg
		? {
				background: "url(" + backgroundImg + ")",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
		  }
		: {
				background: "#ccc",
		  };
	//useEffect
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			!searchText ? textInputChange("happy") : textInputChange(searchText);
		}

		return () => {
			mounted = false;
		};
	}, [searchText, textInputChange]);

	//useEffect
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			amountInputChange(amount);
		}

		return () => {
			mounted = false;
		};
	}, [amount, amountInputChange]);

	// useEffect
	useEffect(() => {
		axios
			.get("https://api.pexels.com/v1/search?query=mountain&per_page=1", {
				headers: {
					Authorization: key,
				},
			})
			.then((response) => {
				setBackgroundImg(response.data.photos[0].src.landscape);
			})
			.catch((error) => console.log(error));
	}, []);

	// useEffect
	useEffect(() => {
		let mounted = true;
		let inputText = searchText ? searchText : "happy";

		if (mounted) {
			axios
				.get(
					"https://api.pexels.com/v1/search?query=" +
						inputText +
						"&per_page=" +
						amount,
					{
						headers: {
							Authorization: key,
						},
					}
				)
				.then((response) => {
					if (mounted) {
						const imageResults = response.data.photos;

						onLoadImages(imageResults);
					}
				})
				.catch((error) => {
					//set error

					console.log(error.data);
				});
		}

		return () => {
			mounted = false;
		};
	}, [amount, onLoadImages, searchText]);

	// search handler function
	const searchHandler = (event) => {
		setSearchText(([event.target.name] = event.target.value));
	};

	// select handler function
	const selectHandler = (event) => {
		setAmount(event.target.value);
	};

	return (
		<div className={classes.section} style={style}>
			<Container>
				<Typography variant="body1" align="center" className={classes.intro}>
					Type in your search word (
					<span style={{ textTransform: "lowercase" }}>
						<em>e.g happy </em>)
					</span>{" "}
					in The Search Field below, results will be displayed with pictures
					matching your search input. All pictures dispalyed here were gotten
					from{" "}
					<a style={{ color: "#fff" }} href="https://pexels.com">
						PEXELS
					</a>
					.
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={8}>
						<TextField
							className={classes.searchInput}
							placeholder=" Search Photos e.g happy"
							name="searchText"
							type="search"
							variant="outlined"
							value={searchText}
							onChange={searchHandler}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl className={classes.selectForm}>
							<Select
								className={classes.selectInput}
								value={amount}
								onChange={selectHandler}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={15}>15</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={25}>25</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Search;
