import decode from 'jwt-decode';

export const isAdmin = async (token) => {
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