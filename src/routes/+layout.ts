import { AppwriteDatabases, type AppwritePage } from '$lib/appwrite';
import type { LayoutLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ url }) => {
	const hostname = url.hostname;

	const isSubdomain = hostname.endsWith('localhost')
		? hostname.split('.').length >= 2
			? true
			: false
		: hostname.split('.').length >= 3
		? hostname.startsWith('www')
			? false
			: true
		: false;

	if (isSubdomain) {
		const responseCustomDomain = await AppwriteDatabases.listDocuments<AppwritePage>(
			'main',
			'pages',
			[Query.limit(1), Query.equal('customDomain', hostname)]
		);

		if (responseCustomDomain.documents.length > 0) {
			return {
				page: responseCustomDomain.documents[0]
			};
		}

		const domain = hostname.split('.')[0];
		const response = await AppwriteDatabases.listDocuments<AppwritePage>('main', 'pages', [
			Query.limit(1),
			Query.equal('domain', domain)
		]);

		if (response.documents.length > 0) {
			return {
				page: response.documents[0]
			};
		}
	}

	return {
		page: null
	};
}) satisfies LayoutLoad;
