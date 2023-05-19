import { AppwriteDatabases, type AppwritePage } from '$lib/appwrite';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const pageId = params.pageId;
	const page = await AppwriteDatabases.getDocument<AppwritePage>('main', 'pages', pageId);

	return {
		page
	};
}) satisfies PageLoad;
