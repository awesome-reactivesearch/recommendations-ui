import getPreferences from '../utils/preferences';

// eslint-disable-next-line import/prefer-default-export
export const getPagePreferences = (page) => {
	const preferences = getPreferences();
	const pagePreferences = preferences.pageSettings.pages[page] || {};
	const globalSettings = preferences.globalSettings ? preferences.globalSettings : {};
	const globalEndpoint = globalSettings.endpoint;
	const pageIndexSettings = pagePreferences.indexSettings || {};
	const pageEndpoint = pageIndexSettings.endpoint;
	const endpoint = pageEndpoint || globalEndpoint;
	const fusionSettings = Object.assign(
		{},
		preferences.fusionSettings,
		pageIndexSettings.fusionSettings,
	);
	const otherComponents = Object.keys(pagePreferences.componentSettings || {})
		.filter((key) => !['search', 'result'].includes(key))
		.map((key) => ({ ...pagePreferences.componentSettings[key], key }));
	const { result: resultComponent, search: searchComponent } =
		pagePreferences.componentSettings || {};
	const globalmongoDBSettings = globalSettings?.meta?.mongoDBSettings || {};
	const mongoDBSettings = {
		...(globalmongoDBSettings || {}),
		...(pageIndexSettings?.mongoDBSettings || {}),
	};
	return {
		pagePreferences,
		otherComponents,
		resultComponent,
		searchComponent,
		endpoint,
		fusionSettings,
		mongoDBSettings,
	};
};

export const sanitizeHTMLAndCombineStrings = (inputStrings) => {
	// Combine all input strings into a single string
	const combinedString = inputStrings.join(' ');
	// Remove HTML tags using a regular expression
	const withoutTags = combinedString.replace(/<[^>]+>/g, '');

	// Remove multiple consecutive spaces and newlines
	let finalString = withoutTags.replace(/\s{2,}/g, ' ').trim();

	if (finalString && finalString.startsWith('#')) {
		finalString = finalString.split('&gt;').slice(1).join('&gt;');
	}
	return finalString;
};
