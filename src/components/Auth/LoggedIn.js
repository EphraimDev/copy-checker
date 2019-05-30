import token from './GetToken';
import { isTokenExpired } from './IsTokenExpired';

export const loggedIn = () => {
    return !!token && !isTokenExpired(token)
}