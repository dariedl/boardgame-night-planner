import { authenticator } from '~/server/auth/auth.server';

export const logoutAction = async (request: Request) => {
	return authenticator.logout(request, { redirectTo: '/login' });
};
