import { Client, Databases, type Models } from 'appwrite';

export type AppwritePage = {
	domain: string,
	name?: string,
	successUrl: string,
	failureUrl: string,
	provider: string,
	providerData: string,
	borderRadius: 'xs' | 'm' | 'xl',
	allowGuest: boolean,
	allowMagicUrl: boolean,
	allowPhone: boolean,
	allowGoogle: boolean,
	allowGitHub: boolean,
	allowTwitter: boolean,
	allowFacebook: boolean
} & Models.Document;

export const AppwriteClient = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('authUi');

export const AppwriteDatabases = new Databases(AppwriteClient);