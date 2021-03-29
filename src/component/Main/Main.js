import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Spinner from "./../../UI/Spinner/Spinner";
import Info from "../../UI/Info/Info";
import axios from "axios";

const useStyles = makeStyles({
	display: {
		margin: "50px 0",
		display: "flex",
		flexWrap: "Wrap",
		justifyContent: "space-around",
		overflow: "hidden",
	},

	imageContainer: {
		width: "100%",
		height: 240,
		overflow: "hidden",
	},

	image: {
		maxWidth: "100%",
		height: "auto",
		display: "block",
		objectFit: "contain",
	},
	header: {
		color: "#fff",
		// textAlign: "center",
		fontSize: 18,
		fontWeight: 500,
		backgroundColor: "#6363d4",
		padding: "15px ",
	},
});

function Main({ photos, amount, inputText }) {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [currentImageUrl, setCurrentImageUrl] = useState("");
	const [photographer, setPhotographer] = useState("");
	const [photographerUrl, setPhotographerUrl] = useState("");
	const [pexelPage, setPexelPage] = useState("");

	const handleClickOpenHandler = (id) => {
		const key = "563492ad6f917000010000015443aafbf5ad4197a4ca82be5b699ad4 ";
		setOpen(true);

		if (!currentImageUrl) {
			if (id) {
				axios
					.get(`https://api.pexels.com/v1/photos/${id}`, {
						headers: {
							Authorization: key,
						},
					})
					.then((response) => {
						setCurrentImageUrl(response.data.src.landscape);
						setPhotographer(response.data.photographer);
						setPhotographerUrl(response.data.photographer_url);
						setPexelPage(response.data.url);
					});
			}
		}
	};

	const handleCloseHandler = () => {
		setOpen(false);
		setCurrentImageUrl(null);
	};
	const classes = useStyles();

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (photos.length > 0) {
				setImages(photos);
				if (images) {
					setLoading(false);
				}
			}
		}
		return () => {
			mounted = false;
			setImages([]);
		};
	}, [images, loading, photos]);

	const display = loading ? (
		<Spinner />
	) : (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Card component="div" className={classes.header}>
					Search results for <em>{inputText}</em>
				</Card>
				<Typography
					variant="body2"
					color="textSecondary"
					component="p"
					style={{ padding: "10px 0", textTransform: "capitalize" }}
				>
					showing {amount} results from search
				</Typography>
			</Grid>
			{images.map((image) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
					<Card className={classes.imageCard}>
						<div className={classes.imageContainer}>
							<img
								src={image.src.large}
								alt={image.title}
								className={classes.image}
							/>
						</div>
						<Typography
							gutterBottom
							variant="h5"
							component="h2"
							style={{ margin: "5px 10px" }}
						>
							{image.photographer}
						</Typography>
						<Button
							size="small"
							color="primary"
							onClick={() => handleClickOpenHandler(image.id)}
							style={{ margin: "5px 10px" }}
						>
							VIEW PHOTO
						</Button>
					</Card>
				</Grid>
			))}
		</Grid>
	);

	return (
		<div className={classes.display}>
			<Container>
				{display}
				<Info
					open={open}
					handleClose={handleCloseHandler}
					imageUrl={currentImageUrl}
					photographer={photographer}
					photographerUrl={photographerUrl}
					pexelPage={pexelPage}
				/>
			</Container>
		</div>
	);
}

export default Main;
