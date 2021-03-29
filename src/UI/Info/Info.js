import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles({
	info: {
		"& .MuiDialog-paperWidthSm": {
			width: 500,
			minWidth: 280,
			height: 500,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	},

	card: {
		width: "100%",
		height: 500,
		minWidth: 280,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
	},
	img: {
		width: "100%",
		minWidth: 320,
		height: "100%",
		display: "block",
	},
});

export default function Info({
	open,
	handleClose,
	imageUrl,
	photographer,
	photographerUrl,
	pexelPage,
}) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let mount = true;
		if (mount) {
			if (imageUrl) {
				setLoading(false);
			}
		}
		return () => {
			setLoading(true);
			mount = false;
		};
	}, [loading, imageUrl]);
	const classes = useStyles();
	const content = (
		<div>
			<Card className={classes.card}>
				<Typography
					gutterBottom
					variant="h5"
					component="h2"
					style={{ margin: "5px 10px" }}
				>
					{photographer}
				</Typography>
				<div style={{ width: "100%", height: "250px" }}>
					<img src={imageUrl} className={classes.img} alt="" />
				</div>
				<Typography
					variant="body2"
					color="textSecondary"
					component="p"
					style={{ padding: 10, textTransform: "capitalize" }}
				>
					This <a href={pexelPage}>Photo</a> was taken by{" "}
					<a href={photographerUrl}>{photographer}</a> on Pexels.
				</Typography>

				<Button onClick={handleClose} color="primary">
					CLOSE
				</Button>
			</Card>
		</div>
	);
	return (
		<>
			<Dialog open={open} onClose={handleClose} className={classes.info}>
				{loading ? <Spinner /> : content}
			</Dialog>
		</>
	);
}
