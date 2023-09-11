import React from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { css } from '@emotion/css';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import { URL, INDEX_CRED, APP } from '../constants/index';

// import Navbar from '../components/Navbar';

// import { getDescriptionFromAPI } from '../utils';

const notFound = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.back-button {
		margin-top: 20px;
	}
`;

const spinner = css`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const styles = () => ({
	root: {
		width: '95%',
		margin: '80px auto 15px',
		padding: '20px',
		border: '1px solid #d9d9d9',
		borderRadius: '2px',
	},
});

/*
	This component is use to render Detail Details.
	Here we are fetching details for specific book by its id using appbase-js.
	And as we dont have proper description of every book, we are calling DuckDuckGo
	API to fetch this detail.
*/

class Detail extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			item: { title: '', description: '', image: '', price: '' },
			loadingDescription: false,
		};
	}

	componentDidMount() {
		this.loadDetail();
	}

	componentDidUpdate(prevProps) {
		const {
			location: { pathname },
		} = prevProps;
		const {
			location: { pathname: newPath },
		} = this.props;

		if (newPath !== pathname) {
			this.loadDetail();
		}
	}

	loadDetail = async () => {
		const {
			match: {
				params: { id },
			},
		} = this.props;

		const response = await fetch(`${URL}/${APP}/_doc/${id}`, {
			headers: {
				Authorization: `Basic ${btoa(INDEX_CRED)}`,
			},
		});
		const responseJson = await response.json();

		this.setState({
			item: responseJson._source,
			isLoading: false,
		});
	};

	render() {
		// eslint-disable-next-line
		const { isLoading, item, loadingDescription } = this.state;
		const { history, classes } = this.props;

		/* eslint-disable no-nested-ternary */
		return (
			<React.Fragment>
				{/* <Navbar hideShowButton={false} page="search" /> */}
				{isLoading ? (
					<div
						className={spinner}
						style={{
							position: 'absolute',
							width: '200px',
							left: '50%',
							top: '50%',
						}}
					>
						<CircularProgress />
						<div
							style={{
								position: 'absolute',
								left: '-10%',
								top: '100%',
							}}
						>
							<Typography component="h6" variant="body2" color="textSecondary">
								fetching data...
							</Typography>
						</div>
					</div>
				) : item ? (
					<Grid container spacing={24} className={classes.root}>
						<Grid item md={2} sm={4}>
							<img
								style={{ width: '100%' }}
								src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
								alt={item.title}
							/>
						</Grid>
						<Grid item md={10} sm={12}>
							<Typography component="h5" variant="h5" color="textPrimary">
								{item.title}
							</Typography>

							<Typography
								style={{ marginTop: '5px' }}
								component="p"
								variant="h6"
								color="textSecondary"
							>
								<p>{item.overview}</p>
							</Typography>
							<Typography
								style={{ marginTop: '5px' }}
								component="p"
								variant="h6"
								color="textSecondary"
							>
								Vote Count: {item.vote_count}
							</Typography>
							<Typography
								style={{ fontWeight: 'bold' }}
								component="p"
								variant="p"
								color="textSecondary"
							>
								{item.release_date}
							</Typography>
							{/* <a href={this.getLink()} target="_blank" rel="noopener noreferrer">
								Search on Web
							</a> */}
						</Grid>
					</Grid>
				) : (
					<div className={notFound}>
						<Button
							size="large"
							className="back-button"
							onClick={() => history.push('/')}
						>
							<Icon type="arrow-left" />
							Go back
						</Button>
					</div>
				)}
			</React.Fragment>
		);
		/* eslint-enable no-nested-ternary */
	}
}

export default withStyles(styles)(Detail);
