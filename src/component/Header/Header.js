import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	header: {
		padding: "10px 0",
	},

	menu: {
		color: "white",
	},

	logo: {
		fontWeight: "700",
	},
});

const Header = ({ getSearchText }) => {
	const classes = useStyles();

	return (
		<>
			<AppBar className={classes.header} position="static">
				<Container>
					<Toolbar>
						<Grid container>
							<Grid item xs={12} sm={4}>
								<Typography className={classes.logo} variant="h4">
									Pikx
								</Typography>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default Header;
