import { Account, Client, Databases, ImageFormat, Storage, type Models } from 'appwrite';

export type AppwritePage = {
	domain: string;
	name?: string;
	successUrl: string;
	failureUrl: string;
	provider: string;
	providerData: string;
	borderRadius: 'xs' | 'm' | 'xl';
	brandColor: 'primary' | 'success' | 'information' | 'warning' | 'neutral' | string;
	allowGuest: boolean;
	allowMagicUrl: boolean;
	allowEmailOtp: boolean;
	allowPhone: boolean;
	allowGoogle: boolean;
	allowGitHub: boolean;
	allowTwitter: boolean;
	allowFacebook: boolean;
	darkTheme: boolean;
	fileId: string;
	privacyPolicy?: string;
	termsOfService?: string;
	allowSignUp: boolean;
} & Models.Document;

export const AppwriteClient = new Client()
	.setEndpoint('https://appwrite.authui.site/v1')
	.setProject('authUi');

export const AppwriteDatabases = new Databases(AppwriteClient);
export const AppwriteAccount = new Account(AppwriteClient);
export const AppwriteStorage = new Storage(AppwriteClient);

export const AppwriteService = {
	getLogo: (imageId: string) => {
		return AppwriteStorage.getFilePreview(
			'logos',
			imageId,
			undefined,
			128,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			ImageFormat.Webp
		).toString();
	}
};
