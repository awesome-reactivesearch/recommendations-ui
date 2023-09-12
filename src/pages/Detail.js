import React from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { css } from '@emotion/css';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { URL, INDEX_CRED, APP, CRED } from '../constants/index';

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
			isRecommendationLoading: true,
			recommendations: [],
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

		this.getRecommendations(responseJson._source);
	};

	getRecommendations = async (item) => {
		const query = item.title;

		const response = await fetch(`${URL}/movies-recommendation/_reactivesearch`, {
			headers: {
				Authorization: `Basic ${btoa(CRED)}`,
			},
			method: 'POST',
			body: JSON.stringify({
				query: [
					{
						id: 'search',
						value: query,
						vectorDataField: 'vector_data',
						excludeFields: ['vector_data'],
					},
				],
				settings: {
					backend: 'opensearch',
				},
			}),
		});
		const responseJson = await response.json();

		this.setState({
			isRecommendationLoading: false,
			recommendations: responseJson.search.hits.hits,
		});
	};

	render() {
		// eslint-disable-next-line
		const { isLoading, item, loadingDescription, isRecommendationLoading, recommendations } =
			this.state;
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
								☆ {item.vote_average}
							</Typography>
							<Typography
								style={{ fontWeight: 'bold' }}
								component="p"
								variant="p"
								color="textSecondary"
							>
								{item.release_date}
							</Typography>
							<div
								id="genres"
								style={{
									marginTop: '20px',
								}}
							>
								<Typography component="p" variant="p" color="textSecondary">
									{item.genres.map((g) => `#${g}`).join(' ')}
								</Typography>
							</div>
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
				{isRecommendationLoading ? (
					<div>Fetching Recommendations...</div>
				) : (
					<div
						id="recommendations--wrapper"
						style={{
							maxWidth: '80%',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					>
						<h1
							style={{
								paddingTop: '35px',
								borderBottom: '1px solid #CFD8DC',
								textAlign: 'center',
							}}
						>
							Recommendations
						</h1>
						<div
							className="border"
							style={{
								maxWidth: '100%',
								display: 'flex',
								marginLeft: 'auto',
								marginRight: 'auto',
								flexWrap: 'wrap',
							}}
						>
							{recommendations.map((rItem) => (
								<Link
									to={`/detail/${rItem._id}`}
									style={{
										marginTop: '35px',
										paddingBottom: '15px',
										display: 'block',
										borderBottom: 'solid #CFD8DC 1px',
										maxWidth: '25%',
									}}
								>
									<div
										style={{
											padding: '15px',
										}}
									>
										<img
											src={rItem._source.poster_path}
											alt=""
											style={{
												maxWidth: '100%',
												marginBottom: '25px',
												marginTop: '15px',
											}}
										/>
										<h2>{rItem._source.title}</h2>
										<p
											style={{
												marginTop: '5px',
											}}
										>
											<span
												style={{
													fontWeight: 'bold',
												}}
											>
												Votes
											</span>{' '}
											{rItem._source.vote_count}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}
			</React.Fragment>
		);
		/* eslint-enable no-nested-ternary */
	}
}

export default withStyles(styles)(Detail);
