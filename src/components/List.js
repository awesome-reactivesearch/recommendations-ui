import React from 'react';
import { css } from '@emotion/css';
import { ReactiveComponentPrivate } from '@appbaseio/reactivesearch';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import getPreferences from '../utils/preferences';
import { sanitizeHTMLAndCombineStrings } from '../pages/utils';

/*
	This component is used to generate Results via List.
	For smaller screen we use HorizontalCard to generate a List
	layout whereas for large screen we use VerticalCard to generate
	Card Layout.

	You can override the default props by using reactiveListProps at L29.
*/

const headingStyles = css`
	margin-bottom: 30px;
`;
const listStyles = css`
	margin-bottom: 80px;
`;

const preferences = getPreferences();

const List = (props) => {
	const { title, page } = props;
	// ResultsLayoutByCategory depends upon the current page
	preferences.pageSettings.currentPage = page;

	return (
		<React.Fragment>
			{title && <h2 className={headingStyles}>{title}</h2>}
			<ReactiveComponentPrivate
				preferencesPath={`pageSettings.pages.${page}.componentSettings.result`}
				componentId="result"
				componentProps={{
					innerClass: {
						pagination: css({
							display: 'none',
						}),
						poweredBy: css({
							display: 'none !important',
						}),
						sortOptions: 'results-sort-options',
					},
					className: listStyles,
				}}
				render={({ data }) => (
					<div
						className="border"
						style={{
							maxWidth: '100%',
							display: 'flex',
							flexWrap: 'wrap',
						}}
					>
						{data.map((item) => (
							<Link
								to={`/detail/${item._id}`}
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
										src={item.poster_path}
										alt=""
										style={{
											maxWidth: '100%',
											marginBottom: '25px',
											marginTop: '15px',
										}}
									/>
									<h2>{sanitizeHTMLAndCombineStrings([item.title])}</h2>
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
											☆ {item.vote_average}
										</span>
									</p>
									<p>{item.release_date}</p>
									<p
										style={{
											marginTop: '3px',
											fontWeight: 'bold',
											color: '#607D8B',
										}}
										id="date"
									>
										{item.genres.map((g) => `#${g}`).join(' ')}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			/>
		</React.Fragment>
	);
};

export default List;
