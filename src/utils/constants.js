const appbasePrefs = {
	name: 'Search Movies',
	description: '',
	pipeline: 'movies-vector',
	backend: 'elasticsearch',
	id: '',
	pageSettings: {
		fields: {
			title: {
				dataField: 'title',
				highlight: false,
			},
			description: {
				dataField: 'overview',
				highlight: false,
			},
			price: {
				dataField: 'vote_count',
				highlight: false,
			},
			priceUnit: 'Votes',
			image: {
				dataField: 'poster_path',
				highlight: false,
			},
			handle: {
				dataField: '',
				highlight: false,
			},
			handleViewer: 'link',
			userDefinedFields: [],
			cssSelector: '',
		},
		pages: {
			home: {
				componentSettings: {
					search: {
						componentType: 'SEARCHBOX',
						customMessages: {
							noResults: 'No suggestions found for <mark>[term]</mark>',
						},
						searchButton: {
							icon: '',
							text: 'Click here to search',
						},
						redirectUrlText: 'Open URL',
						redirectUrlIcon: '',
						showSearchAs: 'sticky',
						fields: {
							title: {
								dataField: 'title',
								highlight: true,
							},
							description: {
								dataField: 'overview',
								highlight: true,
							},
							price: {
								dataField: 'vote_count',
								highlight: false,
							},
							priceUnit: 'Votes',
							image: {
								dataField: 'poster_path',
								highlight: false,
							},
							handle: {
								dataField: '',
								highlight: false,
							},
							handleViewer: 'link',
							userDefinedFields: [],
							cssSelector: '',
						},
						rsConfig: {
							autosuggest: true,
							enableAI: false,
							AIUIConfig: {
								showSourceDocuments: null,
								sourceDocumentLabel: null,
								askButton: null,
							},
							enablePopularSuggestions: false,
							enableRecentSearches: false,
							highlight: false,
							showVoiceSearch: true,
							componentType: 'SEARCHBOX',
						},
					},
					result: {
						componentType: 'REACTIVELIST',
						fields: {
							title: {
								dataField: 'title',
								highlight: true,
							},
							description: {
								dataField: 'overview',
								highlight: true,
							},
							price: {
								dataField: 'vote_count',
								highlight: false,
							},
							priceUnit: 'Votes',
							image: {
								dataField: 'poster_path',
								highlight: false,
							},
							handle: {
								dataField: '',
								highlight: false,
							},
							handleViewer: 'link',
							userDefinedFields: [],
							cssSelector: '',
						},
						customMessages: {
							resultStats: '[count] products found in [time] ms',
							noResults: 'No Results Found!',
						},
						rsConfig: {
							pagination: false,
							infiniteScroll: true,
							componentType: 'REACTIVELIST',
						},
						showAIAnswer: false,
						sortOptionSelector: [],
						resultHighlight: true,
						layout: 'grid',
						viewSwitcher: true,
						displayFields: {},
					},
				},
				indexSettings: {
					index: 'movies-vector',
					endpoint: {
						url: '/movies-vector/_reactivesearch',
						method: 'POST',
						headers:
							'{"Authorization":"Basic ODI0ZjYyMzI3OWViOjY5MmNmZWVmLTYyMWItNDQ5NS04NzJmLWFkM2UwMTc1NzkwOQ=="}',
					},
				},
			},
			search: {
				componentSettings: {
					search: {
						componentType: 'SEARCHBOX',
						customMessages: {
							noResults: 'No suggestions found for <mark>[term]</mark>',
						},
						searchButton: {
							icon: '',
							text: 'Click here to search',
						},
						redirectUrlText: 'Open URL',
						redirectUrlIcon: '',
						showSearchAs: 'sticky',
						fields: {
							title: {
								dataField: 'title',
								highlight: true,
							},
							description: {
								dataField: 'overview',
								highlight: true,
							},
							price: {
								dataField: 'vote_count',
								highlight: false,
							},
							priceUnit: 'Votes',
							image: {
								dataField: 'poster_path',
								highlight: false,
							},
							handle: {
								dataField: '',
								highlight: false,
							},
							handleViewer: 'link',
							userDefinedFields: [],
							cssSelector: '',
						},
						rsConfig: {
							autosuggest: true,
							enableAI: false,
							AIUIConfig: {
								showSourceDocuments: null,
								sourceDocumentLabel: null,
								askButton: null,
							},
							enablePopularSuggestions: false,
							enableRecentSearches: false,
							highlight: false,
							showVoiceSearch: true,
							componentType: 'SEARCHBOX',
						},
					},
					result: {
						componentType: 'REACTIVELIST',
						fields: {
							title: {
								dataField: 'title',
								highlight: true,
							},
							description: {
								dataField: 'overview',
								highlight: true,
							},
							price: {
								dataField: 'vote_count',
								highlight: false,
							},
							priceUnit: 'Votes',
							image: {
								dataField: 'poster_path',
								highlight: false,
							},
							handle: {
								dataField: '',
								highlight: false,
							},
							handleViewer: 'link',
							userDefinedFields: [],
							cssSelector: '',
						},
						customMessages: {
							noResults: 'No Results Found!',
							resultStats: '[count] products found in [time] ms',
						},
						rsConfig: {
							componentId: 'result',
							componentType: 'REACTIVELIST',
							infiniteScroll: true,
							pagination: false,
						},
						showAIAnswer: false,
						sortOptionSelector: [],
						resultHighlight: true,
						layout: 'grid',
						viewSwitcher: true,
						displayFields: {},
					},
					authors: {
						enabled: false,
						rsConfig: {
							URLParams: true,
							componentId: 'authors',
							componentType: 'MULTILIST',
							dataField: 'authors.keyword',
							placeholder: 'Filter by authors',
							showSearch: false,
							title: 'Filter by authors',
						},
					},
					ratings: {
						enabled: false,
						rsConfig: {
							componentId: 'ratings',
							componentType: 'RATINGSFILTER',
							data: [
								{
									end: 5,
									label: '4 stars and up',
									start: 4,
								},
								{
									end: 5,
									label: '3 stars and up',
									start: 3,
								},
								{
									end: 5,
									label: '2 stars and up',
									start: 2,
								},
								{
									end: 5,
									label: '> 1 stars',
									start: 1,
								},
							],
							dataField: 'average_rating',
							title: 'RatingsFilter',
						},
					},
					releaseYear: {
						enabled: false,
						rsConfig: {
							componentId: 'releaseYear',
							componentType: 'RANGESLIDER',
							dataField: 'original_publication_year',
							range: {
								end: 2019,
								start: 1950,
							},
							title: 'Publication Year',
							tooltipTrigger: 'hover',
						},
					},
					series: {
						enabled: false,
						rsConfig: {
							componentId: 'series',
							componentType: 'SINGLELIST',
							dataField: 'original_series.keyword',
							showSearch: false,
							title: 'Select Book Series',
						},
					},
				},
				indexSettings: {
					index: 'movies-vector',
					endpoint: {
						url: '/movies-vector/_reactivesearch',
						method: 'POST',
						headers:
							'{"Authorization":"Basic ODI0ZjYyMzI3OWViOjY5MmNmZWVmLTYyMWItNDQ5NS04NzJmLWFkM2UwMTc1NzkwOQ=="}',
					},
				},
			},
		},
		currentPage: 'home',
	},
	themeSettings: {
		type: 'multi-page',
		customCss: '',
		rsConfig: {
			colors: {
				primaryColor: '#0B6AFF',
				primaryTextColor: '#fff',
				textColor: '#424242',
				titleColor: '#424242',
			},
			typography: {
				fontFamily: 'Open Sans',
			},
		},
		meta: {
			bodyBackgroundColor: '#fff',
			navbarBackgroundColor: '#001628',
			linkColor: '#3eb0ef',
			fontWeight: 400,
		},
	},
	globalSettings: {
		currency: 'USD',
		showSelectedFilters: true,
		meta: {
			branding: {
				logoUrl: '',
				logoWidth: 200,
				logoAlignment: 'left',
			},
			deploySettings: {
				versionId: '',
			},
			templateSettings: {
				templateVersionId: '0.3.8',
			},
			endpoint: {
				url: '/movies-vector/_reactivesearch',
				method: 'POST',
				headers:
					'{"Authorization":"Basic ODI0ZjYyMzI3OWViOjY5MmNmZWVmLTYyMWItNDQ5NS04NzJmLWFkM2UwMTc1NzkwOQ=="}',
			},
		},
	},
	exportSettings: {
		exportAs: 'embed',
		credentials: '824f623279eb:692cfeef-621b-4495-872f-ad3e01757909',
		openAsPage: false,
		type: 'other',
	},
	chartSettings: {
		charts: [],
	},
	syncSettings: null,
	authenticationSettings: {
		enableAuth0: false,
		enableProfilePage: true,
		profileSettingsForm: {
			viewData: true,
			editData: true,
			closeAccount: true,
			editThemeSettings: true,
			editSearchPreferences: true,
		},
		clientId: 'fQ50eZkW3WlFoDEfHAPBxiOTYmzSXZC7',
	},
	appbaseSettings: {
		index: 'movies-vector',
		credentials: '824f623279eb:692cfeef-621b-4495-872f-ad3e01757909',
		url: 'https://opensearch-demo-knn-1-drhnehb-arc.searchbase.io',
	},
};
export default JSON.stringify(appbasePrefs);
