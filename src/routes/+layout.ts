import { AppwriteAccount, AppwriteDatabases, type AppwritePage } from '$lib/appwrite';
import type { LayoutLoad } from './$types';
import { Account, Client, Query, type Models } from 'appwrite';

export let ssr = false;

async function getAdminPages(accountId: string) {
	try {
		const response = await AppwriteDatabases.listDocuments<AppwritePage>('main', 'pages', [
			Query.limit(100),
			Query.equal('userId', accountId)
		]);

		const adminPages = response.documents.filter((document) => {
			const permission = document.$permissions.find(
				(permission) => permission.startsWith('update') && permission.includes(`user:${accountId}`)
			);
			return permission ? true : false;
		});

		return adminPages;
	} catch (err) {
		console.error(err);
		return [];
	}
}

async function getAdminUser() {
	try {
		return await AppwriteAccount.get();
	} catch (err) {
		return null;
	}
}

async function getData(document: Models.Document & AppwritePage) {
	if (document.darkTheme) {
		window.document.body.classList.add('theme-dark');
	}

	let user: any = null;

	try {
		const { providerEndpoint, providerProject } = JSON.parse(document.providerData);
		const client = new Client().setEndpoint(providerEndpoint).setProject(providerProject);
		const account = new Account(client);
		user = await account.get();
	} catch (err) {}

	return {
		page: document,
		user
	};
}

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
			return await getData(responseCustomDomain.documents[0]);
		}

		const domain = hostname.split('.')[0];
		const response = await AppwriteDatabases.listDocuments<AppwritePage>('main', 'pages', [
			Query.limit(1),
			Query.equal('domain', domain)
		]);

		if (response.documents.length > 0) {
			return await getData(response.documents[0]);
		}
	}

	const adminUser = await getAdminUser();
	const adminPages = adminUser ? await getAdminPages(adminUser.$id) : [];

	return {
		page: null,
		user: null,
		adminUser,
		adminPages
	};
}) satisfies LayoutLoad;
