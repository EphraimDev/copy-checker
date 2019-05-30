import decode from 'jwt-decode';
import token from './GetToken';

export const isAdmin = async () => {
    try {
        const decoded = await decode(token);
        if(decoded.isAdmin === true) {
            return true
        } else {
            return false
        }
    }
    catch (err) {
        return false;
    }
}